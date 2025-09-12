// hooks/useWebRTCCall.ts
import { useRef, useEffect, useState, useCallback } from 'react';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
} from 'react-native-webrtc';
import { useSocket } from '../SocketContext';

interface CallState {
  isInCall: boolean;
  incomingCall: boolean;
  callerInfo?: { id: string; name: string };
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  isMuted: boolean;
  callConnected: boolean;
}

interface UseWebRTCCallProps {
  userId: string;
  userName: string;
  onCallEnd?: () => void;
  onIncomingCall?: (callerInfo: { id: string; name: string }) => void;
}

export const useWebRTCCall = ({ 
  userId, 
  userName, 
  onCallEnd, 
  onIncomingCall 
}: UseWebRTCCallProps) => {
  const { socket, emit, on, off, isConnected } = useSocket();
  
  const [callState, setCallState] = useState<CallState>({
    isInCall: false,
    incomingCall: false,
    isMuted: false,
    callConnected: false,
  });

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const currentCallRef = useRef<string | null>(null);

  // WebRTC configuration
  const rtcConfig = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject'
    }
    ],
  };

  // Register for WebRTC events when socket connects
  useEffect(() => {
    if (isConnected && socket) {
      // Register user for calling
      emit('register-for-calls', { userId, userName });

      // Set up call event listeners
      on('incoming-call', handleIncomingCallEvent);
      on('call-answered', handleCallAnsweredEvent);
      on('call-rejected', handleCallRejectedEvent);
      on('ice-candidate', handleIceCandidateEvent);
      on('call-ended', handleCallEndedEvent);
    }

    return () => {
      if (socket) {
        off('incoming-call', handleIncomingCallEvent);
        off('call-answered', handleCallAnsweredEvent);
        off('call-rejected', handleCallRejectedEvent);
        off('ice-candidate', handleIceCandidateEvent);
        off('call-ended', handleCallEndedEvent);
      }
    };
  }, [isConnected, socket, userId, userName]);

  // Initialize peer connection
  const initializePeerConnection = useCallback(() => {
    const peerConnection = new RTCPeerConnection(rtcConfig);
    peerConnectionRef.current = peerConnection;

    peerConnection.onicecandidate = (event) => {
      if (event.candidate && currentCallRef.current) {
        emit('ice-candidate', {
          candidate: event.candidate,
          targetUserId: currentCallRef.current,
        });
      }
    };

    peerConnection.onaddstream = (event) => {
      console.log('Remote stream received');
      setCallState(prev => ({
        ...prev,
        remoteStream: event.stream,
        callConnected: true,
      }));
    };

    peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', peerConnection.connectionState);
      if (peerConnection.connectionState === 'disconnected' || 
          peerConnection.connectionState === 'failed') {
        endCall();
      }
    };

    return peerConnection;
  }, []);

  // Get user media
  const getUserMedia = useCallback(async (): Promise<MediaStream> => {
    try {
      const stream = await mediaDevices.getUserMedia({
        video: false, // Audio only for voice calls
        audio: true,
      });
      localStreamRef.current = stream;
      setCallState(prev => ({ ...prev, localStream: stream }));
      return stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }, []);

  // Make a call
const makeCall = useCallback(async (targetUserId: string, targetUserName: string) => {
  try {
    console.log('Initiating call to:', targetUserName);

    const stream = await getUserMedia();
    const peerConnection = initializePeerConnection();

    // ✅ Instead of peerConnection.addStream(stream)
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });

    // keep a reference if you want to render your own stream locally
    localStreamRef.current = stream;
    currentCallRef.current = targetUserId;

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    setCallState(prev => ({
      ...prev,
      isInCall: true,
      callerInfo: { id: targetUserId, name: targetUserName },
    }));

    emit('make-call', {
      targetUserId,
      offer,
      callerName: userName,
    });

    console.log('Call offer sent to:', targetUserName);
  } catch (error) {
    console.error('Error making call:', error);
    endCall();
  }
}, [getUserMedia, initializePeerConnection, userName, emit]);

  // Handle incoming call event
// const handleIncomingCallEvent = useCallback(async (data: { 
//   callerId: string; 
//   callerName: string; 
//   offer: RTCSessionDescriptionInit; // 👈 use RTCSessionDescriptionInit
// }) => {
//   console.log('Incoming call from:', data.callerName);

//   currentCallRef.current = data.callerId;
//   setCallState(prev => ({
//     ...prev,
//     incomingCall: true,
//     callerInfo: { id: data.callerId, name: data.callerName },
//   }));

//   try {
//     const stream = await getUserMedia();
//     const peerConnection = initializePeerConnection();

//     // ✅ Attach local tracks to the connection
//     stream.getTracks().forEach(track => {
//       peerConnection.addTrack(track, stream);
//     });

//     // ✅ Handle remote stream
//     peerConnection.ontrack = (event) => {
//       const [remoteStream] = event.streams;
//       if (remoteStream) {
//         remoteStreamRef.current = remoteStream; // keep reference
//         // you can also notify your state/UI here
//       }
//     };

//     // ✅ Apply the incoming offer
//     await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));

//   } catch (error) {
//     console.error('Error handling incoming call:', error);
//     rejectCall();
//   }

//   // Notify parent component
//   onIncomingCall?.({ id: data.callerId, name: data.callerName });
// }, [getUserMedia, initializePeerConnection, onIncomingCall]);

// Handle incoming call event
const handleIncomingCallEvent = useCallback(async (data: { 
  callerId: string; 
  callerName: string; 
  offer: RTCSessionDescriptionInit;
}) => {
  console.log('Incoming call from:', data.callerName);

  currentCallRef.current = data.callerId;
  setCallState(prev => ({
    ...prev,
    incomingCall: true,
    callerInfo: { id: data.callerId, name: data.callerName },
  }));

  try {
    const stream = await getUserMedia();
    const peerConnection = initializePeerConnection();

    // ✅ Attach local tracks
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });

    // ✅ Handle remote stream
    peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (remoteStream) {
        console.log('Remote stream received');
        setCallState(prev => ({
          ...prev,
          remoteStream,
        }));
      }
    };

    // ✅ Apply incoming offer
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));

  } catch (error) {
    console.error('Error handling incoming call:', error);
    rejectCall();
  }

  // Notify parent
  onIncomingCall?.({ id: data.callerId, name: data.callerName });
}, [getUserMedia, initializePeerConnection, onIncomingCall, rejectCall]);


  // Answer call
  const answerCall = useCallback(async () => {
    try {
      const peerConnection = peerConnectionRef.current;
      if (!peerConnection || !currentCallRef.current) return;

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      emit('answer-call', {
        targetUserId: currentCallRef.current,
        answer,
      });

      setCallState(prev => ({
        ...prev,
        incomingCall: false,
        isInCall: true,
      }));

      console.log('Call answered');
    } catch (error) {
      console.error('Error answering call:', error);
      endCall();
    }
  }, [emit]);

  // Handle call answered event
  const handleCallAnsweredEvent = useCallback(async (data: { answer: RTCSessionDescription }) => {
    try {
      const peerConnection = peerConnectionRef.current;
      if (!peerConnection) return;

      await peerConnection.setRemoteDescription(data.answer);
      console.log('Call connected');
    } catch (error) {
      console.error('Error handling call answer:', error);
      endCall();
    }
  }, []);

  // Handle call rejected event
  const handleCallRejectedEvent = useCallback(() => {
    console.log('Call was rejected');
    endCall();
  }, []);

  // Handle ICE candidate event
  const handleIceCandidateEvent = useCallback(async (data: { candidate: RTCIceCandidate }) => {
    try {
      const peerConnection = peerConnectionRef.current;
      if (!peerConnection) return;

      await peerConnection.addIceCandidate(data.candidate);
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }, []);

  // Handle call ended event
  const handleCallEndedEvent = useCallback(() => {
    console.log('Call ended by remote peer');
    endCall();
  }, []);

  // Reject call
  const rejectCall = useCallback(() => {
    if (currentCallRef.current) {
      emit('reject-call', {
        targetUserId: currentCallRef.current,
      });
    }
    endCall();
  }, [emit]);

  // End call
  const endCall = useCallback(() => {
    // Notify remote peer if call is active
    if (callState.isInCall && currentCallRef.current) {
      emit('end-call', {
        targetUserId: currentCallRef.current,
      });
    }

    // Clean up local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    // Clean up peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Reset state
    setCallState({
      isInCall: false,
      incomingCall: false,
      callerInfo: undefined,
      localStream: undefined,
      remoteStream: undefined,
      isMuted: false,
      callConnected: false,
    });

    currentCallRef.current = null;
    console.log('Call ended and cleaned up');
    
    // Notify parent component
    onCallEnd?.();
  }, [callState.isInCall, emit, onCallEnd]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setCallState(prev => ({
          ...prev,
          isMuted: !audioTrack.enabled,
        }));
      }
    }
  }, []);

  return {
    callState,
    makeCall,
    answerCall,
    rejectCall,
    endCall,
    toggleMute,
  };
};
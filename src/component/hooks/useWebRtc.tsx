import React, { useCallback, useRef, useState } from "react";
import {
  RTCPeerConnection,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
} from "react-native-webrtc";

export default function useWebRTC({ onIncomingCall }: { onIncomingCall?: Function }) {
  const currentCallRef = useRef<string | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // ✅ Keep streams in state so your UI can render them via <RTCView />
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const [callState, setCallState] = useState({
    incomingCall: false,
    callerInfo: null as { id: string; name: string } | null,
  });

  // Utility: get microphone & camera
  const getUserMedia = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream); // ✅ so UI can use it
    return stream;
  };

  // Utility: create peer connection
  const initializePeerConnection = () => {
    const pc = new RTCPeerConnection();

    peerConnectionRef.current = pc;
    return pc;
  };

  // ✅ Handle incoming call
  const handleIncomingCallEvent = useCallback(
    async (data: {
      callerId: string;
      callerName: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      console.log("Incoming call from:", data.callerName);

      currentCallRef.current = data.callerId;
      setCallState((prev) => ({
        ...prev,
        incomingCall: true,
        callerInfo: { id: data.callerId, name: data.callerName },
      }));

      try {
        const stream = await getUserMedia();
        const peerConnection = initializePeerConnection();

        // ✅ Attach local tracks
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });

        // ✅ Handle remote tracks
        peerConnection.ontrack = (event) => {
          const [remote] = event.streams;
          if (remote) {
            console.log("Remote stream received");
            setRemoteStream(remote); // ✅ stored in state for UI
          }
        };

        // ✅ Apply offer
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
      } catch (error) {
        console.error("Error handling incoming call:", error);
        // if you already have rejectCall() defined
        // rejectCall();
      }

      // Notify parent
      onIncomingCall?.({ id: data.callerId, name: data.callerName });
    },
    [onIncomingCall]
  );

  return {
    localStream,
    remoteStream,
    callState,
    handleIncomingCallEvent,
  };
}

// contexts/SocketContext.js
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

const SocketContext = createContext<any>({});

// Generate or retrieve a persistent client ID
const getClientId = async () => {
  try {
    let clientId = await AsyncStorage.getItem('socket_client_id');
    if (!clientId) {
      clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem('socket_client_id', clientId);
    }
    return clientId;
  } catch (error) {
    console.error('Error getting client ID:', error);
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

export const SocketProvider = ({ children, serverUrl = 'http://localhost:3001' }: any) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [clientId, setClientId] = useState(null);
  const socketRef = useRef<any>(null);
  const reconnectTimeoutRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);

  // Initialize socket connection
  const initializeSocket = async () => {
    try {
      const id: any = await getClientId();
      setClientId(id);

      const socketInstance: any = io(serverUrl, {
        transports: ['websocket'],
        auth: {
          clientId: id
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        timeout: 20000,
      });

      socketInstance.on('connect', () => {
        console.log('Socket connected with ID:', id);
        setIsConnected(true);
      });

      socketInstance.on('disconnect', (reason: any) => {
        console.log('Socket disconnected:', reason);
        setIsConnected(false);
      });

      socketInstance.on('connect_error', (error: any) => {
        console.error('Socket connection error:', error);
        setIsConnected(false);
      });

      // WebRTC-specific event handlers
      socketInstance.on('user-registered-for-calls', (data: any) => {
        console.log('User registered for calls:', data);
      });

      socketInstance.on('call-error', (error: any) => {
        console.error('Call error:', error);
      });

      socketRef.current = socketInstance;
      setSocket(socketInstance);

      return socketInstance;
    } catch (error) {
      console.error('Error initializing socket:', error);
    }
  };

  // Handle app state changes
  const handleAppStateChange = (nextAppState: any) => {
    if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to the foreground
      if (socketRef.current && !socketRef.current.connected) {
        socketRef.current.connect();
      }
    }
    appStateRef.current = nextAppState;
  };

  useEffect(() => {
    initializeSocket();

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [serverUrl]);

  // Helper functions to use throughout the app
  const emit = (event: any, data: any) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  };

  const on = (event: any, callback: any) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const off = (event: any, callback: any) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  const reconnect = () => {
    if (socketRef.current) {
      socketRef.current.connect();
    }
  };

  const value = {
    socket: socketRef.current,
    isConnected,
    clientId,
    emit,
    on,
    off,
    disconnect,
    reconnect
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default SocketContext;
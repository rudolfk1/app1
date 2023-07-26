import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

export function useSocket(socketUrl: string, onSocketMessage: (message: any) => void): Socket {
  const socket = io(socketUrl);
  
  useEffect(() => {
    socket.on('message', onSocketMessage);
    return () => {
      socket.off('message');
    };
  }, [socket, onSocketMessage]);

  return socket;
}

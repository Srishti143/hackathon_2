import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5001';

export const socket = io(SOCKET_URL, {
    transports: ['websocket'], // Force WebSocket for better performance
    reconnectionCodes: [1000, 4000],
    reconnection: true,
});

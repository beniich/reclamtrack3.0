import { Server } from 'socket.io';
import { logger } from '../utils/logger.js';

let io: Server;

export const initSocket = (httpServer: any) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error('Token manquant'));
        // Token validation can be added here
        next();
    });

    io.on('connection', (socket) => {
        logger.info(`🔌 Socket connecté : ${socket.id}`);

        socket.on('join-rooms', (rooms: string[]) => {
            rooms.forEach((room) => socket.join(room));
        });

        socket.on('disconnect', () => {
            logger.info(`🔌 Socket déconnecté : ${socket.id}`);
        });
    });

    return io;
};

export { io };

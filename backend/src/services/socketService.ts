import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';
import { logger } from '../utils/logger.js';

interface NotificationData {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  userId?: string; // Pour notifications ciblées
  timestamp: Date;
}

class NotificationService {
  private io: SocketIOServer | null = null;

  init(server: Server) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "*", // Allow all for now or specify frontend URL
        methods: ["GET", "POST"]
      }
    });

    this.io.on('connection', (socket) => {
      logger.info(`🔔 Client connecté: ${socket.id}`);

      // Authentification (optionnel mais recommandé)
      socket.on('authenticate', (token) => {
        // Ici tu peux vérifier le token JWT
        // et stocker userId dans socket.data.userId
        // socket.data.userId = 'user_' + ...;
      });

      socket.on('join-rooms', (rooms: string[]) => {
          rooms.forEach((room) => socket.join(room));
      });

      socket.on('disconnect', () => {
        logger.info(`🔌 Client déconnecté: ${socket.id}`);
      });
    });
    
    return this.io;
  }

  // Envoyer une notification à tous
  broadcast(data: NotificationData) {
    if (this.io) {
      this.io.emit('notification', data);
    }
  }

  // Envoyer une notification à un utilisateur spécifique
  sendToUser(userId: string, data: NotificationData) {
    if (this.io) {
      this.io.to(userId).emit('notification', data);
    }
  }

  // Envoyer une notification à une salle spécifique
  sendToRoom(room: string, data: NotificationData) {
    if (this.io) {
      this.io.to(room).emit('notification', data);
    }
  }
  
  getIO() {
      return this.io;
  }
}

const notificationService = new NotificationService();

// Export as default
export default notificationService;

// Also export initSocket for backward compatibility with index.ts
export const initSocket = (server: Server) => notificationService.init(server);
export const io = notificationService.getIO(); // This might be null initially

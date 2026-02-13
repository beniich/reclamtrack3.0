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

    // Namespace principal pour les notifications
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

    // Namespace /logs pour les logs en temps réel (Enterprise DB)
    this.initLogsNamespace();

    // Namespace /scheduler pour le planning (Enterprise DB)
    this.initSchedulerNamespace();

    return this.io;
  }

  /**
   * Namespace /logs pour les logs de base de données en temps réel
   */
  private initLogsNamespace() {
    if (!this.io) return;

    const logsNamespace = this.io.of('/logs');
    const logTypes = ["INFO", "WARN", "ERROR", "BACKUP"];
    const containers = [
      "SQL",
      "API_GATEWAY",
      "WORKER",
      "WAF",
      "AUTH",
      "REPLICA_1",
      "REPLICA_2",
    ];

    function randomLog() {
      const now = new Date().toISOString().replace("T", " ").split(".")[0];
      const type = logTypes[Math.floor(Math.random() * logTypes.length)];
      const container = containers[Math.floor(Math.random() * containers.length)];

      let message = "";
      switch (type) {
        case "INFO":
          message = "Heartbeat OK – all services healthy.";
          break;
        case "WARN":
          message = "Replication lag > 100 ms on replica-2.";
          break;
        case "ERROR":
          message = "Duplicate key violation on table `complaints`.";
          break;
        case "BACKUP":
          message = "Backup #20240211-01 completed (120 GB).";
          break;
      }

      return {
        timestamp: now,
        type,
        container,
        message,
      };
    }

    logsNamespace.on('connection', (socket) => {
      logger.info(`🔌 Client log socket connected: ${socket.id}`);

      const interval = setInterval(() => {
        socket.emit('log', randomLog());
      }, 2000);

      socket.on('disconnect', () => {
        clearInterval(interval);
        logger.info(`🔌 Client log socket disconnected: ${socket.id}`);
      });
    });
  }

  /**
   * Namespace /scheduler pour la synchronisation du planning en temps réel
   */
  private initSchedulerNamespace() {
    if (!this.io) return;

    const schedulerNamespace = this.io.of('/scheduler');
    const personnel = [
      "Alex Henderson", "Sarah Jenkins", "Marcus Vane", "Dave Miller", "Elena Rodriguez"
    ];
    const statuses = ["online", "break", "offline", "busy"];

    function getRandomStatusUpdate() {
      const person = personnel[Math.floor(Math.random() * personnel.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        type: "PERSONNEL_UPDATE",
        data: { name: person, status }
      };
    }

    function getRandomOrder() {
      const id = Math.floor(1000 + Math.random() * 9000);
      return {
        type: "NEW_ORDER",
        data: {
          id: `#WO-${id}`,
          title: "Emergency Repair",
          priority: "Urgent",
          time: new Date().toISOString()
        }
      };
    }

    schedulerNamespace.on('connection', (socket) => {
      logger.info(`🔌 Client scheduler socket connected: ${socket.id}`);

      // Send initial sync
      socket.emit('scheduler:sync', {
        lastUpdate: new Date().toISOString(),
        activePersonnel: 12,
        pendingOrders: 5
      });

      // Simulate live updates
      const statusInterval = setInterval(() => {
        const update = getRandomStatusUpdate();
        socket.emit('scheduler:update', update);
      }, 5000);

      const orderInterval = setInterval(() => {
        const order = getRandomOrder();
        socket.emit('scheduler:update', order);
      }, 15000);

      // Heartbeat / Sync check
      const syncInterval = setInterval(() => {
        socket.emit('scheduler:sync', {
          lastUpdate: new Date().toISOString(),
          activePersonnel: 10 + Math.floor(Math.random() * 5),
          pendingOrders: 3 + Math.floor(Math.random() * 5)
        });
      }, 30000);

      socket.on('disconnect', () => {
        clearInterval(statusInterval);
        clearInterval(orderInterval);
        clearInterval(syncInterval);
        logger.info(`🔌 Client scheduler socket disconnected: ${socket.id}`);
      });
    });
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


import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Notification } from '../models/Notification.js';
import { logger } from '../utils/logger.js';

export interface NotificationPayload {
  type: 'complaint_assigned' | 'status_update' | 'message' | 'alert';
  title: string;
  message: string;
  data?: any;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
}

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
        origin: process.env.FRONTEND_URL || '*', // Allow all for now or specify frontend URL
        methods: ['GET', 'POST'],
      },
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

      // --- WebRTC Signaling for SRTP Calls ---
      socket.on(
        'call-user',
        (data: { userToCall: string; signalData: any; from: string; fromName: string }) => {
          logger.info(`📞 Call initiated from ${data.from} to ${data.userToCall}`);
          this.io?.to(`user:${data.userToCall}`).emit('call-made', {
            signal: data.signalData,
            from: data.from,
            fromName: data.fromName,
          });
        }
      );

      socket.on('answer-call', (data: { to: string; signal: any }) => {
        logger.info(`📞 Call answered by ${socket.id} for ${data.to}`);
        this.io
          ?.to(`user:${data.to}`)
          .emit('call-answered', { signal: data.signal, from: socket.id });
      });

      socket.on('reject-call', (data: { to: string }) => {
        logger.info(`📞 Call rejected by ${socket.id} for ${data.to}`);
        this.io?.to(`user:${data.to}`).emit('call-rejected', { from: socket.id });
      });

      socket.on('ice-candidate', (data: { to: string; candidate: any }) => {
        this.io
          ?.to(`user:${data.to}`)
          .emit('ice-candidate', { candidate: data.candidate, from: socket.id });
      });
      // ---------------------------------------
    });

    // Namespace /logs pour les logs en temps réel (Enterprise DB)
    this.initLogsNamespace();

    // Namespace /scheduler pour le planning (Enterprise DB)
    this.initSchedulerNamespace();

    // Namespace /security pour la sécurité en temps réel
    this.initSecurityNamespace();

    return this.io;
  }

  /**
   * Namespace /logs pour les logs de base de données en temps réel
   */
  private initLogsNamespace() {
    if (!this.io) return;

    const logsNamespace = this.io.of('/logs');
    const logTypes = ['INFO', 'WARN', 'ERROR', 'BACKUP'];
    const containers = ['SQL', 'API_GATEWAY', 'WORKER', 'WAF', 'AUTH', 'REPLICA_1', 'REPLICA_2'];

    function randomLog() {
      const now = new Date().toISOString().replace('T', ' ').split('.')[0];
      const type = logTypes[Math.floor(Math.random() * logTypes.length)];
      const container = containers[Math.floor(Math.random() * containers.length)];

      let message = '';
      switch (type) {
        case 'INFO':
          message = 'Heartbeat OK – all services healthy.';
          break;
        case 'WARN':
          message = 'Replication lag > 100 ms on replica-2.';
          break;
        case 'ERROR':
          message = 'Duplicate key violation on table `complaints`.';
          break;
        case 'BACKUP':
          message = 'Backup #20240211-01 completed (120 GB).';
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
      'Alex Henderson',
      'Sarah Jenkins',
      'Marcus Vane',
      'Dave Miller',
      'Elena Rodriguez',
    ];
    const statuses = ['online', 'break', 'offline', 'busy'];

    function getRandomStatusUpdate() {
      const person = personnel[Math.floor(Math.random() * personnel.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        type: 'PERSONNEL_UPDATE',
        data: { name: person, status },
      };
    }

    function getRandomOrder() {
      const id = Math.floor(1000 + Math.random() * 9000);
      return {
        type: 'NEW_ORDER',
        data: {
          id: `#WO-${id}`,
          title: 'Emergency Repair',
          priority: 'Urgent',
          time: new Date().toISOString(),
        },
      };
    }

    schedulerNamespace.on('connection', (socket) => {
      logger.info(`🔌 Client scheduler socket connected: ${socket.id}`);

      // Send initial sync
      socket.emit('scheduler:sync', {
        lastUpdate: new Date().toISOString(),
        activePersonnel: 12,
        pendingOrders: 5,
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
          pendingOrders: 3 + Math.floor(Math.random() * 5),
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

  /**
   * Namespace /security pour la sécurité et le monitoring pfSense en temps réel
   */
  private initSecurityNamespace() {
    if (!this.io) return;

    const securityNamespace = this.io.of('/security');

    securityNamespace.on('connection', (socket) => {
      logger.info(`🔒 Client security socket connected: ${socket.id}`);

      // Allow joining specific rooms if needed
      socket.on('join-room', (room: string) => {
        socket.join(room);
        logger.info(`🔒 Client ${socket.id} joined room ${room}`);
      });

      // Simulation of pfSense logs if no real emitter is connected yet
      const logInterval = setInterval(() => {
        const now = new Date();
        const actions = ['pass', 'block', 'reject'];
        const protocols = ['TCP', 'UDP', 'ICMP'];

        socket.emit('firewall:log', {
          timestamp: now,
          interface: 'WAN',
          action: actions[Math.floor(Math.random() * actions.length)],
          protocol: protocols[Math.floor(Math.random() * protocols.length)],
          srcIP: `192.168.1.${Math.floor(Math.random() * 254)}`,
          dstIP: `10.0.0.${Math.floor(Math.random() * 254)}`,
          srcPort: Math.floor(Math.random() * 65535),
          dstPort: [80, 443, 22, 53][Math.floor(Math.random() * 4)],
        });
      }, 3000);

      socket.on('disconnect', () => {
        clearInterval(logInterval);
        logger.info(`🔒 Client security socket disconnected: ${socket.id}`);
      });
    });
  }

  // Envoyer une notification à tous
  async broadcast(data: NotificationData) {
    if (this.io) {
      this.io.emit('notification', data);

      // Persistence for all users? Usually broadcast is for ephemeral alerts.
      // If we want it in the notification center for everyone, we'd need to loop (expensive)
      // or use a different approach. For now, let's keep broadcast ephemeral in DB
      // unless we want to implement a "GlobalNotification" collection.
    }
  }

  // Envoyer une notification à un utilisateur spécifique et persister
  async sendToUser(userId: string, data: any) {
    try {
      // Persist to DB
      const newNotif = await Notification.create({
        userId,
        type: data.type || 'info',
        title: data.title,
        message: data.message,
        data: data.data,
      });

      if (this.io) {
        this.io.to(`user:${userId}`).emit('notification', newNotif);
      }
      return newNotif;
    } catch (err) {
      logger.error(`Error sending notification to user ${userId}:`, err);
    }
  }

  // Envoyer une notification à une salle spécifique (ex: team) et persister pour tous les membres
  // Note: This requires knowing who is in the team. For now, we'll just emit to the room.
  // Real persistence for everyone in a team would need a list of memberIds.
  async sendToRoom(room: string, data: any) {
    if (this.io) {
      this.io.to(room).emit('notification', data);
    }
  }

  getIO() {
    return this.io;
  }

  /**
   * Notify team about new complaint assignment
   */
  async notifyComplaintAssigned(teamId: string, complaint: any, memberIds: string[]) {
    const payload = {
      type: 'complaint_assigned',
      title: 'Nouvelle Réclamation Assignée',
      message: `Une réclamation "${complaint.title}" a été assignée à votre équipe`,
      data: {
        complaintId: complaint._id,
        category: complaint.category,
        priority: complaint.priority,
      },
    };

    // Persist for each member
    if (memberIds && memberIds.length > 0) {
      await Notification.insertMany(
        memberIds.map((userId) => ({
          userId,
          ...payload,
          read: false,
        }))
      );
    }

    if (this.io) {
      this.io.to(`team:${teamId}`).emit('notification', { ...payload, timestamp: new Date() });
      logger.info(`📧 Notification sent and persisted for team ${teamId}`);
    }
  }

  /**
   * Notify about complaint status change
   */
  async notifyStatusChange(
    complaintId: string,
    oldStatus: string,
    newStatus: string,
    userIds: string[]
  ) {
    const payload = {
      type: 'status_update',
      title: 'Statut de Réclamation Mis à Jour',
      message: `Le statut de la réclamation est passé de "${oldStatus}" à "${newStatus}"`,
      data: {
        complaintId,
        oldStatus,
        newStatus,
      },
    };

    // Persist for all users
    if (userIds && userIds.length > 0) {
      await Notification.insertMany(
        userIds.map((userId) => ({
          userId,
          ...payload,
          read: false,
        }))
      );
    }

    if (this.io) {
      userIds.forEach((userId) => {
        this.io?.to(`user:${userId}`).emit('notification', { ...payload, timestamp: new Date() });
      });
      logger.info(`📧 Status change notification sent and persisted for ${userIds.length} users`);
    }
  }

  /**
   * Send urgent alert
   */
  async sendUrgentAlert(message: string, recipientIds?: string[]) {
    const notification = {
      type: 'alert',
      title: '⚠️ Alerte Urgente',
      message,
      priority: 'urgent',
      timestamp: new Date(),
    };

    if (this.io) {
      if (recipientIds && recipientIds.length > 0) {
        recipientIds.forEach((userId) => {
          this.io?.to(`user:${userId}`).emit('notification', notification);
        });
      } else {
        this.io.emit('notification', notification);
      }
      logger.info(`📢 Urgent alert sent: ${message}`);
    }
  }
}

const notificationService = new NotificationService();

// Export as default
export default notificationService;

// Also export initSocket for backward compatibility with index.ts
export const initSocket = (server: Server) => notificationService.init(server);
export const io = notificationService.getIO(); // This might be null initially

import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';
class NotificationService {
    io = null;
    notifications = new Map();
    init(server) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: process.env.FRONTEND_URL || "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        this.io.on('connection', (socket) => {
            console.log('🔔 Nouvelle connexion WebSocket:', socket.id);
            // Authentification utilisateur
            socket.on('authenticate', (userId) => {
                socket.data.userId = userId;
                socket.join(`user_${userId}`);
                // Envoyer les notifications non lues
                const userNotifications = this.notifications.get(userId) || [];
                const unread = userNotifications.filter(n => !n.read);
                socket.emit('unread-notifications', unread);
            });
            // Marquer une notification comme lue
            socket.on('mark-as-read', (notificationId) => {
                const userId = socket.data.userId;
                if (userId) {
                    const userNotifications = this.notifications.get(userId) || [];
                    const notification = userNotifications.find(n => n.id === notificationId);
                    if (notification) {
                        notification.read = true;
                    }
                }
            });
            socket.on('disconnect', () => {
                console.log('🔌 Déconnexion WebSocket:', socket.id);
            });
        });
    }
    // Envoyer une notification à tous les utilisateurs
    broadcast(data) {
        const notification = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            read: false,
            timestamp: new Date()
        };
        if (this.io) {
            this.io.emit('notification', notification);
        }
    }
    // Envoyer une notification à un utilisateur spécifique
    sendToUser(userId, data) {
        const notification = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            read: false,
            timestamp: new Date()
        };
        // Stocker la notification pour l'utilisateur
        if (!this.notifications.has(userId)) {
            this.notifications.set(userId, []);
        }
        this.notifications.get(userId)?.push(notification);
        // Envoyer via WebSocket
        if (this.io) {
            this.io.to(`user_${userId}`).emit('notification', notification);
        }
    }
    // Envoyer une notification à un groupe
    sendToGroup(group, data) {
        const notification = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            read: false,
            timestamp: new Date()
        };
        if (this.io) {
            this.io.to(group).emit('notification', notification);
        }
    }
    // Obtenir les notifications d'un utilisateur
    getUserNotifications(userId) {
        return this.notifications.get(userId) || [];
    }
}
export default new NotificationService();
//# sourceMappingURL=index.js.map
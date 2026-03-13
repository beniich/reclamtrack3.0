import { Server } from 'http';
export interface NotificationData {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    userId?: string;
    read: boolean;
}
declare class NotificationService {
    private io;
    private notifications;
    init(server: Server): void;
    broadcast(data: Omit<NotificationData, 'id' | 'read' | 'timestamp'>): void;
    sendToUser(userId: string, data: Omit<NotificationData, 'id' | 'read' | 'timestamp'>): void;
    sendToGroup(group: string, data: Omit<NotificationData, 'id' | 'read' | 'timestamp'>): void;
    getUserNotifications(userId: string): NotificationData[];
}
declare const _default: NotificationService;
export default _default;
//# sourceMappingURL=index.d.ts.map
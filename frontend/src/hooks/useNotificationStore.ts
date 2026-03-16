import { notificationApi } from '@/lib/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
    id: string;
    type: 'complaint_assigned' | 'status_update' | 'alert' | 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    timestamp: string; // ISO string for storage
    read: boolean;
    data?: any;
}

interface NotificationStore {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    fetchNotifications: () => Promise<void>;
    addNotification: (n: Notification) => void;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    clearAll: () => void;
    removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>()(
    persist(
        (set, get) => ({
            notifications: [],
            unreadCount: 0,

            isLoading: false,

            fetchNotifications: async () => {
                set({ isLoading: true });
                try {
                    const response = await notificationApi.getAll();
                    const notifications = response?.data?.notifications ?? [];
                    set({
                        notifications: notifications.map((n: any) => ({
                            id: n._id,
                            type: n.type,
                            title: n.title,
                            message: n.message,
                            timestamp: n.createdAt,
                            read: n.read,
                            data: n.data
                        })),
                        unreadCount: response?.data?.unreadCount ?? 0
                    });
                } catch (error) {
                    console.error('Failed to fetch notifications:', error);
                    set({ notifications: [], unreadCount: 0 });
                } finally {
                    set({ isLoading: false });
                }
            },

            addNotification: (notification) => {
                set((state) => ({
                    notifications: [notification, ...state.notifications],
                    unreadCount: state.unreadCount + 1
                }));
            },

            markAsRead: async (id) => {
                try {
                    await notificationApi.markAsRead(id);
                    set((state) => ({
                        notifications: state.notifications.map(n =>
                            n.id === id ? { ...n, read: true } : n
                        ),
                        unreadCount: Math.max(0, state.unreadCount - 1)
                    }));
                } catch (error) {
                    console.error('Failed to mark notification as read:', error);
                }
            },

            markAllAsRead: async () => {
                try {
                    await notificationApi.markAllRead();
                    set((state) => ({
                        notifications: state.notifications.map(n => ({ ...n, read: true })),
                        unreadCount: 0
                    }));
                } catch (error) {
                    console.error('Failed to mark all as read:', error);
                }
            },

            clearAll: () => set({ notifications: [], unreadCount: 0 }),

            removeNotification: (id) => {
                const state = get();
                const notification = state.notifications.find(n => n.id === id);
                const wasUnread = notification && !notification.read;

                set((state) => ({
                    notifications: state.notifications.filter(n => n.id !== id),
                    unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount
                }));
            },
        }),
        { name: 'notification-storage' }
    )
);

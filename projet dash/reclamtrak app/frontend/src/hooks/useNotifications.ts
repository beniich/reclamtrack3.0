import socketService from '@/lib/socket';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNotificationStore } from './useNotificationStore';

interface NotificationData {
    type: 'info' | 'success' | 'warning' | 'error' | 'complaint_assigned' | 'status_update' | 'alert';
    title: string;
    message: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    timestamp: string; // Changed to string to match store
    data?: any;
}

const useNotifications = () => {
    const { addNotification, fetchNotifications } = useNotificationStore();

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    useEffect(() => {
        const socket = socketService.connect();

        const handleNotification = (data: NotificationData) => {
            const { type, title, message, priority } = data;

            // Add to store
            addNotification({
                id: (data as any)._id || (data as any).id || Date.now().toString(),
                type,
                title,
                message,
                priority,
                timestamp: (data as any).createdAt || new Date().toISOString(),
                read: false,
                data: data.data
            });

            const toastOptions = {
                duration: 5000,
                position: 'top-right' as const,
            };

            // Map priority/type to toast style
            if (priority === 'urgent' || type === 'alert') {
                toast.error(`${title}: ${message}`, { ...toastOptions, icon: '🚨' });
                return;
            }

            switch (type) {
                case 'success':
                case 'status_update': // Often success or info
                    toast.success(`${title}: ${message}`, toastOptions);
                    break;
                case 'error':
                    toast.error(`${title}: ${message}`, toastOptions);
                    break;
                case 'warning':
                    toast.success(`${title}: ${message}`, { ...toastOptions, icon: '⚠️' });
                    break;
                case 'complaint_assigned':
                    toast(`${title}: ${message}`, { ...toastOptions, icon: '📋' });
                    break;
                default:
                    toast(`${title}: ${message}`, { ...toastOptions, icon: 'ℹ️' });
            }
        };

        socket.on('notification', handleNotification);

        return () => {
            socket.off('notification', handleNotification);
        };
    }, [addNotification]);
};

export default useNotifications;

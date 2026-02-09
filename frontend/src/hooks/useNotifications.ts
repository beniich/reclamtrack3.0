import { useEffect } from 'react';
import socketService from '@/lib/socket';
import toast from 'react-hot-toast';

interface NotificationData {
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
}

const useNotifications = () => {
    useEffect(() => {
        const socket = socketService.connect();

        const handleNotification = (data: NotificationData) => {
            const { type, title, message } = data;

            const toastOptions = {
                duration: 5000,
                position: 'top-right' as const,
            };

            switch (type) {
                case 'success':
                    toast.success(`${title}: ${message}`, toastOptions);
                    break;
                case 'error':
                    toast.error(`${title}: ${message}`, toastOptions);
                    break;
                case 'warning':
                    toast.success(`${title}: ${message}`, { ...toastOptions, icon: '⚠️' }); // toast.warn might not exist in all versions, using success with icon or custom
                    break;
                default:
                    toast(`${title}: ${message}`, { ...toastOptions, icon: 'ℹ️' });
            }
        };

        socket.on('notification', handleNotification);

        return () => {
            socket.off('notification', handleNotification);
        };
    }, []);
};

export default useNotifications;

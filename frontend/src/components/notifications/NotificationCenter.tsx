'use client';

import { useState, useRef, useEffect } from 'react';
import { useNotificationStore, Notification } from '@/hooks/useNotificationStore';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, X } from 'lucide-react';

export function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, removeNotification } = useNotificationStore();
    const panelRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const getIcon = (type: Notification['type'], priority: Notification['priority']) => {
        if (priority === 'urgent') return '🚨';

        switch (type) {
            case 'complaint_assigned': return '📋';
            case 'status_update': return '🔄';
            case 'alert': return '⚠️';
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    };

    return (
        <div className="relative" ref={panelRef}>
            {/* Badge déclencheur */}
            <button type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-primary/8 dark:hover:bg-violet-500/15 transition-colors"
                aria-label="Notifications"
            >
                <Bell className="text-slate-600 dark:text-slate-300" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Panneau slide-out */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-background shadow-xl rounded-xl border border-slate-200 dark:border-border-dark z-50 overflow-hidden"
                    >
                        <div className="p-4 border-b border-slate-100 dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-background/50 backdrop-blur-sm">
                            <h2 className="font-bold text-slate-900 dark:text-slate-100">Notifications</h2>
                            <div className="flex gap-2">
                                {unreadCount > 0 && (
                                    <button type="button"
                                        onClick={() => markAllAsRead()}
                                        className="text-xs text-primary font-medium hover:underline"
                                    >
                                        Tout marquer lu
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
                                    <span className="material-symbols-outlined text-4xl opacity-50">notifications_off</span>
                                    <p className="text-sm">Aucune notification</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 hover:bg-primary/5 dark:hover:bg-violet-500/10 transition-colors relative group ${!notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex gap-3">
                                                <div className="text-2xl pt-1">
                                                    {getIcon(notification.type, notification.priority)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h3 className={`text-sm font-semibold truncate ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                                            {notification.title}
                                                        </h3>
                                                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                                            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true, locale: fr })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                            </div>

                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeNotification(notification.id);
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0"
                                                title="Supprimer"
                                            >
                                                <X className="text-lg" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="p-2 border-t border-slate-100 dark:border-border-dark bg-slate-50 dark:bg-background">
                                <button type="button"
                                    onClick={() => clearAll()}
                                    className="w-full py-2 text-xs text-slate-500 hover:text-red-600 font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">delete_sweep</span>
                                    Effacer l&apos;historique
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

import { ReactNode } from 'react';

type Status = 'new' | 'in-progress' | 'resolved' | 'urgent' | 'pending' | 'nouvelle' | 'en cours' | 'résolue' | 'fermée';

interface StatusBadgeProps {
    status: Status | string;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
}

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
    new: {
        label: 'New',
        color: 'bg-primary/10 text-primary border-primary/20',
        icon: '●',
    },
    'in-progress': {
        label: 'In Progress',
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        icon: '◐',
    },
    resolved: {
        label: 'Resolved',
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        icon: '✓',
    },
    urgent: {
        label: 'Urgent',
        color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
        icon: '!',
    },
    pending: {
        label: 'Pending',
        color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        icon: '⏱️',
    },
    nouvelle: {
        label: 'Nouvelle',
        color: 'bg-primary/10 text-primary border-primary/20',
        icon: '●',
    },
    'en cours': {
        label: 'En Cours',
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        icon: '◐',
    },
    résolue: {
        label: 'Résolue',
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        icon: '✓',
    },
    fermée: {
        label: 'Fermée',
        color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        icon: '✓',
    },
};

export function StatusBadge({ status, size = 'md', showIcon = false }: StatusBadgeProps) {
    const normalizeStatus = status.toLowerCase().replace('_', '-');
    const config = statusConfig[normalizeStatus] || {
        label: status,
        color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        icon: '?',
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
    };

    return (
        <span
            className={`${config.color} ${sizeClasses[size]} font-black uppercase rounded border inline-flex items-center gap-1.5`}
        >
            {showIcon && <span>{config.icon}</span>}
            {config.label}
        </span>
    );
}

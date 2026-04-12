'use client';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import {
    BarChart3,
    Briefcase,
    Calendar,
    FileText,
    HelpCircle,
    LayoutDashboard,
    Map,
    Package,
    Plane,
    Settings,
    Users,
    AlertTriangle,
    Wrench,
    Truck,
    ClipboardList,
    MessageSquare,
    ShieldCheck,
    ChevronRight,
    Shapes,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

// Type definitions
interface MenuItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
}

interface MenuGroup {
    title: string;
    items: MenuItem[];
}

export function Sidebar() {
    const t = useTranslations('Sidebar');
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const menuGroups: MenuGroup[] = useMemo(() => [
        {
            title: t('main'),
            items: [
                { label: t('dashboard'),     href: '/dashboard',          icon: LayoutDashboard },
                { label: t('complaints'),    href: '/complaints',         icon: FileText,   badge: 'live', badgeColor: 'bg-cyan-500' },
                { label: t('ecosystem'),     href: '/ecosystem',          icon: Shapes,     badge: 'Alpha', badgeColor: 'bg-purple-500' },
                { label: t('map'),           href: '/map',                icon: Map },
                { label: t('analytics'),     href: '/analytics',          icon: BarChart3 },
            ],
        },
        {
            title: t('ops'),
            items: [
                { label: t('teams'),       href: '/teams',              icon: Users },
                { label: t('planning'),    href: '/planning',           icon: Calendar },
                { label: t('roster'),      href: '/roster',             icon: ClipboardList },
                { label: t('fleet'),       href: '/fleet',              icon: Truck },
                { label: t('inventory'),   href: '/inventory',          icon: Package },
            ],
        },
        {
            title: t('hr'),
            items: [
                { label: t('staff'),       href: '/staff',              icon: Briefcase },
                { label: t('leave'),       href: '/staff/leave',        icon: Plane },
                { label: t('technicians'), href: '/technician',         icon: Wrench },
                { label: t('messages'),    href: '/messages',           icon: MessageSquare },
            ],
        },
        {
            title: t('admin'),
            items: [
                { label: t('auditLogs'),    href: '/audit-logs',         icon: ShieldCheck },
                { label: t('satisfaction'), href: '/feedback/satisfaction', icon: AlertTriangle },
                { label: t('settings'),     href: '/settings',           icon: Settings },
            ],
        },
    ], [t]);

    const isActive = (href: string) => {
        // Remove locale prefix for comparison
        const clean = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
        return clean === href || clean.startsWith(href + '/');
    };

    return (
        <aside
            className={cn(
                'relative flex flex-col h-[calc(100vh-6rem)] sticky top-4 my-4 ml-4 hidden lg:flex transition-all duration-500 ease-in-out z-30',
                'bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-slate-200 dark:border-orange-500/10 shadow-xl shadow-slate-200/50 dark:shadow-orange-500/5 rounded-[2.5rem] overflow-hidden group/sidebar',
                collapsed ? 'w-[80px]' : 'w-72'
            )}
        >
            {/* Ambient glows for the premium look */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />


            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed((c) => !c)}
                className={cn(
                    'absolute -right-3 top-6 z-50 w-6 h-6 rounded-full border border-slate-200 dark:border-orange-500/20 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-600 dark:hover:text-orange-400 hover:border-indigo-300 dark:hover:border-orange-500/30 transition-all shadow-md',
                )}
            >
                <ChevronRight className={cn('w-3 h-3 transition-transform duration-300', collapsed ? '' : 'rotate-180')} />
            </button>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                {menuGroups.map((group) => (
                    <div key={group.title} className="mb-2">
                        {/* Group Label */}
                        {!collapsed && (
                            <p className="px-4 pt-3 pb-1 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] select-none">
                                {group.title}
                            </p>
                        )}
                        {collapsed && <div className="mx-3 my-2 h-px bg-slate-100 dark:bg-slate-800" />}

                        {group.items.map((item) => {
                            const active = isActive(item.href);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    title={collapsed ? item.label : undefined}
                                    className={cn(
                                        'relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all duration-200 group/item select-none',
                                        active
                                            ? 'bg-slate-100 dark:bg-orange-500/10 text-slate-900 dark:text-orange-400 shadow-sm'
                                            : 'text-slate-500 group-hover/item:text-slate-900 dark:group-hover/item:text-orange-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    )}
                                >
                                    {/* Active left bar glow */}
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.3)]" />
                                    )}

                                    <span
                                        className={cn(
                                            'flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300',
                                            active
                                                ? 'bg-purple-500/20 dark:bg-orange-500/20 text-purple-600 dark:text-orange-400 ring-1 ring-purple-500/30'
                                                : 'text-slate-500 group-hover/item:text-purple-600 dark:group-hover/item:text-orange-400 group-hover/item:bg-purple-500/10'
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </span>

                                    {/* Label */}
                                    {!collapsed && (
                                        <span className={cn(
                                            'text-sm font-semibold whitespace-nowrap truncate transition-all duration-200',
                                            active ? 'text-slate-900 dark:text-white' : 'text-slate-500 group-hover/item:text-slate-900 dark:group-hover/item:text-white'
                                        )}>
                                            {item.label}
                                        </span>
                                    )}

                                    {/* Badge */}
                                    {item.badge && (
                                        <span className={cn(
                                            'ml-auto flex-shrink-0 px-1.5 py-0.5 rounded-md text-[9px] font-black text-white uppercase tracking-widest',
                                            item.badgeColor ?? 'bg-indigo-500',
                                            collapsed ? 'absolute top-1 right-1 px-1' : ''
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className={cn('shrink-0 border-t border-white/[0.06] p-3 space-y-1')}>
                {/* Theme Toggle in Sidebar */}
                <div className="flex justify-center py-2">
                    <ThemeToggle />
                </div>

                {/* System status */}
                <div className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                    !collapsed && 'bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800'
                )}>
                    <span className="relative flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                        <span className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-40" />
                    </span>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('system')}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full w-[94%] bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-orange-500 dark:to-orange-400 rounded-full" />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">94%</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Help */}
                <Link
                    href="/settings"
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] transition-all group/item',
                    )}
                >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg group-hover/item:bg-white/5 transition-all">
                        <HelpCircle className="w-4 h-4" />
                    </span>
                    {!collapsed && <span className="text-sm font-semibold">{t('help') || 'Help'}</span>}
                </Link>
            </div>
        </aside>
    );
}

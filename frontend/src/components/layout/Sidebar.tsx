'use client';

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
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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

const menuGroups: MenuGroup[] = [
    {
        title: 'Principal',
        items: [
            { label: 'Dashboard',     href: '/dashboard',          icon: LayoutDashboard },
            { label: 'Réclamations',  href: '/complaints',         icon: FileText,   badge: 'live', badgeColor: 'bg-cyan-500' },
            { label: 'Carte',         href: '/map',                icon: Map },
            { label: 'Analyses',      href: '/analytics',          icon: BarChart3 },
        ],
    },
    {
        title: 'Opérations',
        items: [
            { label: 'Équipes',       href: '/teams',              icon: Users },
            { label: 'Planning',      href: '/planning',           icon: Calendar },
            { label: 'Roster',        href: '/roster',             icon: ClipboardList },
            { label: 'Flotte',        href: '/fleet',              icon: Truck },
            { label: 'Inventaire',    href: '/inventory',          icon: Package },
        ],
    },
    {
        title: 'RH & Support',
        items: [
            { label: 'Personnel',     href: '/staff',              icon: Briefcase },
            { label: 'Congés',        href: '/staff/leave',        icon: Plane },
            { label: 'Techniciens',   href: '/technician',         icon: Wrench },
            { label: 'Messages',      href: '/messages',           icon: MessageSquare },
        ],
    },
    {
        title: 'Administration',
        items: [
            { label: 'Audit Logs',    href: '/audit-logs',         icon: ShieldCheck },
            { label: 'Satisfaction',  href: '/feedback/satisfaction', icon: AlertTriangle },
            { label: 'Paramètres',    href: '/settings',           icon: Settings },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (href: string) => {
        // Remove locale prefix for comparison
        const clean = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
        return clean === href || clean.startsWith(href + '/');
    };

    return (
        <aside
            className={cn(
                'relative flex flex-col h-[calc(100vh-4rem)] sticky top-0 hidden lg:flex transition-all duration-300 ease-in-out z-30',
                'bg-[#0d1b2e]/95 backdrop-blur-xl border-r border-white/[0.06]',
                collapsed ? 'w-[68px]' : 'w-64'
            )}
            style={{
                background: 'linear-gradient(180deg, #0a1628 0%, #0d1b2e 50%, #0a1525 100%)',
                boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
            }}
        >
            {/* Ambient glow top */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-indigo-600/8 to-transparent pointer-events-none" />
            <div className="absolute top-8 left-8 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed((c) => !c)}
                className={cn(
                    'absolute -right-3 top-6 z-50 w-6 h-6 rounded-full border border-white/10 bg-[#0d1b2e] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-lg',
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
                            <p className="px-4 pt-3 pb-1 text-[9px] font-black text-white/20 uppercase tracking-[0.25em] select-none">
                                {group.title}
                            </p>
                        )}
                        {collapsed && <div className="mx-3 my-2 h-px bg-white/[0.06]" />}

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
                                            ? 'bg-white/[0.08] text-white shadow-lg'
                                            : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                                    )}
                                >
                                    {/* Active left bar */}
                                    {active && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-full shadow-[0_0_8px_2px_rgba(129,140,248,0.5)]" />
                                    )}

                                    {/* Icon container */}
                                    <span
                                        className={cn(
                                            'flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200',
                                            active
                                                ? 'bg-indigo-500/20 text-indigo-300'
                                                : 'text-slate-500 group-hover/item:text-slate-300 group-hover/item:bg-white/5'
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </span>

                                    {/* Label */}
                                    {!collapsed && (
                                        <span className={cn(
                                            'text-sm font-semibold whitespace-nowrap truncate transition-all duration-200',
                                            active ? 'text-white' : 'text-slate-400 group-hover/item:text-slate-200'
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
                {/* System status */}
                <div className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                    !collapsed && 'bg-white/[0.03] border border-white/[0.05]'
                )}>
                    <span className="relative flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 block" />
                        <span className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-60" />
                    </span>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Système</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[94%] bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
                                </div>
                                <span className="text-[10px] font-black text-white/40">94%</span>
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
                    {!collapsed && <span className="text-sm font-semibold">Aide</span>}
                </Link>
            </div>
        </aside>
    );
}

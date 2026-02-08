
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    FileText,
    Users,
    Calendar,
    Map,
    Package,
    Settings,
    BarChart3,
    HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
}

const menuItems: MenuItem[] = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Complaints',
        href: '/complaints',
        icon: FileText,
        badge: '12',
    },
    {
        label: 'Teams',
        href: '/teams',
        icon: Users,
    },
    {
        label: 'Planning',
        href: '/planning',
        icon: Calendar,
    },
    {
        label: 'Maps',
        href: '/maps',
        icon: Map,
    },
    {
        label: 'Inventory',
        href: '/inventory',
        icon: Package,
    },
    {
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 flex flex-col h-[calc(100vh-4rem)] sticky top-16 hidden lg:flex">
            <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500 group-hover:text-gray-900")} />
                                <span>{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* System Status Footer */}
            <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
                <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        System Status
                    </p>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Response Rate</span>
                        <span className="font-bold text-primary">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[94%]" />
                    </div>
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                </button>
            </div>
        </aside>
    );
}

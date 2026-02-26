'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FleetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Fleet Overview', href: '/fleet', icon: 'dashboard' },
        { label: 'Complaints Log', href: '/fleet/complaints', icon: 'error' },
        { label: 'Interventions', href: '/fleet/interventions', icon: 'build' },
        { label: 'Fleet Map', href: '/fleet/map', icon: 'map' },
    ];

    const isPathActive = (href: string) => {
        if (href === '/fleet') {
            return pathname.endsWith('/fleet');
        }
        return pathname.includes(href);
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Side Navigation */}
            <aside className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#111122] border-r border-slate-200 dark:border-slate-800">
                <div className="p-6 flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Fleet Manager</h1>
                        <p className="text-[10px] text-slate-500 dark:text-[#9292c8] uppercase tracking-wider font-semibold">Operations</p>
                    </div>
                </div>
                <nav className="flex-1 px-3 space-y-1">
                    {navItems.map((item) => {
                        const active = isPathActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                    active
                                        ? 'bg-[#242447] text-white border-l-4 border-primary'
                                        : 'hover:bg-slate-100 dark:hover:bg-[#242447] text-slate-600 dark:text-[#9292c8]'
                                }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-4 pb-2 px-3">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">System</p>
                    </div>
                    <Link
                        href="/fleet/settings"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isPathActive('/fleet/settings')
                                ? 'bg-[#242447] text-white border-l-4 border-primary'
                                : 'hover:bg-slate-100 dark:hover:bg-[#242447] text-slate-600 dark:text-[#9292c8]'
                        }`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <Link
                        href="/fleet/interventions"
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">event_repeat</span>
                        Schedule Maintenance
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

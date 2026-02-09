'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col p-4 space-y-2 hidden lg:flex">
            <nav className="flex-1 space-y-1">
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/dashboard')
                            ? 'bg-primary text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    style={isActive('/dashboard') ? { backgroundColor: '#2424eb' } : {}}
                >
                    <span className="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </Link>
                <Link
                    href="/complaints/new"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/complaints/new')
                            ? 'bg-primary text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    style={isActive('/complaints/new') ? { backgroundColor: '#2424eb' } : {}}
                >
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>New Complaint</span>
                </Link>
                <Link
                    href="/complaints/list"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/complaints/list')
                            ? 'bg-primary text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    style={isActive('/complaints/list') ? { backgroundColor: '#2424eb' } : {}}
                >
                    <span className="material-symbols-outlined">format_list_bulleted</span>
                    <span>Complaints List</span>
                </Link>
                <Link
                    href="/teams"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/teams')
                            ? 'bg-primary text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    style={isActive('/teams') ? { backgroundColor: '#2424eb' } : {}}
                >
                    <span className="material-symbols-outlined">groups</span>
                    <span>Teams</span>
                </Link>
                <Link
                    href="/planning"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/planning')
                            ? 'bg-primary text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    style={isActive('/planning') ? { backgroundColor: '#2424eb' } : {}}
                >
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>Planning</span>
                </Link>
            </nav>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">System Status</p>
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Response Rate</span>
                    <span className="font-bold" style={{ color: '#2424eb' }}>94%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full w-[94%]" style={{ backgroundColor: '#2424eb' }}></div>
                </div>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <button className="w-full py-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">emergency_share</span>
                    Emergency Hotline
                </button>
            </div>
        </aside>
    );
}

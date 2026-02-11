'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Types
type LogAction = 'CREATED' | 'UPDATED' | 'DELETED' | 'LOGIN' | 'EXPORT' | 'STATUS_CHANGE';
type LogSeverity = 'info' | 'warning' | 'critical' | 'success';

interface AuditLog {
    id: string;
    user: {
        name: string;
        id: string;
        avatar: string;
    };
    action: LogAction;
    target: string;
    details: string;
    timestamp: Date;
    severity: LogSeverity;
}

// Mock Data
const mockLogs: AuditLog[] = [
    {
        id: 'LOG-001',
        user: { name: 'Operator A', id: 'OP-112', avatar: 'https://ui-avatars.com/api/?name=Operator+A&background=0ea5e9&color=fff' },
        action: 'CREATED',
        target: 'REC-005',
        details: 'Initial intervention record for district #04',
        timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
        severity: 'success'
    },
    {
        id: 'LOG-002',
        user: { name: 'Sarah Admin', id: 'AD-002', avatar: 'https://ui-avatars.com/api/?name=Sarah+Admin&background=2424eb&color=fff' },
        action: 'STATUS_CHANGE',
        target: 'REC-002',
        details: 'Changed status from Open to Resolved',
        timestamp: new Date(Date.now() - 1000 * 60 * 14), // 14 mins ago
        severity: 'info'
    },
    {
        id: 'LOG-003',
        user: { name: 'System', id: 'SYS-AUTO', avatar: 'https://ui-avatars.com/api/?name=System&background=ef4444&color=fff' },
        action: 'DELETED',
        target: 'REC-089',
        details: 'Duplicate record purged by integrity check',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
        severity: 'critical'
    },
    {
        id: 'LOG-004',
        user: { name: 'Mike Field', id: 'OP-105', avatar: 'https://ui-avatars.com/api/?name=Mike+Field&background=f59e0b&color=fff' },
        action: 'UPDATED',
        target: 'REC-012',
        details: 'Updated site inspection notes',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        severity: 'warning'
    },
    {
        id: 'LOG-005',
        user: { name: 'Sarah Admin', id: 'AD-002', avatar: 'https://ui-avatars.com/api/?name=Sarah+Admin&background=2424eb&color=fff' },
        action: 'EXPORT',
        target: 'REP-2023-Q3',
        details: 'Exported quarterly report to PDF',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        severity: 'info'
    }
];

export default function AuditPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAction, setFilterAction] = useState<LogAction | 'ALL'>('ALL');

    const filteredLogs = useMemo(() => {
        return mockLogs.filter(log => {
            const matchesSearch = log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.details.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesAction = filterAction === 'ALL' || log.action === filterAction;
            return matchesSearch && matchesAction;
        });
    }, [searchQuery, filterAction]);

    const getSeverityStyles = (severity: LogSeverity) => {
        switch (severity) {
            case 'info': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'success': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'warning': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        }
    };

    const formatTime = (date: Date) => {
        return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
            -Math.round((Date.now() - date.getTime()) / (1000 * 60)),
            'minute'
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">shield_person</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">AuditGuard</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Dashboard</Link>
                        <Link href="/complaints/list" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Complaints</Link>
                        <Link href="/audit" className="text-primary text-sm font-bold border-b-2 border-primary pb-1">Audit Logs</Link>
                        <Link href="/users" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Users</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 items-center gap-2 border border-transparent focus-within:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                        <input
                            type="text"
                            placeholder="Quick search..."
                            className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400 p-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=2424eb&color=fff" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            <main className="flex flex-col flex-1 max-w-[1280px] mx-auto w-full px-6 py-8">
                {/* Hero */}
                <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Audit Logs & Activity Feed</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">Comprehensive trail of all system interventions and record modifications for full transparency.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-lg">sync</span>
                            <span>Live Feed</span>
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all">
                            <span className="material-symbols-outlined text-lg">download</span>
                            <span>Export CSV</span>
                        </button>
                    </div>
                </div>

                {/* Stats Ribbon */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">list_alt</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Logs Today</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">1,284</span>
                            <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[10px] font-black">arrow_upward</span>12%
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                                <span className="material-symbols-outlined">priority_high</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Critical Alerts</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">12</span>
                            <span className="text-red-500 text-xs font-bold bg-red-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[10px] font-black">arrow_upward</span>5%
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <span className="material-symbols-outlined">person_check</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Operators</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">45</span>
                            <span className="text-slate-400 text-xs font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[10px] font-black">trending_flat</span>0%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 shadow-sm">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex-1 min-w-[280px]">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">manage_search</span>
                                <input
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                    placeholder="Search Record ID (e.g., REC-005)..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <select
                                value={filterAction}
                                onChange={(e) => setFilterAction(e.target.value as LogAction | 'ALL')}
                                className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-medium border-none focus:ring-primary cursor-pointer"
                            >
                                <option value="ALL">All Actions</option>
                                <option value="CREATED">Created</option>
                                <option value="UPDATED">Updated</option>
                                <option value="DELETED">Deleted</option>
                                <option value="STATUS_CHANGE">Status Change</option>
                            </select>
                            <button className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-medium hover:bg-slate-200 transition-colors text-primary">
                                <span>Last 24 Hours</span>
                                <span className="material-symbols-outlined text-lg">calendar_month</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Log Feed */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Target Record</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                                    <tr key={log.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group ${log.severity === 'critical' ? 'bg-red-50/50 dark:bg-red-900/10 border-l-4 border-l-red-500' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                                                    <img src={log.user.avatar} alt={log.user.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{log.user.name}</span>
                                                    <span className="text-xs text-slate-400">ID: {log.user.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${getSeverityStyles(log.severity)}`}>
                                                {log.action.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href="#" className="text-sm font-bold text-primary hover:underline">{log.target}</Link>
                                        </td>
                                        <td className={`px-6 py-4 text-sm ${log.severity === 'critical' ? 'font-medium text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {log.details}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-700 dark:text-slate-300">{formatTime(log.timestamp)}</span>
                                                <span className="text-[10px] text-slate-400 uppercase">{log.timestamp.toLocaleTimeString()}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                            No logs found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">data_exploration</span>
                            Action Trend (Last 24h)
                        </h3>
                        <div className="h-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-end justify-between px-6 pb-6 pt-10">
                            {/* Simple CSS Bar Chart Simulation */}
                            {[30, 50, 40, 80, 60, 45, 65].map((height, i) => (
                                <div key={i} className="w-8 bg-primary rounded-t-sm relative group" style={{ height: `${height}%`, opacity: 0.2 + (i * 0.1) }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {height * 2}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500">verified_user</span>
                            Security Insights
                        </h3>
                        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Average Session Time</span>
                                <span className="font-bold text-slate-900 dark:text-white">42m 15s</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-primary h-full w-[65%]"></div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Unusual Login attempts</span>
                                <span className="font-bold text-amber-500">0 today</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                All system services are operating normally. Audit trails are syncing in real-time.
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}


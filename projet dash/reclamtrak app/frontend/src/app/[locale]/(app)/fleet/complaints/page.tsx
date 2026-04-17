'use client';

import { AlertCircle, CheckCircle2, Clock, Filter, Plus, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Complaint {
    _id: string;
    number?: string;
    title: string;
    category: string;
    priority: string;
    status: string;
    createdAt: string;
    vehicle?: string;
}

const priorityConfig: Record<string, string> = {
    haute: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    haute_priorite: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    moyenne: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    normale: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    basse: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

const statusIcon = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'resolue' || s === 'resolved' || s === 'cloturee') {
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    }
    if (s === 'en_cours' || s === 'in_progress' || s === 'in progress') {
        return <Clock className="w-4 h-4 text-primary animate-pulse" />;
    }
    return <AlertCircle className="w-4 h-4 text-amber-500" />;
};

const statusLabel: Record<string, string> = {
    nouvelle: 'New',
    en_cours: 'In Progress',
    resolue: 'Resolved',
    cloturee: 'Closed',
    pending: 'Pending',
    in_progress: 'In Progress',
    resolved: 'Resolved',
};

export default function FleetComplaintsPage() {
    const [allComplaints, setAllComplaints] = useState<Complaint[]>([]);
    const [filtered, setFiltered] = useState<Complaint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    useEffect(() => {
        const fetchComplaints = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('auth_token');
                const orgId = localStorage.getItem('active_organization_id');
                if (!orgId) return;

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/complaints?limit=50`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-organization-id': orgId,
                    }
                });
                const json = await res.json();
                const data = json?.data || json?.complaints || [];
                setAllComplaints(data);
                setFiltered(data);
            } catch (err) {
                console.error('Failed to load complaints:', err);
                // Fallback to demo data
                const demo: Complaint[] = [
                    { _id: '1', number: 'CMP-001', title: 'Engine Overheating', category: 'mechanical', priority: 'high', status: 'en_cours', createdAt: '2024-02-24', vehicle: 'TX-7742-G' },
                    { _id: '2', number: 'CMP-002', title: 'Brake Noise on Emergency Stop', category: 'mechanical', priority: 'medium', status: 'nouvelle', createdAt: '2024-02-23', vehicle: 'BC-9011-Z' },
                    { _id: '3', number: 'CMP-003', title: 'AC not cooling during heatwave', category: 'electrical', priority: 'low', status: 'resolue', createdAt: '2024-02-22', vehicle: 'NY-5520-X' },
                    { _id: '4', number: 'CMP-004', title: 'Tire Pressure Low after route 7', category: 'maintenance', priority: 'medium', status: 'resolue', createdAt: '2024-02-21', vehicle: 'LA-1129-K' },
                ];
                setAllComplaints(demo);
                setFiltered(demo);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    // Live search filter
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFiltered(allComplaints);
            return;
        }
        const q = searchQuery.toLowerCase();
        setFiltered(allComplaints.filter(c =>
            c.number?.toLowerCase().includes(q) ||
            c.title?.toLowerCase().includes(q) ||
            c.vehicle?.toLowerCase().includes(q) ||
            c.category?.toLowerCase().includes(q)
        ));
    }, [searchQuery, allComplaints]);

    const handleResolve = (id: string) => {
        setAllComplaints(prev => prev.map(c => c._id === id ? { ...c, status: 'resolue' } : c));
        setOpenMenuId(null);
    };

    const handleDelete = (id: string) => {
        if (!confirm('Delete this complaint?')) return;
        setAllComplaints(prev => prev.filter(c => c._id !== id));
        setOpenMenuId(null);
    };

    return (
        <div className="p-8 space-y-8" ref={menuRef}>
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Complaints Log</h2>
                    <p className="text-sm text-slate-500 font-medium">Manage and track vehicle-related issues reported by drivers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4" />
                        New Complaint
                    </button>
                </div>
            </header>

            <div className="bg-white dark:bg-[#1c1c30] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#242447]/20">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                            placeholder="Search by ID, vehicle plate, or issue..."
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-[#242447]/50 text-slate-500 dark:text-[#9292c8] text-[11px] font-bold uppercase tracking-wider">
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Complaint ID</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Vehicle</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Issue Description</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Priority</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Status</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Date</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <tr key={i}>
                                    {Array(7).fill(0).map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-16 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-3">
                                        <AlertCircle className="w-12 h-12 opacity-20" />
                                        <p className="text-sm font-medium">
                                            {searchQuery ? `No complaints found for "${searchQuery}"` : 'No complaints yet.'}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : filtered.map(item => (
                            <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors relative">
                                <td className="px-6 py-4 font-bold text-primary">{item.number || `#${item._id.slice(-6).toUpperCase()}`}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs font-bold">
                                        {item.vehicle || item.category || '—'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium max-w-[250px] truncate" title={item.title}>{item.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${priorityConfig[item.priority.toLowerCase()] || priorityConfig.normale}`}>
                                        {item.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {statusIcon(item.status)}
                                        <span className="font-semibold">{statusLabel[item.status.toLowerCase()] || item.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 font-medium">
                                    {new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === item._id ? null : item._id)}
                                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-slate-400 text-xl">more_vert</span>
                                    </button>
                                    {openMenuId === item._id && (
                                        <div className="absolute right-6 top-12 z-50 bg-white dark:bg-[#1c1c30] border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl min-w-[160px] overflow-hidden">
                                            <button
                                                onClick={() => setOpenMenuId(null)}
                                                className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base text-slate-500">visibility</span>
                                                View Details
                                            </button>
                                            {item.status !== 'resolue' && item.status !== 'resolved' && (
                                                <button
                                                    onClick={() => handleResolve(item._id)}
                                                    className="w-full text-left px-4 py-3 text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex items-center gap-3 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-base">check_circle</span>
                                                    Mark Resolved
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 border-t border-slate-100 dark:border-slate-700 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">delete</span>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

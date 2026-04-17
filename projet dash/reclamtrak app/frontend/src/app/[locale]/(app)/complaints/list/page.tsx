'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge';
import api from '@/lib/api';
import type { Complaint, ComplaintStatus, Priority } from '@/types';
import {
    AlertTriangle, ChevronLeft, ChevronRight, Download,
    Filter, Loader2, Plus, RefreshCw, Search, X, Zap
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { SmartTicketVisionHeader } from '@/components/complaints/SmartTicketVision';
import { db } from '@/lib/db/localDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { Cloud, CheckCircle2, AlertCircle } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Meta { page: number; limit: number; total: number; totalPages: number; }
interface ApiListResponse { data: Complaint[]; meta: Meta; }
interface Stats { [status: string]: number; }

const STATUSES: { value: ComplaintStatus | 'all'; label: string; color: string }[] = [
    { value: 'all',       label: 'Tous',       color: 'bg-slate-500' },
    { value: 'nouvelle',  label: 'Nouvelle',   color: 'bg-cyan-500' },
    { value: 'en cours',  label: 'En cours',   color: 'bg-amber-500' },
    { value: 'résolue',   label: 'Résolue',    color: 'bg-emerald-500' },
    { value: 'fermée',    label: 'Fermée',     color: 'bg-slate-400' },
    { value: 'rejetée',   label: 'Rejetée',    color: 'bg-rose-500' },
];

const PRIORITIES: { value: Priority | 'all'; label: string }[] = [
    { value: 'all',    label: 'Toutes priorités' },
    { value: 'urgent', label: '🔴 Urgent' },
    { value: 'high',   label: '🟠 Haute' },
    { value: 'medium', label: '🟡 Moyenne' },
    { value: 'low',    label: '🟢 Basse' },
];

const CATEGORIES = [
    { value: 'all', label: 'Toutes catégories' },
    { value: 'water', label: 'Eau' },
    { value: 'electricity', label: 'Électricité' },
    { value: 'roads', label: 'Routes' },
    { value: 'waste', label: 'Déchets' },
    { value: 'lighting', label: 'Éclairage' },
    { value: 'sewage', label: 'Assainissement' },
    { value: 'parks', label: 'Parcs' },
    { value: 'noise', label: 'Bruit' },
    { value: 'other', label: 'Autre' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ComplaintListPage() {
    const router = useRouter();

    // Filter state
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const limit = 15;

    // Data
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [meta, setMeta] = useState<Meta>({ page: 1, limit, total: 0, totalPages: 1 });
    const [stats, setStats] = useState<Stats>({});
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);

    // ── LocalData (Dexie) ──
    const localComplaints = useLiveQuery(() => db.complaints.toArray()) || [];

    // Debounce search
    const debounceRef = useRef<ReturnType<typeof setTimeout>>();
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(debounceRef.current);
    }, [search]);

    // Reset page on filter change
    useEffect(() => { setPage(1); }, [debouncedSearch, statusFilter, priorityFilter, categoryFilter]);

    // Fetch data
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const params: Record<string, string> = { page: String(page), limit: String(limit) };
            if (debouncedSearch)                     params.search   = debouncedSearch;
            if (statusFilter   !== 'all')            params.status   = statusFilter;
            if (priorityFilter !== 'all')            params.priority = priorityFilter;
            if (categoryFilter !== 'all')            params.category = categoryFilter;

            const [listRes, statsRes] = await Promise.allSettled([
                api.get('/complaints', { params }),
                api.get('/complaints/stats'),
            ]);

            if (listRes.status === 'fulfilled') {
                const res = listRes.value as ApiListResponse;
                setComplaints(res.data ?? []);
                setMeta(res.meta ?? { page: 1, limit, total: 0, totalPages: 1 });
            }
            if (statsRes.status === 'fulfilled') setStats(statsRes.value as Stats);
        } catch (err) {
            console.error(err);
            toast.error('Erreur lors du chargement des réclamations.');
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearch, statusFilter, priorityFilter, categoryFilter]);

    useEffect(() => { fetchData(); }, [fetchData]);

    // Combiner les données serveur et locales
    const allComplaints = useMemo(() => {
        // IDs serveurs déjà présents pour éviter les doublons
        const serverIds = new Set(complaints.map(c => c._id));
        
        // Filtrer les locaux qui ne sont pas encore sur le serveur ou en attente
        const pendingLocals = localComplaints.filter(lc => !lc.serverId || !serverIds.has(lc.serverId));

        // Transformer les locaux au format de la liste
        const mappedLocals = pendingLocals.map(lc => ({
            ...lc,
            _id: lc.localId,
            isLocalOnly: true,
            status: lc.status as any,
            priority: lc.priority as any
        }));

        return [...mappedLocals, ...complaints].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [complaints, localComplaints]);

    const handleExport = async () => {
        setExporting(true);
        const toastId = toast.loading("Génération de l'export Excel...");
        try {
            const result = await api.get('/analytics/export/complaints') as any;
            toast.dismiss(toastId);
            if (result?.data?.mode === 'local' && result?.data?.downloadUrl) {
                toast.success('Export prêt !');
                window.open(result.data.downloadUrl, '_blank');
            } else if (result?.data?.mode === 'google_drive' && result?.data?.driveViewLink) {
                toast.success('Export sauvegardé sur Google Drive !');
                window.open(result.data.driveViewLink, '_blank');
            } else {
                toast.success(result?.message || 'Export réussi !');
            }
        } catch (err: unknown) {
            toast.dismiss(toastId);
            toast.error(err instanceof Error ? err.message : "Erreur lors de l'export");
        } finally {
            setExporting(false);
        }
    };

    const clearFilters = () => {
        setSearch('');
        setStatusFilter('all');
        setPriorityFilter('all');
        setCategoryFilter('all');
    };

    const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all' || debouncedSearch;

    // ── Render ──────────────────────────────────────────────────────────────
    return (
        <div className="p-4 md:p-6 space-y-6 bg-brand-midnight min-h-screen font-display relative overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none" />

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">
                        Operational Ledger
                    </span>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mt-1">
                        Registre des <span className="text-cyan-400">Réclamations</span>
                    </h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                        {meta.total} enregistrement{meta.total !== 1 ? 's' : ''} · Page {meta.page}/{meta.totalPages}
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="flex items-center gap-2 bg-emerald-500 hover:brightness-110 disabled:opacity-60 text-white px-4 py-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95"
                    >
                        {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        Exporter
                    </button>
                    <Link
                        href="complaints/new"
                        className="bg-brand-orange hover:brightness-110 text-white px-4 py-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Nouveau Ticket
                    </Link>
                </div>
            </div>

            {/* Smart IA Insights */}
            <SmartTicketVisionHeader />

            {/* ── Status Tabs ── */}
            <div className="flex items-center gap-2 flex-wrap">
                {STATUSES.map((s) => (
                    <button
                        key={s.value}
                        onClick={() => setStatusFilter(s.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
                            ${statusFilter === s.value
                                ? 'bg-white/10 border-white/20 text-white'
                                : 'bg-transparent border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
                            }`
                        }
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                        {s.label}
                        {s.value !== 'all' && stats[s.value] !== undefined && (
                            <span className="bg-white/10 px-1.5 py-0.5 rounded-md text-white">
                                {stats[s.value]}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* ── Search + Filters ── */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par numéro, titre, nom, description..."
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all font-medium"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} title="Effacer la recherche" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
                            ${showFilters || hasActiveFilters
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        Filtres
                        {hasActiveFilters && <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />}
                    </button>
                    {hasActiveFilters && (
                        <button onClick={clearFilters} className="text-[10px] font-black text-slate-500 hover:text-rose-400 uppercase tracking-widest transition-colors flex items-center gap-1">
                            <X className="w-3 h-3" /> Effacer
                        </button>
                    )}
                </div>

                {showFilters && (
                    <div className="flex flex-wrap gap-3 p-4 bg-white/3 border border-white/8 rounded-xl">
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-cyan-500/50 transition-all"
                        >
                            {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-cyan-500/50 transition-all"
                        >
                            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </div>
                )}
            </div>

            {/* ── Table ── */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[350px]">
                    <LoadingSpinner />
                </div>
            ) : allComplaints.length === 0 ? (
                <div className="glass-card rounded-[2.5rem] p-24 text-center border-white/5 flex flex-col items-center">
                    <div className="size-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6 border border-white/10">
                        <Search className="w-10 h-10 text-slate-700" />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">Aucun résultat</h3>
                    <p className="text-sm text-slate-500 font-medium max-w-sm">
                        {hasActiveFilters ? 'Aucune réclamation ne correspond aux filtres appliqués.' : 'Le registre est vide.'}
                    </p>
                    {hasActiveFilters && (
                        <button onClick={clearFilters} className="mt-6 text-cyan-400 text-xs font-black uppercase tracking-widest hover:underline">
                            Effacer les filtres
                        </button>
                    )}
                </div>
            ) : (
                <div className="glass-card rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">N° / Date</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Émetteur</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sujet</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Catégorie</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Priorité</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {allComplaints.map((c: any) => (
                                    <tr
                                        key={c._id}
                                        className="hover:bg-cyan-500/[0.03] cursor-pointer transition-colors group/row"
                                        onClick={() => router.push(`complaints/${c._id}`)}
                                    >
                                        {/* N° / Date */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-black px-2 py-1 rounded-lg border inline-block group-hover/row:scale-105 transition-all
                                                        ${c.priority === 'urgent' 
                                                            ? 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
                                                            : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'}
                                                    `}>
                                                        #{c.number || (c.localId ? 'LOCAL' : c._id?.slice(-6))}
                                                    </span>
                                                    
                                                    {/* Indicateur Nuage (Sync) */}
                                                    {c.isLocalOnly ? (
                                                        <div title="En attente de synchronisation" className="text-amber-500 animate-pulse">
                                                            <Cloud className="w-4 h-4" />
                                                        </div>
                                                    ) : (
                                                        <div title="Synchronisé" className="text-emerald-500/50">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-1">
                                                    {new Date(c.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                    {c.priority === 'urgent' && <Zap className="w-2.5 h-2.5 text-orange-500 animate-pulse" />}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Émetteur */}
                                        <td className="px-6 py-4">
                                            {c.isAnonymous ? (
                                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">Anonyme</span>
                                            ) : (
                                                <div>
                                                    <div className="font-black text-white text-sm">{c.firstName} {c.lastName}</div>
                                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{c.phone || c.email || '—'}</div>
                                                </div>
                                            )}
                                        </td>

                                        {/* Sujet */}
                                        <td className="px-6 py-4 max-w-[220px]">
                                            <p className="font-bold text-slate-200 text-sm truncate" title={c.title}>{c.title}</p>
                                            <p className="text-[10px] text-slate-500 mt-0.5 truncate">{c.city} · {c.district}</p>
                                        </td>

                                        {/* Catégorie */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-black text-white text-[11px] uppercase tracking-widest">{c.category}</span>
                                                <span className="text-[10px] text-cyan-400/60 font-black uppercase">{c.subcategory}</span>
                                            </div>
                                        </td>

                                        {/* Priorité */}
                                        <td className="px-6 py-4">
                                            <PriorityBadge priority={c.priority as any} />
                                        </td>

                                        {/* Statut + SLA */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <StatusBadge status={c.status as any} size="sm" />
                                                {c.slaBreached && (
                                                    <span className="flex items-center gap-1 text-[9px] font-black text-rose-400 uppercase tracking-widest">
                                                        <AlertTriangle className="w-2.5 h-2.5" /> SLA dépassé
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Pagination ── */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                            {((meta.page - 1) * meta.limit) + 1}–{Math.min(meta.page * meta.limit, meta.total)} sur {meta.total}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={meta.page <= 1}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                                .filter((p) => Math.abs(p - meta.page) <= 2 || p === 1 || p === meta.totalPages)
                                .map((p, idx, arr) => (
                                    <>
                                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                                            <span key={`gap-${p}`} className="text-slate-600 text-xs">…</span>
                                        )}
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={`w-8 h-8 rounded-lg text-xs font-black transition-all border
                                                ${meta.page === p
                                                    ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/30'
                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    </>
                                ))
                            }
                            <button
                                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                                disabled={meta.page >= meta.totalPages}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Users,
    Activity,
    TrendingUp,
    Calendar as CalendarIcon,
    FileText,
    ArrowRight,
    Droplet,
    Lightbulb,
    Trash2,
    Construction
} from 'lucide-react';

import { StatsCard } from '@/components/ui/StatsCard';
import { ComplaintCard } from '@/components/ui/ComplaintCard';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { Complaint } from '@/types';

export default function DashboardPage() {
    const t = useTranslations('Dashboard');
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        resolvedToday: 0,
        teamsActive: 0
    });
    const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch stats and complaints in parallel
                const [statsRes, complaintsRes] = await Promise.all([
                    apiClient.get('/dashboard') as Promise<any>,
                    apiClient.get('/complaints?limit=3') as Promise<Complaint[]>
                ]);

                setStats({
                    total: statsRes.totalComplaints || 0,
                    active: statsRes.activeComplaints || 0,
                    resolvedToday: statsRes.resolvedToday || 0,
                    teamsActive: statsRes.activeTeams || 0
                });
                setRecentComplaints(complaintsRes || []);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const kpiStats = [
        {
            title: t('activeTickets'),
            value: stats.active,
            trend: { value: '+12%', isPositive: true },
            icon: AlertCircle,
            color: 'blue' as const,
        },
        {
            title: t('resolvedToday'),
            value: stats.resolvedToday,
            trend: { value: '+8%', isPositive: true },
            icon: CheckCircle2,
            color: 'green' as const,
        },
        {
            title: t('pendingReview'),
            value: 18, // Mock for now
            trend: { value: '-5%', isPositive: false },
            icon: Clock,
            color: 'amber' as const,
        },
        {
            title: t('activeTeams'),
            value: stats.teamsActive || 12,
            subtitle: t('teamsActiveSubtitle', { count: 15 }), // sur 15 totales
            icon: Users,
            color: 'purple' as const,
        },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Live Overview</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">
                        {t('title').split(' ')[0]} <span className="text-primary italic">{t('title').split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2 max-w-2xl">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex flex-col items-end mr-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{t('lastUpdate')}</span>
                        <span className="text-sm font-bold dark:text-slate-300">{t('justNow')}</span>
                    </div>
                    <button className="bg-primary text-white rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/25 hover:brightness-110 active:scale-95 transition-all">
                        <FileText className="w-4 h-4" />
                        {t('generateReport')}
                    </button>
                </div>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiStats.map((stat, i) => (
                    <StatsCard key={i} {...stat} className="animate-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Complaints Section */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">{t('recentComplaints')}</h3>
                        </div>
                        <Link
                            href="/complaints"
                            className="group flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:underline"
                        >
                            {t('viewAll')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {isLoading ? (
                            Array(2).fill(0).map((_, i) => (
                                <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
                            ))
                        ) : recentComplaints.length > 0 ? (
                            recentComplaints.map((complaint) => (
                                <ComplaintCard key={complaint._id} complaint={complaint} className="animate-in zoom-in-95 duration-500" />
                            ))
                        ) : (
                            <div className="col-span-full py-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400">
                                <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-bold italic">Aucune réclamation récente trouvée.</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats Overlay (Optional visual polish) */}
                    <div className="bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-[2rem] border border-primary/10 flex items-center justify-between overflow-hidden relative">
                        <div className="absolute -right-10 top-0 size-40 bg-primary/5 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <h4 className="text-lg font-black text-primary uppercase italic leading-none mb-2">Besoin d&apos;aide opérationnelle ?</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Consultez les guides SOP ou contactez le support technique.</p>
                        </div>
                        <button className="relative z-10 px-6 py-3 bg-white dark:bg-slate-800 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-primary hover:text-white transition-all">
                            Voir SOP
                        </button>
                    </div>
                </div>

                {/* Sidebar Stats & Activity */}
                <aside className="space-y-8">
                    {/* Live Activity Feed */}
                    <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden flex flex-col shadow-2xl shadow-primary/10 transition-all">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div>
                                <h3 className="font-black text-xl text-white uppercase italic tracking-tighter">{t('liveActivity')}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] font-sans">{t('realTime')}</span>
                                </div>
                            </div>
                            <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                                <Activity className="w-4 h-4 text-white/40" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 max-h-[480px] scrollbar-hide">
                            {[
                                { color: 'text-blue-400', icon: Droplet, title: 'Nouvelle Réclamation', desc: '# REC-2039 - Fuite à Agdal', time: '2 min' },
                                { color: 'text-amber-400', icon: Construction, title: 'Équipe B4 Dépêchée', desc: 'Assignée au ticket #REC-2038', time: '14 min' },
                                { color: 'text-emerald-400', icon: CheckCircle2, title: 'Ticket Résolu', desc: '#REC-2035 - Clôturé avec succès', time: '1h' },
                                { color: 'text-purple-400', icon: Users, title: 'Maintenance Préventive', desc: 'Secteur Hassan en cours', time: '2h' },
                            ].map((act, i) => (
                                <div key={i} className="flex gap-5 group cursor-pointer animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className={cn("size-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-white/20 transition-all", act.color)}>
                                        <act.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 border-b border-white/5 pb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-[11px] font-black text-white uppercase tracking-tight italic">{act.title}</p>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{act.time}</p>
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium leading-relaxed">{act.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sector Breakdown Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase italic tracking-tight leading-none">{t('sectorBreakdown')}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">{t('operationalImpact')}</p>
                            </div>
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <CalendarIcon className="w-4 h-4 text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { name: 'Eau & Fuites', color: 'bg-blue-500', percent: 45, icon: Droplet },
                                { name: 'Éclairage Public', color: 'bg-amber-500', percent: 29, icon: Lightbulb },
                                { name: 'Assainissement', color: 'bg-emerald-500', percent: 21, icon: Trash2 },
                            ].map((cat, idx) => (
                                <div key={idx} className="group cursor-pointer">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("size-8 rounded-xl text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform", cat.color)}>
                                                <cat.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">{cat.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-slate-900 dark:text-white lowercase">{cat.percent}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800/50 h-2 rounded-full overflow-hidden">
                                        <div className={cn("h-full rounded-full transition-all duration-1000", cat.color)} style={{ width: `${cat.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

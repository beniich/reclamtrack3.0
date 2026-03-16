'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import {
    Activity,
    AlertCircle,
    ArrowRight,
    Calendar as CalendarIcon,
    CheckCircle2,
    Clock,
    Construction,
    Droplet,
    FileText,
    Lightbulb,
    Trash2,
    TrendingUp,
    Users
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ComplaintCard } from '@/components/ui/ComplaintCard';
import { StatsCard } from '@/components/ui/StatsCard';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { apiClient } from '@/lib/api';
import type { Complaint } from '@/types';

import { useOrgStore } from '@/store/orgStore';

export default function DashboardPage() {
    const t = useTranslations('Dashboard');
    const { activeOrganization, isLoading: isOrgLoading } = useOrgStore();
    const [stats, setStats] = useState<any>({
        totalComplaints: 0,
        activeComplaints: 0,
        resolvedToday: 0,
        activeTeams: 0,
        byStatus: {},
        byCategory: []
    });
    const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState('today');

    useEffect(() => {
        const fetchData = async () => {
            if (!activeOrganization) return;

            try {
                // Fetch stats and complaints in parallel
                const [statsRes, complaintsRes] = await Promise.all([
                    apiClient.get(`/dashboard?dateFilter=${dateFilter}`) as Promise<any>,
                    apiClient.get(`/complaints?limit=3&dateFilter=${dateFilter}`) as Promise<any>
                ]);

                setStats(statsRes || {});
                // Complaints are wrapped in { success, data } in formatResponse
                setRecentComplaints(complaintsRes?.data || []);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (!isOrgLoading) {
            fetchData();
        }
    }, [activeOrganization, isOrgLoading, dateFilter]);


    const kpiStats = [
        {
            title: t('activeTickets'),
            value: stats.activeComplaints || 0,
            trend: { value: '+12%', isPositive: true },
            icon: AlertCircle,
            color: 'blue' as const,
        },
        {
            title: t('resolvedToday'),
            value: stats.resolvedToday || 0,
            trend: { value: '+8%', isPositive: true },
            icon: CheckCircle2,
            color: 'green' as const,
        },
        {
            title: t('pendingReview'),
            value: stats.byStatus?.nouvelle || 0,
            trend: { value: '-5%', isPositive: false },
            icon: Clock,
            color: 'amber' as const,
        },
        {
            title: t('activeTeams'),
            value: stats.activeTeams || 0,
            subtitle: t('teamsActiveSubtitle', { count: stats.totalTeams || stats.activeTeams || 0 }),
            icon: Users,
            color: 'purple' as const,
        },
    ];

    return (
        <div className="p-6 space-y-10 bg-brand-midnight min-h-screen font-display selection:bg-cyan-500 selection:text-white relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none"></div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Operational Dashboard</span>
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                        {t('title').split(' ')[0]} <span className="text-cyan-400 italic">{t('title').split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px] mt-2 font-black ml-1">
                        CENTRE DE COMMANDE DES INTERVENTIONS TECHNIQUES
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-[180px] bg-white/5 border-white/10 rounded-2xl h-[52px] text-white text-[10px] font-black uppercase tracking-widest">
                            <SelectValue placeholder="Filtrer" />
                        </SelectTrigger>
                        <SelectContent className="bg-brand-midnight border-white/10 text-white">
                            <SelectItem value="today">Aujourd'hui</SelectItem>
                            <SelectItem value="7days">7 derniers jours</SelectItem>
                            <SelectItem value="30days">30 derniers jours</SelectItem>
                            <SelectItem value="thisYear">Cette année</SelectItem>
                            <SelectItem value="all">Tout le temps</SelectItem>
                        </SelectContent>
                    </Select>

                    <button className="bg-brand-orange hover:brightness-110 text-white rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
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
                    <div className="glass-card gradient-bg rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col shadow-2xl shadow-primary/10 transition-all">
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
                    <div className="bg-white dark:glass-card rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-8 shadow-sm">
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
                            {(stats.byCategory && stats.byCategory.length > 0) ? stats.byCategory.slice(0, 3).map((cat: any, idx: number) => {
                                const icons = [Droplet, Lightbulb, Trash2];
                                const colors = ['bg-blue-500', 'bg-amber-500', 'bg-emerald-500'];
                                const percent = stats.totalComplaints > 0
                                    ? Math.round((cat.count / stats.totalComplaints) * 100)
                                    : 0;

                                return (
                                    <div key={idx} className="group cursor-pointer">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("size-8 rounded-xl text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform", colors[idx % colors.length])}>
                                                    {React.createElement(icons[idx % icons.length], { className: "w-4 h-4" })}
                                                </div>
                                                <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">{cat._id}</span>
                                            </div>
                                            <span className="text-xs font-black text-slate-900 dark:text-white lowercase">{percent}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800/50 h-2 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full transition-all duration-1000", colors[idx % colors.length])} style={{ width: `${percent}%` }}></div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <p className="text-xs text-slate-500 italic">Aucune donnée de catégorie disponible.</p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

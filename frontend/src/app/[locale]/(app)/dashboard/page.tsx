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
import { ServiceLifecycle } from '@/components/dashboard-v2/ServiceLifecycle';

interface DashboardStats {
    totalComplaints: number;
    activeComplaints: number;
    resolvedToday: number;
    activeTeams: number;
    totalTeams?: number;
    byStatus: Record<string, number>;
    byCategory: Array<{ _id: string; count: number }>;
}

export default function DashboardPage() {
    const t = useTranslations('Dashboard');
    const { activeOrganization, isLoading: isOrgLoading } = useOrgStore();
    const [stats, setStats] = useState<DashboardStats>({
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
                    apiClient.get(`/dashboard?dateFilter=${dateFilter}`) as Promise<DashboardStats>,
                    apiClient.get(`/complaints?limit=3&dateFilter=${dateFilter}`) as Promise<{ data: Complaint[] }>
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
            if (!activeOrganization) {
                // Done loading orgs but none active => stop loading to show empty state instead of infinite skeleton
                setIsLoading(false);
            } else {
                fetchData();
            }
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
        <div className="p-6 space-y-10 bg-slate-50 dark:bg-background min-h-screen font-display selection:bg-indigo-500/10 dark:selection:bg-orange-500/10 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-indigo-500/5 dark:bg-orange-500/5 blur-[120px] -z-10 pointer-events-none"></div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-indigo-600 dark:text-orange-400 animate-pulse" />
                        <div className="flex flex-col">
                        <span className="text-[10px] font-black text-indigo-600 dark:text-orange-400 uppercase tracking-[0.3em]">{t('title')}</span>
                        <div className="flex items-center gap-4">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                                RECLAMTRACK <span className="text-orange-500 not-italic">PRO</span>
                            </h2>
                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
                            <p className="text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] text-[10px] mt-2 font-black ml-1">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-[180px] bg-white dark:bg-slate-900 border-slate-200 dark:border-orange-500/20 rounded-2xl h-[52px] text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 dark:hover:border-orange-500/50">
                            <SelectValue placeholder={t('filter')} />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                            <SelectItem value="today">{t('today')}</SelectItem>
                            <SelectItem value="7days">{t('last7Days')}</SelectItem>
                            <SelectItem value="30days">{t('last30Days')}</SelectItem>
                            <SelectItem value="thisYear">{t('thisYear')}</SelectItem>
                            <SelectItem value="all">{t('allTime')}</SelectItem>
                        </SelectContent>
                    </Select>

                    <button className="bg-indigo-600 dark:bg-orange-500 hover:brightness-110 text-white rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-indigo-600/20 dark:shadow-orange-600/20 active:scale-95 transition-all">
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

            {/* Service Lifecycle Mock Section */}
            <div className="animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <ServiceLifecycle />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Complaints Section */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-400 rounded-lg">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">{t('recentComplaints')}</h3>
                        </div>
                        <Link
                            href="/complaints"
                            className="group flex items-center gap-2 text-xs font-black text-primary dark:text-orange-400 uppercase tracking-widest hover:underline"
                        >
                            {t('viewAll')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {isLoading ? (
                            Array(2).fill(0).map((_, i) => (
                                <div key={i} className="h-64 bg-slate-100/50 rounded-2xl animate-pulse" />
                            ))
                        ) : recentComplaints.length > 0 ? (
                            recentComplaints.map((complaint) => (
                                <ComplaintCard key={complaint._id} complaint={complaint} className="animate-in zoom-in-95 duration-500" />
                            ))
                        ) : (
                            <div className="col-span-full py-20 bg-white dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-orange-500/20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                                <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-bold italic">Aucune réclamation récente trouvée.</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-transparent dark:from-orange-500/5 dark:to-transparent p-8 rounded-[2rem] border border-indigo-100 dark:border-orange-500/20 flex items-center justify-between overflow-hidden relative">
                        <div className="absolute -right-10 top-0 size-40 bg-indigo-100/50 dark:bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                                <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-orange-500/5 border border-indigo-100 dark:border-orange-500/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-orange-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors"></div>
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-4">
                                            <span className="material-symbols-outlined text-indigo-600 dark:text-orange-400">help_center</span>
                                        </div>
                                        <h4 className="text-lg font-black text-indigo-800 dark:text-orange-300 uppercase italic leading-none mb-2">{t('quickStatsTitle')}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t('quickStatsDescription')}</p>
                                        <button className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 dark:bg-orange-500 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-700 dark:hover:brightness-110 shadow-lg shadow-indigo-600/20 dark:shadow-orange-600/20 transition-all">
                                            {t('viewSOP')}
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats & Activity */}
                <aside className="space-y-8">
                    {/* Live Activity Feed */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-orange-500/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl shadow-slate-200/50 dark:shadow-orange-500/5 transition-all">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                            <div>
                                <h3 className="font-black text-xl text-slate-900 dark:text-white uppercase italic tracking-tighter">{t('liveActivity')}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] font-sans">{t('realTime')}</span>
                                </div>
                            </div>
                            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <Activity className="w-4 h-4 text-slate-400" />
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
                                    <div className={cn("size-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-orange-500/30 transition-all shadow-sm", act.color)}>
                                        <act.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic">{act.title}</p>
                                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{act.time}</p>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{act.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sector Breakdown Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-orange-500/10 p-8 shadow-sm">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase italic tracking-tight leading-none">{t('sectorBreakdown')}</h3>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-2 tracking-widest">{t('operationalImpact')}</p>
                            </div>
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                <CalendarIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {(stats.byCategory && stats.byCategory.length > 0) ? stats.byCategory.slice(0, 3).map((cat, idx: number) => {
                                const icons = [Droplet, Lightbulb, Trash2];
                                const colors = ['bg-blue-500', 'bg-amber-500', 'bg-emerald-500'];
                                const percent = stats.totalComplaints > 0
                                    ? Math.round((cat.count / stats.totalComplaints) * 100)
                                    : 0;

                                return (
                                    <div key={idx} className="group cursor-pointer">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("size-8 rounded-xl text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform", colors[idx % colors.length])}>
                                                    {React.createElement(icons[idx % icons.length], { className: "w-4 h-4" })}
                                                </div>
                                                <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">{cat._id}</span>
                                            </div>
                                            <span className="text-xs font-black text-slate-900 dark:text-white lowercase">{percent}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
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

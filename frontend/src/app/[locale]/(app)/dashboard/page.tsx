'use client';

import React, { useEffect, useState } from 'react';
import { 
    Activity, AlertCircle, ArrowRight, CheckCircle2, 
    Clock, Construction, Droplet, FileText, 
    Lightbulb, Trash2, TrendingUp, Users, Shield, Zap
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Box, Badge, Skeleton, Progress } from '@chakra-ui/react';

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

interface MaintenanceKPIs {
    mttr: string;
    mtbf: string;
    availability: number;
    totalInterventions: number;
}

export default function DashboardPage() {
    const t = useTranslations('Dashboard');
    const { activeOrganization, isLoading: isOrgLoading } = useOrgStore();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [mKpis, setMKpis] = useState<MaintenanceKPIs | null>(null);
    const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
    const [activityLogs, setActivityLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState('today');

    useEffect(() => {
        const fetchData = async () => {
            if (!activeOrganization) return;
            setIsLoading(true);

            try {
                const [statsRes, complaintsRes, kpisRes, logsRes] = await Promise.all([
                    apiClient.get(`/dashboard?dateFilter=${dateFilter}`),
                    apiClient.get(`/complaints?limit=2&dateFilter=${dateFilter}`),
                    apiClient.get('/analytics/gmao/kpis'),
                    apiClient.get('/audit-logs?limit=5')
                ]);

                setStats(statsRes as any);
                setRecentComplaints(complaintsRes?.data || []);
                setMKpis((kpisRes as any)?.data || null);
                setActivityLogs((logsRes as any)?.data || []);
            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (!isOrgLoading) {
            if (!activeOrganization) setIsLoading(false);
            else fetchData();
        }
    }, [activeOrganization, isOrgLoading, dateFilter]);

    const kpiStats = [
        {
            title: "Tickets Actifs",
            value: stats?.activeComplaints || 0,
            trend: { value: '+12%', isPositive: true },
            icon: AlertCircle,
            color: 'blue' as const,
        },
        {
            title: "MTTR (Heures)",
            value: mKpis?.mttr || '0.00',
            trend: { value: '-15%', isPositive: true },
            icon: Zap,
            color: 'orange' as const,
        },
        {
            title: "MTBF (Heures)",
            value: mKpis?.mtbf || '0.00',
            trend: { value: '+5%', isPositive: true },
            icon: Shield,
            color: 'indigo' as const,
        },
        {
            title: "Disponibilité",
            value: `${mKpis?.availability || 99.9}%`,
            trend: { value: '+0.1%', isPositive: true },
            icon: Activity,
            color: 'green' as const,
        },
    ];

    return (
        <div className="p-6 space-y-10 bg-slate-50 dark:bg-slate-950 min-h-screen font-display relative overflow-hidden">
            {/* Industrial Grid Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 dark:bg-orange-500/10 blur-[150px] -z-10 rounded-full"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div>
                    <div className="flex items-center gap-4 mb-3">
                        <div className="size-12 rounded-2xl bg-indigo-600 dark:bg-orange-500 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                            <Activity className="w-6 h-6 text-white animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                                RECLAMTRACK <span className="text-indigo-600 dark:text-orange-500 not-italic">COMMAND CENTER</span>
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-0.5">Industrial OS v3.0</span>
                                <Badge colorScheme="emerald" variant="solid" fontSize="8px" borderRadius="full" px={2}>SYSTEME DEPLOYE</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-[200px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl h-[56px] text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest shadow-sm">
                            <SelectValue placeholder="Période" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-800">
                            <SelectItem value="today">Aujourd'hui</SelectItem>
                            <SelectItem value="7days">7 Derniers Jours</SelectItem>
                            <SelectItem value="30days">30 Derniers Jours</SelectItem>
                            <SelectItem value="all">Tout le Temps</SelectItem>
                        </SelectContent>
                    </Select>

                    <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl px-8 h-[56px] text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:brightness-110 transition-all active:scale-95">
                        <FileText className="w-4 h-4" /> Générer Report
                    </button>
                </div>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    [1, 2, 3, 4].map(i => <Skeleton key={i} height="120px" borderRadius="2rem" />)
                ) : (
                    kpiStats.map((stat, i) => (
                        <StatsCard key={i} {...stat} className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }} />
                    ))
                )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">
                {/* Recent Complaints Section */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-400 rounded-2xl">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">Flux Opérationnel</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernières interventions détectées</p>
                            </div>
                        </div>
                        <Link href="/complaints" className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                            Voir Tout
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {isLoading ? (
                            Array(2).fill(0).map((_, i) => <Skeleton key={i} height="200px" borderRadius="2rem" />)
                        ) : recentComplaints.length > 0 ? (
                            recentComplaints.map((complaint) => (
                                <ComplaintCard key={complaint._id} complaint={complaint} className="animate-in zoom-in-95 duration-500" />
                            ))
                        ) : (
                            <div className="col-span-full py-20 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
                                <AlertCircle className="w-12 h-12 mb-4 text-slate-200" />
                                <p className="text-sm font-black text-slate-400 uppercase italic">Aucune alerte active</p>
                            </div>
                        )}
                    </div>

                    <ServiceLifecycle />
                </div>

                {/* Sidebar Stats & Activity */}
                <aside className="space-y-8">
                    {/* Live Activity Feed */}
                    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-xl text-slate-900 dark:text-white uppercase italic tracking-tighter">Live Audit</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Synchro Temps Réel</span>
                                </div>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <Shield className="w-5 h-5 text-indigo-500" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 max-h-[500px]">
                            {isLoading ? (
                                Array(4).fill(0).map((_, i) => <Skeleton key={i} height="60px" borderRadius="1rem" />)
                            ) : activityLogs.map((log, i) => (
                                <div key={i} className="flex gap-4 group cursor-pointer animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 group-hover:bg-indigo-600 transition-all">
                                        <Activity className="w-4 h-4 text-slate-400 group-hover:text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase truncate tracking-tight">{log.action}</p>
                                            <p className="text-[8px] font-black text-slate-400 uppercase">{new Date(log.timestamp).toLocaleTimeString()}</p>
                                        </div>
                                        <p className="text-[11px] text-slate-500 truncate leading-relaxed">{log.user?.name || log.user || 'System'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sector Breakdown Card */}
                    <div className="bg-indigo-600 dark:bg-indigo-950/40 p-10 rounded-[2.5rem] border border-indigo-400/20 shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 size-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                        <div className="relative z-10">
                            <h3 className="font-black text-2xl text-white uppercase italic tracking-tighter mb-8">Secteurs <span className="text-indigo-200">Impactés</span></h3>
                            <div className="space-y-6">
                                {stats?.byCategory && stats.byCategory.length > 0 ? stats.byCategory.slice(0, 4).map((cat, idx: number) => {
                                    const percent = stats.totalComplaints > 0 ? Math.round((cat.count / stats.totalComplaints) * 100) : 0;
                                    return (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex items-center justify-between text-white text-[10px] font-black uppercase tracking-widest">
                                                <span>{cat._id}</span>
                                                <span>{percent}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <p className="text-white/50 text-[10px] uppercase font-black tracking-widest italic">Analyse en cours...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

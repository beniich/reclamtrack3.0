'use client';

import React from 'react';
import Link from 'next/link';
import { 
    BarChart3, Activity, Clock, AlertTriangle, 
    ArrowUpRight, ArrowDownRight, Zap, Target,
    FileBarChart, Filter, Download, Calendar
} from 'lucide-react';

export default function MaintenanceReportsPage() {
    // Mock data for Phase 5 Analytics
    const kpis = [
        { label: 'OEE (TRS) Global', value: '82.4%', trend: '+2.1%', up: true, icon: Target, color: 'text-indigo-500' },
        { label: 'Disponibilité', value: '91.2%', trend: '-0.5%', up: false, icon: Zap, color: 'text-emerald-500' },
        { label: 'MTBF (Fiabilité)', value: '420h', trend: '+15h', up: true, icon: Activity, color: 'text-blue-500' },
        { label: 'MTTR (Réparabilité)', value: '2.4h', trend: '-12min', up: true, icon: Clock, color: 'text-orange-500' },
    ];

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-[calc(100vh-6rem)] relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] -z-10 pointer-events-none rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] -z-10 pointer-events-none rounded-full"></div>

            {/* Header section with Premium Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                            Analytiques <span className="text-indigo-600 dark:text-indigo-500 not-italic">Industriels</span>
                        </h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                            Performance GMAO & Fiabilité des Équipements
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="h-[52px] px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 dark:hover:border-indigo-500/50 flex items-center gap-2 transition-all shadow-sm">
                        <Calendar className="w-4 h-4" /> 30 derniers jours
                    </button>
                    <button className="h-[52px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:scale-105 transition-all">
                        <Download className="w-4 h-4" /> Rapport Mensuel PDF
                    </button>
                </div>
            </div>

            {/* Main KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
                {kpis.map((kpi, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm group hover:shadow-xl hover:shadow-indigo-500/5 transition-all animate-in zoom-in-95 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 transition-colors group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10`}>
                                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black ${kpi.up ? 'text-emerald-500' : 'text-red-500'}`}>
                                {kpi.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                {kpi.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{kpi.label}</p>
                        <h3 className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase">{kpi.value}</h3>
                    </div>
                ))}
            </div>

            {/* Charts & Detail Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                {/* Reliability Curve (Mock representation) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col min-h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
                                <Activity className="w-4 h-4 text-indigo-500" /> Taux de Panne (Courbe de Baignoire)
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Analyse prédictive des défaillances</p>
                        </div>
                        <div className="flex gap-2">
                            {['Hebdo', 'Mensuel', 'Trim'].map((t) => (
                                <button key={t} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${t === 'Mensuel' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Visual Placeholder for a Chart */}
                    <div className="flex-1 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center opacity-60">
                        <FileBarChart className="size-16 text-slate-300 dark:text-slate-600 mb-4" />
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Flux de données temps réel</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-2 max-w-sm">Les graphiques interactifs (Recharts) se chargeront ici avec les données réelles de la base Work Orders.</p>
                    </div>
                </div>

                {/* Right sidebar stats */}
                <div className="space-y-6">
                    {/* OEE Decomposition */}
                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-indigo-500/30 transition-all"></div>
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-indigo-400" /> Décomposition OEE
                        </h3>
                        
                        <div className="space-y-6">
                            {[
                                { label: 'Performance', val: 94.5, color: 'bg-indigo-500' },
                                { label: 'Disponibilité', val: 91.2, color: 'bg-emerald-500' },
                                { label: 'Qualité', val: 98.9, color: 'bg-blue-500' },
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                        <span className="text-slate-400">{item.label}</span>
                                        <span>{item.val}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Fault Analysis */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-orange-500" /> Causes de Pannnes
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Usure Mécanique', val: '45%' },
                                { label: 'Composant Électrique', val: '22%' },
                                { label: 'Erreur Humaine', val: '18%' },
                                { label: 'Autres', val: '15%' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                                    <span className="text-xs font-black text-slate-900 dark:text-white uppercase">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

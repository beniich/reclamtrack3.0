'use client';

import React from 'react';
import Link from 'next/link';
import { 
    CalendarCheck, Plus, Search, Filter, 
    CalendarRange, Clock, Activity, Power, Settings
} from 'lucide-react';

export default function MaintenancePlansPage() {
    const mockPlans = [
        { id: '1', name: 'Graissage Mensuel Pompes', category: 'Mécanique', interval: '1', unit: 'months', lastRun: '2026-03-14', nextRun: '2026-04-14', active: true },
        { id: '2', name: 'Inspection Annuelle TGBT', category: 'Électrique', interval: '1', unit: 'years', lastRun: '2025-05-10', nextRun: '2026-05-10', active: true },
        { id: '3', name: 'Changement Filtres CVC', category: 'HVAC', interval: '500', unit: 'hours', lastRun: 'N/A', nextRun: 'Dans 45h', active: true },
        { id: '4', name: 'Calibration Balance de Tri', category: 'Métrologie', interval: '6', unit: 'months', lastRun: '2025-10-15', nextRun: '2026-04-15', active: false },
    ];

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-[calc(100vh-6rem)] relative overflow-hidden">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] -z-10 pointer-events-none rounded-full"></div>
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20">
                        <CalendarCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                            Maintenance <span className="text-emerald-600 dark:text-emerald-500 not-italic">Préventive</span>
                        </h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                            Stratégie PM & Génération d'OT Auto
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Link href="/maintenance/calendar">
                        <button className="h-[52px] px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-emerald-300 dark:hover:border-emerald-500/50 flex items-center gap-2 transition-all shadow-sm">
                            <CalendarRange className="w-4 h-4" /> Vue Calendrier
                        </button>
                    </Link>
                    <button className="h-[52px] bg-emerald-600 dark:bg-emerald-500 hover:brightness-110 text-white rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-emerald-600/20 dark:shadow-emerald-600/20 transition-all">
                        <Plus className="w-4 h-4" /> Nouveau Plan PM
                    </button>
                </div>
            </div>

            {/* List Header/Filters */}
            <div className="flex flex-col lg:flex-row gap-4 relative z-10">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Rechercher un plan de maintenance..." 
                        className="w-full h-[52px] pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[12px] font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/20 transition-all"
                    />
                </div>
                <button className="w-[52px] h-[52px] flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <Filter className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
                {mockPlans.map((plan, i) => (
                    <div key={plan.id} className={`bg-white dark:bg-slate-900 rounded-[2rem] border p-6 flex flex-col group cursor-pointer transition-all animate-in zoom-in-95 duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 ${plan.active ? 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30' : 'border-slate-200 dark:border-slate-800 opacity-60 bg-slate-50 dark:bg-slate-900/50'}`} style={{ animationDelay: `${i * 100}ms` }}>
                        
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className={`size-10 rounded-xl flex items-center justify-center ${plan.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                                    <Settings className={`w-5 h-5 ${plan.active ? 'animate-spin-slow' : ''}`} />
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded-md border flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${plan.active ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500'}`}>
                                <Power className="w-3 h-3" /> {plan.active ? 'Actif' : 'Inactif'}
                            </div>
                        </div>

                        <h3 className="text-lg font-black uppercase italic tracking-tight text-slate-900 dark:text-white mb-2 line-clamp-2">
                            {plan.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded">
                                {plan.category}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                                Tous les {plan.interval} {plan.unit}
                            </span>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Passage Précédent</span>
                                <span className={`text-xs font-bold ${plan.active ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>{plan.lastRun}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Prochain OT Auto</span>
                                <span className={`text-xs font-black ${plan.active ? 'text-emerald-600 dark:text-emerald-500' : 'text-slate-400'}`}>{plan.nextRun}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

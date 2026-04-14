'use client';

import React from 'react';
import { Brain, Zap, Target, TrendingUp, AlertCircle } from 'lucide-react';

export function SmartTicketVisionHeader() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Anomaly Detection */}
            <div className="relative overflow-hidden group p-5 bg-indigo-600 rounded-[2rem] shadow-xl border border-indigo-400/30">
                <div className="absolute -right-4 -top-4 size-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">IA Anomaly</span>
                </div>
                <h3 className="text-sm font-black text-white leading-tight">Pic anormal détecté : Zone Nord (Eau)</h3>
                <div className="mt-3 py-1 px-3 bg-white/10 rounded-lg inline-block">
                    <span className="text-[9px] font-black text-white uppercase tracking-tighter">+24% vs Moyenne</span>
                </div>
            </div>

            {/* Severity Predictor */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm group hover:border-cyan-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-cyan-500/10 rounded-xl">
                        <Zap className="w-5 h-5 text-cyan-500" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priorisation IA</span>
                </div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white leading-tight">12 Tickets reclassés en "Urgent"</h3>
                <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-tight">Optimisation SLA : +15%</p>
            </div>

            {/* Resolution Forecast */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm group hover:border-orange-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-xl">
                        <Target className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Forecast</span>
                </div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white leading-tight">Temps de résolution : 3.4h avg</h3>
                <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-tight">Tendance : Stable</p>
            </div>

            {/* Sentiment Tracker */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm group hover:border-purple-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-xl">
                        <Brain className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sentiment IA</span>
                </div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white leading-tight">Climat : Frustration modérée</h3>
                <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full mt-3 overflow-hidden">
                    <div className="h-full w-2/3 bg-purple-500"></div>
                </div>
            </div>
        </div>
    );
}

'use client';

import FilterBar from "@/components/audit/FilterBar";
import LogTable from "@/components/audit/LogTable";
import StatsCard from "@/components/audit/StatsCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Suspense } from "react";

export default function AuditLogsPage() {
    return (
        <div className="flex flex-col flex-1 w-full px-6 py-8 bg-brand-midnight text-white selection:bg-cyan-500 selection:text-white relative">
            <div className="absolute top-0 right-0 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none"></div>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-primary/10 text-primary uppercase tracking-widest border border-primary/20">
                            Live Monitoring
                        </span>
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black tracking-tight italic">
                        AUDIT LOGS & ACTIVITY
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
                        Real-time synchronization of system interventions and secure activity trails.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all shadow-xl shadow-cyan-500/5 group">
                        <span className="material-symbols-outlined text-lg group-hover:rotate-180 transition-transform duration-500">sync</span>
                        <span>Synchroniser</span>
                    </button>

                    <button className="flex items-center gap-3 rounded-2xl bg-brand-orange px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-orange-500/20 hover:brightness-110 transition-all active:scale-95">
                        <span className="material-symbols-outlined text-lg">download</span>
                        <span>Exporter les Archives</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatsCard
                    icon={<span className="material-symbols-outlined">list_alt</span>}
                    title="Total Logs Today"
                    value="1,284"
                    change={{ direction: "up", percent: 12, color: "emerald" }}
                />
                <StatsCard
                    icon={<span className="material-symbols-outlined">priority_high</span>}
                    title="Critical Alerts"
                    value="12"
                    change={{ direction: "up", percent: 5, color: "red" }}
                />
                <StatsCard
                    icon={<span className="material-symbols-outlined">person_check</span>}
                    title="Active Operators"
                    value="45"
                    change={{ direction: "flat", percent: 0, color: "gray" }}
                />
            </div>

            <FilterBar />

            <Suspense fallback={<LoadingSpinner />}>
                <LogTable />
            </Suspense>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3 italic uppercase tracking-wider">
                            <span className="material-symbols-outlined text-primary text-2xl">data_exploration</span>
                            Action Metrics (24h)
                        </h3>
                        <span className="text-xs font-bold text-slate-400">SAMPLE DATA</span>
                    </div>
                    <div className="h-56 glass-card rounded-3xl flex items-end justify-between px-8 pb-8 pt-12 overflow-hidden relative border-white/5">
                        <div className="absolute top-4 left-4 text-[10px] font-black text-slate-500 tracking-widest italic">INCIDENT RATIO 24H</div>
                        {[0.25, 0.5, 0.33, 1, 0.75, 0.4, 0.5, 0.8, 0.2].map((h, i) => (
                            <div
                                key={i}
                                className="w-8 rounded-t-lg transition-all hover:scale-x-110 cursor-pointer relative group"
                                style={{
                                    height: `${h * 100}%`,
                                    background: i === 3 ? "var(--color-primary)" : `rgba(34, 211, 238, ${h * 0.4 + 0.1})`,
                                    boxShadow: i === 3 ? "0 0 20px rgba(255, 107, 0, 0.3)" : "none"
                                }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {Math.round(h * 100)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3 italic uppercase tracking-wider">
                        <span className="material-symbols-outlined text-emerald-500 text-2xl">verified_user</span>
                        Security Insights
                    </h3>
                    <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 border-t-4 border-t-emerald-500/50">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Temps Moyen de Session</span>
                            <span className="font-black text-white text-lg tracking-tight italic">42m 15s</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                            <div className="bg-cyan-500 h-full w-[65%] transition-all duration-1000 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Vulnérabilités Système</span>
                            <span className="font-black text-emerald-400 text-lg tracking-tight italic uppercase">Sécurisé</span>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 p-4 rounded-2xl border border-emerald-500/20 leading-relaxed group">
                            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">verified</span>
                            <p>Intégrité des audits vérifiée • Timestamps immuables • 100% Opérationnel</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

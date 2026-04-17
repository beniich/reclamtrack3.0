'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

export default function MaintenanceCalendarPage() {
    // Mock simple calendar data
    const days = ['Lun 13', 'Mar 14', 'Mer 15', 'Jeu 16', 'Ven 17', 'Sam 18', 'Dim 19'];
    
    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-[calc(100vh-6rem)] relative overflow-hidden flex flex-col">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 dark:bg-emerald-500/5 blur-[120px] -z-10 pointer-events-none rounded-full"></div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-500 rounded-2xl shadow-sm">
                        <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                            Calendrier <span className="text-emerald-600 dark:text-emerald-500 not-italic">PM</span>
                        </h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                            Vue Gantt Hebdomadaire des Maintenances
                        </p>
                    </div>
                </div>

                <Link href="/maintenance">
                    <button className="h-[52px] px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-emerald-300 dark:hover:border-emerald-500/50 flex items-center gap-2 transition-all shadow-sm">
                        <ArrowLeft className="w-4 h-4" /> Mode Liste
                    </button>
                </Link>
            </div>

            {/* Calendar UI Mock */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative z-10 overflow-hidden flex flex-col">
                {/* Toolbar */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                            <span className="px-4 text-[10px] font-black uppercase tracking-widest border-x border-slate-200 dark:border-slate-800 py-2 text-slate-900 dark:text-white">Avril 2026 (Sem 15)</span>
                            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                        <button className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">Aujourd'hui</button>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-auto">
                    <div className="min-w-[800px] h-full flex flex-col">
                        {/* Headers */}
                        <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-900/50">
                            {days.map((day, idx) => (
                                <div key={idx} className={`py-4 border-r border-slate-100 dark:border-slate-800 last:border-0 ${idx === 1 ? 'bg-emerald-50 dark:bg-emerald-500/10' : ''}`}>
                                    <span className={`text-xs font-black uppercase tracking-widest ${idx === 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>{day}</span>
                                </div>
                            ))}
                        </div>

                        {/* Body - Gantt style row representations */}
                        <div className="flex-1 grid grid-cols-7 grid-rows-6 relative">
                            {/* Grid lines */}
                            {Array.from({ length: 42 }).map((_, i) => (
                                <div key={i} className="border-r border-b border-slate-100 dark:border-slate-800/50"></div>
                            ))}

                            {/* Task 1 */}
                            <div className="absolute top-4 left-0 w-[14.28%] p-2">
                                <div className="bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 p-2 rounded-xl w-full">
                                    <h4 className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-400 mb-1 truncate">Graissage Pompe</h4>
                                    <span className="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-500"><CheckCircle2 className="w-3 h-3" /> Fait</span>
                                </div>
                            </div>

                            {/* Task 2 */}
                            <div className="absolute top-20 left-[14.28%] w-[28.56%] p-2">
                                <div className="bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 p-2 rounded-xl w-full shadow-md">
                                    <h4 className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-400 mb-1 truncate">Calibration Balance</h4>
                                    <span className="flex items-center gap-1 text-[9px] text-amber-600 dark:text-amber-500 font-bold"><Clock className="w-3 h-3" /> Prévu Aujourd'hui</span>
                                </div>
                            </div>
                            
                            {/* Task 3 */}
                            <div className="absolute top-[160px] left-[57.12%] w-[14.28%] p-2">
                                <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 p-2 rounded-xl w-full">
                                    <h4 className="text-[10px] font-black uppercase text-slate-800 dark:text-slate-300 mb-1 truncate">Inspection TGBT</h4>
                                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold">À Venir</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

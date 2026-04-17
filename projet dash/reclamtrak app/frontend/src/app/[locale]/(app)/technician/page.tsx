'use client';

import React from 'react';
import Link from 'next/link';
import { 
    QrCode, ListChecks, History, Map, 
    Bell, User, Wrench, Clock, CheckCircle2,
    ChevronRight, Scan, AlertCircle
} from 'lucide-react';

export default function TechnicianPortalPage() {
    // Mock tasks for the technician
    const activeTasks = [
        { id: '1', number: 'WO-8821', title: 'Fuite Pompe P1', priority: 'urgent', time: '14:00', asset: 'Pompe Ligne 1' },
        { id: '2', number: 'WO-8825', title: 'Préventif TGBT', priority: 'medium', time: '16:30', asset: 'Sous-station A' },
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white flex flex-col max-w-lg mx-auto relative shadow-2xl overflow-hidden font-display">
            {/* Mobile Status Bar Simulation */}
            <div className="bg-white dark:bg-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="size-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-500/20">
                        AB
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400 leading-none">Technicien</p>
                        <p className="text-xs font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mt-0.5">Amine Benali</p>
                    </div>
                </div>
                <div className="relative p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <Bell className="w-5 h-5 text-slate-500" />
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </div>
            </div>

            {/* Main Action - QR Scan Hero */}
            <div className="px-6 py-8">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
                            <div className="size-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                            Scanner Prêt
                        </div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2 leading-tight">Intervention<br/>Sur Site</h2>
                        <p className="text-xs text-indigo-100 font-medium mb-8 leading-relaxed max-w-[200px]">Scannez le QR Code de la machine pour voir l'historique.</p>
                        
                        <button className="w-full h-[60px] bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                            <QrCode className="w-5 h-5" /> Lancer le Scanner
                        </button>
                    </div>
                </div>
            </div>

            {/* Tasks List Container */}
            <div className="px-6 flex-1 bg-white dark:bg-slate-900 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] pt-8 pb-32">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-sm font-black uppercase italic tracking-tighter flex items-center gap-2">
                            <ListChecks className="w-4 h-4 text-indigo-500" /> Mes Missions
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Planning du 14 Avril</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-slate-500 border border-slate-200/50 dark:border-slate-700">{activeTasks.length} Activités</span>
                </div>

                <div className="space-y-4">
                    {activeTasks.map((task) => (
                        <Link href={`/work-orders/${task.id}`} key={task.id}>
                            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-5 flex items-center gap-4 border border-slate-100 dark:border-slate-800/50 active:bg-slate-100 dark:active:bg-slate-800 transition-all cursor-pointer group">
                                <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 border-2 ${task.priority === 'urgent' ? 'bg-red-500/5 text-red-500 border-red-500/20 shadow-lg shadow-red-500/10' : 'bg-indigo-500/5 text-indigo-500 border-indigo-500/20'}`}>
                                    <Wrench className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] font-mono font-black text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">#{task.number}</span>
                                        {task.priority === 'urgent' && <div className="text-[8px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded uppercase flex items-center gap-1">URGENT</div>}
                                    </div>
                                    <p className="text-base font-black italic uppercase tracking-tighter text-slate-900 dark:text-white line-clamp-1">{task.title}</p>
                                    <div className="flex items-center gap-3 mt-1 text-slate-400">
                                        <span className="text-[10px] font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> {task.time}</span>
                                        <span className="text-[10px] font-bold flex items-center gap-1 italic opacity-60">@ {task.asset}</span>
                                    </div>
                                </div>
                                <div className="size-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:border-indigo-500/30 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 p-4 rounded-3xl bg-amber-500/5 border border-amber-500/20 flex gap-4 items-center">
                    <div className="size-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase text-amber-700 dark:text-amber-500 italic">Rappel Sécurité</p>
                        <p className="text-[10px] font-medium text-amber-600/80">Port des EPI obligatoire sur la ligne de production 4.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Navigation (Premium Design) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-lg bg-slate-900/90 dark:bg-slate-100/10 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-[2.5rem] flex justify-between items-center z-50 shadow-2xl">
                <button className="flex flex-col items-center gap-1 text-white">
                    <Wrench className="w-5 h-5" />
                    <span className="text-[7px] font-black uppercase tracking-widest">Jobs</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-400">
                    <History className="w-5 h-5" />
                    <span className="text-[7px] font-black uppercase tracking-widest">Logs</span>
                </button>
                
                {/* Center Scan Button with intense glow */}
                <div className="relative -mt-10">
                    <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative size-14 bg-indigo-600 rounded-full border-4 border-slate-900 flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform cursor-pointer">
                        <Scan className="w-6 h-6" />
                    </div>
                </div>

                <button className="flex flex-col items-center gap-1 text-slate-400">
                    <Map className="w-5 h-5" />
                    <span className="text-[7px] font-black uppercase tracking-widest">Map</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-400">
                    <User className="w-5 h-5" />
                    <span className="text-[7px] font-black uppercase tracking-widest">Me</span>
                </button>
            </div>
        </div>
    );
}

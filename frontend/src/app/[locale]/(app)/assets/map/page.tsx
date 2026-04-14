'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Map, Settings, AlertTriangle, PlayCircle } from 'lucide-react';

export default function AssetMapPage() {
    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-[calc(100vh-6rem)] relative overflow-hidden flex flex-col">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 dark:bg-orange-500/5 blur-[120px] -z-10 pointer-events-none rounded-full"></div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-white dark:bg-slate-900 text-indigo-600 dark:text-orange-500 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <Map className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                            Cartographie <span className="text-indigo-600 dark:text-orange-500 not-italic">GMAO</span>
                        </h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                            Localisation spatiale des équipements
                        </p>
                    </div>
                </div>

                <Link href="/assets">
                    <button className="h-[52px] px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 dark:hover:border-orange-500/50 flex items-center gap-2 transition-all shadow-sm">
                        <ArrowLeft className="w-4 h-4" /> Mode Registre
                    </button>
                </Link>
            </div>

            {/* Mock Map View Container */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ 
                    backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                }}></div>
                
                {/* Simulated Pins */}
                <div className="absolute top-[30%] left-[40%] animate-pulse z-10 cursor-pointer group/pin">
                    <div className="size-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg relative">
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 shadow-xl">
                            Pompe Principale - USINE-L1
                        </div>
                    </div>
                </div>

                <div className="absolute top-[60%] left-[70%] z-10 cursor-pointer group/pin">
                    <div className="size-4 bg-amber-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg relative animate-bounce">
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 shadow-xl">
                            <div className="flex items-center gap-2">
                                <Settings className="w-3 h-3 animate-spin" /> Unité CVC - En Maintenance
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[20%] left-[80%] z-10 cursor-pointer group/pin">
                    <div className="size-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg relative">
                        <div className="absolute top-0 right-0 size-full bg-red-500 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 shadow-xl">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3 text-red-500" /> Convoyeur - En Panne
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integration overlay placeholder */}
                <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center z-0">
                    <Map className="size-20 text-indigo-500/20 dark:text-orange-500/20 mb-6" />
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white mb-2">Cartographie Bientôt Disponible</h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-sm text-center mb-8">
                        L'intégration BIM / WebGL sera déployée lors de la phase 2. Actuellement, naviguez via le Registre standard.
                    </p>
                    <button className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-xl">
                        <PlayCircle className="w-4 h-4" /> Voir Démo BIM
                    </button>
                </div>
            </div>
        </div>
    );
}

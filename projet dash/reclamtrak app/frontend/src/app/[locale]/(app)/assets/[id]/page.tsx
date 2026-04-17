'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
    ArrowLeft, Settings, History, PenTool, AlertTriangle, 
    CheckCircle2, Box, Calendar, Wrench, BarChart2, Activity, Shield
} from 'lucide-react';

export default function AssetDetailsPage() {
    const params = useParams();
    
    // Mock data for Phase 1
    const asset = { 
        id: params?.id || '1', 
        code: 'USINE-L1-POMPE-001', 
        name: 'Pompe Hydraulique Principale', 
        category: 'Mécanique', 
        status: 'operational', 
        site: 'Usine Nord',
        zone: 'Zone de Production B',
        position: 'Ligne 1 - Section 4',
        criticality: 'A',
        classification: 'INTERNAL',
        installDate: '2023-05-12',
        specs: {
            Marque: 'Grundfos',
            Modèle: 'CRN 32-4',
            Puissance: '15 kW',
            Pression: '10 bar'
        }
    };

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-[calc(100vh-6rem)] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Back link & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <Link href="/assets" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 dark:hover:text-orange-500 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl w-fit shadow-sm">
                    <ArrowLeft className="w-4 h-4" /> Retour au Registre
                </Link>

                <div className="flex gap-3">
                    <button className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 dark:hover:border-orange-500/50 flex items-center gap-2 transition-all shadow-sm">
                        <PenTool className="w-4 h-4 text-slate-400" /> Signaler Panne
                    </button>
                    <button className="px-5 py-3 rounded-xl bg-indigo-600 dark:bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 dark:shadow-orange-600/20">
                        <Wrench className="w-4 h-4" /> Créer OT
                    </button>
                </div>
            </div>

            {/* Header / Identity Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm relative z-10">
                <div className="h-32 bg-slate-100 dark:bg-slate-800/50 w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent dark:from-orange-500/10"></div>
                </div>
                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-12">
                        <div className="flex items-end gap-6">
                            <div className="size-24 rounded-[1.5rem] bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center p-1 z-10">
                                <div className="w-full h-full rounded-2xl bg-indigo-50 dark:bg-orange-500/10 border border-indigo-100 dark:border-orange-500/20 flex items-center justify-center text-indigo-500 dark:text-orange-500">
                                    <Box className="size-10" />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        Criticité {asset.criticality}
                                    </span>
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                        <Shield className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">{asset.classification}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Opérationnel</span>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                                    {asset.name}
                                </h1>
                                <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mt-1">
                                    {asset.code}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                {/* Left Col: Specs & Info */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                            <Box className="w-4 h-4 text-indigo-500 dark:text-orange-500" /> Localisation
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Site</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{asset.site}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Zone</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{asset.zone}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Position</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{asset.position}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                            <Settings className="w-4 h-4 text-indigo-500 dark:text-orange-500" /> Spécifications
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(asset.specs).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                                    <span className="text-xs font-bold text-slate-500">{key}</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Timeline & KPIs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-indigo-600 dark:bg-orange-600 rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition-all"></div>
                            <Activity className="size-8 text-white/50 mb-4" />
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-white/70 mb-1">MTBF Actuel</h4>
                            <div className="text-4xl font-black italic tracking-tighter">1,240 <span className="text-xl">heures</span></div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                            <BarChart2 className="size-8 text-slate-300 dark:text-slate-600 mb-4" />
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Taux de Disponibilité</h4>
                            <div className="text-4xl font-black text-indigo-600 dark:text-orange-500 italic tracking-tighter">98.5<span className="text-xl">%</span></div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm h-[400px]">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
                                <History className="w-4 h-4 text-indigo-500 dark:text-orange-500" /> Historique d'Interventions
                            </h3>
                        </div>
                        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center opacity-50">
                            <AlertTriangle className="size-16 text-slate-300 dark:text-slate-600 mb-4" />
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Aucune intervention récente répertoriée.</p>
                            <p className="text-[10px] font-medium text-slate-400 mt-2 max-w-xs">Les ordres de travail liés à cet équipement s'afficheront ici une fois rattachés.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

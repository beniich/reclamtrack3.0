'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Activity, Box, MapPin, Search, Plus, Filter, 
    Settings, Zap, AlertTriangle, CheckCircle2, ChevronRight, Shield
} from 'lucide-react';
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

export default function AssetsRegistryPage() {
    // Mock data for Phase 1 presentation
    const mockAssets = [
        { id: '1', code: 'USINE-L1-POMPE-001', name: 'Pompe Hydraulique Principale', category: 'Mécanique', status: 'operational', site: 'Usine Nord', criticality: 'A', classification: 'INTERNAL', value: 12500, budget: 1500, hasGeo: true },
        { id: '2', code: 'CVC-TOIT-04', name: 'Unité CVC Bloc B', category: 'HVAC', status: 'maintenance', site: 'Siège Social', criticality: 'B', classification: 'CONFIDENTIAL', value: 45000, budget: 5000, hasGeo: false },
        { id: '3', code: 'ELEC-TGBT-01', name: 'Tableau Général Basse Tension', category: 'Électrique', status: 'operational', site: 'Usine Sud', criticality: 'A', classification: 'RESTRICTED', value: 85000, budget: 2000, hasGeo: true },
        { id: '4', code: 'PROD-CONV-12', name: 'Convoyeur Ligne de Tri', category: 'Mécanique', status: 'faulty', site: 'Entrepôt Central', criticality: 'A', classification: 'INTERNAL', value: 22000, budget: 3500, hasGeo: true },
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'operational': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'maintenance': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'faulty': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'operational': return <CheckCircle2 className="w-3 h-3" />;
            case 'maintenance': return <Settings className="w-3 h-3 animate-spin-slow" />;
            case 'faulty': return <AlertTriangle className="w-3 h-3" />;
            default: return <Activity className="w-3 h-3" />;
        }
    };

    const getClassificationColor = (cls: string) => {
        switch(cls) {
            case 'PUBLIC': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'INTERNAL': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'CONFIDENTIAL': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'RESTRICTED': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-screen relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-orange-500/5 blur-[120px] -z-10 pointer-events-none rounded-full"></div>
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-600 dark:bg-orange-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30 dark:shadow-orange-500/20">
                        <Box className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                            Registre <span className="text-indigo-600 dark:text-orange-500 not-italic">Équipements</span>
                        </h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                            Gestion du parc GMAO & Asset Management
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Link href="/assets/map">
                        <button className="h-[52px] px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 dark:hover:border-orange-500/50 flex items-center gap-2 transition-all shadow-sm">
                            <MapPin className="w-4 h-4" /> Vue Plan
                        </button>
                    </Link>
                    <button className="h-[52px] bg-indigo-600 dark:bg-orange-500 hover:brightness-110 text-white rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-600/20 dark:shadow-orange-600/20 transition-all">
                        <Plus className="w-4 h-4" /> Nouvel Équipement
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Rechercher par code, nom..." 
                        className="w-full h-[52px] pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[12px] font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-orange-500/20 transition-all"
                    />
                </div>
                <div className="flex gap-4">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] h-[52px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            <SelectValue placeholder="Catégorie" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                            <SelectItem value="all">Toutes Catégories</SelectItem>
                            <SelectItem value="mec">Mécanique</SelectItem>
                            <SelectItem value="elec">Électrique</SelectItem>
                            <SelectItem value="hvac">HVAC</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] h-[52px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            <SelectValue placeholder="Classification" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                            <SelectItem value="all">Toutes Classes</SelectItem>
                            <SelectItem value="PUBLIC">PUBLIC</SelectItem>
                            <SelectItem value="INTERNAL">INTERNAL</SelectItem>
                            <SelectItem value="CONFIDENTIAL">CONFIDENTIAL</SelectItem>
                            <SelectItem value="RESTRICTED">RESTRICTED</SelectItem>
                        </SelectContent>
                    </Select>
                    <button className="w-[52px] h-[52px] flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Filter className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                    </button>
                </div>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
                {mockAssets.map((asset, i) => (
                    <Link href={`/assets/${asset.id}`} key={asset.id}>
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 p-6 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:border-orange-500/30 transition-all group cursor-pointer animate-in zoom-in-95 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${getStatusColor(asset.status)}`}>
                                    {getStatusIcon(asset.status)}
                                    <span className="text-[9px] font-black uppercase tracking-widest">{asset.status}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${getClassificationColor(asset.classification)}`}>
                                        <Shield className="w-3 h-3" />
                                        <span className="text-[8px] font-black tracking-widest uppercase">{asset.classification}</span>
                                    </div>
                                    <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-400">{asset.criticality}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-orange-400 transition-colors">
                                {asset.name}
                            </h3>
                            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/50 px-2 py-1 rounded inline-block mb-3">
                                {asset.code}
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Valeur Actuelle</span>
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{asset.value.toLocaleString()} €</span>
                                </div>
                                <div className="h-6 w-px bg-slate-100 dark:bg-slate-800"></div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Budget Maint.</span>
                                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-500">{asset.budget.toLocaleString()} €</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Catégorie</span>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{asset.category}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Localisation</span>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{asset.site}</span>
                                            {asset.hasGeo && <MapPin className="w-3 h-3 text-indigo-500 dark:text-orange-500" />}
                                        </div>
                                    </div>
                                </div>
                                <div className="size-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-orange-500 group-hover:text-white transition-all">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

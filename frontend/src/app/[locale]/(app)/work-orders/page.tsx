'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Wrench, Plus, Search, Filter, Clock, 
    CheckCircle2, AlertCircle, Calendar, Play
} from 'lucide-react';
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

export default function WorkOrdersPage() {
    // Mock data for Phase 2 OT list
    const mockWOs = [
        { id: '1', number: 'WO-2026-0001', title: 'Remplacement Roulement P1', type: 'corrective', status: 'in_progress', asset: 'Pompe Hydraulique Principal', priority: 'high', date: '2026-04-14' },
        { id: '2', number: 'WO-2026-0002', title: 'Inspection Mensuelle CVC', type: 'preventive', status: 'planned', asset: 'Unité CVC Bloc B', priority: 'medium', date: '2026-04-15' },
        { id: '3', number: 'WO-2026-0003', title: 'Mise à niveau FirmWare API', type: 'improvement', status: 'draft', asset: 'TGBT Ligne 2', priority: 'low', date: '2026-04-20' },
        { id: '4', number: 'WO-2026-0004', title: 'Contrôle Réglementaire VGP', type: 'inspection', status: 'closed', asset: 'Palan 5 Tonnes', priority: 'medium', date: '2026-04-10' },
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'draft': return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
            case 'planned': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
            case 'in_progress': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'closed': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'corrective': return 'text-red-500 bg-red-500/10';
            case 'preventive': return 'text-indigo-500 bg-indigo-500/10';
            case 'improvement': return 'text-emerald-500 bg-emerald-500/10';
            case 'inspection': return 'text-purple-500 bg-purple-500/10';
            default: return '';
        }
    };

    const getStatusText = (status: string) => {
        const labels: Record<string, string> = {
            draft: 'Brouillon',
            planned: 'Planifié',
            in_progress: 'En Cours',
            closed: 'Clôturé'
        };
        return labels[status] || status;
    };

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-[calc(100vh-6rem)] relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 dark:bg-red-500/10 blur-[120px] -z-10 pointer-events-none rounded-full"></div>
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-600 dark:bg-red-500 text-white rounded-2xl shadow-lg shadow-red-500/30 dark:shadow-red-500/20">
                        <Wrench className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                            Ordres <span className="text-red-600 dark:text-red-500 not-italic">de Travail (OT)</span>
                        </h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                            Gestion des Interventions & Réparations
                        </p>
                    </div>
                </div>

                <button className="h-[52px] bg-red-600 dark:bg-red-500 hover:brightness-110 text-white rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-red-600/20 dark:shadow-red-600/20 transition-all">
                    <Plus className="w-4 h-4" /> Créer OT
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 relative z-10">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Rechercher par référence WO, titre..." 
                        className="w-full h-[52px] pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[12px] font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/20 transition-all"
                    />
                </div>
                <div className="flex gap-4">
                    <Select defaultValue="all_status">
                        <SelectTrigger className="w-[160px] h-[52px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900">
                            <SelectItem value="all_status">Tous les Statuts</SelectItem>
                            <SelectItem value="draft">Brouillons</SelectItem>
                            <SelectItem value="planned">Planifiés</SelectItem>
                            <SelectItem value="in_progress">En Cours</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all_types">
                        <SelectTrigger className="w-[160px] h-[52px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            <SelectValue placeholder="Type OT" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900">
                            <SelectItem value="all_types">Tous Types</SelectItem>
                            <SelectItem value="corrective">Correctif</SelectItem>
                            <SelectItem value="preventive">Préventif</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <button className="w-[52px] h-[52px] flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Filter className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4 relative z-10">
                {mockWOs.map((wo, i) => (
                    <Link href={`/work-orders/${wo.id}`} key={wo.id}>
                        <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800/80 p-5 hover:border-red-500/30 flex items-center gap-6 cursor-pointer shadow-sm group transition-all animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                            
                            <div className={`p-4 rounded-xl ${getTypeColor(wo.type)}`}>
                                <Wrench className="w-5 h-5" />
                            </div>

                            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] font-mono font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                            {wo.number}
                                        </span>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${getStatusColor(wo.status)}`}>
                                            {getStatusText(wo.status)}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-black uppercase italic tracking-tight text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                                        {wo.title}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                            <AlertCircle className="w-3.5 h-3.5" /> Équipement: {wo.asset}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" /> {wo.date}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                        <Play className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

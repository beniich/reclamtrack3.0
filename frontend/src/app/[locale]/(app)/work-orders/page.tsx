'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Wrench, Plus, Search, Filter,
    CheckCircle2, AlertCircle, Calendar, Play
} from 'lucide-react';
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Skeleton } from '@chakra-ui/react';

export default function WorkOrdersPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all_status');
    const [typeFilter, setTypeFilter] = useState('all_types');

    // Fetch Work Orders from API
    const { data: workOrdersData, isLoading, error } = useQuery({
        queryKey: ['work-orders', statusFilter, typeFilter],
        queryFn: async () => {
            const params: any = {};
            if (statusFilter !== 'all_status') params.status = statusFilter;
            if (typeFilter !== 'all_types') params.type = typeFilter;
            
            const res = await apiClient.get('/work-orders', { params });
            return res.data.data || [];
        }
    });

    const workOrders = workOrdersData || [];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'draft': return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
            case 'planned': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
            case 'assigned': return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
            case 'in_progress': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'closed': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            case 'validated': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
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
            assigned: 'Assigné',
            in_progress: 'En Cours',
            closed: 'Clôturé',
            validated: 'Validé'
        };
        return labels[status] || status;
    };

    const filteredWorkOrders = workOrders.filter((wo: any) => 
        wo.number.toLowerCase().includes(search.toLowerCase()) ||
        wo.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-6rem)] relative overflow-hidden font-display">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 dark:bg-red-500/10 blur-[120px] -z-10 pointer-events-none rounded-full"></div>
            
            {/* Header */}
            <div className="flex flex-col lg:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-red-600 dark:bg-red-500 text-white rounded-[1.5rem] shadow-2xl shadow-red-500/30 flex items-center justify-center">
                        <Wrench className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter flex items-center gap-3">
                            Work <span className="text-red-600 dark:text-red-500 not-italic">Orders Control</span>
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">
                                {workOrders.filter((w:any) => w.status === 'in_progress').length} Interventions en temps réels
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="h-[52px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all">
                        Historique
                    </button>
                    <button className="h-[52px] bg-red-600 dark:bg-red-500 hover:brightness-110 text-white rounded-2xl px-8 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl shadow-red-600/20 transition-all">
                        <Plus className="w-4 h-4" /> Créer OT Industrial
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 relative z-10">
                <div className="flex-1 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Rechercher par référence WO, titre..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-[56px] pl-14 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[12px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all shadow-sm"
                    />
                </div>
                <div className="flex gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px] h-[56px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-800">
                            <SelectItem value="all_status">Tous les Statuts</SelectItem>
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="planned">Planifié</SelectItem>
                            <SelectItem value="assigned">Assigné</SelectItem>
                            <SelectItem value="in_progress">En Cours</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[180px] h-[56px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            <SelectValue placeholder="Type OT" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-800">
                            <SelectItem value="all_types">Tous Types</SelectItem>
                            <SelectItem value="corrective">Correctif</SelectItem>
                            <SelectItem value="preventive">Préventif</SelectItem>
                            <SelectItem value="inspection">Inspection</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <button className="w-[56px] h-[56px] flex items-center justify-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
                        <Filter className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4 relative z-10 pb-12">
                {isLoading ? (
                    [1, 2, 3].map(i => <Skeleton key={i} height="100px" borderRadius="1.5rem" mb={4} />)
                ) : error ? (
                    <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-red-500/20">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white">Échec de synchronisation</h4>
                        <p className="text-xs text-slate-500 mt-2">Veuillez vérifier votre connexion au serveur GMAO.</p>
                    </div>
                ) : filteredWorkOrders.length === 0 ? (
                    <div className="p-20 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                        <div className="size-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
                            <Wrench className="w-8 h-8 text-slate-300" />
                        </div>
                        <h4 className="text-base font-black uppercase text-slate-400">Aucun Ordre de Travail trouvé</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Affinez vos filtres ou générez un nouvel OT</p>
                    </div>
                ) : (
                    filteredWorkOrders.map((wo: any, i: number) => (
                        <Link href={`/work-orders/${wo._id}`} key={wo._id}>
                            <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800/80 p-5 hover:border-red-500/40 flex items-center gap-6 cursor-pointer shadow-sm group transition-all animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 50}ms` }}>
                                
                                <div className={`p-4 rounded-2xl ${getTypeColor(wo.type)} flex items-center justify-center border border-current opacity-70 group-hover:opacity-100 transition-opacity`}>
                                    <Wrench className="w-5 h-5" />
                                </div>

                                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[10px] font-mono font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                                {wo.number}
                                            </span>
                                            <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border ${getStatusColor(wo.status)}`}>
                                                {getStatusText(wo.status)}
                                            </span>
                                            {wo.priority === 'urgent' && (
                                                <span className="flex items-center gap-1 text-[9px] font-black uppercase text-red-500 bg-red-50 px-2 py-1 rounded-full">
                                                    <AlertCircle className="w-3 h-3" /> Urgent
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base font-black uppercase italic tracking-tight text-slate-900 dark:text-white group-hover:text-red-500 transition-colors truncate">
                                            {wo.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
                                            <span className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                                                <Layout className="w-3.5 h-3.5 text-indigo-500" /> 
                                                Asset: <span className="text-slate-600 dark:text-slate-200">{wo.assetId?.name || 'N/A'}</span>
                                            </span>
                                            <span className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                                                <Calendar className="w-3.5 h-3.5 text-red-500" /> 
                                                Date: <span className="text-slate-600 dark:text-slate-200">{new Date(wo.createdAt).toLocaleDateString()}</span>
                                            </span>
                                            {wo.assignedTeamId && (
                                                <span className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                                                    <Truck className="w-3.5 h-3.5 text-emerald-500" /> 
                                                    Equipe: <span className="text-slate-600 dark:text-slate-200">{wo.assignedTeamId.name}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="hidden lg:flex flex-col items-end mr-4">
                                            <div className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest italic">Avancement</div>
                                            <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full ${wo.status === 'closed' ? 'w-full bg-emerald-500' : 'w-1/3 bg-red-500'} rounded-full`}></div>
                                            </div>
                                        </div>
                                        <button className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:border-red-500/30 transition-all">
                                            <Play className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

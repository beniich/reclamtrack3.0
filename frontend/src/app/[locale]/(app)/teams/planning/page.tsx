'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, ChevronLeft, ChevronRight, Clock, X, MapPin } from 'lucide-react';
import { useInterventionStore, Intervention } from '@/store/interventionStore';
import { InterventionForm } from '@/components/planning/InterventionForm';
import { cn } from '@/lib/utils';

export default function PlanningPage() {
    const { interventions, isLoading, fetchInterventions, addIntervention, updateIntervention, deleteIntervention } = useInterventionStore();
    
    useEffect(() => {
        fetchInterventions();
    }, [fetchInterventions]);
    
    // State for modal
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingIntervention, setEditingIntervention] = useState<Intervention | undefined>(undefined);
    
    // State for selection
    const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);

    // Filter state
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        water: true,
        electricity: true,
        gas: true
    });

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'WATER': return 'water';
            case 'ELECTRICITY': return 'electricity';
            case 'GAS': return 'gas';
            default: return 'slate';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'WATER': return 'water_drop';
            case 'ELECTRICITY': return 'bolt';
            case 'GAS': return 'local_fire_department';
            default: return 'build';
        }
    };

    const handleOpenForm = (intervention?: Intervention) => {
        setEditingIntervention(intervention);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingIntervention(undefined);
    };

    const handleSubmitForm = (data: any) => {
        if (editingIntervention) {
            updateIntervention(editingIntervention.id, data);
            if (selectedIntervention?.id === editingIntervention.id) {
                setSelectedIntervention({ ...selectedIntervention, ...data });
            }
        } else {
            addIntervention(data);
        }
        handleCloseForm();
    };

    const handleDelete = (id: string) => {
        if (confirm('Voulez-vous vraiment supprimer cette intervention ?')) {
            deleteIntervention(id);
            if (selectedIntervention?.id === id) {
                setSelectedIntervention(null);
            }
        }
    };

    // Derived data
    const unscheduled = interventions.filter(int => int.status === 'UNSCHEDULED');
    
    // Filter active items for display
    const filteredInterventions = interventions.filter(int => {
        if (search && !int.title.toLowerCase().includes(search.toLowerCase()) && !int.code.toLowerCase().includes(search.toLowerCase())) return false;
        if (!filters.water && int.category === 'WATER') return false;
        if (!filters.electricity && int.category === 'ELECTRICITY') return false;
        if (!filters.gas && int.category === 'GAS') return false;
        return true;
    });

    // Just for demo, we group scheduled items for Thursday (id 5)
    const scheduled = filteredInterventions.filter(int => int.status === 'SCHEDULED' || int.status === 'IN_PROGRESS');

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased h-[calc(100vh-2rem)] flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-border-dark relative">
            
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-border-dark bg-white dark:bg-background px-6 py-3 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary text-white p-1.5 rounded-lg">
                            <span className="material-symbols-outlined block">event_busy</span>
                        </div>
                        <h2 className="text-lg font-bold tracking-tight">Intervention Manager</h2>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        <input 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400" 
                            placeholder="Rechercher (ex: #INT...)" 
                            type="text" 
                        />
                    </div>
                    <button 
                        onClick={() => handleOpenForm()}
                        type="button" 
                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                    >
                        <Plus className="text-lg" />
                        Nouvelle Intervention
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Filters & Unscheduled */}
                <aside className="w-72 border-r border-slate-200 dark:border-border-dark bg-white dark:bg-background overflow-y-auto flex flex-col shrink-0">
                    <div className="p-5 flex flex-col gap-8">
                        {/* Team Filters */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filtres Catégories</h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 p-2 hover:bg-primary/5 dark:hover:bg-violet-500/15 rounded-lg cursor-pointer transition-colors group">
                                    <input checked={filters.water} onChange={(e) => setFilters({...filters, water: e.target.checked})} className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    <span className="material-symbols-outlined text-water text-lg">water_drop</span>
                                    <span className="text-sm font-medium">Eau (Water)</span>
                                </label>
                                <label className="flex items-center gap-3 p-2 hover:bg-primary/5 dark:hover:bg-violet-500/15 rounded-lg cursor-pointer transition-colors group">
                                    <input checked={filters.electricity} onChange={(e) => setFilters({...filters, electricity: e.target.checked})} className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    <span className="material-symbols-outlined text-electricity text-lg">bolt</span>
                                    <span className="text-sm font-medium">Électricité</span>
                                </label>
                                <label className="flex items-center gap-3 p-2 hover:bg-primary/5 dark:hover:bg-violet-500/15 rounded-lg cursor-pointer transition-colors group">
                                    <input checked={filters.gas} onChange={(e) => setFilters({...filters, gas: e.target.checked})} className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    <span className="material-symbols-outlined text-gas text-lg">local_fire_department</span>
                                    <span className="text-sm font-medium">Gaz (Gas)</span>
                                </label>
                            </div>
                        </div>

                        {/* Unscheduled Interventions */}
                        <div className="flex flex-col gap-4 border-t border-slate-100 dark:border-border-dark pt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Non Planifiées</h3>
                                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">{unscheduled.length}</span>
                            </div>
                            <div className="space-y-3">
                                {unscheduled.length === 0 && (
                                    <p className="text-xs text-slate-400 italic">Aucune intervention en attente.</p>
                                )}
                                {unscheduled.map(int => (
                                    <div 
                                        key={int.id}
                                        onClick={() => setSelectedIntervention(int)}
                                        className={cn(
                                            "p-3 bg-slate-50 dark:bg-slate-800/50 border rounded-lg cursor-pointer hover:border-primary transition-all group",
                                            selectedIntervention?.id === int.id ? "border-primary shadow-sm" : "border-slate-200 dark:border-slate-700"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-bold text-slate-400">{int.code}</span>
                                            <span className={`bg-${getCategoryColor(int.category)}/20 text-${getCategoryColor(int.category)} text-[9px] px-1.5 py-0.5 rounded font-bold`}>
                                                {int.category}
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold leading-tight mb-2">{int.title}</p>
                                        <div className="flex justify-between items-center text-[10px] text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">
                                                    {int.priority === 'HIGH' || int.priority === 'EMERGENCY' ? 'priority_high' : 'info'}
                                                </span> 
                                                {int.priority}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Calendar View (Simplified for functionality) */}
                <main className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-900/50 overflow-hidden p-6">
                    <div className="bg-white dark:bg-background rounded-xl border border-slate-200 dark:border-slate-800 flex-1 flex flex-col shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">
                            <h2 className="text-lg font-bold">Interventions Planifiées ({scheduled.length})</h2>
                            <p className="text-sm text-slate-500">Aperçu liste dynamique des interventions assignées.</p>
                        </div>
                        
                        <div className="flex-1 overflow-auto p-4 space-y-3">
                            {scheduled.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_available</span>
                                    <p>Aucune intervention planifiée.</p>
                                </div>
                            )}

                            {scheduled.map(int => (
                                <div 
                                    key={int.id}
                                    onClick={() => setSelectedIntervention(int)}
                                    className={cn(
                                        `flex items-center justify-between p-4 rounded-xl border-l-4 border-${getCategoryColor(int.category)} cursor-pointer transition-all hover:-translate-y-px hover:shadow-md`,
                                        selectedIntervention?.id === int.id 
                                            ? "bg-primary/5 border-r border-t border-b border-r-primary/20 border-t-primary/20 border-b-primary/20" 
                                            : "bg-slate-50 dark:bg-slate-800 border-r border-t border-b border-slate-200 dark:border-slate-700"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full bg-${getCategoryColor(int.category)}/10 flex items-center justify-center`}>
                                            <span className={`material-symbols-outlined text-${getCategoryColor(int.category)}`}>
                                                {getCategoryIcon(int.category)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-sm">{int.title}</h4>
                                                <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-mono">{int.code}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 flex items-center gap-3">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {int.date} | {int.startTime} - {int.endTime}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {int.location}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold">{int.teamName}</p>
                                        <p className="text-xs text-slate-500">{int.teamLead}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Quick View Overlay */}
            {selectedIntervention && (
                <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5 transform translate-y-0 transition-transform z-50">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className={`text-[10px] font-bold text-${getCategoryColor(selectedIntervention.category)} px-2 py-0.5 bg-${getCategoryColor(selectedIntervention.category)}/10 rounded mb-1 inline-block uppercase`}>
                                {selectedIntervention.status}
                            </span>
                            <h4 className="text-sm font-bold">{selectedIntervention.code} Details</h4>
                        </div>
                        <button onClick={() => setSelectedIntervention(null)} type="button" className="text-slate-400 hover:text-slate-600"><X className="text-lg" /></button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-lg leading-tight mb-1">{selectedIntervention.title}</h3>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-500">
                                Priorité: <span className={selectedIntervention.priority === 'HIGH' || selectedIntervention.priority === 'EMERGENCY' ? 'text-red-500' : ''}>{selectedIntervention.priority}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="text-slate-400" />
                            <div>
                                <p className="text-xs font-bold">{selectedIntervention.location}</p>
                                <p className="text-[10px] text-slate-500">Customer: {selectedIntervention.customerName}</p>
                            </div>
                        </div>
                        
                        {(selectedIntervention.teamName || selectedIntervention.teamLead) && (
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-slate-400">engineering</span>
                                <div>
                                    <p className="text-xs font-bold">{selectedIntervention.teamName || 'Non assigné'}</p>
                                    <p className="text-[10px] text-slate-500">Lead: {selectedIntervention.teamLead || '-'}</p>
                                </div>
                            </div>
                        )}
                        
                        {selectedIntervention.date && (
                            <div className="flex items-start gap-3">
                                <Clock className="text-slate-400" />
                                <div>
                                    <p className="text-xs font-bold">{selectedIntervention.date}</p>
                                    <p className="text-[10px] text-slate-500">{selectedIntervention.startTime} - {selectedIntervention.endTime}</p>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 flex flex-col gap-2">
                            <Button onClick={() => handleOpenForm(selectedIntervention)} variant="primary" className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg">
                                Modifier l'intervention
                            </Button>
                            <Button onClick={() => handleDelete(selectedIntervention.id)} variant="outline" className="w-full py-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 text-xs font-bold rounded-lg transition-colors">
                                Supprimer
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Form */}
            {isFormOpen && (
                <InterventionForm 
                    initialData={editingIntervention} 
                    onSubmit={handleSubmitForm} 
                    onCancel={handleCloseForm} 
                />
            )}
        </div>
    );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Intervention, InterventionCategory, InterventionPriority } from '@/store/interventionStore';
import { X } from 'lucide-react';

interface InterventionFormProps {
    initialData?: Intervention;
    onSubmit: (data: Omit<Intervention, 'id' | 'code'>) => void;
    onCancel: () => void;
}

export function InterventionForm({ initialData, onSubmit, onCancel }: InterventionFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [category, setCategory] = useState<InterventionCategory>(initialData?.category || 'WATER');
    const [priority, setPriority] = useState<InterventionPriority>(initialData?.priority || 'MEDIUM');
    const [date, setDate] = useState(initialData?.date || '');
    const [startTime, setStartTime] = useState(initialData?.startTime || '');
    const [endTime, setEndTime] = useState(initialData?.endTime || '');
    const [teamName, setTeamName] = useState(initialData?.teamName || '');
    const [teamLead, setTeamLead] = useState(initialData?.teamLead || '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [customerName, setCustomerName] = useState(initialData?.customerName || '');
    const [status, setStatus] = useState<'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'UNSCHEDULED'>(initialData?.status || 'UNSCHEDULED');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // If a date and time is provided, we assume it's scheduled
        const computedStatus = (date && startTime && endTime) ? 'SCHEDULED' : 'UNSCHEDULED';
        
        onSubmit({
            title,
            category,
            priority,
            date,
            startTime,
            endTime,
            teamName,
            teamLead,
            location,
            customerName,
            status: status !== 'UNSCHEDULED' ? status : computedStatus
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-bold">{initialData ? 'Modifier l\'Intervention' : 'Nouvelle Intervention'}</h2>
                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Titre de l'intervention</label>
                        <input 
                            required
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Ex: Réparation fuite principale"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catégorie</label>
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value as InterventionCategory)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="WATER">Eau (WATER)</option>
                                <option value="ELECTRICITY">Électricité (ELECTRICITY)</option>
                                <option value="GAS">Gaz (GAS)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Priorité</label>
                            <select 
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as InterventionPriority)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="LOW">Basse</option>
                                <option value="MEDIUM">Moyenne</option>
                                <option value="HIGH">Haute</option>
                                <option value="EMERGENCY">Urgence</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Localisation & Client</label>
                        <div className="space-y-3">
                            <input 
                                type="text" 
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Adresse (ex: 124 Downtown Ave)"
                            />
                            <input 
                                type="text" 
                                value={customerName} 
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Nom du Client"
                            />
                        </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Équipe assignée</label>
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                value={teamName} 
                                onChange={(e) => setTeamName(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Nom de l'équipe"
                            />
                            <input 
                                type="text" 
                                value={teamLead} 
                                onChange={(e) => setTeamLead(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Chef d'équipe"
                            />
                        </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2 bg-slate-50/50 dark:bg-slate-800/30 -mx-6 px-6 pb-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Planification (Optionnel)</label>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 mb-1">Date</label>
                                <input 
                                    type="date" 
                                    value={date} 
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 mb-1">Heure de début</label>
                                <input 
                                    type="time" 
                                    value={startTime} 
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 mb-1">Heure de fin</label>
                                <input 
                                    type="time" 
                                    value={endTime} 
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">Laissez vide pour garder l'intervention en statut "Non planifié" (Unscheduled).</p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 py-2 font-bold">Annuler</Button>
                        <Button type="submit" className="flex-1 py-2 bg-primary text-white font-bold hover:bg-primary/90">{initialData ? 'Enregistrer' : 'Créer l\'intervention'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

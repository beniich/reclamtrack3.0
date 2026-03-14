'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { staffApi } from '@/lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface AssignmentModalProps {
    onClose: () => void;
    onAssign?: (data: any) => void;
}

export default function AssignmentModal({ onClose, onAssign }: AssignmentModalProps) {
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
    const [taskNature, setTaskNature] = useState('Main Valve Repair - Sector 4B');
    const [duration, setDuration] = useState('2 Hours 30 Minutes');

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const data = await staffApi.getAll();
                setStaff(data);
            } catch (error) {
                toast.error('Erreur lors du chargement du personnel');
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    const handleConfirm = () => {
        if (!selectedStaff) {
            toast.error('Veuillez sélectionner un membre du personnel');
            return;
        }
        if (onAssign) {
            onAssign({
                staffId: selectedStaff,
                task: taskNature,
                duration
            });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-display">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <span className="material-symbols-outlined text-blue-500">assignment_add</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white leading-none">Assignation Avancée</h2>
                            <p className="text-xs text-slate-500 mt-1">Configurez les détails de la tâche et le personnel assigné.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Left Column */}
                        <div className="md:col-span-7 space-y-6">
                            <section>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Spécifications Tâche</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5 ml-1">Nature de la tâche</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">construction</span>
                                            <input
                                                className="w-full bg-slate-800 border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                type="text"
                                                value={taskNature}
                                                onChange={(e) => setTaskNature(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5 ml-1">Durée Estimée</label>
                                        <select
                                            className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        >
                                            <option>2 Hours 30 Minutes</option>
                                            <option>4 Hours</option>
                                            <option>Full Shift (8h)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5 ml-1">Niveau Priorité</label>
                                        <div className="flex gap-2">
                                            <button className="flex-1 py-2 rounded-lg bg-red-900/20 border border-red-500/50 text-red-500 text-xs font-bold ring-2 ring-red-500/20">Urgent</button>
                                            <button className="flex-1 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold hover:bg-slate-700 transition-colors">Standard</button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Personnel Disponible</h3>
                                </div>

                                {loading ? (
                                    <div className="flex justify-center py-8">
                                        <LoadingSpinner />
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {staff.map((person) => (
                                            <div
                                                key={person._id}
                                                className={`p-3 bg-slate-800/50 border ${selectedStaff === person._id ? 'border-blue-500' : 'border-slate-700/50'} rounded-xl flex items-center justify-between group hover:border-slate-600 transition-all cursor-pointer`}
                                                onClick={() => setSelectedStaff(person._id)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                                                            {person.name.split(' ').map((n: string) => n[0]).join('')}
                                                        </div>
                                                        <span className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-slate-900 rounded-full ${person.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-200">{person.name}</p>
                                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{person.role}</p>
                                                    </div>
                                                </div>
                                                <div className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedStaff === person._id ? 'border-blue-500 bg-blue-500' : 'border-slate-600'}`}>
                                                    {selectedStaff === person._id && <span className="material-symbols-outlined text-[12px] text-white">check</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Right Column (Placeholder for assets) */}
                        <div className="md:col-span-5 space-y-6">
                            <section>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Équipement & Véhicule</h3>
                                <div className="bg-slate-950/40 rounded-xl border border-slate-800 p-4 space-y-4">
                                    <p className="text-xs text-slate-500 italic">Configuration des ressources matérielles prochainement disponible...</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-slate-400">
                            {selectedStaff ? '1 membre sélectionné' : 'Aucun membre sélectionné'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">Annuler</button>
                        <button
                            onClick={handleConfirm}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!selectedStaff}
                        >
                            Confirmer Assignation
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

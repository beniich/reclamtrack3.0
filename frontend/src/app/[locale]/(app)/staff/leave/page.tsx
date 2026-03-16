'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { leaveApi } from '@/lib/api';
import { useOrgStore } from '@/store/orgStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertCircle, ArrowRight, Calendar, CheckCircle, Clock, Filter, Plus, Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LeavePage() {
    const [leaves, setLeaves] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { activeOrganization, isLoading: isOrgLoading } = useOrgStore();

    useEffect(() => {
        const fetchData = async () => {
            if (!activeOrganization) return;
            try {
                const [leavesData] = await Promise.all([
                    leaveApi.getAll()
                ]);
                setLeaves(leavesData);
            } catch (error) {
                console.error('Error fetching leave data:', error);
                toast.error('Impossible de charger les données de congés');
            } finally {
                setLoading(false);
            }
        };

        if (!isOrgLoading) {
            fetchData();
        }
    }, [activeOrganization, isOrgLoading]);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await leaveApi.updateStatus(id, status);
            setLeaves(prev => prev.map(l => l._id === id ? { ...l, status } : l));
            toast.success(`Congé ${status === 'Approved' ? 'approuvé' : 'refusé'}`);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Erreur lors de la mise à jour du statut');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 bg-brand-midnight min-h-screen font-display selection:bg-cyan-500 selection:text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none"></div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                        <Calendar className="text-cyan-400 w-8 h-8" />
                        Gestion des Absences
                    </h1>
                    <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px] mt-1 font-black ml-11">
                        PLANIFICATION & VALIDATION DES CONGÉS
                    </p>
                </div>
                <button className="bg-brand-orange hover:brightness-110 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all flex items-center gap-3">
                    <Plus className="w-4 h-4" />
                    Déposer une Demande
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'En attente', count: leaves.filter(l => l.status === 'Pending').length, color: 'text-amber-400', bg: 'bg-amber-400/10', icon: Clock },
                    { label: 'Approuvés', count: leaves.filter(l => l.status === 'Approved').length, color: 'text-emerald-400', bg: 'bg-emerald-400/10', icon: CheckCircle },
                    { label: 'Refusés', count: leaves.filter(l => l.status === 'Declined').length, color: 'text-red-400', bg: 'bg-red-400/10', icon: XCircle },
                    { label: 'Total', count: leaves.length, color: 'text-cyan-400', bg: 'bg-cyan-400/10', icon: Calendar },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl flex items-center gap-5">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-white italic tracking-tighter">{stat.count}</p>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Leave List */}
            <div className="glass-card rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="FILTRER PAR EMPLOYÉ..."
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold tracking-widest text-white outline-none focus:ring-2 focus:ring-cyan-500/20 uppercase placeholder:text-slate-700"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400">
                            <Filter className="w-3.5 h-3.5" />
                            Statut
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                                <th className="px-6 py-4">Employé</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Période</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4">Raison</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {leaves.length > 0 ? (
                                leaves.map((leave) => (
                                    <tr key={leave._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-primary">
                                                    {leave.staffId?.avatar ? (
                                                        <img src={leave.staffId.avatar} alt={leave.staffId.name} className="w-full h-full rounded-full object-cover" />
                                                    ) : (
                                                        leave.staffId?.name?.split(' ').map((n: string) => n[0]).join('') || '?'
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                                    {leave.staffId?.name || 'Inconnu'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                                leave.type === 'Sick' ? 'bg-red-100 text-red-600 dark:bg-red-900/20' :
                                                leave.type === 'Vacation' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' :
                                                'bg-purple-100 text-purple-600 dark:bg-purple-900/20'
                                            }`}>
                                                {leave.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                                                {format(new Date(leave.start), 'dd MMM', { locale: fr })}
                                                <ArrowRight className="w-3 h-3 text-slate-400" />
                                                {format(new Date(leave.end), 'dd MMM', { locale: fr })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                leave.status === 'Declined' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                                {leave.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-slate-500 max-w-[200px] truncate">
                                                {leave.reason || 'Aucune raison fournie'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {leave.status === 'Pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(leave._id, 'Approved')}
                                                        title="Approuver la demande"
                                                        className="size-8 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(leave._id, 'Declined')}
                                                        title="Refuser la demande"
                                                        className="size-8 bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    title="Détails de la demande"
                                                    className="text-slate-400 hover:text-primary transition-colors"
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic text-sm">
                                        Aucune demande de congé pour le moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { leaveApi, staffApi } from '@/lib/api';
import { useOrgStore } from '@/store/orgStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertCircle, ArrowRight, Calendar, CheckCircle, Clock, Filter, Plus, Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LeavePage() {
    const [leaves, setLeaves] = useState<any[]>([]);
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { activeOrganization, isLoading: isOrgLoading } = useOrgStore();

    useEffect(() => {
        const fetchData = async () => {
            if (!activeOrganization) return;
            try {
                const [leavesData, staffData] = await Promise.all([
                    leaveApi.getAll(),
                    staffApi.getAll()
                ]);
                setLeaves(leavesData);
                setStaff(staffData);
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
        <div className="p-6 space-y-6 bg-background-light dark:bg-background-dark min-h-screen font-display">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Calendar className="text-primary w-7 h-7" />
                        Gestion des Congés
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Suivez et validez les demandes d'absence de vos équipes.
                    </p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nouvelle Demande
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'En attente', count: leaves.filter(l => l.status === 'Pending').length, color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Clock },
                    { label: 'Approuvés', count: leaves.filter(l => l.status === 'Approved').length, color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle },
                    { label: 'Refusés', count: leaves.filter(l => l.status === 'Declined').length, color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle },
                    { label: 'Total', count: leaves.length, color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Calendar },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.count}</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Leave List */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Rechercher par employé..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
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
                                                        className="size-8 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(leave._id, 'Declined')}
                                                        className="size-8 bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="text-slate-400 hover:text-primary transition-colors">
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

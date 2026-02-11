'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { InterventionCalendar } from '@/components/planning/InterventionCalendar';
import { Calendar as CalendarIcon, Users } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'react-hot-toast';

export default function PlanningPage() {
    const queryClient = useQueryClient();

    // Fetch Interventions
    const { data: interventions, isLoading: loadingInterventions, error: errorInterventions } = useQuery({
        queryKey: ['interventions'],
        queryFn: async () => {
            const res = await api.get('/planning/interventions');
            // Convert strings to Date objects
            return res.data.map((inv: any) => ({
                ...inv,
                id: inv._id, // Add id if missing (backend uses _id)
                start: new Date(inv.start),
                end: new Date(inv.end),
                teamName: inv.teamId?.name || 'Inconnue',
                assignedTechnicians: inv.assignedTechnicians || []
            }));
        }
    });

    // Fetch Teams
    const { data: teams, isLoading: loadingTeams } = useQuery({
        queryKey: ['teams'],
        queryFn: async () => {
            const res = await api.get('/teams');
            return res.data.map((t: any) => ({
                id: t._id,
                name: t.name,
                color: t.color || '#3b82f6'
            }));
        }
    });

    // Mutations
    const updateMutation = useMutation({
        mutationFn: async (updated: any) => {
            const { id, ...data } = updated;
            return api.patch(`/planning/interventions/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interventions'] });
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Erreur lors de la mise à jour');
        }
    });

    const createMutation = useMutation({
        mutationFn: async (newInv: any) => {
            return api.post('/planning/interventions', newInv);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interventions'] });
            toast.success('Intervention planifiée');
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Erreur lors de la planification');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            return api.delete(`/planning/interventions/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interventions'] });
        },
        onError: (err: any) => {
            toast.error('Erreur lors de la suppression');
        }
    });

    if (loadingInterventions || loadingTeams) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-slate-50 dark:bg-[#0a0a14]">
                <LoadingSpinner />
            </div>
        );
    }

    if (errorInterventions) {
        return (
            <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a14] gap-4">
                <p className="text-red-500 font-bold">Erreur de chargement du planning</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Réessayer</button>
            </div>
        );
    }

    return (
        <section className="h-[calc(100vh-64px)] p-4 lg:p-8 bg-slate-50 dark:bg-[#0a0a14] flex flex-col gap-6 overflow-hidden transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3 italic">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <CalendarIcon className="w-6 h-6 text-primary" />
                        </div>
                        Planning Opérationnel
                    </h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1 ml-14">Coordination des interventions techniques</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {teams?.map((team: any) => (
                        <div key={team.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest shadow-sm">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: team.color }} />
                            {team.name}
                        </div>
                    ))}
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all ml-2">
                        <span>Nouvelle Équipe</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-2 lg:p-4">
                <InterventionCalendar
                    interventions={interventions || []}
                    teams={teams || []}
                    onInterventionUpdate={async (updated) => { updateMutation.mutate(updated); }}
                    onInterventionCreate={async (created) => { createMutation.mutate(created); }}
                    onInterventionDelete={async (id) => { deleteMutation.mutate(id); }}
                    editable={true}
                />
            </div>
        </section>
    );
}

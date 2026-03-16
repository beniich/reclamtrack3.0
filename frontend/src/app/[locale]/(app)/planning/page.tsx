'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { InterventionCalendar } from '@/components/planning/InterventionCalendar';
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function PlanningPage() {
    const queryClient = useQueryClient();

    // Fetch Interventions
    const { data: interventions, isLoading: loadingInterventions, error: errorInterventions } = useQuery({
        queryKey: ['interventions'],
        queryFn: async () => {
            const res = await api.get('/planning/interventions');
            // Convert strings to Date objects
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return res.map((inv: any) => ({
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return res.map((t: any) => ({
                id: t._id,
                name: t.name,
                color: t.color || '#3b82f6'
            }));
        }
    });

    // Fetch Unassigned Complaints
    const { data: complaints, isLoading: loadingComplaints } = useQuery({
        queryKey: ['complaints', 'unassigned'],
        queryFn: async () => {
            const res = await api.get('/complaints', { status: 'nouvelle' });
            return res.filter((c: any) => !c.assignedTeamId);
        }
    });

    // Mutations
    const updateMutation = useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: async (updated: any) => {
            const { id, ...data } = updated;
            return api.patch(`/planning/interventions/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interventions'] });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Erreur lors de la mise à jour');
        }
    });

    const createMutation = useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: async (newInv: any) => {
            return api.post('/planning/interventions', newInv);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interventions'] });
            toast.success('Intervention planifiée');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            toast.success('Intervention supprimée');
        },
        onError: () => {
            toast.error('Erreur lors de la suppression');
        }
    });

    if (loadingInterventions || loadingTeams || loadingComplaints) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-slate-50 dark:bg-[#0a0a14]">
                <LoadingSpinner />
            </div>
        );
    }

    if (errorInterventions) {
        return (
            <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a14] gap-4">
                <p className="text-red-500 font-bold italic uppercase tracking-widest text-xs">Erreur de chargement du planning</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <section className="h-[calc(100vh-64px)] p-6 lg:p-10 bg-brand-midnight flex flex-col gap-8 overflow-hidden transition-colors relative selection:bg-cyan-500 selection:text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-4 italic">
                        <div className="bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/20">
                            <CalendarIcon className="w-7 h-7 text-cyan-400" />
                        </div>
                        Planning Opérationnel
                    </h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2 ml-14">Coordination des interventions techniques de terrain</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {teams?.map((team: any) => (
                        <div key={team.id} className="glass-card flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/5">
                            <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ backgroundColor: team.color }} />
                            {team.name}
                        </div>
                    ))}
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/30 hover:brightness-110 active:scale-95 transition-all ml-4">
                        <Plus className="w-4 h-4" />
                        Nouvelle Équipe
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden glass-card rounded-[2.5rem] border-white/5 p-4 lg:p-6 shadow-2xl shadow-cyan-500/5">
                <InterventionCalendar
                    interventions={interventions || []}
                    teams={teams || []}
                    complaints={complaints || []}
                    onInterventionUpdate={async (updated) => { updateMutation.mutate(updated); }}
                    onInterventionCreate={async (created) => { createMutation.mutate(created); }}
                    onInterventionDelete={async (id) => { deleteMutation.mutate(id); }}
                    editable={true}
                />
            </div>
        </section>
    );
}

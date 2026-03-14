
'use client';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DateSelectArg, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AlertCircle, Calendar as CalendarIcon, Clock, MapPin, Users, X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface Intervention {
    id: string;
    complaintId: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    teamId: string;
    teamName: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    location: string;
    assignedTechnicians: Array<{
        id: string;
        name: string;
        avatar?: string;
    }>;
}

interface InterventionCalendarProps {
    interventions: Intervention[];
    teams: Array<{ id: string; name: string; color: string }>;
    complaints: Array<{ _id: string; title: string; number: string; address: string }>;
    onInterventionUpdate?: (intervention: Intervention) => Promise<void>;
    onInterventionCreate?: (intervention: Partial<Intervention>) => Promise<void>;
    onInterventionDelete?: (id: string) => Promise<void>;
    editable?: boolean;
}

export function InterventionCalendar({
    interventions,
    teams,
    complaints,
    onInterventionUpdate,
    onInterventionCreate,
    onInterventionDelete,
    editable = true,
}: InterventionCalendarProps) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState<DateSelectArg | null>(null);
    const [conflictWarning, setConflictWarning] = useState<string | null>(null);

    // Form state for creation
    const [newIntervention, setNewIntervention] = useState<Partial<Intervention>>({
        title: '',
        teamId: '',
        priority: 'medium',
        description: '',
    });

    // Conversion des interventions en events FullCalendar
    const events: EventInput[] = useMemo(() => {
        return interventions.map((intervention) => {
            const team = teams.find((t) => t.id === intervention.teamId);
            const priorityColors: Record<string, string> = {
                low: '#22c55e',
                medium: '#eab308',
                high: '#f97316',
                urgent: '#ef4444',
            };

            return {
                id: intervention.id,
                title: intervention.title,
                start: intervention.start,
                end: intervention.end,
                backgroundColor: team?.color || '#3b82f6',
                borderColor: priorityColors[intervention.priority],
                textColor: '#ffffff',
                extendedProps: {
                    intervention,
                },
            };
        });
    }, [interventions, teams]);

    // Détection de conflits
    const detectConflicts = useCallback(
        (newStart: Date, newEnd: Date, teamId: string, excludeId?: string) => {
            const conflicts = interventions.filter((intervention) => {
                if (intervention.id === excludeId) return false;
                if (intervention.teamId !== teamId) return false;
                if (intervention.status === 'cancelled') return false;

                const existingStart = new Date(intervention.start);
                const existingEnd = new Date(intervention.end);

                return (
                    (newStart >= existingStart && newStart < existingEnd) ||
                    (newEnd > existingStart && newEnd <= existingEnd) ||
                    (newStart <= existingStart && newEnd >= existingEnd)
                );
            });

            return conflicts;
        },
        [interventions]
    );

    // Gestion du drag & drop
    const handleEventDrop = useCallback(
        async (info: EventDropArg) => {
            if (!editable) {
                info.revert();
                return;
            }

            const intervention = info.event.extendedProps.intervention as Intervention;
            const newStart = info.event.start!;
            const newEnd = info.event.end || new Date(newStart.getTime() + 60 * 60 * 1000);

            // Vérification des conflits
            const conflicts = detectConflicts(newStart, newEnd, intervention.teamId, intervention.id);

            if (conflicts.length > 0) {
                setConflictWarning(
                    `Attention: ${conflicts.length} intervention(s) déjà planifiée(s) pour cette équipe à ce créneau.`
                );

                // Demander confirmation
                const confirmed = window.confirm(
                    `${conflicts.length} conflit(s) détecté(s). Continuer quand même?`
                );

                if (!confirmed) {
                    info.revert();
                    setConflictWarning(null);
                    return;
                }
            }

            try {
                const updatedIntervention: Intervention = {
                    ...intervention,
                    start: newStart,
                    end: newEnd,
                };

                await onInterventionUpdate?.(updatedIntervention);
                toast.success('Intervention déplacée avec succès');
                setConflictWarning(null);
            } catch (error) {
                info.revert();
                toast.error('Erreur lors du déplacement');
                console.error(error);
            }
        },
        [editable, detectConflicts, onInterventionUpdate]
    );

    // Gestion du redimensionnement
    const handleEventResize = useCallback(
        async (info: any) => {
            if (!editable) {
                info.revert();
                return;
            }

            const intervention = info.event.extendedProps.intervention as Intervention;
            const newEnd = info.event.end!;

            try {
                const updatedIntervention: Intervention = {
                    ...intervention,
                    end: newEnd,
                };

                await onInterventionUpdate?.(updatedIntervention);
                toast.success('Durée mise à jour');
            } catch (error) {
                info.revert();
                toast.error('Erreur lors de la modification');
                console.error(error);
            }
        },
        [editable, onInterventionUpdate]
    );

    // Gestion du clic sur un event
    const handleEventClick = useCallback((info: EventClickArg) => {
        const intervention = info.event.extendedProps.intervention as Intervention;
        setSelectedEvent(intervention);
    }, []);

    const handleDateSelect = useCallback(
        (selectInfo: DateSelectArg) => {
            if (!editable) return;
            setSelectedDateRange(selectInfo);
            setNewIntervention(prev => ({
                ...prev,
                start: selectInfo.start,
                end: selectInfo.end,
            }));
            setIsCreateDialogOpen(true);
        },
        [editable]
    );

    const handleCreateSubmit = async () => {
        if (!newIntervention.title || !newIntervention.teamId || !newIntervention.complaintId) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        try {
            await onInterventionCreate?.({
                ...newIntervention,
                start: selectedDateRange?.start || new Date(),
                end: selectedDateRange?.end || new Date(Date.now() + 3600000),
            });
            setIsCreateDialogOpen(false);
            setNewIntervention({ title: '', teamId: '', priority: 'medium', description: '' });
        } catch (error) {
            console.error('Create error:', error);
        }
    };

    // Suppression d'intervention
    const handleDelete = useCallback(async () => {
        if (!selectedEvent) return;

        try {
            await onInterventionDelete?.(selectedEvent.id);
            toast.success('Intervention supprimée');
            setSelectedEvent(null);
        } catch (error) {
            toast.error('Erreur lors de la suppression');
            console.error(error);
        }
    }, [selectedEvent, onInterventionDelete]);

    return (
        <div className="relative">
            {/* Conflict Warning */}
            {conflictWarning && (
                <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-amber-900 dark:text-amber-100">
                            Conflit détecté
                        </p>
                        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                            {conflictWarning}
                        </p>
                    </div>
                    <button
                        onClick={() => setConflictWarning(null)}
                        className="ml-auto p-1 hover:bg-amber-100 dark:hover:bg-amber-800 rounded"
                    >
                        <X className="w-4 h-4 text-amber-600" />
                    </button>
                </div>
            )}

            {/* Calendar */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    locale={frLocale}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    events={events}
                    editable={editable}
                    selectable={editable}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    slotMinTime="07:00:00"
                    slotMaxTime="19:00:00"
                    height="auto"
                    eventClick={handleEventClick}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}
                    select={handleDateSelect}
                    nowIndicator={true}
                    allDaySlot={false}
                    slotDuration="00:30:00"
                    slotLabelInterval="01:00"
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false,
                    }}
                />
            </div>

            {/* Event Details Dialog */}
            {selectedEvent && (
                <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-primary" />
                                {selectedEvent.title}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            {/* Priority & Status */}
                            <div className="flex gap-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${selectedEvent.priority === 'urgent'
                                            ? 'bg-red-100 text-red-700'
                                            : selectedEvent.priority === 'high'
                                                ? 'bg-orange-100 text-orange-700'
                                                : selectedEvent.priority === 'medium'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-green-100 text-green-700'
                                        }`}
                                >
                                    {selectedEvent.priority.toUpperCase()}
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${selectedEvent.status === 'completed'
                                            ? 'bg-green-100 text-green-700'
                                            : selectedEvent.status === 'in-progress'
                                                ? 'bg-blue-100 text-blue-700'
                                                : selectedEvent.status === 'cancelled'
                                                    ? 'bg-gray-100 text-gray-700'
                                                    : 'bg-purple-100 text-purple-700'
                                        }`}
                                >
                                    {selectedEvent.status}
                                </span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Clock className="w-4 h-4" />
                                <span>
                                    {new Date(selectedEvent.start).toLocaleString('fr-FR', {
                                        dateStyle: 'long',
                                        timeStyle: 'short',
                                    })}
                                    {' → '}
                                    {new Date(selectedEvent.end).toLocaleString('fr-FR', {
                                        timeStyle: 'short',
                                    })}
                                </span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <MapPin className="w-4 h-4" />
                                <span>{selectedEvent.location}</span>
                            </div>

                            {/* Team */}
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Users className="w-4 h-4" />
                                <span>{selectedEvent.teamName}</span>
                            </div>

                            {/* Description */}
                            {selectedEvent.description && (
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                        {selectedEvent.description}
                                    </p>
                                </div>
                            )}

                            {/* Technicians */}
                            {selectedEvent.assignedTechnicians.length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Techniciens assignés:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedEvent.assignedTechnicians.map((tech) => (
                                            <div
                                                key={tech.id}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                                    {tech.name[0]}
                                                </div>
                                                <span className="text-sm">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <DialogFooter>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Supprimer
                            </button>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                            >
                                Fermer
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Create Intervention Dialog */}
            {isCreateDialogOpen && (
                <Dialog open={isCreateDialogOpen} onOpenChange={() => setIsCreateDialogOpen(false)}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Planifier une intervention</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Réclamation</label>
                                <select
                                    value={newIntervention.complaintId}
                                    title="Associer une réclamation"
                                    onChange={e => {
                                        const comp = complaints.find(c => c._id === e.target.value);
                                        setNewIntervention({
                                            ...newIntervention,
                                            complaintId: e.target.value,
                                            title: comp ? `Intervention: ${comp.title}` : newIntervention.title
                                        });
                                    }}
                                    className="w-full p-2 border border-slate-200 dark:border-slate-800 rounded-lg dark:bg-slate-900"
                                >
                                    <option value="">Associer une réclamation</option>
                                    {complaints.map(c => (
                                        <option key={c._id} value={c._id}>[{c.number}] {c.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Titre</label>
                                <input
                                    type="text"
                                    value={newIntervention.title}
                                    onChange={e => setNewIntervention({ ...newIntervention, title: e.target.value })}
                                    className="w-full p-2 border border-slate-200 dark:border-slate-800 rounded-lg dark:bg-slate-900"
                                    placeholder="Ex: Réparation fuite d'eau"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Équipe</label>
                                <select
                                    value={newIntervention.teamId}
                                    onChange={e => setNewIntervention({ ...newIntervention, teamId: e.target.value })}
                                    className="w-full p-2 border border-slate-200 dark:border-slate-800 rounded-lg dark:bg-slate-900"
                                >
                                    <option value="">Sélectionner une équipe</option>
                                    {teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Priorité</label>
                                <select
                                    value={newIntervention.priority}
                                    onChange={e => setNewIntervention({ ...newIntervention, priority: e.target.value as any })}
                                    className="w-full p-2 border border-slate-200 dark:border-slate-800 rounded-lg dark:bg-slate-900"
                                >
                                    <option value="low">Faible</option>
                                    <option value="medium">Moyenne</option>
                                    <option value="high">Haute</option>
                                    <option value="urgent">Urgente</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Description</label>
                                <textarea
                                    value={newIntervention.description}
                                    onChange={e => setNewIntervention({ ...newIntervention, description: e.target.value })}
                                    className="w-full p-2 border border-slate-200 dark:border-slate-800 rounded-lg dark:bg-slate-900 min-h-[80px]"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <button
                                onClick={() => setIsCreateDialogOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleCreateSubmit}
                                className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20"
                            >
                                Créer l&apos;intervention
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* CSS personnalisé pour le calendrier */}
            <style jsx global>{`
        .fc {
          font-family: inherit;
        }
        .fc-event {
          cursor: pointer;
          border-radius: 6px;
          padding: 2px 4px;
          font-size: 13px;
          border-left-width: 4px !important;
        }
        .fc-event:hover {
          opacity: 0.9;
        }
        .fc-toolbar-title {
          font-size: 1.5rem !important;
          font-weight: 700;
        }
        .fc-button {
          border-radius: 6px !important;
          text-transform: capitalize !important;
        }
        .fc-button-primary {
          background-color: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        .fc-button-primary:hover {
          background-color: #2563eb !important;
        }
        .fc-timegrid-slot {
          height: 3em;
        }
      `}</style>
        </div>
    );
}

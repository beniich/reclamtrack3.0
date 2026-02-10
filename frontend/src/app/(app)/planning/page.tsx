'use client';

import { InterventionCalendar } from '@/components/planning/InterventionCalendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

// Mock Data
const MOCK_INTERVENTIONS = [
    {
        id: '1',
        complaintId: 'C-001',
        title: 'Réparation Fuite A23',
        start: new Date(new Date().setHours(9, 0, 0, 0)),
        end: new Date(new Date().setHours(11, 0, 0, 0)),
        teamId: 'team-alpha',
        teamName: 'Équipe Alpha',
        priority: 'high' as const,
        status: 'scheduled' as const,
        location: 'Av. Mohammed V, Rabat',
        assignedTechnicians: [{ id: 't1', name: 'Ahmed B.' }, { id: 't2', name: 'Karim S.' }],
    },
    {
        id: '2',
        complaintId: 'C-002',
        title: 'Maintenance Éclairage',
        start: new Date(new Date().setHours(14, 0, 0, 0)),
        end: new Date(new Date().setHours(16, 30, 0, 0)),
        teamId: 'team-beta',
        teamName: 'Équipe Beta',
        priority: 'medium' as const,
        status: 'in-progress' as const,
        location: 'Hay Riad, Secteur 4',
        assignedTechnicians: [{ id: 't3', name: 'Salma T.' }],
    },
];

const MOCK_TEAMS = [
    { id: 'team-alpha', name: 'Équipe Alpha', color: '#3b82f6' },
    { id: 'team-beta', name: 'Équipe Beta', color: '#10b981' },
    { id: 'team-gamma', name: 'Équipe Gamma', color: '#f59e0b' },
];

export default function PlanningPage() {
    return (
        <section className="h-[calc(100vh-64px)] p-6 bg-slate-50 dark:bg-slate-950 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <CalendarIcon className="w-6 h-6 text-primary" />
                    Planning des Interventions
                </h2>
                <div className="flex gap-2">
                    {MOCK_TEAMS.map(team => (
                        <div key={team.id} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border text-sm">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.color }} />
                            {team.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-hidden bg-white rounded-xl shadow border">
                <InterventionCalendar
                    interventions={MOCK_INTERVENTIONS}
                    teams={MOCK_TEAMS}
                    onInterventionUpdate={async (updated) => console.log('Updated:', updated)}
                    onInterventionCreate={async (created) => console.log('Created:', created)}
                    onInterventionDelete={async (id) => console.log('Deleted:', id)}
                    editable={true}
                />
            </div>
        </section>
    );
}

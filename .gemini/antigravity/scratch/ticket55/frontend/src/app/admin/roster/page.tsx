'use client';

import React, { useState } from 'react';

// --- Types ---
interface Resource {
    id: string;
    name: string;
    role: string;
    staffCount: number;
    avatar?: string;
    status?: 'online' | 'break' | 'offline';
}

interface Shift {
    id: string;
    resourceId: string;
    title: string;
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
    type: 'routine' | 'emergency' | 'maintenance';
    color: string;
    borderColor: string;
}

interface Conflict {
    id: string;
    title: string;
    description: string;
    type: 'double-booking' | 'skill-gap';
    severity: 'high' | 'medium';
}

// --- Mock Data ---
const INITIAL_RESOURCES: Resource[] = [
    { id: 'team-01', name: 'Maintenance Eau', role: 'Équipe 01', staffCount: 4, status: 'online' },
    { id: 'team-02', name: 'Opérations Réseau', role: 'Équipe 02', staffCount: 3, status: 'online' },
    { id: 'team-03', name: 'Sécurité Gaz', role: 'Équipe 03', staffCount: 2, status: 'online' },
    { id: 'team-04', name: 'Systèmes Climatiques', role: 'Équipe 04', staffCount: 5, status: 'break' },
    { id: 'team-05', name: 'Télécoms', role: 'Équipe 05', staffCount: 2, status: 'offline' },
];

const INITIAL_SHIFTS: Shift[] = [
    { id: 's1', resourceId: 'team-01', title: 'Réparation Vanne Principale #122', startTime: '08:30', endTime: '10:00', type: 'maintenance', color: 'bg-primary/10', borderColor: 'border-primary/30' },
    { id: 's2', resourceId: 'team-01', title: 'Purge Hydrant Routine', startTime: '13:00', endTime: '15:00', type: 'routine', color: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30' },
    { id: 's3', resourceId: 'team-02', title: 'Vérification Transformateur', startTime: '10:00', endTime: '11:30', type: 'maintenance', color: 'bg-amber-500/10', borderColor: 'border-amber-500/40' },
    { id: 's4', resourceId: 'team-02', title: 'URGENCE: Ligne Haute Tension 4', startTime: '10:30', endTime: '12:00', type: 'emergency', color: 'bg-red-500/10', borderColor: 'border-red-500/40' },
    { id: 's5', resourceId: 'team-04', title: 'Remplacement Filtre', startTime: '14:00', endTime: '15:30', type: 'routine', color: 'bg-slate-500/10', borderColor: 'border-slate-500/30' },
];

const INITIAL_CONFLICTS: Conflict[] = [
    { id: 'c1', title: 'Double Réservation Personnel', description: 'Alex Henderson est assigné à deux équipes simultanées (01 & 02).', type: 'double-booking', severity: 'medium' },
    { id: 'c2', title: 'Compétence Manquante', description: "L'équipe 03 (Gaz) requiert un 'Inspecteur Senior' pour WO-9842. Aucun staff disponible.", type: 'skill-gap', severity: 'high' }
];

export default function RosterPage() {
    const [resources] = useState<Resource[]>(INITIAL_RESOURCES);
    const [shifts, setShifts] = useState<Shift[]>(INITIAL_SHIFTS);
    const [conflicts] = useState<Conflict[]>(INITIAL_CONFLICTS);

    // Helpers to calculate position on the grid (assuming 08:00 to 18:00 display window)
    const START_HOUR = 8;
    const TOTAL_HOURS = 11; // 8am to 7pm (19:00) window for display
    const HOUR_WIDTH = 128; // w-32 = 128px

    const getShiftStyle = (shift: Shift) => {
        const [startH, startM] = shift.startTime.split(':').map(Number);
        const [endH, endM] = shift.endTime.split(':').map(Number);

        const startOffset = (startH - START_HOUR) + (startM / 60);
        const duration = (endH - startH) + ((endM - startM) / 60);

        const left = startOffset * HOUR_WIDTH;
        const width = duration * HOUR_WIDTH;

        return { left: `${left}px`, width: `${width}px` };
    };

    const handleShiftClick = (shift: Shift) => {
        console.log('Shift clicked:', shift);
        // Future: Open edit modal
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden h-screen flex flex-col">
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>

            {/* Top Navigation Bar */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6 shrink-0 z-30">
                <div className="flex items-center gap-4">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-white">grid_view</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Planning <span className="text-primary font-medium text-sm align-top ml-1">Admin</span></h1>
                </div>
                <div className="flex-1 max-w-xl mx-8">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-700 rounded-lg transition-all text-sm outline-none" placeholder="Rechercher shifts, personnel, ou interventions..." type="text" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-xs font-semibold text-primary">Synchro Live</span>
                        <span className="text-[10px] text-slate-500 uppercase">MàJ: à l'instant</span>
                    </div>
                    <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">cloud_upload</span>
                        Publier Planning
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                    <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-slate-400">person</span>
                    </div>
                </div>
            </header>

            {/* Main Workspace Container */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Resource Sidebar */}
                <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
                    {/* Available Personnel Section */}
                    <div className="flex-1 flex flex-col min-h-0 border-b border-slate-100 dark:border-slate-800">
                        <div className="p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">people</span> Personnel Dispo
                            </h2>
                            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">12 EN LIGNE</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {/* Dynamic Personnel List can go here */}
                            <div className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 cursor-grab active:cursor-grabbing transition-colors flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">AH</div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">Alex Henderson</p>
                                    <p className="text-[10px] text-slate-500 uppercase">Technicien II (Elec)</p>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 cursor-grab active:cursor-grabbing transition-colors flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold text-xs">SJ</div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">Sarah Jenkins</p>
                                    <p className="text-[10px] text-slate-500 uppercase">Ingénieur Principal (Eau)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Timeline Content */}
                <section className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
                    {/* Timeline Controls Toolbar */}
                    <div className="h-14 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 bg-white dark:bg-slate-900 z-20">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                <button className="px-4 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-slate-700 shadow-sm text-primary">Jour</button>
                                <button className="px-4 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Semaine</button>
                                <button className="px-4 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Mois</button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><span className="material-symbols-outlined text-xl text-slate-500">chevron_left</span></button>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Aujourd'hui</span>
                                <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><span className="material-symbols-outlined text-xl text-slate-500">chevron_right</span></button>
                            </div>
                        </div>

                        {conflicts.length > 0 && (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 px-3 py-1.5 rounded-lg animate-pulse">
                                    <span className="material-symbols-outlined text-amber-500 text-sm">warning</span>
                                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{conflicts.length} Conflits Détectés</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Gantt Timeline Grid Area */}
                    <div className="flex-1 relative overflow-auto custom-scrollbar bg-background-light dark:bg-background-dark/30">
                        {/* Time Header (X-Axis) */}
                        <div className="sticky top-0 z-30 flex bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm min-w-max">
                            <div className="w-48 shrink-0 border-r border-slate-200 dark:border-slate-800 p-4 text-xs font-bold uppercase text-slate-400 bg-white dark:bg-slate-900 sticky left-0 z-40">Équipes / Actifs</div>
                            <div className="flex">
                                {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                                    <div key={i} className="w-32 flex-none border-r border-slate-100 dark:border-slate-800 p-4 text-center text-[11px] font-bold text-slate-400">
                                        {String(START_HOUR + i).padStart(2, '0')}:00
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grid Body */}
                        <div className="relative min-h-full min-w-max">
                            {/* Current Time Indicator (Mocked at 11:15) */}
                            <div className="absolute top-0 bottom-0 left-[416px] w-px bg-primary z-10 pointer-events-none">
                                <div className="absolute -top-1.5 -left-1 w-2.5 h-2.5 bg-primary rounded-full"></div>
                                <div className="absolute top-2 left-1 bg-primary text-white text-[9px] px-1 rounded">11:15</div>
                            </div>

                            {/* Render Resources Rows */}
                            {resources.map((resource) => (
                                <div key={resource.id} className="flex border-b border-slate-100 dark:border-slate-800 group h-20 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">

                                    {/* Row Header (Sticky Left) */}
                                    <div className="w-48 shrink-0 border-r border-slate-200 dark:border-slate-800 p-4 sticky left-0 bg-white dark:bg-slate-900 z-20 flex flex-col justify-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-colors">
                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{resource.name}</span>
                                        <span className="text-[10px] text-slate-500 uppercase">{resource.role} • {resource.staffCount} Staff</span>
                                    </div>

                                    {/* Row Content (Grid Cells & Shifts) */}
                                    <div className="flex relative">
                                        {/* Background Cells */}
                                        {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                                            <div key={i} className="w-32 border-r border-slate-100 dark:border-slate-800/50 flex-none h-full"></div>
                                        ))}

                                        {/* Shifts Overlays */}
                                        {shifts.filter(s => s.resourceId === resource.id).map(shift => (
                                            <div
                                                key={shift.id}
                                                style={getShiftStyle(shift)}
                                                onClick={() => handleShiftClick(shift)}
                                                className={`absolute top-4 h-12 ${shift.color} border ${shift.borderColor} rounded-lg p-2 flex flex-col justify-center cursor-pointer hover:brightness-95 transition-all z-10 shadow-sm`}
                                            >
                                                <span className={`text-[10px] font-bold truncate ${shift.type === 'emergency' ? 'text-red-700' : 'text-slate-700 dark:text-slate-300'}`}>
                                                    {shift.title}
                                                </span>
                                                <span className="text-[9px] opacity-70">
                                                    {shift.startTime} - {shift.endTime}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Stats / Legend */}
                    <footer className="h-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 shrink-0 z-30">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-primary/20 border border-primary/40"></div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Maintenance</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-emerald-500/20 border border-emerald-500/40"></div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Routine</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-red-500/20 border border-red-500/40"></div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Urgence</span>
                            </div>
                        </div>
                        <div className="text-[10px] font-medium text-slate-400">
                            Affichage {resources.length} équipes
                        </div>
                    </footer>
                </section>

                {/* Conflict Toast */}
                {conflicts.length > 0 && (
                    <div className="fixed bottom-14 right-6 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                        <div className="bg-amber-500 p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-white text-lg">error_outline</span>
                                <span className="text-xs font-bold text-white">Conflits Planning ({conflicts.length})</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-3">
                            {conflicts.map(conflict => (
                                <div key={conflict.id} className="flex gap-3">
                                    <div className={`p-1.5 rounded-lg h-fit ${conflict.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                        <span className="material-symbols-outlined text-sm">warning</span>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{conflict.title}</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">{conflict.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

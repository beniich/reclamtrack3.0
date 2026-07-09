'use client';

import GanttChart from "@/components/roster-scheduler/ui/GanttChart";
import SidebarLeft from "@/components/roster-scheduler/ui/SidebarLeft";
import { useRosterWasm, type Shift } from "@/hooks/useRosterWasm";
import { useDbSocket } from '@/hooks/useDbSocket';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import AssignmentModal from '@/components/roster-scheduler/ui/AssignmentModal';
import { Search, UploadCloud, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Filter, Settings, AlertCircle } from 'lucide-react';

// Sample shift data for the POC demonstration
const DEMO_SHIFTS: Shift[] = [
    { id: 1, startHour: 8,  endHour: 16, personnelId: 101, personnelName: 'Alex Henderson' },
    { id: 2, startHour: 14, endHour: 22, personnelId: 101, personnelName: 'Alex Henderson' }, // Conflict with #1
    { id: 3, startHour: 8,  endHour: 16, personnelId: 102, personnelName: 'Marie Dupont' },
    { id: 4, startHour: 16, endHour: 23, personnelId: 102, personnelName: 'Marie Dupont' }, // No conflict
];

export default function RosterPage() {
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);
    const [conflictIds, setConflictIds] = useState<number[]>([]);
    const [resolving, setResolving] = useState(false);
    const [resolved, setResolved] = useState(false);
    
    // Nouveaux états
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showFilters, setShowFilters] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    
    const socket = useDbSocket('/scheduler');
    const { detectConflicts, isReady } = useRosterWasm();

    useEffect(() => {
        if (!socket) return;
        socket.on('schedule-update', (data: unknown) => {
            console.log('📅 Schedule Refresh:', data);
        });
        return () => { socket.off('schedule-update'); };
    }, [socket]);

    // Run Wasm conflict detection when engine is ready
    useEffect(() => {
        if (isReady) {
            const ids = detectConflicts(DEMO_SHIFTS);
            setConflictIds(ids);
            console.log('[Wasm] Detected conflict shift IDs:', ids);
        }
    }, [isReady, detectConflicts]);

    // Simulate auto-resolution via Wasm logic
    const handleAutoResolve = () => {
        setResolving(true);
        // Fast Wasm pass clears conflicts — simulate brief UI feedback
        setTimeout(() => {
            setConflictIds([]);
            setResolving(false);
            setResolved(true);
        }, 600);
    };

    const nextPeriod = () => {
        const next = new Date(currentDate);
        next.setDate(next.getDate() + 1);
        setCurrentDate(next);
    };

    const prevPeriod = () => {
        const prev = new Date(currentDate);
        prev.setDate(prev.getDate() - 1);
        setCurrentDate(prev);
    };

    const conflictCount = conflictIds.length;

    return (
        <div className="flex h-full flex-col">
            {/* Header spécifique Roster */}
            <header className="bg-surface-dark border-b border-border-dark h-16 flex items-center justify-between px-6 shrink-0 z-30">
                <div className="flex items-center gap-4">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <span className="material-symbols-outlined text-white">grid_view</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        RosterFlow <span className="text-primary font-medium text-sm align-top ml-1">Admin</span>
                    </h1>
                    {isReady && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            ⚡ Wasm Active
                        </span>
                    )}
                </div>

                <div className="flex-1 max-w-xl mx-8">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-slate-800 border-slate-700 text-slate-200 focus:ring-2 focus:ring-primary focus:bg-slate-700 rounded-lg transition-all text-sm outline-none border"
                            placeholder="Search shifts, personnel, or interventions..."
                            type="text"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-xs font-semibold text-primary">Live Sync</span>
                        <span className="text-[10px] text-slate-500 uppercase">Last update: Now</span>
                    </div>
                    <button type="button" className="bg-primary hover:bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                        <UploadCloud className="text-sm" />
                        Publish Roster
                    </button>
                    <div className="h-8 w-px bg-slate-800 mx-2"></div>
                    <img
                        alt="Admin Profile"
                        className="h-9 w-9 rounded-full object-cover border-2 border-slate-700 shadow-sm"
                        src="https://i.pravatar.cc/150?u=admin"
                    />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden">
                <SidebarLeft onOpenAssignment={() => setShowAssignmentModal(true)} />

                <section className="flex-1 flex flex-col min-w-0 bg-background-dark">
                    {/* Toolbar */}
                    <div className="h-14 border-b border-border-dark flex items-center justify-between px-6 shrink-0 bg-surface-dark z-20">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center bg-slate-800 p-1 rounded-lg">
                                <Button variant="ghost" className="px-4 py-1.5 text-xs font-semibold rounded-md bg-slate-700 shadow-sm text-blue-400">Day</Button>
                                <Button variant="ghost" className="px-4 py-1.5 text-xs font-semibold rounded-md text-slate-400 hover:text-slate-200 transition-colors">Week</Button>
                                <Button variant="ghost" className="px-4 py-1.5 text-xs font-semibold rounded-md text-slate-400 hover:text-slate-200 transition-colors">Month</Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={prevPeriod} className="p-1 hover:bg-violet-500/15 rounded-full transition-colors">
                                    <ChevronLeft className="text-xl text-slate-500" />
                                </button>
                                <span className="text-sm font-bold text-slate-200">
                                    {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <button type="button" onClick={nextPeriod} className="p-1 hover:bg-violet-500/15 rounded-full transition-colors">
                                    <ChevronRight className="text-xl text-slate-500" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {conflictCount > 0 && (
                                <div className="flex items-center gap-2 bg-amber-900/20 border border-amber-800/50 px-3 py-1.5 rounded-lg">
                                    <AlertTriangle className="text-amber-500 text-sm" />
                                    <span className="text-xs font-bold text-amber-400">{conflictCount} conflict{conflictCount > 1 ? 's' : ''} detected by Wasm</span>
                                </div>
                            )}
                            {resolved && conflictCount === 0 && (
                                <div className="flex items-center gap-2 bg-emerald-900/20 border border-emerald-800/50 px-3 py-1.5 rounded-lg">
                                    <CheckCircle className="text-emerald-500 text-sm" />
                                    <span className="text-xs font-bold text-emerald-400">All conflicts resolved</span>
                                </div>
                            )}
                            <div className="h-8 w-px bg-slate-800 mx-1"></div>
                            <button type="button" onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-primary text-white' : 'hover:bg-violet-500/15 text-slate-400'}`}>
                                <Filter className="text-xl" />
                            </button>
                            <button type="button" onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-slate-700 text-white' : 'hover:bg-violet-500/15 text-slate-400'}`}>
                                <Settings className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <GanttChart onCellClick={() => setShowAssignmentModal(true)} />

                    {/* Footer */}
                    <footer className="h-12 border-t border-border-dark bg-surface-dark flex items-center justify-between px-6 shrink-0 z-30">
                        <div className="flex items-center gap-6">
                            {[
                                { color: 'bg-primary', label: 'Maintenance' },
                                { color: 'bg-emerald-500', label: 'Routine' },
                                { color: 'bg-red-500', label: 'Emergency' }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-[10px] font-medium text-slate-500">
                            Showing <span className="text-slate-300">4 Teams</span> • <span className="text-primary font-bold">Live Data</span>
                        </div>
                    </footer>
                </section>
            </main>

            {/* Scheduling Conflicts Alert - Fixed Position */}
            {conflictCount > 0 && (
                <div className="fixed bottom-16 right-6 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden transform transition-all ring-1 ring-white/5 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-amber-600 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="text-white text-lg" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Scheduling Conflicts ({conflictCount})</span>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="flex gap-3">
                            <div className="bg-amber-900/40 p-2 rounded-lg h-fit border border-amber-500/20">
                                <span className="material-symbols-outlined text-amber-500 text-sm">event_busy</span>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-200">Personnel Double-Booking</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    Wasm detected overlap on shift IDs: {conflictIds.join(', ')}.
                                </p>
                            </div>
                        </div>

                        <button type="button"
                            onClick={handleAutoResolve}
                            disabled={resolving}
                            className="block w-full text-center mt-2 py-2 text-[11px] font-bold text-primary hover:bg-primary/10 rounded transition-colors uppercase tracking-wider border border-primary/30 disabled:opacity-50"
                        >
                            {resolving ? '⚡ Wasm resolving...' : '⚡ Auto-Resolve All (Wasm)'}
                        </button>
                    </div>
                </div>
            )}

            {/* Assignment Modal */}
            {showAssignmentModal && (
                <AssignmentModal onClose={() => setShowAssignmentModal(false)} />
            )}
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
    MapPin, Truck, ChevronRight, Filter, 
    Navigation, AlertCircle, Activity, Layout, Info
} from 'lucide-react';

import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

export default function FleetMapPage() {
    const [complaints, setComplaints] = useState<any[]>([]);
    const [teams, setTeams] = useState<any[]>([]);
    const [simulating, setSimulating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [cRes, tRes] = await Promise.all([
                apiClient.get('/complaints'),
                apiClient.get('/admin/teams') // Ajusté selon vos routes existantes
            ]);
            setComplaints(cRes.data || []);
            setTeams(tRes.data || []);
        } catch (err) {
            console.error("Erreur de chargement des données map", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5s for live tracking
        return () => clearInterval(interval);
    }, []);

    const toggleSimulation = async () => {
        try {
            if (simulating) {
                await apiClient.post('/simulation/stop');
                toast.success("Simulation de trafic arrêtée");
            } else {
                await apiClient.post('/simulation/start');
                toast.success("Simulation de trafic activée !");
            }
            setSimulating(!simulating);
        } catch (err) {
            toast.error("Erreur de contrôle du simulateur");
        }
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col bg-slate-50 dark:bg-background overflow-hidden">
            {/* Header Control Bar */}
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-indigo-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-50 dark:bg-orange-500/10 rounded-xl">
                        <Navigation className="w-5 h-5 text-indigo-600 dark:text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                            Command Center <span className="text-indigo-600 dark:text-orange-500">//</span> Fleet Tracker
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Temps réel : 3 équipes actives</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Filter className="w-3 h-3" /> Filtres
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                        <Activity className="w-3 h-3" /> Optimiser Trajets
                    </button>
                </div>
            </div>

            <div className="flex-1 flex relative">
                {/* Side Info Panel */}
                <div className="w-80 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-4 space-y-6 overflow-y-auto hidden lg:block relative z-10">
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Interventions Actives</h3>
                        <div className="space-y-3">
                            {complaints.filter(c => c.status !== 'fermée').map(complaint => (
                                <div key={complaint._id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 transition-all cursor-pointer group">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className={`size-2 rounded-full ${complaint.priority === 'urgent' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-orange-500'}`}></div>
                                        <span className="text-[9px] font-black text-slate-400">#{complaint.number || complaint._id.slice(-6)}</span>
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 truncate">{complaint.title}</h4>
                                    <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                        <MapPin className="w-3 h-3" /> {complaint.location?.latitude?.toFixed(3) || '0.000'}, {complaint.location?.longitude?.toFixed(3) || '0.000'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3" /> Alertes Trafic IA
                        </h3>
                        <div className="p-3 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-2">
                            <p className="text-[10px] font-bold text-slate-600 dark:text-red-200/70 leading-relaxed italic">
                                "Trafic dense détecté sur l'Avenue Royale. Retard estimé : +12 mins. Agent suggère déviation par Rue Nord."
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Statut des Équipes</h3>
                        <div className="space-y-3">
                            {teams.map(team => (
                                <div key={team._id} className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                                        <Truck className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-black text-slate-900 dark:text-white uppercase truncate">{team.name}</div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className={`size-1.5 rounded-full ${team.status === 'intervention' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter truncate">{team.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 bg-slate-200 dark:bg-slate-800 relative group">
                    {/* Placeholder for real map integration / In a real app we'd load Leaflet here */}
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0/1280x720?access_token=pk.placeholder')] bg-cover bg-center grayscale contrast-125 opacity-20"></div>
                    
                    {/* Overlay Grid UI */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className={`p-8 rounded-[3rem] bg-white/10 backdrop-blur-xl border border-white/20 text-center max-w-md pointer-events-auto shadow-2xl transition-all ${simulating ? 'opacity-20 scale-95' : 'opacity-100'}`}>
                             <div className="size-20 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto mb-6">
                                <Layout className="w-10 h-10 text-indigo-400 animate-pulse" />
                             </div>
                             <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Command Center Live</h2>
                             <p className="text-sm text-indigo-100/70 font-medium mb-8">
                                Activez la simulation pour synchroniser les positions des équipes selon le trafic Google Maps réel.
                             </p>
                             <button 
                                onClick={toggleSimulation}
                                className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl
                                    ${simulating ? 'bg-rose-600 text-white' : 'bg-white text-indigo-600 hover:scale-105'}
                                `}
                            >
                                {simulating ? 'Stopper la Simulation' : 'Activer le Tracking Live'}
                             </button>
                        </div>
                    </div>

                    {/* Simulation de marqueurs */}
                    <div className="absolute top-[40%] left-[60%] size-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)] border-4 border-white dark:border-slate-900"></div>
                    <div className="absolute top-[50%] left-[55%] size-4 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.8)] border-4 border-white dark:border-slate-900 flex items-center justify-center text-[8px] text-white font-bold animate-bounce">T1</div>
                </div>
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import {
    Map as MapIcon,
    Layers,
    Navigation,
    Search,
    Wifi,
    Battery,
    Users,
    Target,
    LocateFixed,
    Maximize2,
    Zap,
    Droplet,
    Flame
} from 'lucide-react';

const LayerItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <div className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${active ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}>
                {icon}
            </div>
            <span className={`text-xs font-bold ${active ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{label}</span>
        </div>
        <div className={`size-4 rounded-full border-2 flex items-center justify-center ${active ? 'bg-primary border-primary' : 'border-slate-200'}`}>
            {active && <div className="size-1.5 bg-white rounded-full" />}
        </div>
    </div>
);

const UnitCard = ({ name, status, type }: { name: string, status: string, type: string }) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all cursor-pointer group">
        <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">{name}</span>
            <span className="text-[9px] font-bold text-slate-400">{type}</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{status}</span>
        </div>
    </div>
);

const MapTool = ({ icon, active }: { icon: React.ReactNode, active?: boolean }) => (
    <button className={`p-3 rounded-2xl border transition-all shadow-xl ${active
        ? 'bg-primary text-white border-primary shadow-primary/20 scale-110'
        : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:text-primary'
        }`}>
        {icon}
    </button>
);

const Pin = ({ x, y, color, label, dot, car }: { x: string, y: string, color: string, label: string, dot?: boolean, car?: boolean }) => (
    <div className="absolute group" style={{ left: x, top: y }}>
        <div className={`size-10 rounded-2xl ${color} flex items-center justify-center text-white shadow-2xl animate-bounce-slow cursor-pointer hover:scale-125 transition-transform`}>
            {car ? <Navigation size={20} fill="currentColor" /> : dot ? <Target size={20} /> : <MapIcon size={20} />}
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg whitespace-nowrap z-50">
            {label}
        </div>
    </div>
);

const LegendItem = ({ color, label }: { color: string, label: string }) => (
    <div className="flex items-center gap-3">
        <div className={`size-3 rounded-full ${color}`} />
        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
);

export default function GeospatialOperations() {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />

                <main className="flex-1 relative flex flex-col md:flex-row h-full">
                    {/* Sidebar Map Controls (Internal) */}
                    <div className="w-full md:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-10 flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Vue Multiservices</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                                <input
                                    type="text"
                                    placeholder="Chercher zone ou capteur..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Layer Toggle */}
                            <section className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Couches de Données</h4>
                                <LayerItem icon={<Droplet size={14} className="text-blue-500" />} label="Réseau Hydraulique" active />
                                <LayerItem icon={<Zap size={14} className="text-amber-500" />} label="Réseau Électrique" active />
                                <LayerItem icon={<Flame size={14} className="text-red-500" />} label="Réseau Gaz" />
                                <LayerItem icon={<Users size={14} className="text-primary" />} label="Équipes Géo-localisées" active />
                            </section>

                            {/* Active Units */}
                            <section className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Unités Actives</h4>
                                <UnitCard name="ALPHA-01" status="En Mission" type="Urgence" />
                                <UnitCard name="VOLT-02" status="En Route" type="Maintenance" />
                            </section>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
                            <button className="w-full bg-primary text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                                <Navigation size={16} /> Optimiser Trajets
                            </button>
                        </div>
                    </div>

                    {/* Main Map Viewport */}
                    <div className="flex-1 relative bg-slate-200 dark:bg-slate-900 overflow-hidden">
                        {/* Mock Map Background */}
                        <div className="absolute inset-0 grayscale-[0.5] dark:invert dark:opacity-40">
                            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/2.3522,48.8566,12,0/1200x800?access_token=pk.ey')] bg-cover bg-center" />
                        </div>

                        {/* Interactive UI Overlays on Map */}
                        <div className="absolute top-6 left-6 flex gap-2">
                            <MapTool icon={<LocateFixed size={20} />} />
                            <MapTool icon={<Layers size={20} />} active />
                            <MapTool icon={<Maximize2 size={20} />} />
                        </div>

                        <div className="absolute top-6 right-6 bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 border-r border-slate-100 dark:border-slate-800">
                                <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Connecté</span>
                            </div>
                            <div className="flex items-center gap-4 px-3">
                                <Wifi size={14} className="text-slate-400" />
                                <Battery size={14} className="text-slate-400" />
                            </div>
                        </div>

                        {/* Mock Pins */}
                        <Pin x="45%" y="40%" color="bg-primary" label="INT-901" />
                        <Pin x="30%" y="60%" color="bg-red-500" label="URGENCE" dot />
                        <Pin x="60%" y="30%" color="bg-emerald-500" label="ALPHA-01" car />

                        {/* Legend */}
                        <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Légende Dynamique</h5>
                            <div className="space-y-3">
                                <LegendItem color="bg-primary" label="Zone de Travail" />
                                <LegendItem color="bg-emerald-500" label="Équipe Mobile" />
                                <LegendItem color="bg-red-500" label="Incident Critique" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

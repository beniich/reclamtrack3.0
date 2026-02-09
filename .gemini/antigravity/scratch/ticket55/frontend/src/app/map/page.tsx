'use client';

import { useState } from 'react';

export default function GeoOpsMapPage() {
    const [layers, setLayers] = useState({
        water: true,
        electricity: true,
        gas: false,
        lighting: true,
    });

    const toggleLayer = (layer: keyof typeof layers) => {
        setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden h-screen font-display">
            {/* Top Navigation Bar */}
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl">map</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">
                            GeoOps <span className="text-primary font-medium">Manager</span>
                        </h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-4">
                        <a className="px-3 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-lg" href="#">
                            Operations
                        </a>
                        <a className="px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
                            Analytics
                        </a>
                        <a className="px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
                            Interventions
                        </a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group hidden lg:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-80 pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                            placeholder="Search technicians, incidents..."
                            type="text"
                        />
                    </div>
                    <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                        <img className="w-full h-full object-cover" alt="User avatar" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                    </div>
                </div>
            </header>

            <main className="relative flex h-[calc(100vh-64px)] overflow-hidden">
                {/* Sidebar Controls */}
                <aside className="w-80 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 flex flex-col z-40 shadow-xl">
                    <div className="p-6 space-y-8 overflow-y-auto">
                        {/* Service Layers Section */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Layers</h3>
                                <span className="material-symbols-outlined text-slate-400 text-sm cursor-help">info</span>
                            </div>
                            <div className="space-y-2">
                                <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer group transition-colors ${layers.water ? 'bg-primary/5 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
                                        <span className="text-sm font-semibold">Water Supply</span>
                                    </div>
                                    <input
                                        checked={layers.water}
                                        onChange={() => toggleLayer('water')}
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                        type="checkbox"
                                    />
                                </label>
                                <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${layers.electricity ? 'bg-primary/5 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-amber-500">bolt</span>
                                        <span className="text-sm font-medium">Electricity Grid</span>
                                    </div>
                                    <input
                                        checked={layers.electricity}
                                        onChange={() => toggleLayer('electricity')}
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                        type="checkbox"
                                    />
                                </label>
                                <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${layers.gas ? 'bg-primary/5 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
                                        <span className="text-sm font-medium">Gas Network</span>
                                    </div>
                                    <input
                                        checked={layers.gas}
                                        onChange={() => toggleLayer('gas')}
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                        type="checkbox"
                                    />
                                </label>
                                <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${layers.lighting ? 'bg-primary/5 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-sky-500">lightbulb</span>
                                        <span className="text-sm font-medium">Public Lighting</span>
                                    </div>
                                    <input
                                        checked={layers.lighting}
                                        onChange={() => toggleLayer('lighting')}
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                        type="checkbox"
                                    />
                                </label>
                            </div>
                        </section>

                        {/* Status Summary Cards */}
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Operations Summary</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <p className="text-xs text-slate-500 font-medium">Active Complaints</p>
                                    <p className="text-2xl font-bold mt-1">124</p>
                                    <div className="flex items-center gap-1 mt-1 text-green-600">
                                        <span className="material-symbols-outlined text-xs">trending_up</span>
                                        <span className="text-[10px] font-bold">+12%</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <p className="text-xs text-slate-500 font-medium">Teams On-Site</p>
                                    <p className="text-2xl font-bold mt-1">42</p>
                                    <div className="flex items-center gap-1 mt-1 text-red-600">
                                        <span className="material-symbols-outlined text-xs">trending_down</span>
                                        <span className="text-[10px] font-bold">-5%</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Priority Filter Legend */}
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Priority Filter</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                    <span className="text-sm flex-1">Critical Priority</span>
                                    <span className="text-xs font-mono text-slate-400">18</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <span className="text-sm flex-1">High Priority</span>
                                    <span className="text-xs font-mono text-slate-400">34</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="text-sm flex-1">Medium/Low Priority</span>
                                    <span className="text-xs font-mono text-slate-400">72</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
                        <button className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">send</span>
                            Dispatch Center
                        </button>
                    </div>
                </aside>

                {/* Main Map Interface */}
                <div className="flex-1 relative bg-slate-200 dark:bg-slate-900">
                    {/* Map Background Representation */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&h=1080&fit=crop')",
                            filter: 'brightness(0.95) saturate(0.8)'
                        }}
                    />

                    {/* Floating Map Controls */}
                    <div className="absolute right-6 top-6 flex flex-col gap-3 z-30">
                        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
                            <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-b border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">add</span>
                            </button>
                            <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">remove</span>
                            </button>
                        </div>
                        <button className="bg-white dark:bg-slate-800 p-3 shadow-xl rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">my_location</span>
                        </button>
                        <button className="bg-white dark:bg-slate-800 p-3 shadow-xl rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">layers</span>
                        </button>
                    </div>

                    {/* Map Markers Visualization */}
                    {/* Truck Icon Marker */}
                    <div className="absolute top-[40%] left-[35%] z-20 group cursor-pointer">
                        <div className="relative flex flex-col items-center">
                            <div className="bg-primary text-white p-2 rounded-lg shadow-xl ring-2 ring-white">
                                <span className="material-symbols-outlined text-xl">local_shipping</span>
                            </div>
                            <div className="mt-1 bg-white dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold shadow-md border border-slate-200 dark:border-slate-700">
                                UNIT-104
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                        {/* Tooltip Overlay */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50">
                            <p className="text-xs font-bold text-slate-500 uppercase">Team Beta</p>
                            <p className="text-sm font-semibold mt-1">Status: On Route</p>
                            <p className="text-[11px] text-slate-400 mt-1">ETA: 8 mins</p>
                            <div className="mt-2 w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-primary"></div>
                            </div>
                        </div>
                    </div>

                    {/* Complaint Markers */}
                    <div className="absolute top-[25%] left-[60%] z-20">
                        <div className="animate-pulse w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="absolute top-[55%] left-[50%] z-20">
                        <div className="w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="absolute top-[65%] left-[25%] z-20">
                        <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                    </div>

                    {/* Cluster Marker */}
                    <div className="absolute top-[30%] left-[20%] z-20">
                        <div className="w-10 h-10 bg-slate-800/90 text-white rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-sm backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                            12
                        </div>
                    </div>

                    {/* Intervention Detail Card (Bottom Floating) */}
                    <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-[400px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-40 p-5 overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Main Pipe Burst</h4>
                                    <p className="text-xs text-slate-500">#INC-9821 • 1.2km away</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Priority</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span className="text-xs font-bold text-red-600">CRITICAL</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Time Active</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="material-symbols-outlined text-xs text-slate-400">schedule</span>
                                    <span className="text-xs font-bold">22m 14s</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                                Assign Unit
                            </button>
                            <button className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold py-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                Details
                            </button>
                        </div>
                    </div>

                    {/* Bottom Left Quick Ticker Overlay */}
                    <div className="absolute bottom-6 left-6 hidden xl:flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-lg rounded-full px-4 py-2 border border-slate-200 dark:border-slate-700 z-30">
                        <div className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-700">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">SYSTEM ONLINE</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[11px] text-slate-500">Last updated:</span>
                            <span className="text-[11px] font-bold">Just now</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

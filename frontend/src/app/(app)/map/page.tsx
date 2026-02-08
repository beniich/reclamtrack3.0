'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MapPage() {
    const [activeTab, setActiveTab] = useState('operations');

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 font-display h-[calc(100vh-64px)] overflow-hidden flex flex-col relative">

            {/* Main Content Area (Full Screen Map) */}
            <main className="relative flex-1 flex h-full overflow-hidden">

                {/* Sidebar Controls */}
                <aside className="w-80 bg-white border-r border-slate-200 flex flex-col z-40 shadow-xl overflow-y-auto hidden lg:flex">
                    <div className="p-6 space-y-8">
                        {/* Service Layers Section */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Couches de Service</h3>
                                <span className="material-symbols-outlined text-slate-400 text-sm cursor-help">info</span>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-xl cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">water_drop</span>
                                        <span className="text-sm font-semibold">Réseau d'Eau</span>
                                    </div>
                                    <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                </label>
                                <label className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border border-transparent">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-amber-500">bolt</span>
                                        <span className="text-sm font-medium">Réseau Électrique</span>
                                    </div>
                                    <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                </label>
                                <label className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border border-transparent">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
                                        <span className="text-sm font-medium">Réseau Gaz</span>
                                    </div>
                                    <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                </label>
                            </div>
                        </section>

                        {/* Status Summary */}
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Résumé des Opérations</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <p className="text-xs text-slate-500 font-medium">Réclamations Actives</p>
                                    <p className="text-2xl font-bold mt-1">124</p>
                                    <div className="flex items-center gap-1 mt-1 text-green-600">
                                        <span className="material-symbols-outlined text-xs">trending_up</span>
                                        <span className="text-[10px] font-bold">+12%</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <p className="text-xs text-slate-500 font-medium">Équipes sur Site</p>
                                    <p className="text-2xl font-bold mt-1">42</p>
                                    <div className="flex items-center gap-1 mt-1 text-red-600">
                                        <span className="material-symbols-outlined text-xs">trending_down</span>
                                        <span className="text-[10px] font-bold">-5%</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-auto p-4 border-t border-slate-200">
                        <button className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">send</span>
                            Centre de Dispatch
                        </button>
                    </div>
                </aside>

                {/* Map Interface */}
                <div className="flex-1 relative bg-slate-200 h-full w-full">
                    {/* Map Background (Placeholder) */}
                    <div className="absolute inset-0 z-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDe2l1u0piNNijPcrxuCVX87Snazt9J2StY4dJPySMgOFcCiTPXYNb5wtc8TSiATGQjSA51gBM2MTlccgLl24mQyE4A6a4pYTl3ECWYiTYsKvIn3AqQNuL2u0z4Zj4ya0NVxDtq11OWL2D3clYMdqoIzUT1y_fF1baqfQ04KdqwfJpkc-SalNlHDj_lBgKO5tappJZ2zOQ3KNhUrlChzhn6SGP12NAKUXq_bs88b5OI9wDf-ArL3kFDxPnWOjkd6IGnt8V6Nw-knLNS')" }}></div>

                    {/* Floating Controls */}
                    <div className="absolute right-6 top-6 flex flex-col gap-3 z-30">
                        <div className="bg-white shadow-xl rounded-xl flex flex-col overflow-hidden border border-slate-200">
                            <button className="p-3 hover:bg-slate-50 transition-colors border-b border-slate-200">
                                <span className="material-symbols-outlined text-slate-600">add</span>
                            </button>
                            <button className="p-3 hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-slate-600">remove</span>
                            </button>
                        </div>
                        <button className="bg-white p-3 shadow-xl rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined text-slate-600">my_location</span>
                        </button>
                        <button className="bg-white p-3 shadow-xl rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined text-slate-600">layers</span>
                        </button>
                    </div>

                    {/* Markers (Examples) */}
                    {/* Truck Marker */}
                    <div className="absolute top-[40%] left-[35%] z-20 group cursor-pointer">
                        <div className="relative flex flex-col items-center">
                            <div className="bg-primary text-white p-2 rounded-lg shadow-xl ring-2 ring-white">
                                <span className="material-symbols-outlined text-xl">local_shipping</span>
                            </div>
                            <div className="mt-1 bg-white px-2 py-0.5 rounded text-[10px] font-bold shadow-md border border-slate-200">UNIT-104</div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-white p-3 rounded-xl shadow-2xl border border-slate-200 z-50">
                            <p className="text-xs font-bold text-slate-500 uppercase">Équipe Beta</p>
                            <p className="text-sm font-semibold mt-1">Statut: En Route</p>
                            <p className="text-[11px] text-slate-400 mt-1">ETA: 8 mins</p>
                            <div className="mt-2 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-primary"></div>
                            </div>
                        </div>
                    </div>

                    {/* Complaint Marker */}
                    <div className="absolute top-[25%] left-[60%] z-20">
                        <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                    </div>

                    {/* Bottom Panel */}
                    <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-40 p-5 overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">warning</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Rupture de Canalisation Principale</h4>
                                    <p className="text-xs text-slate-500">#INC-9821 • 1.2km</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Priorité</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span className="text-xs font-bold text-red-600">CRITIQUE</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Temps Actif</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="material-symbols-outlined text-xs text-slate-400">schedule</span>
                                    <span className="text-xs font-bold">22m 14s</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors">Assigner Unité</button>
                            <button className="flex-1 bg-slate-100 text-slate-700 text-sm font-bold py-2.5 rounded-lg hover:bg-slate-200 transition-colors">Détails</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

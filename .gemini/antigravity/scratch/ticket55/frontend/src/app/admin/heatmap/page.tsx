'use client';

import React from 'react';

export default function HeatmapPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen w-full flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white dark:bg-[#111722] border-r border-slate-200 dark:border-slate-800 flex flex-col z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary rounded-lg p-2 text-white">
                        <span className="material-symbols-outlined">map</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-tight">InfraWatch</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Admin Portal v6.0</p>
                    </div>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-colors" href="#">
                        <span className="material-symbols-outlined">layers</span>
                        <span className="text-sm font-medium">Issue Heatmap</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
                        <span className="material-symbols-outlined">engineering</span>
                        <span className="text-sm font-medium">Interventions</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
                        <span className="material-symbols-outlined">analytics</span>
                        <span className="text-sm font-medium">Reports</span>
                    </a>
                    <div className="pt-6 pb-2 px-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Filters &amp; Layers</p>
                    </div>
                    <div className="px-3 space-y-4 pt-2">
                        <div className="space-y-2">
                            <label className="text-xs font-medium">Issue Category</label>
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-primary outline-none py-2 px-3">
                                <option>All Categories</option>
                                <option>Potholes</option>
                                <option>Streetlights</option>
                                <option>Sewage</option>
                                <option>Water Leak</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium">Time Period</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="text-xs py-1.5 px-2 bg-primary text-white rounded font-medium">24h</button>
                                <button className="text-xs py-1.5 px-2 bg-slate-100 dark:bg-slate-800 rounded font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">7 Days</button>
                            </div>
                        </div>
                        <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                                <span className="text-xs">Heatmap Intensity</span>
                                <span className="text-xs text-primary">High</span>
                            </div>
                            <input className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" type="range" />
                        </div>
                    </div>
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <img className="size-10 rounded-full border-2 border-primary/20" alt="Profile picture of the admin user" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIu7OBoS8lcmG5UxH0yRYzYgMOhK8bGlqs1TFG7TmmopPuUpDT-QnYG9oltfKrFuQZ2NR1GNSuq8h_NhXtYrTYyIcYnY7EKRuvtuN2zcK3QwkFYJcasZgU1GAVW-2jsroeeedjCBGfyrF7qsA4BjxCJ47iG6HWFGfhGqUruvNejHfrHkufz_MWGh13v5k-zErgcCgu1G8PD8mc3rZuGNUyNfrCFwf5H0YwxFgQl3eVM_MwNsAbpAqJHv9iy0sxSo_F8FEO4BjmsJiu" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Robert Chen</span>
                            <span className="text-xs text-slate-500">Infrastructure Lead</span>
                        </div>
                        <button className="ml-auto text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-xl">settings</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative flex flex-col">
                {/* Header */}
                <header className="absolute top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#111722]/80 backdrop-blur-md z-10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
                    <div className="flex items-center gap-6">
                        <div className="relative w-96">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="Search districts, streets, or report IDs..." type="text" />
                        </div>
                        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
                        <nav className="flex gap-6">
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Global View</a>
                            <a className="text-sm font-medium text-primary" href="#">District Analysis</a>
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Crew Tracking</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">add_location</span>
                            New Intervention
                        </button>
                        <div className="flex gap-2">
                            <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-primary relative hover:bg-slate-50 transition-all">
                                <span className="material-symbols-outlined text-xl">notifications</span>
                                <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Map Layer */}
                <div className="absolute inset-0 bg-slate-900 overflow-hidden">
                    {/* Background Image using generic placeholder or the provided one if valid. Using a style for the background image to match the request. */}
                    <div
                        className="absolute inset-0 bg-cover bg-center filter grayscale brightness-[0.4] contrast-[1.2]"
                        style={{
                            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE7HQzs4Uh-guulDxQs67bNnT70QzweRb0BVFWkTV57-mjlKc5XgvcCCGVmv4lM88ID1SvtEEN4y_SdJZQS1uA0AAqE1WP431cwWVzI-0wTJfk_Q6ZOz_qlrHxdHlJSCQ7AEQaGdUX0mSaC5KwE-SDYzSe5JkcN9JlXnZCaS5jfh4UUuaRipQBzUXvMzBR2hxeff5z29MmCEcsSd924bvNWz_U4QgN0vh02m7WJDNYSoT3wUmkTn3gbyIZvbSJWwL9G_kGBYCV1jTj')"
                        }}
                    ></div>

                    {/* Heatmap Simulation Overlay - CSS Gradients */}
                    <div className="absolute inset-0 mix-blend-screen opacity-80 pointer-events-none"
                        style={{
                            background: "radial-gradient(circle at 40% 40%, rgba(19, 91, 236, 0.4) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(19, 91, 236, 0.6) 0%, transparent 35%), radial-gradient(circle at 20% 80%, rgba(19, 91, 236, 0.3) 0%, transparent 30%), radial-gradient(circle at 85% 25%, rgba(19, 91, 236, 0.5) 0%, transparent 25%)"
                        }}
                    ></div>

                    {/* Map Markers */}
                    <div className="absolute top-[40%] left-[38%] group">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute size-10 bg-primary/30 rounded-full animate-ping"></div>
                            <div className="size-4 bg-primary rounded-full border-2 border-white shadow-xl relative z-10"></div>
                            <div className="absolute bottom-full mb-2 bg-white dark:bg-slate-900 p-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <p className="text-xs font-bold">District 04: Loop</p>
                                <p className="text-[10px] text-red-500">42 Urgent Complaints</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute right-6 bottom-32 flex flex-col gap-2 z-10">
                        <button className="size-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <button className="size-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <div className="h-2"></div>
                        <button className="size-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-primary">
                            <span className="material-symbols-outlined">my_location</span>
                        </button>
                    </div>

                    {/* Legend Overlay */}
                    <div className="absolute left-6 bottom-32 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-10 w-48">
                        <h3 className="text-xs font-bold mb-3">Issue Density</h3>
                        <div className="h-2 w-full bg-gradient-to-r from-blue-200 via-primary to-blue-900 rounded-full mb-2"></div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                            <span>Low</span>
                            <span>Moderate</span>
                            <span>Critical</span>
                        </div>
                    </div>
                </div>

                {/* Floating Stats Widgets */}
                <div className="absolute bottom-8 left-8 right-8 flex gap-4 z-10">
                    <div className="flex-1 bg-white/95 dark:bg-[#111722]/95 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center gap-4">
                        <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">priority_high</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Total Active Complaints</p>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">1,284</span>
                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">+12%</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white/95 dark:bg-[#111722]/95 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center gap-4">
                        <div className="size-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500">
                            <span className="material-symbols-outlined">distance</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Critical Hotspots</p>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">12</span>
                                <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">-2%</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white/95 dark:bg-[#111722]/95 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center gap-4">
                        <div className="size-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                            <span className="material-symbols-outlined">timer</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Avg. Resolution Time</p>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">4.2d</span>
                                <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">-15%</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-[1.5] bg-white/95 dark:bg-[#111722]/95 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Intervention Success</p>
                            <span className="text-xs font-bold text-primary">94%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <div className="w-[94%] h-full bg-primary rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Right Side Overlay Panel */}
                <div className="absolute top-20 right-6 w-80 max-h-[calc(100%-12rem)] flex flex-col gap-4 z-10 pointer-events-none">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl pointer-events-auto">
                        <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">trending_up</span>
                            Top Problematic Districts
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Downtown Central</span>
                                    <span className="text-[10px] text-slate-500">Mainly Road/Sewage Issues</span>
                                </div>
                                <span className="text-xs font-bold py-1 px-2 bg-red-500/10 text-red-500 rounded">Critical</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Riverside West</span>
                                    <span className="text-[10px] text-slate-500">Mainly Streetlight Outages</span>
                                </div>
                                <span className="text-xs font-bold py-1 px-2 bg-orange-500/10 text-orange-500 rounded">Moderate</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">East Industrial</span>
                                    <span className="text-[10px] text-slate-500">Recurring Water Main Leaks</span>
                                </div>
                                <span className="text-xs font-bold py-1 px-2 bg-orange-500/10 text-orange-500 rounded">Moderate</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            View Full District Ranking
                        </button>
                    </div>
                    <div className="bg-primary/95 text-white p-5 rounded-xl shadow-2xl pointer-events-auto">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <span className="material-symbols-outlined white">emergency</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded">Active Crew</span>
                        </div>
                        <h4 className="font-bold text-sm">Emergency Road Repair</h4>
                        <p className="text-[10px] text-white/70 mb-4 leading-relaxed">Crew alpha-9 responding to sewage breach on 5th Avenue hotspot.</p>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <img className="size-6 rounded-full border border-primary object-cover" alt="Maintenance team member portrait 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL0oJEDLzF9ZvLyrwjQVuYShyQZJ4UtXiYeFBaWI7KW6d3DuGnMZV7K39IiW_CMK0Q4kqcFmrwN9yo3ZTfpMgYvo4nGw8Drw7tyGuwEbJZR5xDtIrECdTHVmB2xLPesmonfn4FF1-NPWC7oqIEoOVGLMsLxQyysrePpidUIG3bcYfU3dtphyG64FNKfzf4KAHAvlKfUlj8Ijywmys33GELBxW1MfLucKVzQrH34PSmUcIoEPTinrZQZLhP_HCTozd4LI23Il35bEJb" />
                                <img className="size-6 rounded-full border border-primary object-cover" alt="Maintenance team member portrait 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAykEf6OfmR1wM4ht6-bIViRhdUo39Xre1fFNuy73G9ZFEfQkjy_CQBKtyqkMW5z5wgiBdICuY7Ve7EELQp2zkB8YoA-IaKtD_JjordTsqDbXQ6aqTxJPUGhvaYyPBPwzazYd7CJRPVtYqX4Dbp3SDk2WCI-PxSzsFbP3QkFDJcMWInSGs0pBIDw9vHs7C2Siiu7u-4N9gDYhYwN1FO1w1GkYU7W-J0G2Txp79WKOLnRoDFwTgy-efrj8GBjKUTfHQZ_cIOVnIY3Wyt" />
                            </div>
                            <span className="text-[10px] font-medium">+3 more onsite</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

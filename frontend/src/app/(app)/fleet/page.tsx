'use client';

import { useState } from 'react';

export default function FleetPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Vehicle Fleet Monitoring</h2>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Add New Vehicle
                    </button>
                </div>
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500">TOTAL VEHICLES</span>
                        <span className="material-symbols-outlined text-primary">local_shipping</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-black">124</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span>+2%
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500">ACTIVE ASSIGNMENTS</span>
                        <span className="material-symbols-outlined text-blue-400">task_alt</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-black">86</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span>+5%
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ring-1 ring-amber-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500">MAINTENANCE ALERTS</span>
                        <span className="material-symbols-outlined text-amber-500">warning</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-black">12</h3>
                        <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_down</span>-3%
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ring-1 ring-red-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500">LOW FUEL WARNINGS</span>
                        <span className="material-symbols-outlined text-red-500">ev_station</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-black">05</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span>+1%
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
                    <button className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-primary text-slate-900 dark:text-white rounded-md shadow-sm">All Trucks</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Service Due</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">On Assignment</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Idle</button>
                </div>
            </div>

            {/* Vehicle Health Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Vehicle Plate</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Model / Type</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Fuel Level</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Last Maintenance</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Assignment</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
                        {/* Row 1: Maintenance Overdue */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded bg-red-500/10 text-red-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg">dangerous</span>
                                    </div>
                                    <span className="font-bold tracking-wide">TX-7742-G</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">Volvo FH16 Service</td>
                            <td className="px-6 py-4">
                                <div className="w-full max-w-[100px]">
                                    <div className="flex items-center justify-between text-[10px] mb-1 font-bold">
                                        <span>24%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[24%]"></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-red-400">Oct 12, 2023</span>
                                    <span className="text-[10px] text-slate-400">Overdue by 14 days</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-slate-500 italic">None - Grounded</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Maintenance Due</span>
                            </td>
                        </tr>

                        {/* Row 2: Healthy */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                    </div>
                                    <span className="font-bold tracking-wide">BC-9011-Z</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">Ford Transit Box</td>
                            <td className="px-6 py-4">
                                <div className="w-full max-w-[100px]">
                                    <div className="flex items-center justify-between text-[10px] mb-1 font-bold">
                                        <span>82%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[82%]"></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-400">Jan 15, 2024</td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-semibold">Sector 7 Logistics</span>
                                    <span className="text-[10px] text-slate-400">Driver: M. Rossi</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-primary/20 dark:text-blue-400">On Duty</span>
                            </td>
                        </tr>

                        {/* Row 3: Service Soon */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg">priority_high</span>
                                    </div>
                                    <span className="font-bold tracking-wide">NY-5520-X</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">Mercedes Actros</td>
                            <td className="px-6 py-4">
                                <div className="w-full max-w-[100px]">
                                    <div className="flex items-center justify-between text-[10px] mb-1 font-bold">
                                        <span>45%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 w-[45%]"></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-amber-500">Feb 28, 2024</span>
                                    <span className="text-[10px] text-slate-400">Scheduled soon</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-semibold">Downtown Hub Delivery</span>
                                    <span className="text-[10px] text-slate-400">Driver: K. Thompson</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Service Soon</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">Showing 3 of 124 vehicles</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-white dark:hover:bg-primary/20 transition-colors">Previous</button>
                        <button className="px-3 py-1 rounded bg-white dark:bg-primary border border-slate-200 dark:border-primary text-xs font-bold shadow-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

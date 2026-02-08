'use client';

import { useState } from 'react';

export default function RosterPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
                        <button className="material-symbols-outlined p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300">chevron_left</button>
                        <div className="px-4 text-sm font-bold text-slate-700 dark:text-slate-200">Oct 23 - Oct 29, 2023</div>
                        <button className="material-symbols-outlined p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300">chevron_right</button>
                    </div>
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50">Today</button>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium shadow-sm">
                        <span className="material-symbols-outlined text-lg">filter_list</span>
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
                        <span className="material-symbols-outlined text-lg">publish</span>
                        Publish Roster
                    </button>
                </div>
            </div>

            {/* Roster Table Container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-800 px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-r border-slate-200 dark:border-slate-700 min-w-[280px]">
                                    Team Member
                                </th>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                                    <th key={day} className={`px-4 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 ${idx >= 5 ? 'bg-slate-100/50 dark:bg-slate-800/80' : ''}`}>
                                        <div className="text-slate-900 dark:text-white mb-0.5">{day}</div>
                                        <div className="text-[10px]">Oct {23 + idx}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {/* Staff Member 1 */}
                            <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 px-6 py-4 border-r border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">AR</div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">Alex Rivera</div>
                                            <div className="text-[11px] text-slate-500 font-medium">Intervention Lead • 38h</div>
                                        </div>
                                    </div>
                                </td>
                                {/* Days */}
                                <td className="p-2 border-r border-slate-100 dark:border-slate-800">
                                    <div className="bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-2 text-center">
                                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Morning</span>
                                    </div>
                                </td>
                                <td className="p-2 border-r border-slate-100 dark:border-slate-800">
                                    <div className="bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-2 text-center">
                                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Morning</span>
                                    </div>
                                </td>
                                <td className="p-2 border-r border-slate-100 dark:border-slate-800">
                                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-lg p-2 text-center flex flex-col items-center">
                                        <span className="material-symbols-outlined text-sm text-red-500">flight_takeoff</span>
                                        <span className="text-[10px] font-bold text-red-600 dark:text-red-400">Annual Leave</span>
                                    </div>
                                </td>
                                <td className="p-2 border-r border-slate-100 dark:border-slate-800">
                                    <div className="bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-2 text-center">
                                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Morning</span>
                                    </div>
                                </td>
                                <td className="p-2 border-r border-slate-100 dark:border-slate-800">
                                    <div className="bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-2 text-center">
                                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Morning</span>
                                    </div>
                                </td>
                                <td className="p-2 border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20"></td>
                                <td className="p-2 bg-slate-50 dark:bg-slate-800/20"></td>
                            </tr>

                            {/* Staff Member 2 */}
                            <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 px-6 py-4 border-r border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">SC</div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">Sam Chen</div>
                                            <div className="text-[11px] text-slate-500 font-medium">Support Staff • 44h</div>
                                        </div>
                                    </div>
                                </td>
                                {[...Array(5)].map((_, i) => (
                                    <td key={i} className="p-2 border-r border-slate-100 dark:border-slate-800">
                                        <div className="bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-2 text-center">
                                            <span className="text-xs font-bold text-blue-700 dark:text-blue-400">Night</span>
                                        </div>
                                    </td>
                                ))}
                                <td className="p-2 border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20"></td>
                                <td className="p-2 bg-slate-50 dark:bg-slate-800/20"></td>
                            </tr>

                            {/* Staff Member 3 */}
                            <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 px-6 py-4 border-r border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">JS</div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">Jordan Smith</div>
                                            <div className="text-[11px] text-slate-500 font-medium">Intervention • 40h</div>
                                        </div>
                                    </div>
                                </td>
                                {[...Array(5)].map((_, i) => (
                                    <td key={i} className="p-2 border-r border-slate-100 dark:border-slate-800">
                                        <div className="bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg p-2 text-center">
                                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Afternoon</span>
                                        </div>
                                    </td>
                                ))}
                                <td className="p-2 border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
                                    <div className="bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-2 text-center">
                                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Morning</span>
                                    </div>
                                </td>
                                <td className="p-2 bg-slate-50 dark:bg-slate-800/20">
                                    <div className="bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-2 text-center">
                                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Morning</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">check_circle</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">142</div>
                        <div className="text-sm text-slate-500 font-medium">Confirmed Shifts</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">pending_actions</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-sm text-slate-500 font-medium">Pending Leave Requests</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 border-l-4 border-l-red-500">
                    <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">error</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">2</div>
                        <div className="text-sm text-slate-500 font-medium">Coverage Conflicts</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

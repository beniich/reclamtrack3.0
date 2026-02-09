'use client';

export default function AuditLogsPage() {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation Bar */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 py-3 bg-white dark:bg-slate-900 sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 text-primary">
                                <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                                    <span className="material-symbols-outlined">shield_person</span>
                                </div>
                                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">AuditGuard</h2>
                            </div>
                            <label className="flex flex-col min-w-40 h-10 max-w-64">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div className="text-slate-500 dark:text-slate-400 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
                                        <span className="material-symbols-outlined text-xl">search</span>
                                    </div>
                                    <input
                                        className="flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-800 focus:ring-0 h-full placeholder:text-slate-500 text-sm rounded-r-lg"
                                        placeholder="Quick search..."
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="flex flex-1 justify-end gap-6 items-center">
                            <nav className="hidden md:flex items-center gap-6">
                                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="/dashboard">Dashboard</a>
                                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="/complaints">Complaints</a>
                                <a className="text-primary text-sm font-bold border-b-2 border-primary py-4" href="#">Audit Logs</a>
                                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Users</a>
                                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Settings</a>
                            </nav>
                            <div className="flex gap-2 border-l border-slate-200 dark:border-slate-800 pl-6">
                                <button className="relative flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined">notifications</span>
                                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                                </button>
                                <button className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined">help</span>
                                </button>
                            </div>
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-200 dark:border-slate-700 shadow-sm"
                                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop")' }}
                            ></div>
                        </div>
                    </header>

                    <main className="flex flex-col flex-1 max-w-[1280px] mx-auto w-full px-6 py-8">
                        {/* Hero Header Section */}
                        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold tracking-tight">Audit Logs & Activity Feed</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">Comprehensive trail of all system interventions and record modifications for full transparency.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-lg">sync</span>
                                    <span>Live Feed</span>
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    <span>Export CSV</span>
                                </button>
                            </div>
                        </div>

                        {/* Stats Ribbon */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">list_alt</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Logs Today</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">1,284</span>
                                    <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-[10px] font-black">arrow_upward</span>12%
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                                        <span className="material-symbols-outlined">priority_high</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Critical Alerts</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">12</span>
                                    <span className="text-red-500 text-xs font-bold bg-red-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-[10px] font-black">arrow_upward</span>5%
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                        <span className="material-symbols-outlined">person_check</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Operators</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">45</span>
                                    <span className="text-slate-400 text-xs font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-[10px] font-black">trending_flat</span>0%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Filter Bar */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 shadow-sm">
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex-1 min-w-[280px]">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">manage_search</span>
                                        <input
                                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Search Record ID (e.g., REC-005)..."
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-medium hover:bg-slate-200 transition-colors">
                                        <span>All Actions</span>
                                        <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                                    </button>
                                    <button className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-medium hover:bg-slate-200 transition-colors text-primary">
                                        <span>Last 24 Hours</span>
                                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                                    </button>
                                    <button className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-medium hover:bg-slate-200 transition-colors">
                                        <span>Status: All</span>
                                        <span className="material-symbols-outlined text-lg">tune</span>
                                    </button>
                                    <button className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 transition-colors">
                                        <span className="material-symbols-outlined">filter_list</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Log Feed Container */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Target Record</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Details</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Timestamp</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {/* Entry 1 */}
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop")' }}></div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">Operator A</span>
                                                        <span className="text-xs text-slate-400">ID: OP-112</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                    CREATED
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a className="text-sm font-bold text-primary hover:underline" href="#">REC-005</a>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                Initial intervention record for district #04
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">2 minutes ago</span>
                                                    <span className="text-[10px] text-slate-400 uppercase">10:42:15 AM</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Entry 2 */}
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop")' }}></div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">Sarah Admin</span>
                                                        <span className="text-xs text-slate-400">ID: AD-002</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                                    STATUS CHANGE
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a className="text-sm font-bold text-primary hover:underline" href="#">REC-002</a>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                <div className="flex items-center gap-2">
                                                    <span className="line-through opacity-50">Open</span>
                                                    <span className="material-symbols-outlined text-xs">trending_flat</span>
                                                    <span className="font-bold text-emerald-500">Resolved</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">14 minutes ago</span>
                                                    <span className="text-[10px] text-slate-400 uppercase">10:30:02 AM</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Entry 3 (Critical Alert Row) */}
                                        <tr className="bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-l-4 border-l-red-500">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                                        <span className="material-symbols-outlined text-xl">person</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">System</span>
                                                        <span className="text-xs text-slate-400">ID: SYS-AUTO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                    DELETED
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a className="text-sm font-bold text-primary hover:underline" href="#">REC-089</a>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-red-600 dark:text-red-400">
                                                Duplicate record purged by integrity check
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">45 minutes ago</span>
                                                    <span className="text-[10px] text-slate-400 uppercase">09:59:10 AM</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Entry 4 */}
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop")' }}></div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">Mike Field</span>
                                                        <span className="text-xs text-slate-400">ID: OP-105</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                                    MODIFIED
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a className="text-sm font-bold text-primary hover:underline" href="#">REC-012</a>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                Updated site inspection notes
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">1 hour ago</span>
                                                    <span className="text-[10px] text-slate-400 uppercase">09:42:15 AM</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination / Load More */}
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic">Showing 1-15 of 1,284 events</p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>Previous</button>
                                    <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded hover:bg-blue-700 transition-colors shadow-sm">Next</button>
                                </div>
                            </div>
                        </div>

                        {/* Side Detail Panel */}
                        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">data_exploration</span>
                                    Action Trend (Last 24h)
                                </h3>
                                <div className="h-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-end justify-between px-6 pb-6 pt-10">
                                    <div className="w-8 bg-primary/20 rounded-t-sm h-1/4 relative group">
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">120</div>
                                    </div>
                                    <div className="w-8 bg-primary/40 rounded-t-sm h-2/4"></div>
                                    <div className="w-8 bg-primary/20 rounded-t-sm h-1/3"></div>
                                    <div className="w-8 bg-primary h-full rounded-t-sm"></div>
                                    <div className="w-8 bg-primary/60 rounded-t-sm h-3/4"></div>
                                    <div className="w-8 bg-primary/30 rounded-t-sm h-2/5"></div>
                                    <div className="w-8 bg-primary/50 rounded-t-sm h-1/2"></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-500">verified_user</span>
                                    Security Insights
                                </h3>
                                <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Average Session Time</span>
                                        <span className="font-bold text-slate-900 dark:text-white">42m 15s</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-primary h-full w-[65%]"></div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Unusual Login attempts</span>
                                        <span className="font-bold text-amber-500">0 today</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                        All system services are operating normally. Audit trails are syncing in real-time.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="mt-auto px-6 py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">© 2026 Intervention Manager System • Audit variant 10/10 • Internal Use Only</p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

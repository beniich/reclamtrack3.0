'use client';

export default function AnalyticsPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display flex h-screen overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2 text-white">
                            <span className="material-symbols-outlined">analytics</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold tracking-tight">OpsAnalytics</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">v4.0 Enterprise</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" href="/dashboard">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" href="/complaints">
                        <span className="material-symbols-outlined">inbox</span>
                        <span className="text-sm font-medium">Complaints</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" href="#">
                        <span className="material-symbols-outlined">gavel</span>
                        <span className="text-sm font-medium">Interventions</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" href="#">
                        <span className="material-symbols-outlined">monitoring</span>
                        <span className="text-sm font-semibold">Performance</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" href="/admin/teams">
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-sm font-medium">Team Analytics</span>
                    </a>
                </nav>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium">Settings</span>
                    </div>
                    <div className="mt-4 flex items-center gap-3 px-3 py-2">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <img className="w-full h-full object-cover" alt="Admin user profile avatar" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">Alex Morgan</p>
                            <p className="text-[10px] text-slate-500 truncate">System Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 dark:bg-background-dark/50">
                {/* Header */}
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold">Operational Analytics</h2>
                        <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">Live</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                            <input
                                className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20 placeholder:text-slate-500"
                                placeholder="Search operations..."
                                type="text"
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                        </button>
                        <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-sm">download</span>
                            Export Report
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1600px] mx-auto w-full">
                    {/* Overview Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight">Performance Overview</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Aggregated data for the current billing cycle (Oct 1 - Oct 31)</p>
                        </div>
                        <div className="flex gap-2 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                            <button className="px-3 py-1.5 text-xs font-bold rounded bg-slate-100 dark:bg-slate-700 dark:text-white">Daily</button>
                            <button className="px-3 py-1.5 text-xs font-medium rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">Weekly</button>
                            <button className="px-3 py-1.5 text-xs font-medium rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">Monthly</button>
                        </div>
                    </div>

                    {/* KPI Widgets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Total Complaints</span>
                                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                    <span className="material-symbols-outlined">inbox</span>
                                </div>
                            </div>
                            <div className="flex items-end gap-3">
                                <h4 className="text-3xl font-bold">1,842</h4>
                                <span className="text-green-600 text-xs font-bold pb-1.5 flex items-center bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                    <span className="material-symbols-outlined text-xs">arrow_upward</span> 12.5%
                                </span>
                            </div>
                            <p className="text-slate-400 text-[10px] mt-2 italic">Vs previous 30 days</p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Avg Response Time</span>
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                            </div>
                            <div className="flex items-end gap-3">
                                <h4 className="text-3xl font-bold">42m</h4>
                                <span className="text-red-600 text-xs font-bold pb-1.5 flex items-center bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">
                                    <span className="material-symbols-outlined text-xs">arrow_downward</span> 5.2%
                                </span>
                            </div>
                            <p className="text-slate-400 text-[10px] mt-2 italic">Target: Under 30m</p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Team Efficiency</span>
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                            </div>
                            <div className="flex items-end gap-3">
                                <h4 className="text-3xl font-bold">94.8%</h4>
                                <span className="text-green-600 text-xs font-bold pb-1.5 flex items-center bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                    <span className="material-symbols-outlined text-xs">arrow_upward</span> 2.1%
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: '94.8%' }}></div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Pending Interventions</span>
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                    <span className="material-symbols-outlined">pending_actions</span>
                                </div>
                            </div>
                            <div className="flex items-end gap-3">
                                <h4 className="text-3xl font-bold">28</h4>
                                <span className="text-slate-500 text-xs font-bold pb-1.5 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">No change</span>
                            </div>
                            <p className="text-slate-400 text-[10px] mt-2 italic">8 Urgent / 20 Routine</p>
                        </div>
                    </div>

                    {/* Main Graphs Section */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Line Graph: Resolution Time Trends */}
                        <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h5 className="text-base font-bold">Resolution Time Trends</h5>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Historical analysis of ticket lifecycle</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Service</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Technical</span>
                                    </div>
                                </div>
                            </div>
                            {/* Placeholder for Line Graph */}
                            <div className="h-64 flex flex-col justify-end gap-4 relative">
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <svg className="w-full h-full opacity-20 dark:opacity-40" preserveAspectRatio="none" viewBox="0 0 100 40">
                                        <path d="M0,35 Q10,15 20,25 T40,10 T60,30 T80,5 T100,20" fill="none" stroke="#2424eb" strokeWidth="1.5"></path>
                                        <path d="M0,38 Q10,25 20,35 T40,20 T60,35 T80,15 T100,30" fill="none" stroke="#cbd5e1" strokeWidth="1.5"></path>
                                    </svg>
                                </div>
                                <div className="absolute inset-0 flex items-end justify-between px-2 pb-6 border-b border-slate-100 dark:border-slate-800">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <div key={day} className="text-[10px] text-slate-400">{day}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pie Chart: Status Distribution */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                            <h5 className="text-base font-bold mb-1">Status Distribution</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">Current ticket load by status</p>
                            <div className="flex-1 flex flex-col items-center justify-center relative my-4">
                                {/* Circular Donut Chart Visualization */}
                                <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 dark:border-slate-800 relative flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-[12px] border-primary border-t-transparent border-r-transparent -rotate-45"></div>
                                    <div className="text-center">
                                        <span className="text-2xl font-black">1.2k</span>
                                        <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Active</p>
                                    </div>
                                </div>
                                <div className="w-full grid grid-cols-2 gap-y-4 mt-8 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Resolved (62%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">In Progress (22%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Open (11%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Escalated (5%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Bar Chart & Intervention List */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
                        {/* Bar Chart: Complaints by Nature */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h5 className="text-base font-bold">Complaints by Nature</h5>
                                <button className="text-xs font-bold text-primary hover:underline">View All Category</button>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span>Technical Hardware</span>
                                        <span>482</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span>Billing & Payments</span>
                                        <span>312</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary/80 h-full" style={{ width: '55%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span>Service Availability</span>
                                        <span>214</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary/60 h-full" style={{ width: '40%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span>Staff Conduct</span>
                                        <span>98</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary/40 h-full" style={{ width: '20%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Intervention List */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h5 className="text-base font-bold">Active Interventions</h5>
                                <span className="text-[10px] font-bold text-slate-400">AUTO-REFRESH: 30S</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">priority_high</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">Server Rack Failure</p>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Node-73X Central District</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-bold">Urgent</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">build</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">Optical Line Repair</p>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Sunset Blvd Residence</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold">Routine</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">check_circle</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">Account Verification</p>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Corporate HQ - Floor 12</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold">Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="p-8 mt-auto border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <p>© 2024 Operations Intelligence Systems. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="hover:text-primary transition-colors" href="#">Data Policy</a>
                            <a className="hover:text-primary transition-colors" href="#">System Status</a>
                            <a className="hover:text-primary transition-colors" href="#">Help Center</a>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}

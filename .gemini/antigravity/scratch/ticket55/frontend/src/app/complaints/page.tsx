'use client';

export default function ComplaintsListPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0e0e1b] dark:text-white min-h-screen font-display flex flex-col">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between border-b border-solid border-[#e7e7f3] dark:border-[#2a2a4a] bg-white dark:bg-slate-900 px-6 py-4 lg:px-10 sticky top-0 z-50">
                <div className="flex items-center gap-4 text-[#0e0e1b] dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                        <span className="material-symbols-outlined text-2xl">confirmation_number</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">Complaint Management</h2>
                        <p className="text-xs text-[#4d4d99] dark:text-slate-400">Service & Intervention Dashboard</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 mr-4">
                        <button className="p-2 text-[#4d4d99] dark:text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="p-2 text-[#4d4d99] dark:text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                    </div>
                    <a href="/complaints/new" className="flex items-center justify-center gap-2 rounded-lg bg-primary h-10 px-4 text-white text-sm font-bold transition-all hover:bg-opacity-90 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">add</span>
                        <span>New Complaint</span>
                    </a>
                    <div
                        className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/20"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop")' }}
                    ></div>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-4 lg:p-10 max-w-[1600px] mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight mb-2">Advanced Complaint List</h1>
                        <p className="text-[#4d4d99] dark:text-slate-400">Manage, filter, and track all service interventions in real-time.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#e7e7f3] dark:border-[#2a2a4a] text-sm font-semibold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                            Export PDF
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#e7e7f3] dark:border-[#2a2a4a] text-sm font-semibold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-lg">assignment_ind</span>
                            Assign Selected
                        </button>
                    </div>
                </div>

                {/* Filter Bar Section */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7e7f3] dark:border-[#2a2a4a] p-4 mb-6 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative w-full lg:flex-1">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4d4d99] pointer-events-none">search</span>
                            <input
                                className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#f8f8fc] dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-primary text-sm font-medium placeholder:text-slate-400"
                                placeholder="Search by ID, customer, nature..."
                                type="text"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                            <button className="flex items-center gap-2 h-11 px-4 rounded-lg bg-[#f8f8fc] dark:bg-slate-800/50 text-sm font-medium border border-transparent hover:border-[#e7e7f3] dark:hover:border-[#2a2a4a] transition-all">
                                <span className="material-symbols-outlined text-lg">calendar_today</span>
                                <span>Date Range</span>
                                <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                            </button>
                            <button className="flex items-center gap-2 h-11 px-4 rounded-lg bg-[#f8f8fc] dark:bg-slate-800/50 text-sm font-medium border border-transparent hover:border-[#e7e7f3] dark:hover:border-[#2a2a4a] transition-all">
                                <span className="material-symbols-outlined text-lg">groups</span>
                                <span>Team</span>
                                <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                            </button>
                            <button className="flex items-center gap-2 h-11 px-4 rounded-lg bg-[#f8f8fc] dark:bg-slate-800/50 text-sm font-medium border border-transparent hover:border-[#e7e7f3] dark:hover:border-[#2a2a4a] transition-all">
                                <span className="material-symbols-outlined text-lg">pending_actions</span>
                                <span>Status</span>
                                <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                            </button>
                            <button className="flex items-center gap-2 h-11 px-4 rounded-lg bg-[#f8f8fc] dark:bg-slate-800/50 text-sm font-medium border border-transparent hover:border-[#e7e7f3] dark:hover:border-[#2a2a4a] transition-all">
                                <span className="material-symbols-outlined text-lg">priority_high</span>
                                <span>Priority</span>
                                <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                            </button>
                            <button className="flex items-center justify-center h-11 w-11 rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 transition-colors">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                        </div>
                    </div>
                    {/* Active Filter Pills */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#e7e7f3] dark:border-[#2a2a4a]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4d4d99] mr-2 self-center">Active Filters:</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">
                            Team: Alpha
                            <button className="hover:bg-primary/20 rounded-full p-0.5"><span className="material-symbols-outlined text-sm block">close</span></button>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">
                            Status: In Progress
                            <button className="hover:bg-primary/20 rounded-full p-0.5"><span className="material-symbols-outlined text-sm block">close</span></button>
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline ml-2">Clear All</button>
                    </div>
                </div>

                {/* Data Table Container */}
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-[#e7e7f3] dark:border-[#2a2a4a] overflow-hidden shadow-sm flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8f8fc] dark:bg-[#111121] border-b border-[#e7e7f3] dark:border-[#2a2a4a]">
                                    <th className="p-4 w-12 text-center">
                                        <input className="rounded border-[#e7e7f3] text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    </th>
                                    <th className="p-4 text-xs font-black text-[#4d4d99] uppercase tracking-widest">Complaint ID</th>
                                    <th className="p-4 text-xs font-black text-[#4d4d99] uppercase tracking-widest">Date</th>
                                    <th className="p-4 text-xs font-black text-[#4d4d99] uppercase tracking-widest">Customer Name</th>
                                    <th className="p-4 text-xs font-black text-[#4d4d99] uppercase tracking-widest">Nature</th>
                                    <th className="p-4 text-xs font-black text-[#4d4d99] uppercase tracking-widest">Team</th>
                                    <th className="p-4 text-xs font-black text-[#4d4d99] uppercase tracking-widest">Status</th>
                                    <th className="p-4 text-xs font-black text-[#4d4d99] uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e7e7f3] dark:divide-[#2a2a4a]">
                                {/* Row 1: Urgent/New */}
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer group">
                                    <td className="p-4 text-center">
                                        <input className="rounded border-[#e7e7f3] text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    </td>
                                    <td className="p-4 font-bold text-primary group-hover:underline">#CMP-8842</td>
                                    <td className="p-4 text-sm text-[#4d4d99] dark:text-[#8a8ab5]">24/05/2024</td>
                                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Robert J. Sterling</td>
                                    <td className="p-4 text-sm max-w-xs truncate text-slate-600 dark:text-slate-300">Critical server connectivity failure in North Wing</td>
                                    <td className="p-4">
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-[#e7e7f3] dark:bg-[#2a2a4a] text-slate-600 dark:text-slate-300">TEAM ALPHA</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5 animate-pulse"></span>
                                            URGENT
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-[#e7e7f3] dark:hover:bg-[#2a2a4a] rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-xl text-slate-400 dark:text-slate-500">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 2: Normal/Progress */}
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer group">
                                    <td className="p-4 text-center">
                                        <input checked className="rounded border-[#e7e7f3] text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    </td>
                                    <td className="p-4 font-bold text-primary group-hover:underline">#CMP-8839</td>
                                    <td className="p-4 text-sm text-[#4d4d99] dark:text-[#8a8ab5]">23/05/2024</td>
                                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Sarah Jenkins</td>
                                    <td className="p-4 text-sm max-w-xs truncate text-slate-600 dark:text-slate-300">Maintenance request for HVAC unit 4B</td>
                                    <td className="p-4">
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-[#e7e7f3] dark:bg-[#2a2a4a] text-slate-600 dark:text-slate-300">TEAM BETA</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5 animate-pulse"></span>
                                            IN PROGRESS
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-[#e7e7f3] dark:hover:bg-[#2a2a4a] rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-xl text-slate-400 dark:text-slate-500">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 3: Resolved */}
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer group">
                                    <td className="p-4 text-center">
                                        <input className="rounded border-[#e7e7f3] text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    </td>
                                    <td className="p-4 font-bold text-primary group-hover:underline">#CMP-8831</td>
                                    <td className="p-4 text-sm text-[#4d4d99] dark:text-[#8a8ab5]">22/05/2024</td>
                                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Lumina Global Corp</td>
                                    <td className="p-4 text-sm max-w-xs truncate text-slate-600 dark:text-slate-300">Software license renewal assistance</td>
                                    <td className="p-4">
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-[#e7e7f3] dark:bg-[#2a2a4a] text-slate-600 dark:text-slate-300">TEAM GAMMA</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                            <span className="material-symbols-outlined text-xs mr-1">check_circle</span>
                                            RESOLVED
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-[#e7e7f3] dark:hover:bg-[#2a2a4a] rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-xl text-slate-400 dark:text-slate-500">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 4: High/New */}
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer group">
                                    <td className="p-4 text-center">
                                        <input className="rounded border-[#e7e7f3] text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    </td>
                                    <td className="p-4 font-bold text-primary group-hover:underline">#CMP-8825</td>
                                    <td className="p-4 text-sm text-[#4d4d99] dark:text-[#8a8ab5]">21/05/2024</td>
                                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Marco Rossi</td>
                                    <td className="p-4 text-sm max-w-xs truncate text-slate-600 dark:text-slate-300">Water leak reported in basement storage</td>
                                    <td className="p-4">
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-[#e7e7f3] dark:bg-[#2a2a4a] text-slate-600 dark:text-slate-300">TEAM ALPHA</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                                            HIGH
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-[#e7e7f3] dark:hover:bg-[#2a2a4a] rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-xl text-slate-400 dark:text-slate-500">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 5 */}
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer group">
                                    <td className="p-4 text-center">
                                        <input className="rounded border-[#e7e7f3] text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    </td>
                                    <td className="p-4 font-bold text-primary group-hover:underline">#CMP-8810</td>
                                    <td className="p-4 text-sm text-[#4d4d99] dark:text-[#8a8ab5]">20/05/2024</td>
                                    <td className="p-4 font-semibold text-slate-900 dark:text-white">TechLink Solutions</td>
                                    <td className="p-4 text-sm max-w-xs truncate text-slate-600 dark:text-slate-300">Faulty peripheral devices in reception</td>
                                    <td className="p-4">
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-[#e7e7f3] dark:bg-[#2a2a4a] text-slate-600 dark:text-slate-300">TEAM DELTA</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-[#e7e7f3] text-[#4d4d99] dark:bg-[#2a2a4a] dark:text-[#8a8ab5]">
                                            NEW
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-[#e7e7f3] dark:hover:bg-[#2a2a4a] rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-xl text-slate-400 dark:text-slate-500">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Footer */}
                    <div className="flex items-center justify-between p-4 bg-[#f8f8fc] dark:bg-[#111121] border-t border-[#e7e7f3] dark:border-[#2a2a4a] mt-auto">
                        <div className="flex items-center gap-4">
                            <p className="text-sm text-[#4d4d99] dark:text-[#8a8ab5]">Showing 1-10 of 1,240 results</p>
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="text-sm text-[#4d4d99] dark:text-[#8a8ab5]">Rows per page:</span>
                                <select className="text-sm bg-transparent border-none focus:ring-0 font-bold p-0 pr-6 text-[#0e0e1b] dark:text-white cursor-pointer">
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e7e7f3] dark:border-[#2a2a4a] hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 text-[#4d4d99] dark:text-slate-400" disabled>
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-md">1</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 text-sm font-medium text-[#4d4d99] dark:text-slate-400">2</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 text-sm font-medium text-[#4d4d99] dark:text-slate-400">3</button>
                            <span className="px-2 text-[#4d4d99] dark:text-slate-500">...</span>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 text-sm font-medium text-[#4d4d99] dark:text-slate-400">124</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e7e7f3] dark:border-[#2a2a4a] hover:bg-white dark:hover:bg-slate-800 text-[#4d4d99] dark:text-slate-400">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 mb-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-[#e7e7f3] dark:border-[#2a2a4a] shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <div>
                            <p className="text-sm text-[#4d4d99] dark:text-[#8a8ab5] font-medium">Total Open</p>
                            <p className="text-2xl font-black text-[#0e0e1b] dark:text-white">412</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-[#e7e7f3] dark:border-[#2a2a4a] shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div>
                            <p className="text-sm text-[#4d4d99] dark:text-[#8a8ab5] font-medium">Critical Issues</p>
                            <p className="text-2xl font-black text-[#0e0e1b] dark:text-white">28</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-[#e7e7f3] dark:border-[#2a2a4a] shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                            <span className="material-symbols-outlined">verified</span>
                        </div>
                        <div>
                            <p className="text-sm text-[#4d4d99] dark:text-[#8a8ab5] font-medium">Resolved Today</p>
                            <p className="text-2xl font-black text-[#0e0e1b] dark:text-white">84</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-[#e7e7f3] dark:border-[#2a2a4a] shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                            <span className="material-symbols-outlined">avg_time</span>
                        </div>
                        <div>
                            <p className="text-sm text-[#4d4d99] dark:text-[#8a8ab5] font-medium">Avg Resolution</p>
                            <p className="text-2xl font-black text-[#0e0e1b] dark:text-white">4.2h</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

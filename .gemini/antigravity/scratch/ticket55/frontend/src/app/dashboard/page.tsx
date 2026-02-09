'use client';

export default function DashboardPage() {
    const complaints = [
        { id: '#CM-2039', category: 'Water Leakage', icon: 'water_drop', iconColor: 'text-blue-500', location: 'Rabat - Agdal', status: 'New', statusColor: 'bg-blue-100 text-blue-700', team: 'A1', time: '2 mins ago' },
        { id: '#CM-2038', category: 'Public Lighting', icon: 'lightbulb', iconColor: 'text-amber-500', location: 'Salé - Hay Salam', status: 'In Progress', statusColor: 'bg-amber-100 text-amber-700', team: 'B4', time: '14 mins ago' },
        { id: '#CM-2035', category: 'Waste Collection', icon: 'delete', iconColor: 'text-green-500', location: 'Rabat - Souissi', status: 'Resolved', statusColor: 'bg-emerald-100 text-emerald-700', team: 'C2', time: '1 hour ago' },
        { id: '#CM-2034', category: 'Pothole Emergency', icon: 'warning', iconColor: 'text-red-500', location: 'Rabat - Center', status: 'Urgent', statusColor: 'bg-red-100 text-red-700', team: 'A9', time: '3 hours ago' },
    ];

    const feedItems = [
        { title: 'New complaint reported', desc: 'Hydrant leak reported in Salé Marina sector by citizen ID #882.', time: 'JUST NOW', icon: 'person_add', bgColor: 'bg-blue-100', textColor: 'text-blue-600', borderColor: 'border-blue-500' },
        { title: 'Intervention Completed', desc: 'Team Rabat-2 resolved public lighting issue #CM-1992.', time: '12M AGO', icon: 'check_circle', bgColor: 'bg-emerald-100', textColor: 'text-emerald-600', borderColor: 'border-transparent' },
        { title: 'Critical Power Outage', desc: 'Grid failure detected in Rabat Old Medina. High priority dispatch needed.', time: '45M AGO', icon: 'bolt', bgColor: 'bg-red-100', textColor: 'text-red-600', borderColor: 'border-red-500' },
        { title: 'Shift Handover', desc: 'Team Salé-4 started morning maintenance route.', time: '1H AGO', icon: 'schedule', bgColor: 'bg-slate-100', textColor: 'text-slate-600', borderColor: 'border-transparent' },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Operations Dashboard</h2>
                    <p className="text-slate-500 text-sm">Real-time intervention monitoring for Rabat-Salé sector.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm font-medium">
                        <span className="material-symbols-outlined text-lg text-slate-400">calendar_month</span>
                        Last 24 Hours
                    </div>
                    <button className="text-white rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2" style={{ backgroundColor: '#2424eb' }}>
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export Report
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                        <span className="material-symbols-outlined text-slate-400">equalizer</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                    </div>
                    <p className="text-3xl font-black">1,428</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium"><span className="text-emerald-500">+12%</span> from last week</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border border-slate-200 dark:border-slate-800" style={{ borderLeftColor: '#2424eb' }}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="material-symbols-outlined" style={{ color: '#2424eb' }}>new_releases</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">New</span>
                    </div>
                    <p className="text-3xl font-black">156</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Active today</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border border-slate-200 dark:border-slate-800" style={{ borderLeftColor: '#f59e0b' }}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="material-symbols-outlined text-amber-500">pending_actions</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">In Progress</span>
                    </div>
                    <p className="text-3xl font-black">412</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Being serviced</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border border-slate-200 dark:border-slate-800" style={{ borderLeftColor: '#10b981' }}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="material-symbols-outlined text-emerald-500">task_alt</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Resolved</span>
                    </div>
                    <p className="text-3xl font-black">842</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Successfully closed</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border border-slate-200 dark:border-slate-800 shadow-sm shadow-red-100" style={{ borderLeftColor: '#ef4444' }}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="material-symbols-outlined text-red-500 animate-pulse">error</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Urgent</span>
                    </div>
                    <p className="text-3xl font-black text-red-500">18</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">High priority</p>
                </div>
            </div>

            {/* Main Content Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Complaints List */}
                <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                        <h3 className="font-bold text-lg">Recent Complaints</h3>
                        <button className="text-sm font-bold hover:underline" style={{ color: '#2424eb' }}>View All List</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                <tr>
                                    <th className="px-5 py-3">ID</th>
                                    <th className="px-5 py-3">Category</th>
                                    <th className="px-5 py-3">Location</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Team</th>
                                    <th className="px-5 py-3">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {complaints.map((complaint, index) => (
                                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="px-5 py-4 font-mono text-xs font-bold text-slate-600 dark:text-slate-400">{complaint.id}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`material-symbols-outlined text-lg ${complaint.iconColor}`}>{complaint.icon}</span>
                                                <span className="text-sm font-semibold">{complaint.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm">{complaint.location}</td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2 py-1 ${complaint.statusColor} text-[10px] font-black uppercase rounded`}>{complaint.status}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 flex items-center justify-center text-[10px] font-bold">{complaint.team}</div>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500">{complaint.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Live Feed */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/20">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#2424eb' }}></span>
                            <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: '#2424eb' }}></span>
                        </span>
                        <h3 className="font-bold text-lg">Live Feed</h3>
                    </div>
                    <div className="p-4 space-y-4 overflow-y-auto max-h-[450px]">
                        {feedItems.map((item, index) => (
                            <div key={index} className={`flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border-l-2 ${item.borderColor}`}>
                                <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center flex-shrink-0 ${item.textColor}`}>
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold leading-snug">{item.title}</p>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                    <p className="text-[10px] font-bold uppercase" style={{ color: item.borderColor === 'border-transparent' ? '#94a3b8' : item.textColor.replace('text-', '#') }}>{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                        <button className="w-full text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 py-2 rounded-lg hover:text-blue-600 transition-colors">Clear History</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

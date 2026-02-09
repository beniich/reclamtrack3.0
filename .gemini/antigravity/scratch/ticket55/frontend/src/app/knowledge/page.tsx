'use client';

import React from 'react';

export default function KnowledgeBasePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
                {/* Header / TopNavBar Section */}
                <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 py-3">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary rounded-lg text-white">
                                <span className="material-symbols-outlined text-2xl">account_tree</span>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight">OpsCenter <span className="text-primary font-medium">KB</span></h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Dashboard</a>
                            <a className="text-sm font-semibold text-primary" href="#">SOP Library</a>
                            <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Interventions</a>
                            <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Analytics</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder-slate-400" placeholder="Search procedures, codes, or keywords..." type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
                        </button>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                            <span className="material-symbols-outlined">help</span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold leading-none">John Operator</p>
                                <p className="text-[10px] text-slate-500 font-medium">L3 Technician</p>
                            </div>
                            <div className="size-9 rounded-full bg-slate-200 overflow-hidden border border-slate-300 dark:border-slate-700">
                                <img className="w-full h-full object-cover" alt="User profile" src="https://randomuser.me/api/portraits/men/32.jpg" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Left Sidebar Navigation */}
                    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark hidden lg:flex flex-col p-4 shrink-0">
                        <div className="mb-6">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Categories</p>
                            <div className="space-y-1">
                                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                                    <span className="material-symbols-outlined text-lg">description</span>
                                    All Protocols
                                </button>
                                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
                                    <span className="material-symbols-outlined text-lg">warning</span>
                                    Emergency Response
                                </button>
                                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
                                    <span className="material-symbols-outlined text-lg">build</span>
                                    Maintenance
                                </button>
                                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
                                    <span className="material-symbols-outlined text-lg">shield</span>
                                    Safety &amp; Compliance
                                </button>
                                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
                                    <span className="material-symbols-outlined text-lg">support_agent</span>
                                    Customer Complaints
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Asset Types</p>
                            <div className="space-y-1">
                                <label className="flex items-center gap-3 px-3 py-2 cursor-pointer group">
                                    <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Pipelines &amp; Mains</span>
                                </label>
                                <label className="flex items-center gap-3 px-3 py-2 cursor-pointer group">
                                    <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Electrical Grid</span>
                                </label>
                                <label className="flex items-center gap-3 px-3 py-2 cursor-pointer group">
                                    <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Gas Infrastructure</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-auto p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <p className="text-xs font-bold mb-2">Need Live Support?</p>
                            <p className="text-[11px] text-slate-500 mb-3">Direct line to Central Dispatch for urgent clarifications.</p>
                            <button className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-sm">call</span>
                                Call Supervisor
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
                        {/* Breadcrumbs & Header */}
                        <div className="px-8 pt-6">
                            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4">
                                <a className="hover:text-primary transition-colors" href="#">Knowledge Base</a>
                                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                                <a className="hover:text-primary transition-colors" href="#">Maintenance</a>
                                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                                <span className="text-slate-900 dark:text-slate-200">Plumbing SOPs</span>
                            </nav>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Standard Operating Procedures</h1>
                                    <p className="text-slate-500 mt-1 max-w-2xl font-medium">Technical guides and step-by-step intervention protocols for field operators and customer service desk.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-bold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined text-lg">download</span>
                                        Export All
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                                        <span className="material-symbols-outlined text-lg">add</span>
                                        Create SOP
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Filters & Controls */}
                        <div className="px-8 py-4 flex flex-wrap items-center gap-3 bg-white/50 dark:bg-transparent sticky top-0 z-40 backdrop-blur-sm">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                                Status: Active
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                                Priority: All
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                                Sorted by: Newest
                                <span className="material-symbols-outlined text-sm">swap_vert</span>
                            </button>
                            <div className="ml-auto flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <button className="p-1.5 bg-white dark:bg-slate-700 shadow-sm rounded-md">
                                    <span className="material-symbols-outlined text-sm">grid_view</span>
                                </button>
                                <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                    <span className="material-symbols-outlined text-sm">list</span>
                                </button>
                            </div>
                        </div>

                        {/* SOP Cards Grid */}
                        <div className="px-8 pb-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {/* SOP Card 1: Critical */}
                            <div className="group bg-white dark:bg-slate-900 border-2 border-transparent hover:border-primary/50 rounded-xl p-5 shadow-sm transition-all flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-2 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase rounded tracking-wider">
                                        Urgent Safety
                                    </div>
                                    <span className="text-slate-400 group-hover:text-primary cursor-pointer material-symbols-outlined">more_vert</span>
                                </div>
                                <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">Main Pipe Repair Protocol (High Pressure)</h3>
                                <p className="text-sm text-slate-500 mt-auto line-clamp-2 mb-6">Critical safety measures and sequence for handling structural failures in main water pipelines above 40 bar.</p>
                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">history</span> v2.4</span>
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">timer</span> 45 mins</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex -space-x-2">
                                            <div className="size-6 rounded-full bg-blue-200 border border-white dark:border-slate-900 overflow-hidden"><img alt="Reviewer 1" src="https://randomuser.me/api/portraits/women/42.jpg" /></div>
                                            <div className="size-6 rounded-full bg-emerald-200 border border-white dark:border-slate-900 overflow-hidden"><img alt="Reviewer 2" src="https://randomuser.me/api/portraits/women/65.jpg" /></div>
                                        </div>
                                        <button className="text-primary text-xs font-bold hover:underline">View Protocol</button>
                                    </div>
                                </div>
                            </div>

                            {/* SOP Card 2 */}
                            <div className="group bg-white dark:bg-slate-900 border-2 border-transparent hover:border-primary/50 rounded-xl p-5 shadow-sm transition-all flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded tracking-wider">
                                        Maintenance
                                    </div>
                                    <span className="text-slate-400 material-symbols-outlined">more_vert</span>
                                </div>
                                <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">Substation Cooling System Flush</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-6">Routine procedure for annual descaling of secondary cooling loops in District 4-8 substations.</p>
                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">history</span> v1.1</span>
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">timer</span> 120 mins</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex -space-x-2">
                                            <div className="size-6 rounded-full bg-slate-200 border border-white dark:border-slate-900 overflow-hidden"><img alt="Reviewer" src="https://randomuser.me/api/portraits/men/22.jpg" /></div>
                                        </div>
                                        <button className="text-primary text-xs font-bold hover:underline">View Protocol</button>
                                    </div>
                                </div>
                            </div>

                            {/* SOP Card 3 */}
                            <div className="group bg-white dark:bg-slate-900 border-2 border-transparent hover:border-primary/50 rounded-xl p-5 shadow-sm transition-all flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-2 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase rounded tracking-wider">
                                        Customer Service
                                    </div>
                                    <span className="text-slate-400 material-symbols-outlined">more_vert</span>
                                </div>
                                <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">Tier 3 Complaint Escalation Matrix</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-6">Detailed decision tree for escalating environmental impact complaints to senior legal department.</p>
                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">history</span> v5.0</span>
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">timer</span> 10 mins</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex -space-x-2">
                                            <div className="size-6 rounded-full bg-purple-200 border border-white dark:border-slate-900 overflow-hidden"><img alt="Reviewer" src="https://randomuser.me/api/portraits/women/11.jpg" /></div>
                                            <div className="size-6 rounded-full bg-pink-200 border border-white dark:border-slate-900 overflow-hidden"><img alt="Reviewer" src="https://randomuser.me/api/portraits/women/12.jpg" /></div>
                                        </div>
                                        <button className="text-primary text-xs font-bold hover:underline">View Protocol</button>
                                    </div>
                                </div>
                            </div>

                            {/* SOP Card 4 */}
                            <div className="group bg-white dark:bg-slate-900 border-2 border-transparent hover:border-primary/50 rounded-xl p-5 shadow-sm transition-all flex flex-col opacity-80">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase rounded tracking-wider">
                                        Draft
                                    </div>
                                    <span className="text-slate-400 material-symbols-outlined">more_vert</span>
                                </div>
                                <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">Bio-Hazard Containment Phase 1</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-6">New draft for handling potential water source contamination events in suburban zones.</p>
                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">history</span> v0.1</span>
                                        <span className="flex items-center gap-1.5 text-primary">Awaiting Review</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="text-xs font-bold text-slate-400">ID: KB-7729</div>
                                        <button className="text-primary text-xs font-bold hover:underline">Resume Draft</button>
                                    </div>
                                </div>
                            </div>

                            {/* SOP Card 5 */}
                            <div className="group bg-white dark:bg-slate-900 border-2 border-transparent hover:border-primary/50 rounded-xl p-5 shadow-sm transition-all flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded tracking-wider">
                                        Compliance
                                    </div>
                                    <span className="text-slate-400 material-symbols-outlined">more_vert</span>
                                </div>
                                <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">Annual Safety Gear Inspection (OSHA)</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-6">Mandatory compliance check procedure for all field-assigned PPE and electrical insulation kits.</p>
                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">history</span> v4.2</span>
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">timer</span> 180 mins</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex -space-x-2">
                                            <div className="size-6 rounded-full bg-slate-200 border border-white dark:border-slate-900 overflow-hidden"><img alt="Reviewer" src="https://randomuser.me/api/portraits/men/55.jpg" /></div>
                                        </div>
                                        <button className="text-primary text-xs font-bold hover:underline">View Protocol</button>
                                    </div>
                                </div>
                            </div>

                            {/* Add New Card Placeholder */}
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all rounded-xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer min-h-[250px]">
                                <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-2xl">post_add</span>
                                </div>
                                <p className="font-bold text-slate-700 dark:text-slate-300">Draft New SOP</p>
                                <p className="text-xs text-slate-500 mt-1">Start from a template or clone an existing one.</p>
                            </div>
                        </div>
                    </main>

                    {/* Quick Info / Details Sidebar (Contextual) */}
                    <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark hidden xl:flex flex-col shrink-0">
                        <div className="p-6">
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Recently Viewed</h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="size-10 shrink-0 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined">gas_meter</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-tight">Gas Meter Calibration</p>
                                        <p className="text-[11px] text-slate-500 mt-1">Viewed 12m ago • By You</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined">warning_amber</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-tight">Spill Response Kit Log</p>
                                        <p className="text-[11px] text-slate-500 mt-1">Viewed 4h ago • By Admin</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 shrink-0 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined">checklist_rtl</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-tight">Pre-Intervention Checklist</p>
                                        <p className="text-[11px] text-slate-500 mt-1">Viewed yesterday • By You</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Quick Stats</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase leading-none mb-1">Total SOPs</p>
                                    <p className="text-xl font-black">124</p>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase leading-none mb-1">Archived</p>
                                    <p className="text-xl font-black">18</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-slate-500">System Status</span>
                                <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase">
                                    <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    Healthy
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[94%] bg-primary rounded-full"></div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 font-medium">Last synced: 3 minutes ago</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

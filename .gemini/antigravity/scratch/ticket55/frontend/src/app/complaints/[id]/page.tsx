'use client';

import { useState } from 'react';

export default function ComplaintDetailPage() {
    const [newNote, setNewNote] = useState('');

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-symbols-outlined block">confirmation_number</span>
                            </div>
                            <h1 className="text-lg font-bold tracking-tight">
                                Intervention<span className="text-primary">Hub</span>
                            </h1>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/dashboard">
                                Dashboard
                            </a>
                            <a className="text-sm font-semibold text-primary" href="/complaints">
                                Complaints
                            </a>
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/teams">
                                Teams
                            </a>
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                                Reports
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden lg:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                            <input
                                className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary"
                                placeholder="Search tickets..."
                                type="text"
                            />
                        </div>
                        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-700">
                            <img className="w-full h-full object-cover" alt="User profile" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto p-6">
                {/* Ticket Header Action Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Tickets / REC-001</span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                                IN PROGRESS
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase">
                                High Priority
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Water Leakage in Main Lobby</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            Created on Oct 24, 2023 at 09:00 AM • Reported by Web Portal
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                            <span className="material-symbols-outlined text-lg">person_add</span> Reassign
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                            <span className="material-symbols-outlined text-lg">task_alt</span> Resolve
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">add</span> New Note
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Side: Timeline & Details (8 Columns) */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Central Timeline */}
                        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">timeline</span> Intervention Timeline
                            </h3>
                            <div className="relative space-y-0">
                                {/* Vertical line */}
                                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800"></div>

                                {/* Step 1: Created */}
                                <div className="relative pl-12 pb-8">
                                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border-4 border-white dark:border-slate-900">
                                        <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-base font-bold">check</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-base">Complaint Created</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">System generated via customer portal</p>
                                        </div>
                                        <span className="text-xs font-medium text-slate-400">Oct 24, 09:00 AM</span>
                                    </div>
                                </div>

                                {/* Step 2: Assigned */}
                                <div className="relative pl-12 pb-8">
                                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-4 border-white dark:border-slate-900">
                                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-base font-bold">person</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-base">Assigned to Technical Team</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Handled by John Smith (Supervisor)</p>
                                        </div>
                                        <span className="text-xs font-medium text-slate-400">Oct 24, 10:30 AM</span>
                                    </div>
                                </div>

                                {/* Step 3: In Progress (Current) */}
                                <div className="relative pl-12 pb-2">
                                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-white dark:border-slate-900 ring-4 ring-primary/10">
                                        <span className="material-symbols-outlined text-white text-base animate-pulse">pending</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-base">Intervention In Progress</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Technician dispatched to onsite location</p>
                                            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Latest Update</p>
                                                <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                                                    "Main valve located, preparing for pipe replacement. Tools assembled." - Marc L.
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-primary">Just now</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Detailed Description */}
                        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold mb-4">Complaint Details</h3>
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                <p>
                                    Customer reports a significant water leak originating from the ceiling of the main entrance lobby. The leak has
                                    caused a slippery surface near the elevator banks. The building management has placed warning signs, but the volume
                                    of water is increasing. Immediate intervention is required to prevent electrical damage to the nearby control panel.
                                </p>
                                <ul className="mt-4 space-y-2 list-disc list-inside">
                                    <li>Origin: Ceiling pipe rupture suspect</li>
                                    <li>Affected area: Lobby G-Floor</li>
                                    <li>Risk level: High (Proximity to electrical panels)</li>
                                </ul>
                            </div>
                        </section>

                        {/* Internal Notes Area */}
                        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold">Internal Team Notes</h3>
                                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold text-slate-500">3 NOTES</span>
                            </div>
                            <div className="space-y-6">
                                {/* Note 1 */}
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex-shrink-0 flex items-center justify-center font-bold text-indigo-600">
                                        JS
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">John Smith</span>
                                            <span className="text-xs text-slate-400">2 hours ago</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                            Notified the electrical maintenance team to be on standby just in case the leak spreads to the riser room.
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Reply Input */}
                                <div className="mt-8 flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center font-bold text-primary">
                                        AM
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary p-3"
                                            placeholder="Add an internal note..."
                                            rows={2}
                                            value={newNote}
                                            onChange={(e) => setNewNote(e.target.value)}
                                        />
                                        <div className="flex justify-end mt-2">
                                            <button className="bg-primary text-white text-xs font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-all">
                                                Post Note
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Sidebar Panels (4 Columns) */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Client Details Panel */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Client Information</h4>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                                        <img className="w-full h-full object-cover" alt="Client profile" src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-lg">Acme Property Corp</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Contact: Robert Wilson</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="material-symbols-outlined text-slate-400">call</span>
                                        <span className="text-slate-600 dark:text-slate-300 font-medium">+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="material-symbols-outlined text-slate-400">mail</span>
                                        <span className="text-slate-600 dark:text-slate-300 font-medium underline decoration-primary/30">
                                            robert@acmeproperty.com
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm">
                                        <span className="material-symbols-outlined text-slate-400">location_on</span>
                                        <span className="text-slate-600 dark:text-slate-300 font-medium leading-tight">
                                            4521 Business Plaza, Suite 402,<br />
                                            New York, NY 10001
                                        </span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary/10 text-primary hover:bg-primary/20 transition-all rounded-lg font-bold text-sm">
                                    <span className="material-symbols-outlined text-base">chat_bubble</span> Send Message
                                </button>
                            </div>
                        </div>

                        {/* Map Snippet */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Intervention Site</h4>
                                <span className="text-[10px] font-black bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                                    G-FLOOR
                                </span>
                            </div>
                            <div className="h-48 relative bg-slate-100 dark:bg-slate-800">
                                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-50 overflow-hidden" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <span className="material-symbols-outlined text-4xl text-primary animate-bounce">location_on</span>
                                        <div className="w-4 h-4 bg-primary/20 rounded-full blur-md mx-auto"></div>
                                    </div>
                                </div>
                                <div className="absolute bottom-2 left-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-slate-400">directions_car</span>
                                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                                        ETA for support: 15 mins away
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                                <span className="text-xs font-medium text-slate-500">Coordinates: 40.7128° N, 74.0060° W</span>
                                <button className="text-xs font-bold text-primary hover:underline">View Map</button>
                            </div>
                        </div>

                        {/* Attachments Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Evidence & Photos</h4>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative group cursor-pointer border border-slate-200 dark:border-slate-700">
                                        <img className="w-full h-full object-cover" alt="Ceiling leak" src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white">visibility</span>
                                        </div>
                                    </div>
                                    <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative group cursor-pointer border border-slate-200 dark:border-slate-700">
                                        <img className="w-full h-full object-cover" alt="Lobby flooding" src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=400&fit=crop" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white">visibility</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:text-primary hover:border-primary transition-all font-semibold text-xs">
                                    <span className="material-symbols-outlined text-base">cloud_upload</span> Upload File
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Bottom Action Bar (Mobile) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 py-4 lg:hidden">
                <div className="flex items-center gap-3">
                    <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Add Note</button>
                    <button className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

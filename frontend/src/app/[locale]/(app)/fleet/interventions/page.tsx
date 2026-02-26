'use client';

import { Calendar, ChevronRight, MapPin, User, Wrench } from 'lucide-react';

export default function FleetInterventionsPage() {
    const interventions = [
        { id: 'INT-2041', vehicle: 'TX-7742-G', type: 'Oil Change', status: 'Scheduled', date: 'Feb 28, 2024', location: 'Main Garage', technician: 'M. Chen' },
        { id: 'INT-2042', vehicle: 'BC-9011-Z', type: 'Tire Rotation', status: 'In Progress', date: 'Feb 25, 2024', location: 'Site B', technician: 'A. Smith' },
        { id: 'INT-2043', vehicle: 'NY-5520-X', type: 'Brake Repair', status: 'Completed', date: 'Feb 20, 2024', location: 'Main Garage', technician: 'J. Doe' },
    ];

    return (
        <div className="p-8 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Interventions</h2>
                    <p className="text-sm text-slate-500 font-medium">Schedule and track maintenance interventions for your fleet.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <Wrench className="w-4 h-4" />
                    Schedule Intervention
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">Active Interventions</h3>
                    {interventions.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-[#1c1c30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                                    item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                    item.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                                    'bg-amber-500/10 text-amber-500'
                                }`}>
                                    <Wrench className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-black text-slate-900 dark:text-white">{item.type}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{item.id}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {item.location}</span>
                                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {item.technician}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right mr-4">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vehicle</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white">{item.vehicle}</span>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                    item.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                                    'bg-amber-500/10 text-amber-500'
                                }`}>
                                    {item.status}
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">Technician Availability</h3>
                    <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        {[
                            { name: 'Marc Stevens', role: 'Chief Mechanic', status: 'Available', color: 'emerald' },
                            { name: 'Sarah Connor', role: 'Electronics Spec.', status: 'On Site', color: 'blue' },
                            { name: 'Tom Hardy', role: 'Engine Specialist', status: 'In Session', color: 'amber' },
                        ].map((tech) => (
                            <div key={tech.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs text-slate-500">
                                        {tech.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{tech.name}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{tech.role}</p>
                                    </div>
                                </div>
                                <span className={`h-2 w-2 rounded-full bg-${tech.color}-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]`}></span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/20 space-y-3">
                        <h4 className="text-sm font-black text-primary uppercase tracking-widest">Efficiency Tip</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            Batching maintenance for vehicles in the same zone can reduce technician travel time by up to 25%.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

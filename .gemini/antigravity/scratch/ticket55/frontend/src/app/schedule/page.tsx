'use client';

import React from 'react';
import {
    Clock,
    Navigation,
    CheckCircle2,
    Pause,
    Play,
    RefreshCcw,
    MapPin,
    Calendar,
    ChevronRight,
    AlertCircle,
    PhoneCall,
    Menu,
    Search,
    Bell,
    Settings
} from 'lucide-react';
import Link from 'next/link';

// Mock Sidebar Component (Inline for this page to function standalone)
const Sidebar = () => (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">engineering</span>
            </div>
            <div>
                <h1 className="font-bold text-sm leading-tight">TechPortal</h1>
                <p className="text-xs text-slate-500">Field Operations</p>
            </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link href="/schedule" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span className="text-sm font-medium">Agenda</span>
            </Link>
            <Link href="/interventions" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">build</span>
                <span className="text-sm font-medium">Interventions</span>
            </Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 px-2">
                <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                </div>
                <div>
                    <p className="text-sm font-bold">John Doe</p>
                    <p className="text-[10px] text-slate-500">Senior Tech</p>
                </div>
            </div>
        </div>
    </aside>
);

// Mock Header Component
const Header = ({ breadcrumbs }: { breadcrumbs: { label: string; href: string }[] }) => (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
            {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <ChevronRight size={14} />}
                    <Link href={crumb.href} className={index === breadcrumbs.length - 1 ? 'text-primary font-bold' : 'hover:text-primary transition-colors'}>
                        {crumb.label}
                    </Link>
                </React.Fragment>
            ))}
        </div>
        <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><Search size={20} /></button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><Bell size={20} /></button>
        </div>
    </header>
);

const TechnicianDashboard = () => {
    // Mock data for the technician
    const activeTask = {
        id: 'JOB#4492',
        title: 'Global Logistics Center',
        type: 'HVAC REPAIR',
        location: '123 Industrial Way, North Wing, Loading Dock 4',
        timer: '00:45:12',
        priority: 'CRITICAL',
        description: 'Bruit de grincement inhabituel dans l\'unité B-12 et panne complète de refroidissement dans la salle des serveurs. Nécessite une inspection immédiate du compresseur.'
    };

    const nextTasks = [
        { id: 'JOB#4495', title: 'Riverside Apartment Complex', address: '442 Water St. • Dysfonctionnement Interphone', time: '14:30 - 16:00' },
        { id: 'JOB#4501', title: 'Metro Bank HQ', address: '88 Financial Plaza • Maintenance de Routine', time: '16:30 - 17:30' }
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header
                    breadcrumbs={[
                        { label: 'Technicien', href: '#' },
                        { label: 'Agenda du Jour', href: '/schedule' }
                    ]}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
                    {/* Header Section */}
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">Technician Dashboard</span>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Agenda du jour</h2>
                            <p className="text-slate-500 text-sm font-medium mt-1 flex items-center gap-2">
                                <Calendar size={14} /> Vendredi, 25 Oct • <span className="text-primary font-bold">4 interventions en attente</span>
                            </p>
                        </div>
                        <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl text-slate-500 hover:text-primary transition-all shadow-sm flex items-center gap-2 font-bold text-sm">
                            <RefreshCcw size={16} /> Rafraîchir
                        </button>
                    </div>

                    {/* Active Task Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Tâche Active</h3>
                            <span className="ml-auto bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-red-200 uppercase tracking-widest">Priority: {activeTask.priority}</span>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden flex flex-col lg:flex-row">
                            {/* Map Side */}
                            <div className="lg:w-1/3 h-64 lg:h-auto bg-slate-100 dark:bg-slate-800 relative group overflow-hidden">
                                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Map Simulation</span>
                                </div>
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                                        <MapPin size={40} className="text-primary relative z-10" fill="currentColor" strokeWidth={1} />
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                                        <Navigation size={18} fill="currentColor" /> Ouvrir GPS
                                    </button>
                                </div>
                            </div>

                            {/* Info Side */}
                            <div className="lg:w-2/3 p-8 lg:p-10 space-y-8 relative">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                            {activeTask.id} • {activeTask.type}
                                        </span>
                                        <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{activeTask.title}</h4>
                                        <p className="text-slate-500 font-medium flex items-center gap-2 text-sm">
                                            <MapPin size={16} className="text-primary" /> {activeTask.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 text-primary">
                                            <Clock size={20} strokeWidth={3} />
                                            <span className="text-2xl font-black tracking-tighter tabular-nums">{activeTask.timer}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-l-[6px] border-primary space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Description de la plainte</p>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {activeTask.description}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button className="flex-[2] bg-emerald-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                                        <CheckCircle2 size={18} strokeWidth={3} /> Marquer comme résolu
                                    </button>
                                    <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                        <Pause size={18} strokeWidth={3} /> Pause
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Next Tasks */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Prochaines Interventions</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {nextTasks.map((task, idx) => (
                                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-black bg-slate-50 dark:bg-slate-800 text-slate-400 px-2 py-1 rounded-lg uppercase tracking-widest">{task.id}</span>
                                        <span className="text-[11px] font-black text-primary bg-primary/5 px-2 py-1 rounded-lg tabular-nums tracking-tighter">{task.time}</span>
                                    </div>
                                    <h5 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">{task.title}</h5>
                                    <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">{task.address}</p>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-primary text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-transform">
                                            Démarrer Travail
                                        </button>
                                        <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-primary">
                                            <PhoneCall size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Floating Contact Support */}
                <div className="fixed bottom-6 right-6 flex flex-col gap-3">
                    <button className="size-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all group">
                        <AlertCircle size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="size-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-all">
                        <PhoneCall size={24} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboard;

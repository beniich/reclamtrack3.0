'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import {
    Settings as SettingsIcon,
    Plus,
    Download,
    MoreVertical,
    Search,
    Filter,
    Layers,
    CheckCircle2,
    AlertTriangle,
    Zap,
    Trash2,
    Edit3,
    ArrowUpDown
} from 'lucide-react';

const KPICard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: { value: string, isPositive: boolean } }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                {icon}
            </div>
            {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.isPositive ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
                    {trend.value}
                </span>
            )}
        </div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
    </div>
);

export default function CategorySettings() {
    const [categories] = useState([
        { id: 1, name: 'Water Leak', department: 'Facilities - Plumbing', priority: 'High', status: true, icon: '💧' },
        { id: 2, name: 'Power Outage', department: 'Facilities - Electrical', priority: 'Urgent', status: true, icon: '⚡' },
        { id: 3, name: 'Elevator Stuck', department: 'Security & Maintenance', priority: 'Urgent', status: true, icon: '🛗' },
        { id: 4, name: 'Network Outage', department: 'Not Assigned', priority: 'Medium', status: false, icon: '💻' },
    ]);

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'bg-red-100 text-red-600 border-red-200';
            case 'High': return 'bg-orange-100 text-orange-600 border-orange-200';
            case 'Medium': return 'bg-blue-100 text-blue-600 border-blue-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Header Action Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Configuration des Services</h2>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">
                                Définissez comment les plaintes sont catégorisées, prioritaires et acheminées vers les équipes techniques.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
                                <Download size={16} /> Export CSV
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-lg shadow-primary/25 hover:scale-105 transition-all">
                                <Plus size={18} strokeWidth={3} /> Ajouter Catégorie
                            </button>
                        </div>
                    </div>

                    {/* KPI Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <KPICard
                            title="Total Catégories"
                            value="32"
                            icon={<Layers className="text-primary" size={20} />}
                            trend={{ value: "+4 ce mois", isPositive: true }}
                        />
                        <KPICard
                            title="Status Actif"
                            value="28"
                            icon={<CheckCircle2 className="text-emerald-500" size={20} />}
                            trend={{ value: "87.5% opérative", isPositive: true }}
                        />
                        <KPICard
                            title="Non Assignés"
                            value="3"
                            icon={<AlertTriangle className="text-amber-500" size={20} />}
                            trend={{ value: "Requiert attention", isPositive: false }}
                        />
                        <KPICard
                            title="Types Urgents"
                            value="6"
                            icon={<Zap className="text-red-500" size={20} />}
                            trend={{ value: "Réponse Haute", isPositive: true }}
                        />
                    </div>

                    {/* Toolbar & Filters */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Filtrer par nom ou département..."
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                                <button className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-500 hover:text-primary transition-colors">
                                    <Filter size={18} />
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
                                    <ArrowUpDown size={14} /> Réorganiser
                                </button>
                                <button className="bg-primary/5 text-primary px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary/10 transition-all">
                                    Mise à jour en masse
                                </button>
                            </div>
                        </div>

                        {/* Categories Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                                    <tr>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Nom de la Catégorie</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Département</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Priorité Défaut</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 text-center">Statut</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {categories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-lg shadow-sm">
                                                        {cat.icon}
                                                    </div>
                                                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{cat.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`text-sm font-medium ${cat.department === 'Not Assigned' ? 'italic text-amber-500' : 'text-slate-500'}`}>
                                                    {cat.department}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getPriorityStyle(cat.priority)}`}>
                                                    {cat.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked={cat.status} />
                                                        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-all">
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Meta */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Affichage de 4 sur 32 catégories</span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 bg-primary text-white text-xs font-black rounded-lg">1</button>
                                <button className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 text-xs font-black rounded-lg">2</button>
                                <button className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 text-xs font-black rounded-lg">3</button>
                                <span className="text-slate-300 mx-1">...</span>
                                <button className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 text-xs font-black rounded-lg">8</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

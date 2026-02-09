'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Package, Search, AlertTriangle, ArrowUpRight, Filter, Plus, Truck, Gauge, Fuel, CheckCircle2 } from 'lucide-react';

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

export default function InventoryPage() {
    const [activeTab, setActiveTab] = useState('all');

    const stock = [
        { id: 'VA-7742-G', name: 'Volvo FH16 Service', category: 'Camion Lourd', qty: 24, unit: '% Carburant', status: 'Maintenance Due', date: '12 Oct 2024' },
        { id: 'BC-9011-Z', name: 'Ford Transit Box', category: 'Utilitaire', qty: 82, unit: '% Carburant', status: 'On Duty', date: '15 Jan 2025' },
        { id: 'NY-5520-X', name: 'Mercedes Actros', category: 'Camion Lourd', qty: 45, unit: '% Carburant', status: 'Service Soon', date: '28 Fév 2025' },
        { id: 'LA-1129-K', name: 'Isuzu NPR Service', category: 'Utilitaire', qty: 95, unit: '% Carburant', status: 'Idle', date: '02 Fév 2025' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Duty': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Maintenance Due': return 'bg-red-100 text-red-700 border-red-200';
            case 'Service Soon': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Idle': return 'bg-slate-100 text-slate-700 border-slate-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Header Action Area */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Suivi de la Flotte</h2>
                            <p className="text-slate-500 text-sm mt-1">Surveillez l&apos;état de santé et l&apos;activité de vos véhicules.</p>
                        </div>
                        <button className="bg-primary text-white rounded-xl px-5 py-2.5 text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                            <Plus size={18} strokeWidth={3} />
                            Nouveau Véhicule
                        </button>
                    </div>

                    {/* KPI Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <KPICard
                            title="Total Véhicules"
                            value="124"
                            icon={<Truck className="text-primary" size={20} />}
                            trend={{ value: "+2%", isPositive: true }}
                        />
                        <KPICard
                            title="Missions Actives"
                            value="86"
                            icon={<CheckCircle2 className="text-emerald-500" size={20} />}
                            trend={{ value: "+5%", isPositive: true }}
                        />
                        <KPICard
                            title="Alertes Entretien"
                            value="12"
                            icon={<AlertTriangle className="text-amber-500" size={20} />}
                            trend={{ value: "-3%", isPositive: true }}
                        />
                        <KPICard
                            title="Niveau Carburant Bas"
                            value="05"
                            icon={<Gauge className="text-red-500" size={20} />}
                            trend={{ value: "+1%", isPositive: false }}
                        />
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
                            {['all', 'Service Due', 'On Duty', 'Idle'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === tab
                                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    {tab === 'all' ? 'Tous les camions' : tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Rechercher plaques, chauffeurs..."
                                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-primary transition-colors">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Vehicle Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Plaque Véhicule</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Modèle / Type</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Niveau Fuel</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Dernier Entretien</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Statut</th>
                                        <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {stock.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-8 rounded-lg flex items-center justify-center ${item.status === 'Maintenance Due' ? 'bg-red-100 text-red-500' : 'bg-emerald-100 text-emerald-500'}`}>
                                                        {item.status === 'Maintenance Due' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                                                    </div>
                                                    <span className="font-bold tracking-wide text-slate-900 dark:text-white">{item.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                                            </td>
                                            <td className="px-6 py-4 w-40">
                                                <div className="space-y-1.5">
                                                    <div className="flex justify-between text-[10px] font-bold">
                                                        <span className="text-slate-500">{item.qty}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${item.qty < 30 ? 'bg-red-500' : item.qty < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                            style={{ width: `${item.qty}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-bold ${item.status === 'Maintenance Due' ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>{item.date}</span>
                                                    {item.status === 'Maintenance Due' && <span className="text-[10px] text-slate-400">Retard de 14 jours</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors">
                                                    <ArrowUpRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

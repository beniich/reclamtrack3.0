'use client';

import React from 'react';
import Link from 'next/link';
import { 
    Package, Search, Filter, AlertTriangle, 
    TrendingDown, ArchiveRestore, Truck, FileText
} from 'lucide-react';

export default function MROInventoryPage() {
    // Mock data for Phase 4 MRO
    const mockMroItems = [
        { id: '1', ref: 'R-6204-ZZ', name: 'Roulement à billes SKF', category: 'Mécanique', stock: 12, min: 15, unit: 'pcs', price: '45.00', currency: '€', location: 'Allée A - Etagère 04' },
        { id: '2', ref: 'FILT-HVAC-99', name: 'Filtre HEPA G4', category: 'HVAC', stock: 45, min: 20, unit: 'pcs', price: '12.50', currency: '€', location: 'Allée C - Etagère 12' },
        { id: '3', ref: 'HUI-HYD-46', name: 'Huile Hydraulique ISO 46', category: 'Consommable', stock: 2, min: 5, unit: 'L', price: '8.90', currency: '€', location: 'Zone Fluides' },
        { id: '4', ref: 'CON-3P-32A', name: 'Contacteur 3 Pole 32A', category: 'Électrique', stock: 18, min: 10, unit: 'pcs', price: '89.00', currency: '€', location: 'Allée B - Etagère 01' },
    ];

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-[calc(100vh-6rem)] relative overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-blue-500/10 blur-[100px] -z-10 pointer-events-none rounded-full"></div>
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20">
                        <ArchiveRestore className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                            Magasin <span className="text-blue-600 dark:text-blue-500 not-italic">MRO</span>
                        </h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                            Pièces Détachées & Outillage de Maintenance
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="h-[52px] px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-blue-300 dark:hover:border-blue-500/50 flex items-center gap-2 transition-all shadow-sm">
                        <Truck className="w-4 h-4" /> Réapprovisionner
                    </button>
                    <button className="h-[52px] bg-blue-600 dark:bg-blue-500 hover:brightness-110 text-white rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-600/20 dark:shadow-blue-600/20 transition-all">
                        <Package className="w-4 h-4" /> Nouvel Article
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-6 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Références</p>
                        <p className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">1,248</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-6 shadow-sm flex items-center gap-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="size-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Alertes Rupture</p>
                        <p className="text-2xl font-black italic tracking-tighter text-red-500">2 <span className="text-xs font-bold text-slate-500">articles</span></p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-6 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <TrendingDown className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Valeur Stock (Est.)</p>
                        <p className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">45.2k<span className="text-sm">€</span></p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 relative z-10">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Recherche par ref, nom, emplacement..." 
                        className="w-full h-[52px] pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[12px] font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>
                <button className="h-[52px] px-6 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 gap-2">
                    <Filter className="w-4 h-4 text-slate-400" /> Filtrer
                </button>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm relative z-10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Référence</th>
                                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Désignation</th>
                                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Emplacement</th>
                                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Stock Dispo</th>
                                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Valeur Unit.</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {mockMroItems.map((item) => {
                                const isLowStock = item.stock <= item.min;
                                return (
                                    <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                                {item.ref}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 cursor-pointer">
                                            <Link href={`/inventory/mro/${item.id}`}>
                                                <p className="text-sm font-black italic uppercase tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{item.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400">{item.category}</p>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{item.location}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border ${isLowStock ? 'bg-red-500/10 text-red-600 border-red-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>
                                                    <span className="text-lg font-black leading-none">{item.stock}</span>
                                                </div>
                                                {isLowStock && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-black text-slate-500">{item.price} {item.currency}</span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Link href={`/inventory/mro/${item.id}`}>
                                                <button className="size-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm">
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

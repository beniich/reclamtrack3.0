'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
    ArrowLeft, Package, MapPin, Search, 
    ArrowDownRight, ArrowUpRight, Wrench, FileText, Settings
} from 'lucide-react';

export default function MROItemDetailsPage() {
    const params = useParams();
    
    // Mock Data for Phase 4 MRO Detail
    const item = {
        id: params?.id || '1',
        ref: 'R-6204-ZZ',
        name: 'Roulement à billes SKF',
        category: 'Mécanique',
        description: 'Roulement à billes à gorge profonde, étanche deux côtés. Pour moteurs de convoyeurs standard.',
        location: 'Allée A - Etagère 04 - Bac 2',
        stock: 12,
        minStock: 15,
        maxStock: 50,
        unit: 'pcs',
        supplier: 'SKF Industrie',
        brandRef: 'SKF-6204-2Z',
        price: '45.00',
        currency: '€'
    };

    const isLowStock = item.stock <= item.minStock;

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-background min-h-[calc(100vh-6rem)] relative overflow-hidden">
            <div className={`absolute -top-40 -left-40 w-96 h-96 ${isLowStock ? 'bg-red-500/10' : 'bg-blue-500/10'} blur-[100px] rounded-full pointer-events-none`}></div>

            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <Link href="/inventory/mro" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl w-fit shadow-sm">
                    <ArrowLeft className="w-4 h-4" /> Retour Magasin
                </Link>

                <div className="flex gap-3">
                    <button className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-red-300 dark:hover:border-red-500/50 flex items-center gap-2 transition-all text-red-600 shadow-sm">
                        <ArrowDownRight className="w-4 h-4" /> Sortie (Conso OT)
                    </button>
                    <button className="px-5 py-3 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20">
                        <ArrowUpRight className="w-4 h-4" /> Entrée (Réception)
                    </button>
                </div>
            </div>

            {/* Identity Plate */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative z-10 flex flex-col md:flex-row gap-8">
                
                <div className={`size-32 rounded-[2rem] flex flex-col items-center justify-center shrink-0 border-2 ${isLowStock ? 'bg-red-500/5 border-red-500/30' : 'bg-blue-500/5 border-blue-500/30'}`}>
                    <Package className={`size-10 mb-2 ${isLowStock ? 'text-red-500' : 'text-blue-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock</span>
                    <span className={`text-2xl font-black leading-none ${isLowStock ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>{item.stock}</span>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[12px] font-mono font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded">
                            {item.ref}
                        </span>
                        {isLowStock && (
                            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-red-500/10 text-red-600 border border-red-500/20">
                                Rupture Imminente
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">
                        {item.name}
                    </h1>
                    <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" /> {item.location}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                {/* Details */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
                    <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <FileText className="w-4 h-4 text-blue-500" /> Informations Pièce
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Catégorie</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.category}</span>
                        </div>
                        <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Valeur Unitaire</span>
                            <span className="text-sm font-black text-slate-900 dark:text-white">{item.price} {item.currency}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Description</span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.description}</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Fournisseur & Commande</h4>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Fournisseur</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.supplier}</span>
                            </div>
                            <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Référence Fabricant</span>
                                <span className="text-sm font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{item.brandRef}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logistics */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <Settings className="w-4 h-4 text-blue-500" /> Logistique & Alertes
                    </h3>
                    
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Niveau de Stock</span>
                            <span className="text-xs font-black text-slate-900 dark:text-white">{item.stock} / {item.maxStock} {item.unit}</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                            {/* Alert threshold marker */}
                            <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10" style={{ left: `${(item.minStock / item.maxStock) * 100}%` }}></div>
                            {/* Current stock bar */}
                            <div 
                                className={`h-full rounded-full transition-all ${isLowStock ? 'bg-red-500' : 'bg-blue-500'}`} 
                                style={{ width: `${(item.stock / item.maxStock) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-[9px] font-bold text-red-500">Min: {item.minStock}</span>
                            <span className="text-[9px] font-bold text-slate-400">Max: {item.maxStock}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Derniers Mouvements</h4>
                        {/* Placeholder for ledger */}
                        <div className="space-y-3 opacity-70">
                            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2"><ArrowDownRight className="w-3 h-3 text-red-500" /> Sortie (OT: WO-2026-0001)</span>
                                <span className="text-xs font-black text-slate-900 dark:text-white">- 2 pcs</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2"><ArrowUpRight className="w-3 h-3 text-emerald-500" /> Entrée (Réception)</span>
                                <span className="text-xs font-black text-slate-900 dark:text-white">+ 10 pcs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

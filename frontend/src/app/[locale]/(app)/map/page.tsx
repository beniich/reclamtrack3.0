'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { HeatmapView } from '@/components/maps/HeatmapView';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// interface Complaint is removed since it's unused or redudant with types from elsewhere

export default function MapPage() {
    const [activeTab, setActiveTab] = useState('operations');
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [filterPriority, setFilterPriority] = useState<string>('');

    const { data: complaints, isLoading, error } = useQuery({
        queryKey: ['complaints'],
        queryFn: async () => {
            const res = await api.get('/complaints');
            return res;
        }
    });

    if (isLoading) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 dark:bg-[#0a0a14]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a14] gap-4">
                <p className="text-red-500 font-bold italic uppercase tracking-widest text-xs">Erreur de chargement de la carte</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary/20"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    // Transformer les données pour la heatmap
    const heatmapData = (complaints || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((c: any) => c.latitude && c.longitude)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((c: any) => ({
            lat: c.latitude,
            lng: c.longitude,
            intensity: c.priority === 'urgent' ? 1 : c.priority === 'high' ? 0.8 : c.priority === 'medium' ? 0.5 : 0.3,
            complaint: {
                id: c._id,
                title: c.title,
                category: c.category,
                priority: c.priority,
                status: c.status
            }
        }));

    return (
        <div className="h-[calc(100vh-64px)] w-full flex flex-col bg-slate-50 dark:bg-[#0a0a14]">
            <div className="flex-none p-4 lg:p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10 transition-colors">
                <div>
                    <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Geospatial Intelligence</h1>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Analyse des incidents & dispatching</p>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                        onClick={() => setActiveTab('operations')}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'operations' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Flux Opérations
                    </button>
                    <button
                        onClick={() => setActiveTab('heatmap')}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'heatmap' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Heatmap Risques
                    </button>
                </div>

                <div className="flex gap-2">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 focus:ring-2 focus:ring-primary/20"
                        title="Filtrer par catégorie"
                    >
                        <option value="">Toutes Catégories</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Environnement">Environnement</option>
                        <option value="Sécurité">Sécurité</option>
                        <option value="Éclairage">Éclairage</option>
                    </select>

                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 focus:ring-2 focus:ring-primary/20"
                        title="Filtrer par priorité"
                    >
                        <option value="">Toutes Priorités</option>
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                        <option value="urgent">Urgente</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden">
                <HeatmapView
                    data={heatmapData}
                    zoom={12}
                    showClusters={activeTab === 'operations'} // On affiche les clusters en mode opérations
                    center={[34.0209, -6.8416]} // Centre sur Rabat
                    filterCategory={filterCategory}
                    filterPriority={filterPriority}
                />
            </div>
        </div>
    );
}

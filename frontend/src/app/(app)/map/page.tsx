'use client';

import { useState } from 'react';
import { HeatmapView } from '@/components/maps/HeatmapView';

// Mock Data
const MOCK_HEATMAP_DATA = [
    { lat: 34.0209, lng: -6.8416, intensity: 0.8, complaint: { id: '1', title: 'Fuite d\'eau', category: 'water', priority: 'high', status: 'pending' } },
    { lat: 34.0250, lng: -6.8350, intensity: 0.6, complaint: { id: '2', title: 'Panne électrique', category: 'electricity', priority: 'medium', status: 'assigned' } },
    { lat: 34.0180, lng: -6.8450, intensity: 0.9, complaint: { id: '3', title: 'Route dégradée', category: 'roads', priority: 'urgent', status: 'pending' } },
    { lat: 34.0220, lng: -6.8300, intensity: 0.5, complaint: { id: '4', title: 'Déchets non collectés', category: 'waste', priority: 'low', status: 'resolved' } },
    { lat: 34.0300, lng: -6.8500, intensity: 0.7, complaint: { id: '5', title: 'Éclairage défectueux', category: 'lighting', priority: 'medium', status: 'assigned' } },
    // ... more points around Rabat
    { lat: 34.0150, lng: -6.8400, intensity: 0.4 },
    { lat: 34.0280, lng: -6.8380, intensity: 0.8 },
];

export default function MapPage() {
    const [activeTab, setActiveTab] = useState('operations');

    return (
        <div className="h-[calc(100vh-64px)] w-full flex flex-col">
            <div className="flex-none p-4 bg-white border-b flex justify-between items-center z-10">
                <h1 className="text-xl font-bold">Carte des Opérations</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('operations')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'operations' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                        Opérations
                    </button>
                    <button
                        onClick={() => setActiveTab('heatmap')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'heatmap' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                        Heatmap & Clusters
                    </button>
                </div>
            </div>

            <div className="flex-1 relative">
                {activeTab === 'heatmap' ? (
                    <HeatmapView
                        data={MOCK_HEATMAP_DATA}
                        zoom={13}
                        showClusters={true}
                        onMarkerClick={(id) => console.log('Marker clicked:', id)}
                    />
                ) : (
                    // Placeholder for standard operations map or keep existing implementation if preferred
                    <HeatmapView
                        data={MOCK_HEATMAP_DATA}
                        zoom={13}
                        showClusters={false} // Just heatmap/points
                        onMarkerClick={(id) => console.log('Marker clicked:', id)}
                    />
                )}
            </div>
        </div>
    );
}

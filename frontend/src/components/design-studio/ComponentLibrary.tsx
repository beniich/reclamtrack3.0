'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Droplets, Zap, Settings as Mech, Search } from 'lucide-react';

interface TechComponent {
    name: string;
    path: string; // SVG path data
    category: 'plumbing' | 'electrical' | 'mechanical';
}

const COMPONENTS: TechComponent[] = [
    // PLUMBING
    { name: 'Pipe Straight', category: 'plumbing', path: 'M0,10 L100,10 L100,30 L0,30 Z' },
    { name: 'Pipe Elbow', category: 'plumbing', path: 'M0,10 L40,10 L40,0 L60,0 L60,30 L0,30 Z' },
    { name: 'Globe Valve', category: 'plumbing', path: 'M20,20 L80,20 M50,20 L50,0 M40,0 L60,0 M30,10 L70,30 M30,30 L70,10' },
    { name: 'Water Pump', category: 'plumbing', path: 'M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M50,10 L50,0 M20,80 L80,80' },
    
    // ELECTRICAL
    { name: 'Switch', category: 'electrical', path: 'M10,50 L40,50 M60,50 L90,50 M40,50 L60,20' },
    { name: 'Bulb', category: 'electrical', path: 'M50,20 a30,30 0 1,1 0,60 M40,80 L60,80 M50,80 L50,100' },
    { name: 'Battery', category: 'electrical', path: 'M20,40 L80,40 M30,60 L70,60 M20,40 L20,30 M80,40 L80,30' },
    
    // MECHANICAL
    { name: 'Gear', category: 'mechanical', path: 'M50,20 L55,10 L65,10 L70,20 L80,25 L90,20 L95,30 L85,40 L90,50 L95,60 L85,75' },
    { name: 'DC Motor', category: 'mechanical', path: 'M20,20 h60 v60 h-60 z M50,20 L50,10 M80,50 L90,50' },
];

interface ComponentLibraryProps {
    onSelect: (comp: TechComponent) => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onSelect }) => {
    const [search, setSearch] = React.useState('');
    const [activeTab, setActiveTab] = React.useState<'plumbing' | 'electrical' | 'mechanical'>('plumbing');

    const filtered = COMPONENTS.filter(c => 
        c.category === activeTab && 
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const tabs = [
        { id: 'plumbing', icon: Droplets, label: 'Plumbing' },
        { id: 'electrical', icon: Zap, label: 'Electrical' },
        { id: 'mechanical', icon: Mech, label: 'Mechanical' },
    ] as const;

    return (
        <div className="w-80 h-full flex flex-col gap-4 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-orange-500/10 p-6">
            <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                    Tech Library
                </h2>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Industrial Components v1.0
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text"
                    placeholder="Search components..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-[1.2rem] gap-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all gap-1.5",
                            activeTab === tab.id 
                                ? "bg-white dark:bg-slate-800 text-orange-500 shadow-sm"
                                : "text-slate-500 hover:bg-white/50 dark:hover:bg-slate-800/50"
                        )}
                    >
                        <tab.icon size={18} />
                        <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Component Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-3 pr-2 scrollbar-thin">
                {filtered.map(comp => (
                    <button
                        key={comp.name}
                        onClick={() => onSelect(comp)}
                        className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-orange-500/50 rounded-2xl transition-all group"
                    >
                        <div className="w-12 h-12 flex items-center justify-center mb-3">
                            <svg viewBox="0 0 100 100" className="w-full h-full stroke-current text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-orange-400 fill-none stroke-[2]">
                                <path d={comp.path} />
                            </svg>
                        </div>
                        <span className="text-[10px] font-bold text-center leading-tight text-slate-600 dark:text-slate-400">
                            {comp.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

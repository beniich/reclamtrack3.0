'use client';

import React, { useState, useEffect } from 'react';
import { TechnicalCanvas } from './TechnicalCanvas';
import { ComponentLibrary } from './ComponentLibrary';
import { AICmdBar } from './AICmdBar';
import paper from 'paper';
import { Save, Loader2, FolderOpen, History, X, Info, Settings, ShieldCheck, Wrench, Box } from 'lucide-react';
import { useSchemaStore, TechnicalSchema } from '@/store/schemaStore';
import { format } from 'date-fns';

export const TechnicalStudio: React.FC = () => {
    const [project, setProject] = useState<paper.Project | null>(null);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
    const { createSchema, schemas, fetchSchemas, isLoading } = useSchemaStore();

    useEffect(() => {
        if (showHistory) fetchSchemas();
    }, [showHistory]);

    const handleComponentSelect = (comp: any) => {
        if (!project) return;

        project.activate();
        const path = new paper.Path(comp.path);
        path.strokeColor = new paper.Color('#6366f1');
        path.strokeWidth = 2;
        
        // Fill based on category color
        if (comp.category === 'plumbing') path.fillColor = new paper.Color('rgba(59, 130, 246, 0.1)');
        if (comp.category === 'electrical') path.fillColor = new paper.Color('rgba(245, 158, 11, 0.1)');
        
        // Center in view
        path.position = project.view.center;
        
        // Scale appropriately
        const bounds = path.bounds;
        const targetSize = 80;
        const scale = targetSize / Math.max(bounds.width, bounds.height);
        path.scale(scale);

        // Add metadata for selection logic
        (path as any).data = { name: comp.name, category: comp.category };
    };

    const handleAIGenerate = (svgPath: string) => {
        if (!project) return;
        project.activate();
        const path = new paper.Path(svgPath);
        path.strokeColor = new paper.Color('#f97316');
        path.strokeWidth = 2;
        path.position = project.view.center;
    };

    const handleSave = async () => {
        if (!project) return;
        
        const name = window.prompt("Nommez votre schéma technique :");
        if (!name) return;

        const projectData = project.exportJSON();
        await createSchema({
            name,
            description: "Schéma généré depuis l'Industrial Studio",
            projectData: projectData
        });
    };

    const handleLoadSchema = (schema: TechnicalSchema) => {
        if (!project) return;
        project.clear();
        project.importJSON(schema.projectData);
        setShowHistory(false);
    };

    const handleSelectItem = (info: any) => {
        if (!info) {
            setSelectedAsset(null);
            return;
        }
        
        // Mocking Digital Twin Data lookup
        const isPump = info.name.toLowerCase().includes('pompe');
        setSelectedAsset({
            ...info,
            id: isPump ? 'USINE-L1-POMPE-001' : 'COMP-TECH-042',
            status: isPump ? 'Maintenance' : 'Opérationnel',
            lastMaintenance: isPump ? '12 Mars 2026' : '01 Jan 2026',
            mtbf: isPump ? '420h' : '1.2kh',
            isRealAsset: true
        });
    };

    return (
        <div className="flex h-[calc(100vh-10rem)] w-full gap-6 p-2">
            <ComponentLibrary onSelect={handleComponentSelect} />
            
            <div className="flex-1 flex flex-col gap-4 relative">
                {/* Save/History Toolbar */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                        onClick={() => setShowHistory(true)}
                        className="flex items-center gap-2 bg-[#0f0125]/90 hover:bg-[#0f0125] border border-blue-500/30 text-white px-4 py-2 rounded-xl shadow-lg shadow-blue-500/10 backdrop-blur-md transition-all"
                    >
                        <History size={16} className="text-blue-500" />
                        <span className="text-xs font-bold uppercase tracking-widest px-2 border-l border-white/10">Archives</span>
                    </button>
                    
                    <button
                        onClick={handleSave}
                        disabled={isLoading || !project}
                        className="flex items-center gap-2 bg-[#0f0125]/90 hover:bg-[#0f0125] border border-orange-500/30 text-white px-4 py-2 rounded-xl shadow-lg shadow-orange-500/10 backdrop-blur-md transition-all disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin text-orange-500" /> : <Save size={16} className="text-orange-500" />}
                        <span className="text-xs font-bold uppercase tracking-widest px-2 border-l border-white/10">Sauvegarder</span>
                    </button>
                </div>

                {/* History Sidebar */}
                {showHistory && (
                    <div className="absolute inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm rounded-[2.5rem] overflow-hidden">
                        <div className="w-80 bg-[#1A0536] border-l border-white/10 h-full flex flex-col animate-in slide-in-from-right duration-300">
                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#310B5E]/30">
                                <div className="flex items-center gap-2">
                                    <FolderOpen size={20} className="text-orange-500" />
                                    <h3 className="text-sm font-black text-white uppercase tracking-tighter">Schémas Archivés</h3>
                                </div>
                                <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-40 gap-3 opacity-30">
                                        <Loader2 className="animate-spin text-orange-500" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-white">Actualisation...</span>
                                    </div>
                                ) : schemas.length === 0 ? (
                                    <div className="text-center py-10 opacity-30">
                                        <p className="text-xs font-bold uppercase text-white">Aucun schéma trouvé</p>
                                    </div>
                                ) : (
                                    schemas.map((s) => (
                                        <button
                                            key={s._id}
                                            onClick={() => handleLoadSchema(s)}
                                            className="w-full text-left p-4 bg-[#310B5E]/30 border border-white/5 hover:border-orange-500/40 rounded-2xl group transition-all"
                                        >
                                            <div className="font-bold text-white text-sm mb-1 group-hover:text-orange-500 transition-colors">{s.name}</div>
                                            <div className="text-[10px] text-slate-500 font-mono">
                                                {format(new Date(s.createdAt), 'dd MMM yyyy HH:mm')}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-1 min-h-0 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-orange-500/10 shadow-inner flex relative">
                    <TechnicalCanvas 
                        onReady={(p) => setProject(p)} 
                        onSelectItem={handleSelectItem}
                    />

                    {/* GMAO Digital Twin Sidebar */}
                    {selectedAsset && (
                        <div className="absolute top-4 right-4 bottom-4 w-72 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300 z-20">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                                    <Box size={24} />
                                </div>
                                <button onClick={() => setSelectedAsset(null)} className="text-slate-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Identifiant Actif</p>
                                <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{selectedAsset.id}</h4>
                                <p className="text-xs font-bold text-indigo-500 mt-1">{selectedAsset.name}</p>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">État Santé</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${selectedAsset.status === 'Opérationnel' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {selectedAsset.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={14} className={selectedAsset.status === 'Opérationnel' ? 'text-emerald-500' : 'text-amber-500'} />
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Diagnostique OK</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                                        <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Dernière PM</p>
                                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{selectedAsset.lastMaintenance}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                                        <p className="text-[8px] font-black text-slate-400 uppercase mb-1">MTBF (Fiab.)</p>
                                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{selectedAsset.mtbf}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <Link href={`/assets/1`} className="block">
                                    <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                        <Info size={14} /> Fiche Complète
                                    </button>
                                </Link>
                                <button className="w-full py-3 border border-indigo-500/30 text-indigo-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-500/10 transition-colors">
                                    <Wrench size={14} /> Créer un Job (OT)
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                <AICmdBar onGenerate={handleAIGenerate} />
            </div>
        </div>
    );
};

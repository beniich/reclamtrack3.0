'use client';

import React, { useState } from 'react';
import { TechnicalCanvas } from './TechnicalCanvas';
import { ComponentLibrary } from './ComponentLibrary';
import { AICmdBar } from './AICmdBar';
import paper from 'paper';
import { Save, Loader2, FolderOpen, History, X } from 'lucide-react';
import { useSchemaStore, TechnicalSchema } from '@/store/schemaStore';
import { format } from 'date-fns';

export const TechnicalStudio: React.FC = () => {
    const [project, setProject] = useState<paper.Project | null>(null);
    const [showHistory, setShowHistory] = useState(false);
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

                <div className="flex-1 min-h-0 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-orange-500/10 shadow-inner">
                    <TechnicalCanvas onReady={(p) => setProject(p)} />
                </div>
                
                <AICmdBar onGenerate={handleAIGenerate} />
            </div>
        </div>
    );
};

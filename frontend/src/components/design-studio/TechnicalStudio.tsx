'use client';

import React, { useState } from 'react';
import { TechnicalCanvas } from './TechnicalCanvas';
import { ComponentLibrary } from './ComponentLibrary';
import { AICmdBar } from './AICmdBar';
import paper from 'paper';
import { Save, Loader2 } from 'lucide-react';
import { useSchemaStore } from '@/store/schemaStore';

export const TechnicalStudio: React.FC = () => {
    const [project, setProject] = useState<paper.Project | null>(null);
    const { createSchema, isLoading } = useSchemaStore();

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

    return (
        <div className="flex h-[calc(100vh-10rem)] w-full gap-6 p-2">
            <ComponentLibrary onSelect={handleComponentSelect} />
            
            <div className="flex-1 flex flex-col gap-4 relative">
                {/* Save Toolbar */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={handleSave}
                        disabled={isLoading || !project}
                        className="flex items-center gap-2 bg-[#0f0125]/90 hover:bg-[#0f0125] border border-orange-500/30 text-white px-4 py-2 rounded-xl shadow-lg shadow-orange-500/10 backdrop-blur-md transition-all disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin text-orange-500" /> : <Save size={16} className="text-orange-500" />}
                        <span className="text-xs font-bold uppercase tracking-widest">Sauvegarder</span>
                    </button>
                </div>

                <div className="flex-1 min-h-0 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-orange-500/10 shadow-inner">
                    <TechnicalCanvas onReady={(p) => setProject(p)} />
                </div>
                
                <AICmdBar onGenerate={handleAIGenerate} />
            </div>
        </div>
    );
};

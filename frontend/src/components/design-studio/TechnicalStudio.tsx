'use client';

import React, { useState } from 'react';
import { TechnicalCanvas } from './TechnicalCanvas';
import { ComponentLibrary } from './ComponentLibrary';
import { AICmdBar } from './AICmdBar';
import paper from 'paper';

export const TechnicalStudio: React.FC = () => {
    const [project, setProject] = useState<paper.Project | null>(null);

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

    return (
        <div className="flex h-[calc(100vh-10rem)] w-full gap-6 p-2">
            <ComponentLibrary onSelect={handleComponentSelect} />
            
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex-1 min-h-0">
                    <TechnicalCanvas onReady={(p) => setProject(p)} />
                </div>
                
                <AICmdBar onGenerate={handleAIGenerate} />
            </div>
        </div>
    );
};

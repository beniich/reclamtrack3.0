'use client';

import React, { useEffect, useRef, useState } from 'react';
import paper from 'paper';
import { cn } from '@/lib/utils';
import { Maximize2, Minimize2, Trash2, Download, Save, Link2 } from 'lucide-react';

interface ComponentData {
    id: string;
    type: string;
    label: string;
    svgPath: string;
    category: 'plumbing' | 'electrical' | 'mechanical';
}

interface SelectedItemInfo {
    name: string;
    category: string;
    assetId?: string;
    status?: string;
}

interface TechnicalCanvasProps {
    onReady?: (project: paper.Project) => void;
    onSelectItem?: (info: SelectedItemInfo | null) => void;
    linkedTicket?: string;
}

export const TechnicalCanvas: React.FC<TechnicalCanvasProps> = ({ onReady, onSelectItem, linkedTicket }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [project, setProject] = useState<paper.Project | null>(null);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize Paper.js
        paper.setup(canvasRef.current);
        const newProject = paper.project;
        setProject(newProject);

        // Draw a grid background
        drawGrid(newProject);

        // Tool for dragging items
        const tool = new paper.Tool();
        let selectedItem: paper.Item | null = null;

        tool.onMouseDown = (event: paper.ToolEvent) => {
            const hitResult = newProject.hitTest(event.point, {
                fill: true,
                stroke: true,
                segments: true,
                tolerance: 5
            });

            if (hitResult && hitResult.item) {
                // Clear previous selection
                if (selectedItem) {
                    selectedItem.shadowBlur = 0;
                    selectedItem.selected = false;
                }

                selectedItem = hitResult.item;
                selectedItem.bringToFront();
                selectedItem.selected = true;
                selectedItem.shadowColor = new paper.Color('#6366f1');
                selectedItem.shadowBlur = 10;

                if (onSelectItem) {
                    onSelectItem(selectedItem.data as SelectedItemInfo);
                }
            } else {
                if (selectedItem) {
                    selectedItem.shadowBlur = 0;
                    selectedItem.selected = false;
                }
                selectedItem = null;
                if (onSelectItem) onSelectItem(null);
            }
        };

        tool.onMouseDrag = (event: paper.ToolEvent) => {
            if (selectedItem) {
                selectedItem.position = selectedItem.position.add(event.delta);
                
                // Implement Magnetic Snap logic
                // Snap to 10px grid
                const snapSize = 10;
                selectedItem.position.x = Math.round(selectedItem.position.x / snapSize) * snapSize;
                selectedItem.position.y = Math.round(selectedItem.position.y / snapSize) * snapSize;
            } else {
                // Pan functionality
                newProject.view.center = newProject.view.center.subtract(event.delta);
            }
        };

        if (onReady) onReady(newProject);

        return () => {
            newProject.remove();
        };
    }, []);

    const drawGrid = (proj: paper.Project) => {
        const gridGroup = new paper.Group();
        const size = 5000;
        const step = 20;

        for (let x = -size; x <= size; x += step) {
            const line = new paper.Path.Line(new paper.Point(x, -size), new paper.Point(x, size));
            line.strokeColor = new paper.Color(x % 100 === 0 ? '#cbd5e1' : '#f1f5f9');
            line.strokeWidth = x % 100 === 0 ? 0.5 : 0.2;
            gridGroup.addChild(line);
        }

        for (let y = -size; y <= size; y += step) {
            const line = new paper.Path.Line(new paper.Point(-size, y), new paper.Point(size, y));
            line.strokeColor = new paper.Color(y % 100 === 0 ? '#cbd5e1' : '#f1f5f9');
            line.strokeWidth = y % 100 === 0 ? 0.5 : 0.2;
            gridGroup.addChild(line);
        }
        
        // Lock grid
        gridGroup.locked = true;
        gridGroup.sendToBack();
    };

    const handleZoomIn = () => {
        if (!project) return;
        project.view.zoom *= 1.2;
        setZoom(project.view.zoom);
    };

    const handleZoomOut = () => {
        if (!project) return;
        project.view.zoom /= 1.2;
        setZoom(project.view.zoom);
    };

    const handleExport = () => {
        if (!project) return;
        const svg = project.exportSVG({ asString: true }) as string;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reclamtrack-design-${linkedTicket || 'unsaved'}.svg`;
        link.click();
    };

    return (
        <div className="relative w-full h-full bg-slate-50 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-orange-500/10 rounded-3xl">
            {/* Toolbar Overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 p-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg">
                <button onClick={handleZoomIn} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400" title="Zoom In">
                    <Maximize2 size={18} />
                </button>
                <button onClick={handleZoomOut} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400" title="Zoom Out">
                    <Minimize2 size={18} />
                </button>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                <button onClick={() => project?.activeLayer.removeChildren()} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg" title="Clear Canvas">
                    <Trash2 size={18} />
                </button>
                <button onClick={handleExport} className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg" title="Export SVG">
                    <Download size={18} />
                </button>
            </div>

            {/* Ticket Link Info */}
            {linkedTicket && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full shadow-lg text-[10px] font-black uppercase tracking-widest">
                    <Link2 size={14} />
                    Linked to Ticket: {linkedTicket}
                </div>
            )}

            <canvas 
                ref={canvasRef} 
                className="w-full h-full touch-none cursor-crosshair"
                onContextMenu={(e) => e.preventDefault()}
            />
            
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-slate-900/50 backdrop-blur-sm rounded-full text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">
                Paper.js Vector Engine / Zoom: {Math.round(zoom * 100)}%
            </div>
        </div>
    );
};

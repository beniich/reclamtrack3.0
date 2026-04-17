'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AICmdBarProps {
    onGenerate: (path: string) => void;
}

export const AICmdBar: React.FC<AICmdBarProps> = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!prompt.trim()) return;
        setLoading(true);

        // Mock AI generator logic for the demonstration
        // In a real scenario, this would call an LLM API to generate SVG paths
        setTimeout(() => {
            let mockPath = '';
            if (prompt.toLowerCase().includes('valve')) {
                mockPath = 'M30,50 L70,50 M50,50 L50,30 M40,30 L60,30';
            } else if (prompt.toLowerCase().includes('tank')) {
                mockPath = 'M30,20 h40 v60 h-40 z M30,40 h40 M30,60 h40';
            } else {
                // Default complex tech shape
                mockPath = 'M40,40 L60,40 L70,50 L60,60 L40,60 L30,50 Z M50,40 L50,20';
            }

            onGenerate(mockPath);
            setLoading(false);
            setPrompt('');
        }, 1500);
    };

    return (
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-orange-500/10 p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-orange-500/5">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500/10 text-orange-500 rounded-2xl">
                <Sparkles size={20} className={cn(loading && "animate-pulse")} />
            </div>

            <div className="flex-1 flex flex-col">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">
                    Industrial AI Designer
                </p>
                <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe a component (ex: 'A three-way valve for water treatment')..."
                    className="w-full bg-transparent border-none p-0 text-sm font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 focus:ring-0"
                />
            </div>

            <button 
                onClick={handleSend}
                disabled={loading || !prompt.trim()}
                className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-2xl transition-all",
                    loading || !prompt.trim()
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
                        : "bg-slate-900 dark:bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95"
                )}
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
        </div>
    );
};

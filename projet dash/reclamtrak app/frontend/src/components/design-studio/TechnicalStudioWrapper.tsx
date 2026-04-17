'use client';

import dynamic from 'next/dynamic';

// Paper.js requires a DOM — must be loaded client-side only
export const TechnicalStudioWrapper = dynamic(
    () => import('./TechnicalStudio').then(m => m.TechnicalStudio),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full w-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Vector Engine...</p>
                </div>
            </div>
        )
    }
);

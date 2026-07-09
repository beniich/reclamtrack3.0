import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-slate-50 dark:bg-background border border-slate-200 dark:border-border-dark rounded-2xl m-6">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest animate-pulse">
                    Chargement des données...
                </p>
            </div>
        </div>
    );
}

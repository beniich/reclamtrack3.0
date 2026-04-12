import { getTranslations } from 'next-intl/server';
import { TechnicalStudioWrapper } from '@/components/design-studio/TechnicalStudioWrapper';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Sidebar' });
    return {
        title: `${t('designStudio')} | ReclamTrack Pro`,
        description: 'Advanced industrial design and schematic creation tool.',
    };
}

export default async function TechnicalDesignPage() {
    const t = await getTranslations('Dashboard');
    const ts = await getTranslations('Sidebar');

    return (
        <div className="flex flex-col h-full space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none mb-2">
                        {ts('designStudio')}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        Professional Vector CAD Engine • AI Assisted
                    </p>
                </div>
            </header>

            <main className="flex-1 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl border border-slate-200 dark:border-orange-500/10 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-orange-500/5">
                <TechnicalStudioWrapper />
            </main>
        </div>
    );
}

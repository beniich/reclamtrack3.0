'use client';

export default function AnalyticsPage() {
    return (
        <div className="bg-background-light font-display h-[calc(100vh-64px)] overflow-hidden flex flex-col">
            <div className="flex h-full overflow-hidden">
                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-y-auto">
                    {/* Header */}
                    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-bold">Analytique Opérationnelle</h2>
                            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Live</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Exporter Rapport
                            </button>
                        </div>
                    </header>

                    <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full">
                        {/* Overview Header */}
                        <div className="flex items-end justify-between">
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight">Vue d'ensemble de Performance</h3>
                                <p className="text-slate-500 text-sm">Données agrégées pour le cycle actuel (1 Oct - 31 Oct)</p>
                            </div>
                            <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
                                <button className="px-3 py-1.5 text-xs font-bold rounded bg-slate-100">Quotidien</button>
                                <button className="px-3 py-1.5 text-xs font-medium rounded hover:bg-slate-50">Hebdo</button>
                                <button className="px-3 py-1.5 text-xs font-medium rounded hover:bg-slate-50">Mensuel</button>
                            </div>
                        </div>

                        {/* KPI Widgets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* KPI 1 */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Réclamations</span>
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                        <span className="material-symbols-outlined">inbox</span>
                                    </div>
                                </div>
                                <div className="flex items-end gap-3">
                                    <h4 className="text-3xl font-bold">1,842</h4>
                                    <span className="text-green-600 text-xs font-bold pb-1.5 flex items-center">
                                        <span className="material-symbols-outlined text-xs">arrow_upward</span> 12.5%
                                    </span>
                                </div>
                                <p className="text-slate-400 text-[10px] mt-2 italic">Vs 30 jours précédents</p>
                            </div>

                            {/* KPI 2 */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Temps Rép. Moyen</span>
                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                        <span className="material-symbols-outlined">schedule</span>
                                    </div>
                                </div>
                                <div className="flex items-end gap-3">
                                    <h4 className="text-3xl font-bold">42m</h4>
                                    <span className="text-red-600 text-xs font-bold pb-1.5 flex items-center">
                                        <span className="material-symbols-outlined text-xs">arrow_downward</span> 5.2%
                                    </span>
                                </div>
                                <p className="text-slate-400 text-[10px] mt-2 italic">Cible: Moins de 30m</p>
                            </div>

                            {/* KPI 3 */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Efficacité Équipe</span>
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                        <span className="material-symbols-outlined">bolt</span>
                                    </div>
                                </div>
                                <div className="flex items-end gap-3">
                                    <h4 className="text-3xl font-bold">94.8%</h4>
                                    <span className="text-green-600 text-xs font-bold pb-1.5 flex items-center">
                                        <span className="material-symbols-outlined text-xs">arrow_upward</span> 2.1%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                                    <div className="bg-green-500 h-full rounded-full" style={{ width: '94.8%' }}></div>
                                </div>
                            </div>

                            {/* KPI 4 */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Interventions En Attente</span>
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                        <span className="material-symbols-outlined">pending_actions</span>
                                    </div>
                                </div>
                                <div className="flex items-end gap-3">
                                    <h4 className="text-3xl font-bold">28</h4>
                                    <span className="text-slate-500 text-xs font-bold pb-1.5">Aucun changement</span>
                                </div>
                                <p className="text-slate-400 text-[10px] mt-2 italic">8 Urgentes / 20 Routine</p>
                            </div>
                        </div>

                        {/* Graphs Section Placeholder */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Trend Graph */}
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h5 className="text-base font-bold">Tendances de Résolution</h5>
                                        <p className="text-xs text-slate-500">Analyse historique du cycle de vie des tickets</p>
                                    </div>
                                </div>
                                <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200">
                                    <p className="text-slate-400 text-sm font-medium">Graphique Interactif (Placeholder)</p>
                                </div>
                            </div>

                            {/* Distribution Chart */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                                <h5 className="text-base font-bold mb-1">Distribution par Statut</h5>
                                <p className="text-xs text-slate-500 mb-8">Charge actuelle des tickets</p>
                                <div className="flex-1 flex flex-col items-center justify-center relative">
                                    {/* Donut Chart Visual */}
                                    <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 relative flex items-center justify-center">
                                        <div className="absolute inset-0 rounded-full border-[12px] border-primary border-t-transparent border-r-transparent -rotate-45"></div>
                                        <div className="text-center">
                                            <span className="text-2xl font-black">1.2k</span>
                                            <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Actifs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

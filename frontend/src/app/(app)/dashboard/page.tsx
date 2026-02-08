'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-8 font-display">
            {/* Header du Dashboard */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Tableau de Bord Opérationnel</h2>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest text-[10px]">Suivi des interventions en temps réel • Secteur Rabat-Salé-Kénitra</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-2.5 flex items-center gap-3 shadow-sm group cursor-pointer hover:border-primary transition-all">
                        <span className="material-symbols-outlined text-xl text-primary group-hover:rotate-12 transition-transform">calendar_month</span>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Période</span>
                            <span className="text-sm font-bold">Dernières 24 Heures</span>
                        </div>
                    </div>
                    <button className="bg-primary text-white rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-lg">analytics</span>
                        Exporter le Rapport
                    </button>
                </div>
            </div>

            {/* Grille des KPIs - Version Premium */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'Total Tickets', val: '1,428', sub: '+12% vs semaine dernière', icon: 'bar_chart', color: 'slate' },
                    { label: 'Nouveaux', val: '156', sub: 'À traiter aujourd\'hui', icon: 'new_releases', color: 'primary' },
                    { label: 'En Cours', val: '412', sub: 'Interventions actives', icon: 'pending_actions', color: 'blue-500' },
                    { label: 'Résolus', val: '842', sub: 'Clôturés avec succès', icon: 'task_alt', color: 'emerald-500' },
                    { label: 'Urgents', val: '18', sub: 'Priorité Critique', icon: 'error', color: 'rose-500', pulse: true },
                ].map((kpi, i) => (
                    <div key={i} className={`bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative group`}>
                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-500`}>
                            <span className="material-symbols-outlined text-6xl">{kpi.icon}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`size-10 rounded-xl flex items-center justify-center ${kpi.color === 'slate' ? 'bg-slate-100 text-slate-500' : `bg-${kpi.color}/10 text-${kpi.color}`}`}>
                                <span className={`material-symbols-outlined text-xl ${kpi.pulse ? 'animate-pulse' : ''}`}>{kpi.icon}</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{kpi.label}</span>
                        </div>
                        <p className={`text-3xl font-black ${kpi.color === 'rose-500' ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>{kpi.val}</p>
                        <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-tight">{kpi.sub}</p>
                    </div>
                ))}
            </div>

            {/* Section Centrale */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Liste des Réclamations Récentes */}
                <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-2xl shadow-slate-200/40 dark:shadow-none">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
                        <div>
                            <h3 className="font-black text-xl uppercase italic">Interventions Récentes</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Dernières réclamations enregistrées</p>
                        </div>
                        <Link href="/complaints/list" className="px-5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                            Voir Tout
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-4">ID / Catégorie</th>
                                    <th className="px-8 py-4">Localisation</th>
                                    <th className="px-8 py-4">Statut</th>
                                    <th className="px-8 py-4">Équipe</th>
                                    <th className="px-8 py-4 text-right">Délai</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                {[
                                    { id: '#CM-2039', cat: 'Fuite d\'eau', loc: 'Rabat - Agdal', status: 'Nouveau', color: 'primary', team: 'A1', time: '2 min ago', icon: 'water_drop' },
                                    { id: '#CM-2038', cat: 'Éclairage Public', loc: 'Salé - Hay Salam', status: 'En Cours', color: 'amber-500', team: 'B4', time: '14 min ago', icon: 'lightbulb' },
                                    { id: '#CM-2035', cat: 'Collecte Déchets', loc: 'Rabat - Hassan', status: 'Résolu', color: 'emerald-500', team: 'C2', time: '1h ago', icon: 'delete' },
                                ].map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group cursor-pointer">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase italic">{item.id}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.cat}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-rose-500 text-sm">location_on</span>
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.loc}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 bg-${item.color}/10 text-${item.color} text-[9px] font-black uppercase rounded-lg border border-${item.color}/20`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="size-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black border-2 border-white dark:border-slate-800">
                                                {item.team}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right font-black text-[10px] text-slate-400 uppercase tracking-tighter">
                                            {item.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Flux d'Activité en Direct */}
                <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden flex flex-col shadow-2xl shadow-indigo-500/10 transition-all">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div>
                            <h3 className="font-black text-xl text-white uppercase italic">Flux d'Activité</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">En Direct</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 max-h-[500px] scrollbar-hide">
                        {[
                            { color: 'blue', icon: 'add_circle', title: 'Nouvelle Réclamation', desc: '#CM-2039 - Fuite d\'eau à Agdal', time: 'Il y a 2 min' },
                            { color: 'amber', icon: 'engineering', title: 'Équipe B4 Dépêchée', desc: 'Assignée au ticket #CM-2038', time: 'Il y a 14 min' },
                            { color: 'emerald', icon: 'check_circle', title: 'Ticket Résolu', desc: '#CM-2035 - Collecte effectuée', time: 'Il y a 1h' },
                            { color: 'purple', icon: 'update', title: 'Status Mis à Jour', desc: '#CM-2030 passé "En Cours"', time: 'Il y a 2h' },
                            { color: 'rose', icon: 'priority_high', title: 'Urgence Signalée', desc: '#CM-2025 - Fuite de gaz suspectée', time: 'Il y a 3h' },
                        ].map((act, i) => (
                            <div key={i} className="flex gap-5 group cursor-pointer">
                                <div className={`size-10 rounded-2xl bg-${act.color}-500/10 flex items-center justify-center shrink-0 border border-${act.color}-500/20 group-hover:scale-110 transition-transform`}>
                                    <span className={`material-symbols-outlined text-${act.color}-500 text-lg`}>{act.icon}</span>
                                </div>
                                <div className="border-b border-white/5 pb-4 flex-1">
                                    <p className="text-sm font-black text-white uppercase tracking-tight italic">{act.title}</p>
                                    <p className="text-xs text-slate-400 mt-1 font-medium">{act.desc}</p>
                                    <p className="text-[9px] font-black text-slate-500 mt-2 uppercase tracking-widest">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Graphiques et Analytiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Performance Hebdomadaire */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="font-black text-lg uppercase italic">Performance Hebdomadaire</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Volume d'interventions par jour</p>
                        </div>
                        <select className="text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 bg-slate-50 dark:bg-slate-800 transition-all outline-none focus:ring-2 focus:ring-primary">
                            <option>Derniers 7 jours</option>
                            <option>Dernier mois</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-4">
                        {[65, 82, 78, 95, 88, 72, 90].map((height, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="w-full bg-primary/5 rounded-2xl relative group-hover:bg-primary/10 transition-colors h-full flex items-end">
                                    <div className="w-full bg-gradient-to-t from-primary to-blue-400 rounded-2xl shadow-lg shadow-primary/20 group-hover:scale-y-105 transition-all duration-500 origin-bottom" style={{ height: `${height}%` }}></div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg">{height}</div>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Distribution par Catégorie */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="mb-10">
                        <h3 className="font-black text-lg uppercase italic">Répartition par Catégorie</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Impact opérationnel par secteur</p>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Fuites d\'eau', count: 342, color: 'bg-blue-500', percent: 45, icon: 'water_drop' },
                            { name: 'Éclairage Public', count: 218, color: 'bg-amber-500', percent: 29, icon: 'lightbulb' },
                            { name: 'Collecte Déchets', count: 156, color: 'bg-emerald-500', percent: 21, icon: 'delete' },
                            { name: 'Voirie & Routes', count: 89, color: 'bg-slate-500', percent: 12, icon: 'engineering' },
                        ].map((cat, idx) => (
                            <div key={idx} className="group">
                                <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-8 rounded-xl ${cat.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                                            <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-200 tracking-tight">{cat.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-slate-400 italic">{cat.count} tickets</span>
                                        <span className={`text-slate-900 dark:text-white`}>{cat.percent}%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800/50 h-2.5 rounded-full overflow-hidden shadow-inner p-0.5">
                                    <div className={`h-full ${cat.color} rounded-full shadow-[0_0_10px_rgba(36,36,235,0.2)] transition-all duration-1000 origin-left`} style={{ width: `${cat.percent}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                
                body {
                    font-family: 'Outfit', sans-serif;
                }
                
                .font-display {
                    font-family: 'Outfit', sans-serif;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}

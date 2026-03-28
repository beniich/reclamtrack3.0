'use client';

import React from 'react';
import { Brain, Rocket, Activity, LineChart, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const lifecycleSteps = [
    {
        id: '01',
        title: 'Analyse',
        subtitle: 'ÉTAPE 01',
        description: "Évaluation initiale des infrastructures et identification des goulots d'étranglement.",
        icon: Cpu,
        color: 'cyan',
    },
    {
        id: '02',
        title: 'Audit IA',
        subtitle: 'ÉTAPE 02',
        description: 'Moteur algorithmique pour optimiser la configuration de votre instance.',
        icon: Brain,
        color: 'blue',
    },
    {
        id: '03',
        title: 'Déploiement',
        subtitle: 'ÉTAPE 03',
        description: 'Provisioning instantané de votre environnement Cloud sécurisé.',
        icon: Rocket,
        color: 'purple',
    },
    {
        id: '04',
        title: 'Monitoring',
        subtitle: 'ÉTAPE 04',
        description: 'Surveillance 24/7 de la performance et détection proactive des menaces.',
        icon: Activity,
        color: 'cyan',
    },
    {
        id: '05',
        title: 'Optimisation',
        subtitle: 'ÉTAPE 05',
        description: 'Ajustement continu pour garantir un ROI maximal de votre infrastructure.',
        icon: LineChart,
        color: 'emerald',
    },
];

export function ServiceLifecycle() {
    return (
        <section className="relative overflow-hidden bg-[#101622] rounded-[2.5rem] border border-white/5 p-12 shadow-2xl">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-1/4 w-1/2 h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-white hover:text-white/90 transition-colors tracking-tighter uppercase italic">
                        Cycle de Vie <span className="text-cyan-400">des Services</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-500 font-bold uppercase tracking-[0.2em] text-[11px]">
                        De l&apos;expression du besoin à l&apos;optimisation continue de vos performances opérationnelles.
                    </p>
                </div>

                <div className="relative">
                    {/* The horizontal line connector */}
                    <div className="absolute top-12 left-0 w-full h-px bg-slate-800 hidden lg:block"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
                        {lifecycleSteps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center space-y-6 group">
                                {/* Step Circle with Icon */}
                                <div className={cn(
                                    "relative size-24 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                                    "bg-[#0f1117] border-white/10 group-hover:scale-110",
                                    step.color === 'cyan' && "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:border-cyan-400/50",
                                    step.color === 'blue' && "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:border-blue-400/50",
                                    step.color === 'purple' && "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:border-purple-400/50",
                                    step.color === 'emerald' && "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:border-emerald-400/50"
                                )}>
                                    <step.icon className={cn(
                                        "w-8 h-8 transition-colors duration-500",
                                        "text-slate-400 group-hover:text-white",
                                        step.color === 'cyan' && "group-hover:text-cyan-400",
                                        step.color === 'blue' && "group-hover:text-blue-400",
                                        step.color === 'purple' && "group-hover:text-purple-400",
                                        step.color === 'emerald' && "group-hover:text-emerald-400"
                                    )} />
                                    
                                    {/* Small circle inside circle indicator (mock feel) */}
                                    <div className="absolute inset-2 rounded-full border border-white/5 opacity-50"></div>
                                </div>

                                {/* Step Labels */}
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase mb-1">{step.subtitle}</p>
                                        <h4 className="text-xl font-black text-white uppercase italic tracking-tight">{step.title}</h4>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[200px] mx-auto">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

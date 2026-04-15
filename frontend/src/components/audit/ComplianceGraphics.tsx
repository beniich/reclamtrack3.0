'use client';

import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

interface ComplianceGraphicsProps {
    radarData: any[];
    areaData: any[];
    pieData: any[];
}

const COLORS = ['#304ffe', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const ComplianceGraphics: React.FC<ComplianceGraphicsProps> = ({ radarData, areaData, pieData }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Radar: ISO 27001 Maturity */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6">Maturité ISO 27001</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700 }} />
                            <Radar
                                name="Niveau Actuel"
                                dataKey="A"
                                stroke="#304ffe"
                                fill="#304ffe"
                                fillOpacity={0.6}
                            />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Area: Security Incidents Trend */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6">Tendances Incidents (30 jours)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="critical" stroke="#ef4444" fillOpacity={1} fill="url(#colorCritical)" stackId="1" />
                            <Area type="monotone" dataKey="high" stroke="#f59e0b" fillOpacity={0.4} fill="#f59e0b" stackId="1" />
                            <Area type="monotone" dataKey="medium" stroke="#304ffe" fillOpacity={0.4} fill="#304ffe" stackId="1" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

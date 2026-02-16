'use client';

import { KPICard } from '@/components/shared/KPICard';
import { Zap, Activity, AlertTriangle } from 'lucide-react';

export default function ChaosEngineeringPage() {
    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            {/* Header with Active Simulation */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-red-500">
                            <AlertTriangle className="w-5 h-5 animate-pulse" />
                            <span className="text-sm font-bold uppercase">Active Simulation</span>
                        </div>
                        <h2 className="text-lg font-bold">Latency Injection: DB-Cluster-04</h2>
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Remaining</p>
                            <p className="text-lg font-mono font-bold text-primary">00:12:45</p>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-bold">
                            ABORT ALL
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-primary font-bold">PROGRESS 65%</span>
                    </div>
                    <div className="h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[65%] shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                    </div>
                </div>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Throughput" value="45.2k" changeLabel="req/s"
                    change={12} trend="up" icon={<Activity className="w-5 h-5" />} />
                <KPICard title="Error Rate" value="0.04%" change={-0.01} trend="down"
                    icon={<AlertTriangle className="w-5 h-5" />} />
                <KPICard title="Avg Latency" value="112 ms" change={15} trend="up"
                    changeLabel="+15ms impact" icon={<Zap className="w-5 h-5" />}
                    className="border-l-4 border-l-red-500" />
                <KPICard title="CPU Usage" value="78%" changeLabel="Stable"
                    icon={<Activity className="w-5 h-5" />} />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Impact Heatmap */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">Impact Heatmap</h3>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                                <div className="size-2 bg-emerald-500 rounded-full"></div> Normal
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="size-2 bg-amber-500 rounded-full"></div> Stressed
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="size-2 bg-red-500 rounded-full"></div> Critical
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 gap-3 p-6 dashboard-card">
                        {/* Service nodes */}
                        <div className="aspect-square bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center text-[10px] font-bold text-emerald-500">SVC-A</div>
                        <div className="aspect-square bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center text-[10px] font-bold text-emerald-500">SVC-B</div>
                        <div className="aspect-square bg-amber-500/20 border border-amber-500/50 rounded flex items-center justify-center text-[10px] font-bold text-amber-500">DB-P</div>
                        <div className="aspect-square bg-red-500/20 border border-red-500/50 rounded flex items-center justify-center text-[10px] font-bold text-red-500">DB-S</div>
                        <div className="aspect-square bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center text-[10px] font-bold text-emerald-500">API</div>
                        <div className="aspect-square bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center text-[10px] font-bold text-emerald-500">WEB</div>
                        <div className="aspect-square bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center justify-center text-[10px] font-bold text-emerald-500">AUTH</div>
                        <div className="aspect-square bg-amber-500/20 border border-amber-500/50 rounded flex items-center justify-center text-[10px] font-bold text-amber-500">PAY</div>
                        {/* More nodes */}
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-square bg-emerald-500/20 border border-emerald-500/50 rounded"></div>
                        ))}
                    </div>
                </div>

                {/* Experiment Log */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Experiment Log</h3>
                    <div className="dashboard-card h-[280px] overflow-y-auto p-4 font-mono text-[11px] leading-relaxed">
                        <p className="text-slate-500">[14:20:01] Initializing experiment: latency-injection-04</p>
                        <p className="text-slate-400">[14:20:05] Targeting DB-Cluster-04 (node-4, node-5)</p>
                        <p className="text-primary">[14:20:10] Injected 250ms latency to egress traffic</p>
                        <p className="text-amber-500">[14:22:45] WARNING: 95th percentile latency exceeded 500ms</p>
                        <p className="text-slate-400">[14:23:10] Monitoring auto-scaling group</p>
                    </div>
                </div>
            </div>

            {/* Experiment History */}
            <div className="dashboard-card overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-border-dark flex justify-between items-center">
                    <h4 className="font-bold text-sm">Recent History</h4>
                    <button className="text-primary text-sm font-bold hover:underline">View All Reports</button>
                </div>
                <table className="data-table">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase text-slate-500">
                            <th className="px-6 py-4">Experiment Name</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Impact</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                            <td className="px-6 py-4 font-medium">Core API Blackout</td>
                            <td className="px-6 py-4 text-slate-500">Service Termination</td>
                            <td className="px-6 py-4">
                                <span className="status-badge status-success">Passed</span>
                            </td>
                            <td className="px-6 py-4">2.4% Failure</td>
                            <td className="px-6 py-4 text-slate-500">Oct 24, 2023</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-primary font-bold">Details</button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                            <td className="px-6 py-4 font-medium">Redis CPU Stress</td>
                            <td className="px-6 py-4 text-slate-500">Resource Exhaustion</td>
                            <td className="px-6 py-4">
                                <span className="status-badge status-error">Failed</span>
                            </td>
                            <td className="px-6 py-4">8.1% Failure</td>
                            <td className="px-6 py-4 text-slate-500">Oct 22, 2023</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-primary font-bold">Details</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

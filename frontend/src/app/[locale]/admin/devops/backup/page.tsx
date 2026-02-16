'use client';

import { KPICard } from '@/components/shared/KPICard';
import { HardDrive, TrendingDown, DollarSign, Trash2 } from 'lucide-react';

export default function BackupRetentionPage() {
    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">Backup Lifecycle & Retention</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Real-time visualization of IT Infrastructure global backup retention
                    </p>
                </div>
                <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg flex items-center gap-2">
                    <span>📥</span> Export Report
                </button>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard title="Total Storage" value="842.6 TB" change={4.2} trend="up"
                    changeLabel="Cumulative growth across 12 zones" icon={<HardDrive className="w-5 h-5" />} />
                <KPICard title="Monthly Cost" value="$12,450" change={-1.5} trend="down"
                    changeLabel="Average $14.77 / TB / month" icon={<DollarSign className="w-5 h-5" />} />
                <KPICard title="Projected Savings" value="$2,100" change={-8.0} trend="down"
                    changeLabel="Potential optimization available" icon={<TrendingDown className="w-5 h-5" />} />
                <KPICard title="Purge Volume" value="15.4 TB" change={12} trend="up"
                    changeLabel="Successful automated deletions" icon={<Trash2 className="w-5 h-5" />}
                    className="border-l-4 border-l-emerald-500" />
            </div>

            {/* Growth Chart */}
            <div className="dashboard-card p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-bold">Data Growth by Storage Tier</h2>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                            <div className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-primary"></span>Hot Tier
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-sky-400"></span>Cold Tier
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-slate-400"></span>Archive
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[300px] bg-slate-50 dark:bg-slate-800/30 rounded-lg flex items-center justify-center text-slate-500">
                    📊 Growth Chart Visualization
                </div>
            </div>

            {/* Deletion Logs Table */}
            <div className="dashboard-card overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-border-dark flex justify-between items-center">
                    <h2 className="text-lg font-bold">Retention Deletion Logs</h2>
                    <button className="text-xs text-primary font-bold hover:underline">View All Logs</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500">
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3">Resource Name</th>
                                <th className="px-6 py-3">Storage Class</th>
                                <th className="px-6 py-3">Purged Size</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                <td className="px-6 py-4">2023-10-24 04:12</td>
                                <td className="px-6 py-4 font-medium">db-cluster-main-bkp</td>
                                <td className="px-6 py-4 text-slate-500">Cold (GIA)</td>
                                <td className="px-6 py-4">2.4 TB</td>
                                <td className="px-6 py-4">
                                    <span className="status-badge status-success">SUCCESS</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                <td className="px-6 py-4">2023-10-24 02:00</td>
                                <td className="px-6 py-4 font-medium">user-assets-s3-sync</td>
                                <td className="px-6 py-4 text-slate-500">Archive (Deep)</td>
                                <td className="px-6 py-4">850 GB</td>
                                <td className="px-6 py-4">
                                    <span className="status-badge status-success">SUCCESS</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AI Optimization */}
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <span>🧠</span>
                    <h2 className="text-sm font-bold text-primary uppercase">AI Optimization Insights</h2>
                </div>
                <div className="bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-primary/10">
                    <p className="text-xs font-semibold">Tier Migration Opportunity</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                        Move 5.2TB of "Legacy-Apps" logs from Hot to Archive.
                        Potential savings: <span className="text-emerald-500 font-bold">$185/mo</span>
                    </p>
                    <button className="mt-2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                        APPLY NOW
                    </button>
                </div>
            </div>
        </div>
    );
}

'use client';

import { KPICard } from '@/components/shared/KPICard';
import { GitBranch, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export default function InfrastructureDriftPage() {
    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">
                        Resource Drift: <span className="text-primary font-mono text-xl">aws_s3_bucket.data_storage_prod</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Detected 15 minutes ago via manual console change in <span className="font-bold">us-east-1</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold text-sm flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Refresh State
                    </button>
                    <button className="px-6 py-2 rounded-lg bg-primary text-white font-bold text-sm flex items-center gap-2">
                        <span>▶</span> Run Terraform Plan
                    </button>
                </div>
            </div>

            {/* Health Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <KPICard title="In Sync" value="1,240" change={2} trend="up"
                    icon={<CheckCircle className="w-5 h-5" />} />
                <KPICard title="Drifted" value="12" change={-5} trend="down"
                    icon={<AlertTriangle className="w-5 h-5" />}
                    className="border-l-4 border-l-red-500" />
                <KPICard title="Pending" value="4" changeLabel="Unchanged"
                    icon={<GitBranch className="w-5 h-5" />} />
            </div>

            {/* Code Comparison */}
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="w-full xl:w-1/2">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase">
                            Desired State
                        </span>
                        <span className="text-xs text-slate-400 italic font-mono">(main.tf:142)</span>
                    </div>
                    <div className="dashboard-card overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-2 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                            <span className="text-xs font-mono text-slate-500">Terraform Code</span>
                            <span className="text-xs cursor-pointer">📋</span>
                        </div>
                        <div className="p-4 font-mono text-sm space-y-1 bg-slate-900 text-slate-200">
                            <div className="text-slate-500">resource &quot;aws_s3_bucket&quot; &quot;data_storage&quot; &#123;</div>
                            <div className="pl-4">bucket = &quot;data-storage-prod-xyz&quot;</div>
                            <div className="pl-4">acl    = &quot;private&quot;</div>
                            <div className="pl-4 diff-added text-green-400">
                                <span className="pr-2">+</span>tags = &#123;
                            </div>
                            <div className="pl-8 diff-added text-green-400">
                                <span className="pr-2">+</span>Environment = &quot;Production&quot;
                            </div>
                            <div className="pl-8 diff-added text-green-400">
                                <span className="pr-2">+</span>ManagedBy   = &quot;Terraform&quot;
                            </div>
                            <div className="pl-4 diff-added text-green-400">
                                <span className="pr-2">+</span>&#125;
                            </div>
                            <div className="text-slate-500">&#125;</div>
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-1/2">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded bg-red-500/20 text-red-500 text-[10px] font-bold uppercase">
                            Actual State
                        </span>
                        <span className="text-xs text-slate-400 italic font-mono">(Live Cloud Resource)</span>
                    </div>
                    <div className="dashboard-card overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-2 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                            <span className="text-xs font-mono text-slate-500">Live Resource Attributes</span>
                            <span className="text-xs cursor-pointer">🔄</span>
                        </div>
                        <div className="p-4 font-mono text-sm space-y-1 bg-slate-900 text-slate-200">
                            <div className="text-slate-500">aws_s3_bucket.data_storage (ID: data-storage-prod-xyz)</div>
                            <div className="pl-4">bucket = &quot;data-storage-prod-xyz&quot;</div>
                            <div className="pl-4">acl    = &quot;private&quot;</div>
                            <div className="pl-4 diff-removed text-red-400">
                                <span className="pr-2">-</span>tags = &#123;
                            </div>
                            <div className="pl-8 diff-removed text-red-400">
                                <span className="pr-2">-</span>Environment = &quot;Dev&quot;
                            </div>
                            <div className="pl-8 diff-removed text-red-400">
                                <span className="pr-2">-</span>ManualEdit  = &quot;True&quot;
                            </div>
                            <div className="pl-4 diff-removed text-red-400">
                                <span className="pr-2">-</span>&#125;
                            </div>
                            <div className="text-slate-500">&#125;</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Drift Summary Table */}
            <div className="dashboard-card overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-border-dark flex justify-between items-center">
                    <h4 className="font-bold text-sm">Attribute Drift Summary</h4>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> 2 Differences
                    </span>
                </div>
                <table className="data-table">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 text-xs font-bold uppercase">
                        <tr>
                            <th className="px-6 py-3">Attribute</th>
                            <th className="px-6 py-3">Expected (IaC)</th>
                            <th className="px-6 py-3">Actual (Live)</th>
                            <th className="px-6 py-3">Impact</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        <tr>
                            <td className="px-6 py-4 font-mono text-xs font-bold text-primary">tags.Environment</td>
                            <td className="px-6 py-4 text-slate-400">&quot;Production&quot;</td>
                            <td className="px-6 py-4 text-red-400 font-bold">&quot;Dev&quot;</td>
                            <td className="px-6 py-4">
                                <span className="status-badge status-warning">Medium</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-mono text-xs font-bold text-primary">tags.ManagedBy</td>
                            <td className="px-6 py-4 text-slate-400">&quot;Terraform&quot;</td>
                            <td className="px-6 py-4 text-red-400 font-bold">(missing)</td>
                            <td className="px-6 py-4">
                                <span className="status-badge status-info">Info</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Action Footer */}
            <div className="dashboard-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 animate-pulse" />
                    <p className="text-xs text-slate-500">
                        Remediation will update <span className="font-bold">3 attributes</span> in live cloud environment.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-2 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-sm">
                        Ignore Drift
                    </button>
                    <button className="px-8 py-2 rounded-lg bg-primary text-white font-bold text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Apply Plan
                    </button>
                </div>
            </div>
        </div>
    );
}

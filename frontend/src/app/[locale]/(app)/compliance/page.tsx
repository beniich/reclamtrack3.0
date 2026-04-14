'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import {
    Shield, ShieldCheck, ShieldAlert, Lock, UserCheck, 
    Database, Activity, Download, FileText, AlertTriangle,
    CheckCircle2, XCircle, Clock, Trash2, Globe, Eye
} from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const CLASSIFICATION_COLORS: Record<string, string> = {
    PUBLIC: '#22c55e',
    INTERNAL: '#304ffe',
    CONFIDENTIAL: '#f59e0b',
    RESTRICTED: '#ef4444'
};

export default function ComplianceCenterPage() {
    const { data: report, isLoading: isReportLoading } = useQuery({
        queryKey: ['compliance-report'],
        queryFn: async () => {
            const res = await api.get('/compliance/report');
            return res.data;
        }
    });

    const { data: reports, refetch: refetchReports } = useQuery({
        queryKey: ['compliance-reports'],
        queryFn: async () => {
             const res = await api.get('/compliance/reports');
             return res.data;
        }
    });

    const runAuditMutation = async () => {
        if (!confirm('Lancer un audit interne IA ? Cela générera un rapport de conformité daté.')) return;
        try {
            await api.post('/compliance/audit-internal');
            alert('Audit terminé avec succès ! Rapport archivé.');
            refetchReports();
        } catch (err) {
            alert('Échec de l\'audit.');
        }
    };

    if (isReportLoading || isEventsLoading || isSessionsLoading) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 dark:bg-[#0a0a14]">
                <LoadingSpinner />
            </div>
        );
    }

    const classificationData = Object.entries(report?.details?.classification || {}).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-[#0a0a14] font-display overflow-x-hidden p-4 lg:p-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                        <Shield className="w-3 h-3" />
                        Compliance & Guardrails
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                        Trust <span className="text-primary underline decoration-primary/20 underline-offset-[10px]">Center</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 font-medium max-w-xl">
                        Monitor industrial-grade security controls, IAM health, and data classification compliant with SOC 2 and ISO 27001.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button 
                        onClick={runAuditMutation}
                        className="h-12 px-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 shadow-xl shadow-blue-500/20"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Run IA Audit
                    </button>
                    <button className="h-12 px-6 bg-slate-900 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-slate-800 flex items-center gap-3">
                        <Download className="w-4 h-4" />
                        Export Audit Dossier
                    </button>
                </div>
            </div>

            {/* Archived Reports Section */}
            {reports && reports.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {reports.map((report: any) => (
                        <div key={report.name} className="flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm group hover:border-primary transition-all">
                             <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                                 <FileText className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                             </div>
                             <div>
                                 <div className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{report.name}</div>
                                 <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Audit Archive — {report.date}</div>
                             </div>
                             <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                                 <Download className="w-3 h-3 text-slate-400" />
                             </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Score & IAM Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Overall Score */}
                <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] border border-slate-800 shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="size-40 rounded-full border-[10px] border-slate-800 flex items-center justify-center relative">
                            <svg className="absolute inset-0 size-40 -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    className="text-primary transition-all duration-1000"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * (report?.score || 0)) / 100}
                                />
                            </svg>
                            <span className="text-5xl font-black italic">{report?.score}<span className="text-xl opacity-50 ml-1">%</span></span>
                        </div>
                        <h3 className="mt-6 text-sm font-black uppercase tracking-[0.2em]">Compliance Health Score</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">Aggregate maturity index</p>
                    </div>
                </div>

                {/* IAM Stats */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl border border-blue-200">
                                <Lock className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black px-2 py-1 rounded-full bg-green-50 text-green-600">Active</span>
                        </div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">MFA Adoption</h4>
                        <div className="text-3xl font-black text-slate-900 dark:text-white mb-4">{report?.details?.iam?.mfaAdoptionRate.toFixed(1)}%</div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${report?.details?.iam?.mfaAdoptionRate}%` }}></div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase">SOC 2 requirement: 100% for admin access</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl border border-purple-200">
                                <UserCheck className="w-6 h-6" />
                            </div>
                        </div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Stale Passwords</h4>
                        <div className="text-3xl font-black text-slate-900 dark:text-white mb-4">{report?.details?.iam?.stalePasswordsCount} Users</div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Passwords older than 90 days requiring rotation.</p>
                        <div className="mt-6 flex gap-2">
                             <button className="px-4 py-2 bg-slate-900 text-white text-[9px] font-black uppercase rounded-lg">Trigger Blast</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Section: Classification & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Data Classification */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-lg flex flex-col">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <Database className="w-4 h-4 text-primary" />
                        Pillar 5 — Data Labels
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={classificationData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {classificationData.map((entry) => (
                                        <Cell key={entry.name} fill={CLASSIFICATION_COLORS[entry.name] || '#ccc'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-auto space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                         {classificationData.map(item => (
                             <div key={item.name} className="flex justify-between items-center text-[10px] font-bold uppercase">
                                 <span className="text-slate-400">{item.name}</span>
                                 <span>{item.value} entries</span>
                             </div>
                         ))}
                    </div>
                </div>

                {/* Compliance Controls Maturity */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Industrial Controls Maturity</h3>
                    <div className="space-y-4">
                        {report?.controls.map((control: any) => (
                            <div key={control.id} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${control.status === 'PASS' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                                        {control.status === 'PASS' ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-primary uppercase">{control.framework}</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase">• {control.id}</span>
                                        </div>
                                        <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{control.name}</h5>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                     <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${control.status === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                         {control.status}
                                     </span>
                                     <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                         <Eye className="w-4 h-4" />
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Sessions Management */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" />
                            Section Active Sessions
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Industrial-grade session control & revocation</p>
                     </div>
                     <button className="text-[10px] font-black text-red-500 uppercase hover:underline">Revoke All</button>
                </div>

                <div className="space-y-4">
                     {sessions?.map((session: any) => (
                         <div key={session._id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                             <div className="flex items-center gap-4">
                                 <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                     <Globe className="w-5 h-5 text-slate-400" />
                                 </div>
                                 <div>
                                     <div className="flex items-center gap-2">
                                         <span className="font-bold text-slate-900 dark:text-white uppercase tracking-tighter text-sm">{session.createdFromIp || 'IP Inconnu'}</span>
                                         {session.createdFromIp === '127.0.0.1' && <span className="text-[8px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full uppercase">Current</span>}
                                     </div>
                                     <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Created: {new Date(session.createdAt).toLocaleString()}</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                  <div className="text-right hidden md:block">
                                      <div className="text-[9px] font-black text-slate-400 uppercase">Expires In</div>
                                      <div className="text-[10px] font-bold text-slate-900 dark:text-white uppercase">
                                          {Math.ceil((new Date(session.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} Days
                                      </div>
                                  </div>
                                  <button 
                                    onClick={async () => {
                                        if (confirm('Révoquer cette session ?')) {
                                            await api.delete(`/auth/sessions/${session.tokenHash}`);
                                            window.location.reload();
                                        }
                                    }}
                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                  >
                                      <Trash2 className="w-4 h-4" />
                                  </button>
                             </div>
                         </div>
                     ))}
                     {(!sessions || sessions.length === 0) && (
                         <div className="text-center py-10 text-slate-400 text-xs italic">Aucune session active détectée.</div>
                     )}
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-orange-500" />
                            Phase 1 — Security Incidents
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Real-time anomaly detection logs</p>
                     </div>
                     <button className="text-[10px] font-black text-primary uppercase hover:underline">View All History</button>
                </div>

                <div className="space-y-4 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / ID</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Severity</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Source / Impact</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-[11px] font-bold">
                            {events?.map((event: any) => (
                                <tr key={event._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="py-4">
                                        <div className="flex flex-col">
                                            <span className="uppercase text-slate-900 dark:text-white">{event.type.replace('_', ' ')}</span>
                                            <span className="text-[9px] text-slate-400 font-mono">#{event._id.slice(-8)}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase ${
                                            event.severity === 'CRITICAL' ? 'bg-red-500 text-white' :
                                            event.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {event.severity}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex flex-col">
                                            <span className="text-slate-600 dark:text-slate-400">{event.sourceIp || 'SYSTEM'}</span>
                                            <span className="text-[9px] text-slate-500 font-normal italic max-w-[200px] truncate">{event.description}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`size-1.5 rounded-full animate-pulse ${event.status === 'OPEN' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                            <span className="uppercase tracking-widest text-[9px]">{event.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-slate-400">
                                        {new Date(event.detectedAt).toLocaleString()}
                                    </td>
                                    <td className="py-4">
                                        <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-primary transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(!events || events.length === 0) && (
                        <div className="py-20 text-center text-slate-400 italic font-medium uppercase tracking-widest text-[10px]">
                            Aucun incident de sécurité détecté — Système stable.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


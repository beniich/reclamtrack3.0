"use client"

import { useSecuritySocket } from "@/hooks/useSecuritySocket"
import { securityApi } from "@/lib/api"
import { format } from "date-fns"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SecurityPage() {
    const [complianceData, setComplianceData] = useState<any>(null);
    const [rdpSessions, setRdpSessions] = useState<any[]>([]);
    const [passwordAudit, setPasswordAudit] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { firewallLogs, securityAlerts, isConnected } = useSecuritySocket();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [compliance, rdp, audit] = await Promise.all([
                    securityApi.getCompliance(),
                    securityApi.getRdpSessions(),
                    securityApi.getPasswordAudit()
                ]);
                setComplianceData(compliance);
                setRdpSessions(rdp);
                setPasswordAudit(audit);
            } catch (error) {
                console.error("Failed to fetch security data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatusColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <header className="h-16 border-b border-white/10 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-400">shield_lock</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-bold text-white uppercase tracking-wider">Security Center</h1>
                        <div className="flex items-center gap-1.5">
                            <div className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-[10px] text-slate-400 uppercase">{isConnected ? 'Live Feed Active' : 'Offline'}</span>
                        </div>
                    </div>
                </div>
                <Link href="/admin/devops" className="p-2 text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Dashboard
                </Link>
            </header>

            <main className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Top KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-white/5 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl">verified_user</span>
                        </div>
                        <p className="text-slate-400 text-xs font-medium uppercase mb-2">Compliance Score</p>
                        <div className={`text-4xl font-black ${getStatusColor(complianceData?.complianceScore || 0)}`}>
                            {isLoading ? "..." : `${complianceData?.complianceScore || 0}%`}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase">Based on latest audit</p>
                    </div>

                    <div className="bg-slate-900 border border-white/5 p-5 rounded-2xl shadow-xl">
                        <p className="text-slate-400 text-xs font-medium uppercase mb-2">Active RDP Sessions</p>
                        <div className="text-4xl font-black text-white">{isLoading ? "..." : rdpSessions.length}</div>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase">Real-time terminal access</p>
                    </div>

                    <div className="bg-slate-900 border border-white/5 p-5 rounded-2xl shadow-xl">
                        <p className="text-slate-400 text-xs font-medium uppercase mb-2">BCRYPT Coverage</p>
                        <div className="text-4xl font-black text-blue-400">
                            {isLoading ? "..." : `${passwordAudit?.bcryptHashed || 0}/${passwordAudit?.totalUsers || 0}`}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase">Hashed user passwords</p>
                    </div>

                    <div className="bg-slate-900 border border-white/5 p-5 rounded-2xl shadow-xl">
                        <p className="text-slate-400 text-xs font-medium uppercase mb-2">Active Threats (24h)</p>
                        <div className="text-4xl font-black text-red-500">{firewallLogs.filter(l => l.action !== 'pass').length}</div>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase">Blocked intrusion attempts</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Live Firewall Logs */}
                    <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
                        <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-400">lan</span>
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Real-Time Firewall Activity</h3>
                            </div>
                            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">{firewallLogs.length} events logged</span>
                        </div>
                        <div className="flex-1 overflow-auto p-0 font-mono text-[11px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-950 text-slate-500 sticky top-0 uppercase">
                                    <tr>
                                        <th className="px-4 py-2 font-medium">Time</th>
                                        <th className="px-4 py-2 font-medium">Action</th>
                                        <th className="px-4 py-2 font-medium">Proto</th>
                                        <th className="px-4 py-2 font-medium">Source</th>
                                        <th className="px-4 py-2 font-medium">Destination</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {firewallLogs.map((log, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-1.5 text-slate-400">{format(new Date(log.timestamp), 'HH:mm:ss')}</td>
                                            <td className="px-4 py-1.5">
                                                <span className={`px-1.5 py-0.5 rounded uppercase font-bold text-[9px] ${
                                                    log.action === 'pass' ? 'bg-green-500/20 text-green-400' :
                                                    log.action === 'block' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-4 py-1.5 text-slate-300 font-bold">{log.protocol}</td>
                                            <td className="px-4 py-1.5 text-blue-400">{log.srcIP}:{log.srcPort}</td>
                                            <td className="px-4 py-1.5 text-slate-400">{log.dstIP}:{log.dstPort}</td>
                                        </tr>
                                    ))}
                                    {firewallLogs.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-20 text-center text-slate-600 italic">Listening for network events...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Side Sidebar: RDP & Recommendations */}
                    <div className="space-y-6">
                        {/* RDP Sessions */}
                        <div className="bg-slate-900 border border-white/5 rounded-2xl shadow-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                                <h4 className="text-xs font-bold text-white uppercase">Active RDP Sessions</h4>
                            </div>
                            <div className="p-4 space-y-3">
                                {isLoading ? (
                                    <div className="animate-pulse space-y-2">
                                        <div className="h-10 bg-white/5 rounded"></div>
                                        <div className="h-10 bg-white/5 rounded"></div>
                                    </div>
                                ) : rdpSessions.length > 0 ? (
                                    rdpSessions.map((session, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-sm text-blue-400">person</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-white">{session.username}</p>
                                                    <p className="text-[9px] text-slate-500">{session.sessionName} • ID {session.id}</p>
                                                </div>
                                            </div>
                                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[8px] font-bold rounded-full uppercase">{session.state}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center py-4 text-xs text-slate-500">No active RDP sessions detected.</p>
                                )}
                            </div>
                        </div>

                        {/* Security Recommendations */}
                        <div className="bg-slate-900 border border-white/5 rounded-2xl shadow-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                                <h4 className="text-xs font-bold text-white uppercase">Critical Items</h4>
                            </div>
                            <div className="p-4 space-y-4">
                                {complianceData?.recommendations?.map((rec: string, i: number) => (
                                    <div key={i} className="flex gap-3">
                                        <span className="material-symbols-outlined text-sm text-yellow-500">warning</span>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">{rec}</p>
                                    </div>
                                ))}
                                {!isLoading && complianceData?.recommendations?.length === 0 && (
                                    <div className="flex items-center gap-2 text-green-500">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                        <p className="text-[11px]">System compliant.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

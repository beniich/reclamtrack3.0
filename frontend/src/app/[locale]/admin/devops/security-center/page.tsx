"use client"
import Link from "next/link"

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-background-dark">
            <header className="h-16 border-b border-border-dark bg-background-dark/80 backdrop-blur-md px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">shield_lock</span>
                    </div>
                    <h1 className="text-xl font-bold text-white">Security Center</h1>
                </div>
                <Link href="/admin/devops" className="p-2 text-slate-400 hover:text-white"><span className="material-symbols-outlined">home</span></Link>
            </header>
            <main className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-surface-dark border border-border-dark p-5 rounded-xl">
                        <p className="text-slate-400 text-sm mb-2">Active Threats</p>
                        <div className="text-3xl font-bold text-white">12</div>
                        <p className="text-xs text-red-500 mt-1">4 critical urgency</p>
                    </div>
                    <div className="bg-surface-dark border border-border-dark p-5 rounded-xl">
                        <p className="text-slate-400 text-sm mb-2">Blocked IPs (24h)</p>
                        <div className="text-3xl font-bold text-white">1,429</div>
                    </div>
                    <div className="bg-surface-dark border border-border-dark p-5 rounded-xl">
                        <p className="text-slate-400 text-sm mb-2">WAF Triggers</p>
                        <div className="text-3xl font-bold text-white">45.2k</div>
                    </div>
                    <div className="bg-surface-dark border border-border-dark p-5 rounded-xl">
                        <p className="text-slate-400 text-sm mb-2">DDoS Status</p>
                        <div className="text-xl font-bold text-green-500">Protected</div>
                    </div>
                </div>
                <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border-dark">
                        <h3 className="text-lg font-semibold text-white">Recent Blocked Requests</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-slate-500">Security monitoring data displayed here</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

"use client"
import Link from "next/link"

export default function CloudMonitorPage() {
    return (
        <div className="min-h-screen bg-background-dark">
            <header className="border-b border-border-dark bg-background-dark/50 backdrop-blur-md px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-white">cloud_done</span>
                        </div>
                        <h2 className="text-white text-lg font-bold">CloudMonitor <span className="text-primary">Pro</span></h2>
                    </div>
                    <Link href="/admin/devops" className="p-2 text-slate-400 hover:text-white">
                        <span className="material-symbols-outlined">home</span>
                    </Link>
                </div>
            </header>
            <main className="p-6 max-w-[1600px] mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-surface-dark p-5 rounded-xl border border-border-dark">
                        <p className="text-slate-400 text-sm">Active Nodes</p>
                        <h3 className="text-3xl font-bold text-white mt-2">12</h3>
                    </div>
                    <div className="bg-surface-dark p-5 rounded-xl border border-border-dark">
                        <p className="text-slate-400 text-sm">Cluster Health</p>
                        <h3 className="text-3xl font-bold text-white mt-2">98.2%</h3>
                    </div>
                </div>
                <div className="bg-surface-dark p-6 rounded-xl border border-border-dark">
                    <h3 className="text-white font-bold text-lg mb-4">Cluster Performance</h3>
                    <div className="h-64 bg-background-dark/50 rounded-lg"></div>
                </div>
            </main>
        </div>
    )
}

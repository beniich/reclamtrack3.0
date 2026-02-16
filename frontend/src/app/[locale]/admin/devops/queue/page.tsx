"use client"
import Link from "next/link"

export default function QueuePage() {
    return (
        <div className="min-h-screen bg-background-dark">
            <header className="border-b border-primary/20 bg-[#111722] px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">database</span>
                    </div>
                    <h2 className="text-white text-lg font-bold">BullMQ & Redis</h2>
                </div>
                <Link href="/admin/devops" className="p-2 text-white hover:text-primary"><span className="material-symbols-outlined">home</span></Link>
            </header>
            <main className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#111722] p-5 rounded-xl border border-primary/10">
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Active Jobs</p>
                        <div className="text-3xl font-bold text-white">1,284</div>
                    </div>
                    <div className="bg-[#111722] p-5 rounded-xl border border-primary/10">
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Waiting</p>
                        <div className="text-3xl font-bold text-white">452</div>
                    </div>
                </div>
                <div className="bg-[#111722] border border-primary/10 rounded-xl p-6">
                    <h3 className="text-white font-bold text-lg mb-4">Active Queues</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-background-dark/50 rounded">
                            <span className="font-semibold text-white">email-notifications</span>
                            <span className="text-sm text-emerald-500">Running</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

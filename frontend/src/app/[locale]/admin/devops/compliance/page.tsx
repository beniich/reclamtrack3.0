"use client"
import Link from "next/link"

export default function CompliancePage() {
    return (
        <div className="min-h-screen bg-background-dark flex flex-col">
            <header className="h-16 border-b border-border-dark bg-surface px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-primary">account_tree</span>
                    <h1 className="text-lg font-bold text-white">DataMapper<span className="text-primary">Pro</span></h1>
                </div>
                <Link href="/admin/devops" className="p-2 text-slate-400 hover:text-white"><span className="material-symbols-outlined">home</span></Link>
            </header>
            <div className="flex-1 canvas-bg p-12">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="bg-surface border border-border-dark rounded-xl p-6">
                        <h3 className="font-bold mb-2 text-white">Customer Profiles</h3>
                        <p className="text-slate-400 text-sm">PostgreSQL Table • "public.users"</p>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between p-2 bg-background-dark/30 border border-border-dark rounded">
                                <span className="text-sm text-slate-300">Full Name</span>
                                <span className="text-xs px-1.5 py-0.5 bg-slate-700 rounded text-slate-200">Identity</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-background-dark/30 border border-border-dark rounded">
                                <span className="text-sm text-slate-300">Email Address</span>
                                <span className="text-xs px-1.5 py-0.5 bg-amber-500/10 text-amber-500 rounded">Sensitive</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

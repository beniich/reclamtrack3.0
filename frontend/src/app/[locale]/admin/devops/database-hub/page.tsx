"use client"

import Link from "next/link"

export default function DatabasePage() {
    return (
        <div className="flex h-screen w-full flex-col bg-background-dark overflow-x-hidden">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between border-b border-slate-800 px-6 py-3 bg-background-dark z-20 sticky top-0">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined">database</span>
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-tight">
                            DB Hub <span className="text-primary">Enterprise</span>
                        </h2>
                    </div>
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-10 max-w-64">
                        <div className="text-[#92a4c9] flex border-none bg-[#232f48] items-center justify-center pl-4 rounded-l-lg">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="form-input flex w-full min-w-0 flex-1 border-none bg-[#232f48] text-white focus:ring-0 placeholder:text-[#92a4c9] px-4 text-sm rounded-r-lg"
                            placeholder="Search clusters, nodes..."
                        />
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <nav className="hidden md:flex items-center gap-6">
                        <a className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">
                            Clusters
                        </a>
                        <a className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">
                            Nodes
                        </a>
                        <a className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">
                            Replication
                        </a>
                        <a className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">
                            Backups
                        </a>
                    </nav>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#232f48] text-white hover:bg-primary/20 hover:text-primary transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <Link
                            href="/admin/devops"
                            className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#232f48] text-white hover:bg-primary/20 hover:text-primary transition-all"
                        >
                            <span className="material-symbols-outlined">home</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-64 hidden lg:flex flex-col border-r border-slate-800 bg-background-dark p-4 gap-6">
                    <div className="flex flex-col gap-1">
                        <h3 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Systems</h3>
                        <a
                            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white shadow-lg shadow-primary/20"
                            href="#"
                        >
                            <span className="material-symbols-outlined">grid_view</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-primary/10 hover:text-primary transition-all"
                            href="#"
                        >
                            <span className="material-symbols-outlined">storage</span>
                            <span className="text-sm font-medium">PostgreSQL</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-primary/10 hover:text-primary transition-all"
                            href="#"
                        >
                            <span className="material-symbols-outlined">database</span>
                            <span className="text-sm font-medium">MySQL Instances</span>
                        </a>
                    </div>
                    <div className="mt-auto p-4 bg-[#192233] rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-400">Storage Usage</span>
                            <span className="text-xs font-bold text-primary">84%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[84%]"></div>
                        </div>
                        <p className="mt-2 text-[10px] text-slate-400 leading-tight">
                            Scale-up suggested for pg-prod-01 within 48h.
                        </p>
                    </div>
                </aside>

                {/* Main Dashboard Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#0c111a] p-6 lg:p-8">
                    {/* Dashboard Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">PostgreSQL Production Cluster</h1>
                            <p className="text-slate-400 text-sm">
                                Cluster ID: cluster-pg-v2-41-stable • Status:{" "}
                                <span className="text-emerald-500 font-semibold">Healthy</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#232f48] border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-lg">cloud_download</span>
                                Export Report
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
                                <span className="material-symbols-outlined text-lg">add</span>
                                Provision Node
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatsCard
                            title="Health Score"
                            value="98.2"
                            unit="%"
                            change="+1.4% from last week"
                            icon="verified"
                            iconColor="text-emerald-500"
                            changeColor="text-emerald-500"
                        />
                        <StatsCard
                            title="Active Conns"
                            value="1,248"
                            subtitle="Max limit: 5,000"
                            icon="hub"
                            iconColor="text-primary"
                        />
                        <StatsCard
                            title="CPU Avg"
                            value="42"
                            unit="%"
                            change="+5% spike detected"
                            icon="speed"
                            iconColor="text-amber-500"
                            changeColor="text-amber-500"
                        />
                        <StatsCard
                            title="Database Size"
                            value="4.2"
                            unit="TB"
                            change="-12GB (Vacuum)"
                            icon="data_usage"
                            iconColor="text-primary"
                            changeColor="text-emerald-500"
                        />
                    </div>

                    {/* Replication Monitor Table */}
                    <div className="flex flex-col rounded-xl bg-[#111722] border border-slate-800 shadow-sm overflow-hidden mb-8">
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                            <h2 className="text-white font-bold">Replication Status Monitor</h2>
                            <div className="flex items-center gap-2">
                                <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Live Updates</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#192233] text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3">Node Name</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Role</th>
                                        <th className="px-6 py-3">Lag (ms)</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    <ReplicationRow name="pg-prod-01" status="HEALTHY" role="Primary" lag={0} />
                                    <ReplicationRow name="pg-prod-02" status="HEALTHY" role="Replica" lag={12} />
                                    <ReplicationRow name="pg-prod-03" status="WARNING" role="Replica" lag={450} statusColor="amber" />
                                    <ReplicationRow name="pg-prod-04" status="CRITICAL" role="Replica" lag={5200} statusColor="rose" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function StatsCard({
    title,
    value,
    unit,
    subtitle,
    change,
    icon,
    iconColor,
    changeColor,
}: {
    title: string
    value: string
    unit?: string
    subtitle?: string
    change?: string
    icon: string
    iconColor: string
    changeColor?: string
}) {
    return (
        <div className="flex flex-col gap-2 rounded-xl p-5 bg-[#111722] border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-[#92a4c9] text-xs font-semibold uppercase tracking-wider">{title}</p>
                <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
            </div>
            <p className="text-white text-3xl font-bold leading-tight">
                {value}
                {unit && <span className="text-lg font-normal text-slate-400">{unit}</span>}
            </p>
            {change && (
                <div className={`flex items-center gap-1 ${changeColor} text-xs font-bold`}>
                    <span className="material-symbols-outlined text-sm">
                        {changeColor?.includes("emerald") ? "arrow_upward" : "trending_up"}
                    </span>
                    <span>{change}</span>
                </div>
            )}
            {subtitle && <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">{subtitle}</div>}
        </div>
    )
}

function ReplicationRow({
    name,
    status,
    role,
    lag,
    statusColor = "emerald",
}: {
    name: string
    status: string
    role: string
    lag: number
    statusColor?: string
}) {
    const colors = {
        emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
        amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
        rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
    }

    const barColors = {
        emerald: "bg-primary",
        amber: "bg-amber-500",
        rose: "bg-rose-500",
    }

    return (
        <tr className="hover:bg-white/5 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <span
                        className={`size-2 rounded-full ${statusColor === "emerald" ? "bg-emerald-500" : statusColor === "amber" ? "bg-amber-500" : "bg-rose-500"} shadow-[0_0_8px_rgba(16,185,129,0.5)]`}
                    ></span>
                    <span className="text-sm font-medium text-white">{name}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${colors[statusColor as keyof typeof colors]}`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-slate-400">{role}</td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-[60px] h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                            className={`${barColors[statusColor as keyof typeof barColors]} h-full`}
                            style={{ width: `${Math.min(lag / 10, 100)}%` }}
                        ></div>
                    </div>
                    <span className="text-xs font-bold text-white">{lag}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </td>
        </tr>
    )
}

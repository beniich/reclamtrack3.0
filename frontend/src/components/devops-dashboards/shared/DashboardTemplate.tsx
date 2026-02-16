'use client'

import KPICard from './KPICard'

interface DashboardTemplateProps {
    title: string
    icon: string
    kpis?: Array<{
        title: string
        value: string
        change?: string
        trend?: 'up' | 'down' | 'neutral'
        icon: string
        subtitle?: string
        iconColor?: string
    }>
    children?: React.ReactNode
}

export default function DashboardTemplate({
    title,
    icon,
    kpis = [],
    children
}: DashboardTemplateProps) {
    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Header */}
            <header className="bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-primary">{icon}</span>
                        <h1 className="text-2xl font-bold">{title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500 dark:text-slate-400">DevOps Engineer</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
                {/* KPIs Section */}
                {kpis.length > 0 && (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpis.map((kpi, index) => (
                            <KPICard key={index} {...kpi} />
                        ))}
                    </section>
                )}

                {/* Custom Content */}
                {children}
            </main>
        </div>
    )
}

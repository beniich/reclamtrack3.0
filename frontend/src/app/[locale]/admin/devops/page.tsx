'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from "@/components/devops-dashboards/layout/Header"
import { Footer } from "@/components/devops-dashboards/layout/Footer"

const dashboards = [
    // Original DevOps Dashboards (11)
    { id: 'mailbox', name: 'Mailbox Configuration', description: 'Manage your incoming and outgoing mail servers', icon: 'mail', color: 'blue' },
    { id: 'kubernetes', name: 'Kubernetes Pod', description: 'Monitor and manage Kubernetes pods and resources', icon: 'grid_view', color: 'green' },
    { id: 'db-query', name: 'QueryViz Pro', description: 'Analyze database queries and execution plans', icon: 'database', color: 'purple' },
    { id: 'gslb', name: 'EdgeRoute GSLB', description: 'Global server load balancing and traffic routing', icon: 'hub', color: 'indigo' },
    { id: 'waf', name: 'WAF Threat Intel', description: 'Real-time threat monitoring and firewall rules', icon: 'security', color: 'red' },
    { id: 'guardian', name: 'Guardian AI (PII)', description: 'Scan and protect sensitive personally identifiable information', icon: 'shield_lock', color: 'orange' },
    { id: 'backup', name: 'CloudGuard Backup', description: 'Automated S3 backups and recovery management', icon: 'cloud_done', color: 'teal' },
    { id: 'chaos-hub', name: 'Chaos Hub', description: 'Run chaos engineering experiments and tests', icon: 'bolt', color: 'yellow' },
    { id: 'vault', name: 'Security Vault', description: 'Securely manage API keys and credentials', icon: 'shield_person', color: 'pink' },
    { id: 'drift', name: 'Infrastructure Drift', description: 'Detect and resolve infrastructure configuration drift', icon: 'hub', color: 'cyan' },
    { id: 'trace', name: 'APM Trace Explorer', description: 'Explore application performance traces and logs', icon: 'analytics', color: 'violet' },

    // Enterprise Administration Dashboards (11)
    { id: 'teams', name: 'Technical Teams Directory', description: 'Intervention system admin portal for team management', icon: 'engineering', color: 'emerald' },
    { id: 'database-hub', name: 'Database Management Hub', description: 'Enterprise PostgreSQL cluster monitoring and replication', icon: 'database', color: 'blue' },
    { id: 'cloudmonitor', name: 'CloudMonitor Pro', description: 'DevOps infrastructure and cluster performance dashboard', icon: 'cloud', color: 'sky' },
    { id: 'network', name: 'Network Visualization', description: 'Architecture and topology viewer for network infrastructure', icon: 'hub', color: 'indigo' },
    { id: 'security-center', name: 'Security Center', description: 'SOC operations dashboard with threat monitoring', icon: 'shield', color: 'red' },
    { id: 'rbac', name: 'Access Control (RBAC)', description: 'Enterprise permissions and role-based access management', icon: 'admin_panel_settings', color: 'purple' },
    { id: 'queue', name: 'Cache & Queue Monitor', description: 'BullMQ and Redis monitoring for job queues', icon: 'storage', color: 'amber' },
    { id: 'microservices', name: 'Microservices Health', description: 'Service status center with health and latency metrics', icon: 'apps', color: 'green' },
    { id: 'compliance', name: 'Compliance Mapper', description: 'GDPR and data flow visualization for compliance', icon: 'account_tree', color: 'lime' },
    { id: 'diagnostics', name: 'System Diagnostics', description: 'Error tracking and monitoring dashboard', icon: 'analytics', color: 'rose' },
]

const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20',
    red: 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20',
    green: 'bg-green-500/10 text-green-500 group-hover:bg-green-500/20',
    purple: 'bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500/20',
    orange: 'bg-orange-500/10 text-orange-500 group-hover:bg-orange-500/20',
    teal: 'bg-teal-500/10 text-teal-500 group-hover:bg-teal-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20',
    pink: 'bg-pink-500/10 text-pink-500 group-hover:bg-pink-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500/20',
    violet: 'bg-violet-500/10 text-violet-500 group-hover:bg-violet-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20',
    sky: 'bg-sky-500/10 text-sky-500 group-hover:bg-sky-500/20',
    lime: 'bg-lime-500/10 text-lime-500 group-hover:bg-lime-500/20',
    rose: 'bg-rose-500/10 text-rose-500 group-hover:bg-rose-500/20',
}


export default function DevOpsPage() {
    const params = useParams()
    const locale = params.locale as string

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
            <Header />
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                        DevOps Monitoring Suite
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Professional monitoring and management dashboards for modern infrastructure
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dashboards.map((dashboard) => (
                        <Link
                            key={dashboard.id}
                            href={`/${locale}/admin/devops/${dashboard.id}`}
                            className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-6 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`size-12 rounded-lg flex items-center justify-center transition-colors ${colorClasses[dashboard.color as keyof typeof colorClasses]}`}>
                                    <span className="material-symbols-outlined text-2xl">{dashboard.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                        {dashboard.name}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {dashboard.description}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-primary">
                                    arrow_forward
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

'use client'

import DashboardTemplate from '@/components/devops-dashboards/shared/DashboardTemplate'


export default function SSLManagerDashboard() {
  const kpis = [
    {
      title: 'Total Certificates',
      value: '128',
      change: '+5.2%',
      trend: 'up' as const,
      icon: 'verified_user',
      iconColor: 'primary'
    },
    {
      title: 'Expiring Soon',
      value: '12',
      subtitle: 'Critical',
      icon: 'alarm',
      iconColor: 'amber'
    },
    {
      title: 'Active/Healthy',
      value: '116',
      change: '90.6%',
      trend: 'neutral' as const,
      icon: 'check_circle',
      iconColor: 'green'
    },
    {
      title: 'Auto-Renewal',
      value: '94%',
      change: '+12%',
      trend: 'up' as const,
      icon: 'sync',
      iconColor: 'primary'
    }
  ]

  return (
    <DashboardTemplate
      title="SSL Manager"
      icon="shield_lock"
      kpis={kpis}
    >
      {/* Critical Alert Banner */}
      <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="size-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-red-500">emergency_home</span>
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              Critical Alert: 7 Certificates expiring within 7 days
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Immediate action required to prevent service downtime for production domains.
            </p>
          </div>
        </div>
        <button className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all whitespace-nowrap">
          Renew Now
        </button>
      </div>

      {/* Certificates Table */}
      <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
          <h3 className="font-bold text-lg">Active Managed Domains</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              Export CSV
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              Bulk Action
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-border-dark">
              <tr>
                <th className="px-6 py-4 font-bold">Domain & Status</th>
                <th className="px-6 py-4 font-bold">Issuer</th>
                <th className="px-6 py-4 font-bold">Expiration Health</th>
                <th className="px-6 py-4 font-bold">Auto-Renew</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-sm">cloud</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">api.cloudinfra.io</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                        Active
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">DigiCert Global CA</div>
                  <div className="text-[10px] text-slate-500 font-mono">ID: 4x992...a3</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5 w-40">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span>242 days left</span>
                      <span className="text-slate-400">82%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <div className="w-10 h-5 bg-primary rounded-full"></div>
                    <div className="absolute left-6 top-1 size-3 bg-white rounded-full"></div>
                    <span className="ml-3 text-xs font-medium text-slate-500">Enabled</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </td>
              </tr>

              {/* Row 2 - Critical */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-red-500 text-sm">warning</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">legacy-portal.net</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                        Critical
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">Let&apos;s Encrypt R3</div>
                  <div className="text-[10px] text-slate-500 font-mono">ID: 1z220...f1</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5 w-40">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span className="text-red-500">4 days left</span>
                      <span className="text-red-500">2%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full shadow-inner"></div>
                    <div className="absolute left-1 top-1 size-3 bg-white rounded-full"></div>
                    <span className="ml-3 text-xs font-medium text-slate-500">Manual</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-amber-500 text-sm">schedule</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">*.internal.systems</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        Expiring
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">Sectigo RSA Domain</div>
                  <div className="text-[10px] text-slate-500 font-mono">ID: 8v101...b8</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5 w-40">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span className="text-orange-400">28 days left</span>
                      <span className="text-orange-400">14%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '14%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <div className="w-10 h-5 bg-primary rounded-full"></div>
                    <div className="absolute left-6 top-1 size-3 bg-white rounded-full"></div>
                    <span className="ml-3 text-xs font-medium text-slate-500">Enabled</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Domain Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Domain Coverage Map</h3>
            <button className="text-primary text-xs font-bold hover:underline">Scan Assets</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="size-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Production Subdomains</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500">42/42 protected</span>
                <span className="text-xs font-bold text-green-500">100%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="size-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm font-medium">Staging & QA Environments</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500">18/24 protected</span>
                <span className="text-xs font-bold text-orange-400">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="size-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Marketing Campaign TLDs</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500">5/12 protected</span>
                <span className="text-xs font-bold text-red-500">41%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">bolt</span> Quick Tools
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-surface-dark rounded-lg border border-primary/10 hover:border-primary/40 transition-all text-left">
              <span className="text-xs font-semibold">Generate CSR</span>
              <span className="material-symbols-outlined text-sm text-primary">arrow_forward</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-surface-dark rounded-lg border border-primary/10 hover:border-primary/40 transition-all text-left">
              <span className="text-xs font-semibold">Certificate Discovery</span>
              <span className="material-symbols-outlined text-sm text-primary">sensors</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-surface-dark rounded-lg border border-primary/10 hover:border-primary/40 transition-all text-left">
              <span className="text-xs font-semibold">Compliance Report</span>
              <span className="material-symbols-outlined text-sm text-primary">description</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  )
}

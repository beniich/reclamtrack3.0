'use client';

import React from 'react';

export default function CostTrackingPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex h-full grow flex-col">
                {/* Top Navigation */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 md:px-10 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-primary">
                            <span className="material-symbols-outlined text-3xl">payments</span>
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">CostTrack Pro</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white text-sm font-medium transition-colors" href="#">Dashboard</a>
                            <a className="text-primary text-sm font-semibold border-b-2 border-primary py-1" href="#">Interventions</a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white text-sm font-medium transition-colors" href="#">Inventory</a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white text-sm font-medium transition-colors" href="#">Financials</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 items-center">
                        <div className="relative hidden sm:block w-full max-w-xs">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none" placeholder="Search tickets or invoices..." type="text" />
                        </div>
                        <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold transition-all shadow-sm">
                            <span className="material-symbols-outlined text-sm">receipt_long</span>
                            <span>Bulk Invoice</span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                            <img alt="User Profile" src="https://randomuser.me/api/portraits/men/85.jpg" />
                        </div>
                    </div>
                </header>
                <main className="max-w-[1280px] mx-auto w-full p-4 md:p-8 space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Intervention Cost Tracking</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base">Detailed overview of material and labor expenses for all maintenance tickets.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                                <span className="material-symbols-outlined text-lg">calendar_month</span>
                                <span>Last 30 Days</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-lg">download</span>
                                <span>Export CSV</span>
                            </button>
                        </div>
                    </div>
                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Cost</p>
                                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                            </div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">$45,200.00</p>
                            <div className="mt-2 flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+12.5%</span>
                                <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">vs last month</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Material Expenses</p>
                                <span className="material-symbols-outlined text-slate-400">inventory_2</span>
                            </div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">$28,450.00</p>
                            <div className="mt-2 flex items-center gap-1 text-rose-600 dark:text-rose-400 text-sm font-semibold">
                                <span className="material-symbols-outlined text-sm">trending_down</span>
                                <span>-2.4%</span>
                                <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">vs last month</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Labor Expenses</p>
                                <span className="material-symbols-outlined text-slate-400">engineering</span>
                            </div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">$16,750.00</p>
                            <div className="mt-2 flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+18.1%</span>
                                <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">vs last month</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Invoicing</p>
                                <span className="material-symbols-outlined text-slate-400">pending_actions</span>
                            </div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">$12,300.00</p>
                            <div className="mt-2 flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>+5.2%</span>
                                <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">vs last month</span>
                            </div>
                        </div>
                    </div>
                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Monthly Spending Chart */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-lg">Operational Spending</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Monthly breakdown of intervention costs</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1">
                                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                                        <span className="text-xs text-slate-500">Actual</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                                        <span className="text-xs text-slate-500">Forecast</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 items-end gap-3 h-48 px-2">
                                <div className="space-y-2 group flex flex-col justify-end h-full">
                                    <div className="bg-primary/20 hover:bg-primary transition-colors rounded-t-md h-[40%]" title="$18k"></div>
                                    <p className="text-center text-xs font-bold text-slate-400">Jan</p>
                                </div>
                                <div className="space-y-2 group flex flex-col justify-end h-full">
                                    <div className="bg-primary/20 hover:bg-primary transition-colors rounded-t-md h-[65%]" title="$29k"></div>
                                    <p className="text-center text-xs font-bold text-slate-400">Feb</p>
                                </div>
                                <div className="space-y-2 group flex flex-col justify-end h-full">
                                    <div className="bg-primary/20 hover:bg-primary transition-colors rounded-t-md h-[55%]" title="$25k"></div>
                                    <p className="text-center text-xs font-bold text-slate-400">Mar</p>
                                </div>
                                <div className="space-y-2 group flex flex-col justify-end h-full">
                                    <div className="bg-primary/20 hover:bg-primary transition-colors rounded-t-md h-[85%]" title="$38k"></div>
                                    <p className="text-center text-xs font-bold text-slate-400">Apr</p>
                                </div>
                                <div className="space-y-2 group flex flex-col justify-end h-full">
                                    <div className="bg-primary hover:bg-primary/90 transition-colors rounded-t-md h-[95%]" title="$45k"></div>
                                    <p className="text-center text-xs font-bold text-slate-900 dark:text-white">May</p>
                                </div>
                                <div className="space-y-2 group flex flex-col justify-end h-full">
                                    <div className="bg-slate-200 dark:bg-slate-800 rounded-t-md h-[70%]" title="$32k (Est)"></div>
                                    <p className="text-center text-xs font-bold text-slate-400">Jun</p>
                                </div>
                            </div>
                        </div>
                        {/* Material vs Labor Trend */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-lg">Material vs. Labor</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Year-to-date efficiency trend</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-900 dark:text-white font-bold">$165,000 Total</p>
                                    <p className="text-emerald-500 text-xs font-medium">Efficiency +15%</p>
                                </div>
                            </div>
                            <div className="relative h-48 w-full">
                                <svg className="w-full h-full preserve-3d" viewBox="0 0 500 150" preserveAspectRatio="none">
                                    <path d="M0,130 C50,120 100,140 150,100 C200,60 250,90 300,50 C350,10 400,40 450,20 L500,10" fill="none" stroke="#2424eb" strokeLinecap="round" strokeWidth="4"></path>
                                    <path d="M0,140 C50,135 100,145 150,120 C200,95 250,110 300,80 C350,50 400,70 450,60 L500,55" fill="none" stroke="#94a3b8" strokeDasharray="5,5" strokeLinecap="round" strokeWidth="2"></path>
                                    <path d="M0,130 C50,120 100,140 150,100 C200,60 250,90 300,50 C350,10 400,40 450,20 L500,10 L500,150 L0,150 Z" fill="url(#grad1)" opacity="0.1"></path>
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#2424eb', stopOpacity: 1 }}></stop>
                                            <stop offset="100%" style={{ stopColor: '#2424eb', stopOpacity: 0 }}></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="flex justify-between mt-4 px-2">
                                    <span className="text-[10px] font-bold text-slate-400">Q1 2023</span>
                                    <span className="text-[10px] font-bold text-slate-400">Q2 2023</span>
                                    <span className="text-[10px] font-bold text-slate-400">Q3 2023</span>
                                    <span className="text-[10px] font-bold text-slate-400">Q4 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Detailed Table Section */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg">Detailed Intervention Costs</h3>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <select className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20">
                                    <option>All Statuses</option>
                                    <option>Invoiced</option>
                                    <option>Pending</option>
                                </select>
                                <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-900 dark:text-white text-sm font-bold rounded-lg transition-colors">
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket ID</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Intervention &amp; Client</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Material Cost</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Labor Cost</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total Cost</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {/* Row 1 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">#TK-8492</td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">HVAC System Repair</p>
                                            <p className="text-xs text-slate-500">Global Tech Park, Building A</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-right">$1,240.00</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-right">$450.00</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">$1,690.00</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                                                Invoiced
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-slate-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">#TK-8501</td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Main Entrance Door Sensor</p>
                                            <p className="text-xs text-slate-500">Retail Hub East</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-right">$215.00</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-right">$180.00</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">$395.00</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="bg-primary text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tight hover:bg-primary/90">
                                                Invoice
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">#TK-8512</td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Electrical Re-wiring</p>
                                            <p className="text-xs text-slate-500">Apartments Central</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-right">$4,500.00</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-right">$1,200.00</td>
                                        <td className="px-6 py-4 text-sm font-bold text-rose-600 dark:text-rose-400 text-right">$5,700.00</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full bg-rose-100 dark:bg-rose-900/30 px-2 py-1 text-xs font-bold text-rose-700 dark:text-rose-400">
                                                Over Budget
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-slate-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">more_horiz</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 4 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">#TK-8520</td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Emergency Pipe Repair</p>
                                            <p className="text-xs text-slate-500">Western Medical Plaza</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-right">$85.00</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-right">$350.00</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">$435.00</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="bg-primary text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tight hover:bg-primary/90">
                                                Invoice
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-sm text-slate-500">Showing 1 to 4 of 24 tickets</p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <button className="size-8 rounded bg-primary text-white text-xs font-bold flex items-center justify-center">1</button>
                                <button className="size-8 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center justify-center">2</button>
                                <button className="size-8 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center justify-center">3</button>
                                <button className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">© 2023 CostTrack Pro. All financial data encrypted.</p>
                        <div className="flex items-center gap-6">
                            <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Help Center</a>
                            <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Security</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

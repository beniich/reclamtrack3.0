'use client';

import { useState } from 'react';

export default function ServiceCategoriesPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="relative flex min-h-screen flex-col">
                {/* TopNavBar Component */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-10 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-primary">
                            <div className="size-8 bg-primary text-white rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">settings_suggest</span>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Intervention Manager</h2>
                        </div>
                        <label className="flex flex-col min-w-40 !h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-slate-400 flex border-none bg-slate-100 dark:bg-slate-900 items-center justify-center pl-4 rounded-l-lg">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input
                                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-0 border-none bg-slate-100 dark:bg-slate-900 focus:border-none h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-sm"
                                    placeholder="Search categories..."
                                    type="text"
                                />
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-1 justify-end gap-8 items-center">
                        <nav className="flex items-center gap-6">
                            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/dashboard">Dashboard</a>
                            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/complaints">Complaints</a>
                            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Interventions</a>
                            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Departments</a>
                            <a className="text-primary text-sm font-semibold border-b-2 border-primary py-4" href="#">Settings</a>
                        </nav>
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition-all"
                        >
                            <span className="material-symbols-outlined mr-2 text-lg">add</span>
                            <span className="truncate">Add Category</span>
                        </button>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/10"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop")' }}
                        ></div>
                    </div>
                </header>

                <main className="flex-1 px-10 py-8">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-6">
                        <a className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary" href="#">Admin</a>
                        <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                        <a className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary" href="#">Configuration</a>
                        <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                        <span className="text-slate-900 dark:text-white text-sm font-bold">Service Categories</span>
                    </div>

                    {/* Page Header & Actions */}
                    <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">Service Category Configuration</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">Define how complaints are categorized, prioritized, and routed to technical teams.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800">
                                <span className="material-symbols-outlined text-lg">download</span>
                                Export CSV
                            </button>
                            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20">
                                <span className="material-symbols-outlined text-lg">reorder</span>
                                Reorder List
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Categories</p>
                                <span className="material-symbols-outlined text-primary">category</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">32</p>
                                <span className="text-green-600 text-xs font-bold bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">+4 this month</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Active Status</p>
                                <span className="material-symbols-outlined text-green-500">check_circle</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">28</p>
                                <span className="text-slate-400 text-xs font-medium">87.5% operative</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Unassigned</p>
                                <span className="material-symbols-outlined text-amber-500">warning</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">3</p>
                                <span className="text-amber-600 text-xs font-bold bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">Requires attention</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Urgent Types</p>
                                <span className="material-symbols-outlined text-red-500">priority_high</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">6</p>
                                <span className="text-red-600 text-xs font-bold bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">High Response</span>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Table Container */}
                    <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        {/* Table Controls */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined">filter_list</span>
                                    Filter by:
                                </div>
                                <select className="form-select text-sm rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-primary p-2">
                                    <option>All Departments</option>
                                    <option>Facilities Management</option>
                                    <option>IT Support</option>
                                    <option>Security</option>
                                    <option>Plumbing</option>
                                    <option>Electrical</option>
                                </select>
                                <select className="form-select text-sm rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-primary p-2">
                                    <option>All Priorities</option>
                                    <option>Urgent</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-4 h-9 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    Bulk Status Update
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-12">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category Name</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Department</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Default Priority</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {/* Row 1 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                                    <span className="material-symbols-outlined text-lg">water_drop</span>
                                                </div>
                                                <span className="font-semibold text-slate-900 dark:text-white">Water Leak</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Facilities - Plumbing</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                                                <span className="size-1.5 rounded-full bg-orange-500"></span>
                                                High
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-primary">
                                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-primary rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                                                    <span className="material-symbols-outlined text-lg">bolt</span>
                                                </div>
                                                <span className="font-semibold text-slate-900 dark:text-white">Power Outage</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Facilities - Electrical</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                                <span className="size-1.5 rounded-full bg-red-500"></span>
                                                Urgent
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-primary">
                                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-primary rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                                    <span className="material-symbols-outlined text-lg">elevator</span>
                                                </div>
                                                <span className="font-semibold text-slate-900 dark:text-white">Elevator Stuck</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Security & Maintenance</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                                <span className="size-1.5 rounded-full bg-red-500"></span>
                                                Urgent
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-primary">
                                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-primary rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 4 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600">
                                                    <span className="material-symbols-outlined text-lg">dns</span>
                                                </div>
                                                <span className="font-semibold text-slate-900 dark:text-white">Network Outage</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="italic text-amber-600 text-sm">Not Assigned</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                                <span className="size-1.5 rounded-full bg-blue-500"></span>
                                                Medium
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-slate-200 dark:bg-slate-700">
                                                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-primary rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-sm text-slate-500">Showing 4 of 32 categories</span>
                            <div className="flex gap-1">
                                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold">1</button>
                                <button className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900">2</button>
                                <button className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900">3</button>
                                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Slide-over Drawer */}
                <div className={`fixed inset-y-0 right-0 w-96 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-[60] transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {/* Drawer Content Header */}
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Category</h3>
                        <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    {/* Drawer Body */}
                    <div className="p-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Category Name</label>
                            <input className="form-input rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-900 p-2" placeholder="e.g. HVAC Issue" type="text" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Technical Department</label>
                            <select className="form-select rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-900 p-2">
                                <option>Select department...</option>
                                <option>Facilities Management</option>
                                <option>IT Support</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Default Priority</label>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:border-primary">
                                    <input className="text-primary focus:ring-primary" name="priority" type="radio" />
                                    <span className="text-sm font-medium">Urgent</span>
                                </label>
                                <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:border-primary">
                                    <input className="text-primary focus:ring-primary" name="priority" type="radio" />
                                    <span className="text-sm font-medium">High</span>
                                </label>
                                <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:border-primary">
                                    <input className="text-primary focus:ring-primary" name="priority" type="radio" />
                                    <span className="text-sm font-medium">Medium</span>
                                </label>
                                <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:border-primary">
                                    <input className="text-primary focus:ring-primary" name="priority" type="radio" />
                                    <span className="text-sm font-medium">Low</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Drawer Footer */}
                    <div className="absolute bottom-0 w-full p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-3">
                        <button onClick={() => setIsDrawerOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-200 font-bold">Cancel</button>
                        <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold">Save Category</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

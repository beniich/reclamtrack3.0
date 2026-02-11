'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UsersPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Note: Header is handled by the layout usually, but the HTML provided includes a specific header. 
                I will include the header here as requested, but if it duplicates the layout header, 
                we might need to adjust layout later. For now, I follow the HTML structure. */}

            {/* Navigation Bar from HTML */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">account_balance</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">Complaints System</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Interventions</a>
                        <a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">Users</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Reports</a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                        <input className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400" placeholder="Search system..." type="text" />
                    </div>
                    <div
                        className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7XXuS_4dgIRSbgQo7054yJ4FPcQZ_VnRbSXsM7oaNt5PFmQlldHA2stZCAClvS68emwdruY1mjgPUwX_EiipmtA_1-L8ozNjF9kUXDGlJADYywJ71e8G5fgBtUZZzsQDdcktgoSlvB5iPKixRBBhzWwm8Pah9oUoe3PxSAojnVd3SN5T09s44oYPKngGaemTwvATV_ZLV-RMgBi0vGEoRHq-xisD58g5cPU1XtZM641M91sSd3CBkY1ZvZ-cA8sYTozhgGLhn7R2j')" }}
                    ></div>
                </div>
            </header>

            <main className="flex flex-1 justify-center py-8 px-4 md:px-10 lg:px-40">
                <div className="flex flex-col max-w-[1200px] flex-1">
                    {/* Page Header */}
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">User & Roles Management</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base">Manage access levels and profiles for platform operators and field staff.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                Filter
                            </button>
                            <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-lg">person_add</span>
                                Add User
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex gap-8">
                            <a className="border-b-2 border-primary text-primary pb-3 font-bold text-sm" href="#">All Staff</a>
                            <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 font-medium text-sm hover:text-slate-700 transition-colors" href="#">Administrators</a>
                            <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 font-medium text-sm hover:text-slate-700 transition-colors" href="#">Operators</a>
                            <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 font-medium text-sm hover:text-slate-700 transition-colors" href="#">Field Technicians</a>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">User Details</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Last Session</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {/* Row 1 */}
                                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">AR</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">Alex Rivera</span>
                                                    <span className="text-xs text-slate-500">alex@system.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Admin</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                <span className="text-sm">Active</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-500">2 mins ago</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary hover:text-blue-700 text-xs font-bold uppercase tracking-wide mr-4">Edit Permissions</button>
                                            <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs">JS</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">Jordan Smith</span>
                                                    <span className="text-xs text-slate-500">j.smith@system.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Operator</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                <span className="text-sm">Active</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-500">1 hour ago</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary hover:text-blue-700 text-xs font-bold uppercase tracking-wide mr-4">Edit Permissions</button>
                                            <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xs">CC</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">Casey Chen</span>
                                                    <span className="text-xs text-slate-500">casey.c@system.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-600">Technician</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                                <span className="text-sm text-slate-500">Inactive</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-500">3 days ago</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary hover:text-blue-700 text-xs font-bold uppercase tracking-wide mr-4">Edit Permissions</button>
                                            <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                                        </td>
                                    </tr>
                                    {/* Row 4 */}
                                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">ML</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">Morgan Lee</span>
                                                    <span className="text-xs text-slate-500">mlee@system.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Operator</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                <span className="text-sm font-medium">Online Now</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-500">Just now</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary hover:text-blue-700 text-xs font-bold uppercase tracking-wide mr-4">Edit Permissions</button>
                                            <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                                        </td>
                                    </tr>
                                    {/* Row 5 */}
                                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xs">RT</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">Riley Taylor</span>
                                                    <span className="text-xs text-slate-500">riley@system.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-600">Technician</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                <span className="text-sm">Active</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-500">5 hours ago</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary hover:text-blue-700 text-xs font-bold uppercase tracking-wide mr-4">Edit Permissions</button>
                                            <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                            <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">5</span> of <span className="font-bold text-slate-900 dark:text-white">42</span> staff members</p>
                            <div className="flex gap-1">
                                <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="px-3.5 py-1.5 rounded-lg bg-primary text-white font-bold text-sm">1</button>
                                <button className="px-3.5 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium">2</button>
                                <button className="px-3.5 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium">3</button>
                                <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Role Info Cards */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-primary">security</span>
                                <h3 className="font-bold text-sm">Administrators</h3>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Full system access including financial records, system configuration, and data exports.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-slate-700">support_agent</span>
                                <h3 className="font-bold text-sm">Operators</h3>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Can manage complaints, dispatch interventions, and communicate with customers.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-orange-500">engineering</span>
                                <h3 className="font-bold text-sm">Technicians</h3>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Restricted to mobile interface for resolving field interventions and reporting status.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto py-6 px-10 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs">
                © 2023 Complaints & Intervention System. Admin Terminal V 2.1.0
            </footer>
        </div>
    );
}

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Types
type UserRole = 'admin' | 'operator' | 'technician' | 'support';
type UserStatus = 'active' | 'inactive' | 'suspended';

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    lastActive: string;
    avatar: string;
}

// Mock Data
const mockUsers: User[] = [
    { id: '1', name: 'Alex Rivera', email: 'alex@system.com', role: 'admin', status: 'active', lastActive: '2 mins ago', avatar: 'AR' },
    { id: '2', name: 'Jordan Smith', email: 'j.smith@system.com', role: 'operator', status: 'active', lastActive: '1 hour ago', avatar: 'JS' },
    { id: '3', name: 'Casey Chen', email: 'casey.c@system.com', role: 'technician', status: 'inactive', lastActive: '3 days ago', avatar: 'CC' },
    { id: '4', name: 'Morgan Lee', email: 'mlee@system.com', role: 'operator', status: 'active', lastActive: 'Just now', avatar: 'ML' },
    { id: '5', name: 'Riley Taylor', email: 'riley@system.com', role: 'technician', status: 'active', lastActive: '5 hours ago', avatar: 'RT' },
    { id: '6', name: 'Jamie Fox', email: 'j.fox@system.com', role: 'support', status: 'suspended', lastActive: '2 weeks ago', avatar: 'JF' },
];

export default function UsersPage() {
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // Filtering
    const filteredUsers = useMemo(() => {
        return mockUsers.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = selectedRole === 'all' || user.role === selectedRole;
            return matchesSearch && matchesRole;
        });
    }, [searchQuery, selectedRole]);

    // Role Colors Helper
    const getRoleBadge = (role: UserRole) => {
        switch (role) {
            case 'admin': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Admin</span>;
            case 'operator': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Operator</span>;
            case 'technician': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-600">Technician</span>;
            case 'support': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-600">Support</span>;
        }
    };

    const getStatusIndicator = (status: UserStatus) => {
        switch (status) {
            case 'active': return (
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active</span>
                </div>
            );
            case 'inactive': return (
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="text-sm text-slate-500">Inactive</span>
                </div>
            );
            case 'suspended': return (
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span className="text-sm text-red-500 font-medium">Suspended</span>
                </div>
            );
        }
    };

    const getAvatarColor = (role: UserRole) => {
        switch (role) {
            case 'admin': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
            case 'operator': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
            case 'technician': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
            case 'support': return 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400';
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Navigation Bar */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">account_balance</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">ReclamTrack</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Dashboard</Link>
                        <Link href="/complaints/list" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Complaints</Link>
                        <Link href="/users" className="text-primary text-sm font-bold border-b-2 border-primary pb-1">Users</Link>
                        <Link href="/reports" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Reports</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 items-center gap-2 border border-transparent focus-within:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                        <input
                            type="text"
                            placeholder="Search system..."
                            className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400 p-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=2424eb&color=fff" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            <main className="flex flex-1 justify-center py-8 px-4 md:px-10 lg:px-40">
                <div className="flex flex-col max-w-[1200px] flex-1 w-full relative">
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
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20"
                            >
                                <span className="material-symbols-outlined text-lg">person_add</span>
                                Add User
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
                        <div className="flex gap-8 min-w-max">
                            <button
                                onClick={() => setSelectedRole('all')}
                                className={`border-b-2 pb-3 font-bold text-sm transition-colors ${selectedRole === 'all' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                            >
                                All Staff
                            </button>
                            <button
                                onClick={() => setSelectedRole('admin')}
                                className={`border-b-2 pb-3 font-medium text-sm transition-colors ${selectedRole === 'admin' ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                            >
                                Administrators
                            </button>
                            <button
                                onClick={() => setSelectedRole('operator')}
                                className={`border-b-2 pb-3 font-medium text-sm transition-colors ${selectedRole === 'operator' ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                            >
                                Operators
                            </button>
                            <button
                                onClick={() => setSelectedRole('technician')}
                                className={`border-b-2 pb-3 font-medium text-sm transition-colors ${selectedRole === 'technician' ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                            >
                                Field Technicians
                            </button>
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
                                    {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs ${getAvatarColor(user.role)}`}>
                                                        {user.avatar}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</span>
                                                        <span className="text-xs text-slate-500">{user.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getRoleBadge(user.role)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusIndicator(user.status)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{user.lastActive}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="invisible group-hover:visible flex items-center justify-end gap-2">
                                                    <button className="text-primary hover:text-blue-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded hover:bg-primary/5 transition-colors">Edit</button>
                                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                                        <span className="material-symbols-outlined text-lg block">more_vert</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                                No users found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">{filteredUsers.length}</span> of <span className="font-bold text-slate-900 dark:text-white">{mockUsers.length}</span> staff members
                            </p>
                            <div className="flex gap-1">
                                <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400 disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined text-sm block">chevron_left</span>
                                </button>
                                <button className="px-3.5 py-1.5 rounded-lg bg-primary text-white font-bold text-sm">1</button>
                                <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400 disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined text-sm block">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Role Info Cards */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-primary">security</span>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Administrators</h3>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Full system access including financial records, system configuration, and data exports.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">support_agent</span>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Operators</h3>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Can manage complaints, dispatch interventions, and communicate with customers.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-orange-500">engineering</span>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Technicians</h3>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Restricted to mobile interface for resolving field interventions and reporting status.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New User</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                                <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" placeholder="e.g. John Doe" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                                <input type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" placeholder="e.g. john@system.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role Assignment</label>
                                <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                    <option value="operator">Operator</option>
                                    <option value="technician">Technician</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Cancel</button>
                            <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20">Create Account</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Bell, Search, Settings, User, LogOut } from 'lucide-react';
import { AnimatedLogo } from '@/components/shared/AnimatedLogo';

interface HeaderProps {
    showSearch?: boolean;
    breadcrumbs?: { label: string; href: string }[];
}

export function Header({ showSearch = true, breadcrumbs }: HeaderProps) {
    const { user, logout } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="h-16 border-b border-slate-200 dark:border-orange-500/10 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
            {/* Logo & Breadcrumbs */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <AnimatedLogo size={36} />
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold leading-none tracking-tight text-slate-900 dark:text-white">
                                CloudIndustry LTD
                            </h1>
                            <span className="text-[10px] uppercase tracking-widest text-indigo-600 dark:text-orange-400 font-black">
                                Industrial Intelligence
                            </span>
                        </div>
                    </Link>
                </div>


                {breadcrumbs && (
                    <nav className="hidden md:flex items-center gap-2 text-sm">
                        {breadcrumbs.map((crumb, i) => (
                            <div key={i} className="flex items-center gap-2">
                                {i > 0 && <span className="text-gray-400">/</span>}
                                <Link
                                    href={crumb.href}
                                    className="text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            </div>
                        ))}
                    </nav>
                )}
            </div>

            {/* Search Bar */}
            {showSearch && (
                <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 w-80 relative group focus-within:ring-2 focus-within:ring-indigo-500/20 dark:focus-within:ring-orange-500/20 transition-all">
                    <Search className="text-slate-400 w-4 h-4 absolute left-3 group-focus-within:text-indigo-500 dark:group-focus-within:text-orange-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-sm w-full pl-8 placeholder:text-gray-400 outline-none text-slate-900 dark:text-white"
                        placeholder="Search complaint ID, location..."
                    />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition-colors group">
                    <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-orange-400" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                </button>

                <Link href="/settings" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors group">
                    <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-orange-400" />
                </Link>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">{user?.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">{user?.role}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-5 h-5 text-primary" />
                        )}
                    </div>
                    {/* Bouton de Déconnexion */}
                    <button 
                        onClick={() => {
                            logout();
                            window.location.href = '/login';
                        }} 
                        className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Se déconnecter"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}

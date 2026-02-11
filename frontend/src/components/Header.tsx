'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useTranslations } from 'next-intl';
import { LogOut, ChevronDown, Shield, Truck, CalendarDays, MessagesSquare, Settings as SettingsIcon, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Header() {
    const { user, logout } = useAuthStore();
    const t = useTranslations('Navbar');

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0a0f] px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-3">
                    <div className="bg-primary p-1.5 rounded-lg text-white">
                        <span className="material-symbols-outlined block">account_balance</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold leading-none tracking-tight text-slate-900 dark:text-white">ReclamTrack</h1>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{t('technicalServices')}</span>
                    </div>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
                {user ? (
                    <>
                        <div className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                            <Link href="/dashboard" className="hover:text-primary transition-colors">{t('dashboard')}</Link>
                            <Link href="/complaints/list" className="hover:text-primary transition-colors">{t('complaints')}</Link>
                            <Link href="/teams" className="hover:text-primary transition-colors">{t('teams')}</Link>
                            <Link href="/planning" className="hover:text-primary transition-colors">{t('planning')}</Link>
                            <Link href="/map" className="hover:text-primary transition-colors">{t('map')}</Link>
                            <Link href="/analytics" className="hover:text-primary transition-colors">{t('analytics')}</Link>
                            <Link href="/system-info" className="hover:text-primary transition-colors">{t('systemInfo')}</Link>

                            {/* More Menu */}
                            <div className="relative group">
                                <button className="hover:text-primary transition-colors flex items-center gap-1">
                                    {t('more')}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <Link href="/admin" className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg">
                                        <div className="flex items-center gap-2">
                                            <Shield className="text-sm w-4 h-4" />
                                            <span>{t('admin')}</span>
                                        </div>
                                    </Link>
                                    <Link href="/fleet" className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Truck className="text-sm w-4 h-4" />
                                            <span>{t('fleet')}</span>
                                        </div>
                                    </Link>
                                    <Link href="/roster" className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors last:rounded-b-lg">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="text-sm w-4 h-4" />
                                            <span>{t('roster')}</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />
                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

                            <Link href="/messages" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-primary transition-colors" title={t('messages')}>
                                <MessagesSquare className="w-5 h-5" />
                            </Link>
                            <Link href="/settings" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-primary transition-colors" title={t('settings')}>
                                <SettingsIcon className="w-5 h-5" />
                            </Link>

                            <div className="text-right hidden sm:block ml-2">
                                <p className="text-xs font-semibold text-slate-900 dark:text-white">{user.email.split('@')[0]}</p>
                                <p className="text-[10px] text-slate-500 uppercase">{user.role}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-red-600 transition-colors"
                                title={t('logout')}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link href="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary">
                            {t('login')}
                        </Link>
                        <Link href="/register" className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            {t('register')}
                        </Link>
                    </div>
                )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
                <LanguageSwitcher />
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl lg:hidden flex flex-col p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    {user ? (
                        <>
                            <div className="space-y-2">
                                <Link href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('dashboard')}</Link>
                                <Link href="/complaints/list" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('complaints')}</Link>
                                <Link href="/teams" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('teams')}</Link>
                                <Link href="/planning" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('planning')}</Link>
                                <Link href="/map" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('map')}</Link>
                                <Link href="/analytics" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('analytics')}</Link>
                                <Link href="/system-info" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('systemInfo')}</Link>
                            </div>
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
                                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                    <SettingsIcon size={18} />
                                    <span>{t('settings')}</span>
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
                                >
                                    <LogOut size={18} />
                                    <span>{t('logout')}</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link href="/login" className="px-4 py-2 text-center border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => setIsMenuOpen(false)}>
                                {t('login')}
                            </Link>
                            <Link href="/register" className="px-4 py-2 text-center bg-primary text-white rounded-lg hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
                                {t('register')}
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

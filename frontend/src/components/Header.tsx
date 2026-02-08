import Link from 'next/link';
import { useAuthStore } from '~/store/authStore';
import { LogOut } from 'lucide-react';

export default function Header() {
    const { user, logout } = useAuthStore();

    return (
        <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-3">
                    <div className="bg-primary p-1.5 rounded-lg text-white">
                        <span className="material-symbols-outlined block">account_balance</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold leading-none tracking-tight text-slate-900">ReclamTrack</h1>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Services Techniques</span>
                    </div>
                </Link>
            </div>

            <nav className="flex items-center space-x-6">
                {user ? (
                    <>
                        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
                            <Link href="/dashboard" className="hover:text-primary transition-colors">Tableau de Bord</Link>
                            <Link href="/complaints/list" className="hover:text-primary transition-colors">Réclamations</Link>
                            <Link href="/teams" className="hover:text-primary transition-colors">Équipes</Link>
                            <Link href="/planning" className="hover:text-primary transition-colors">Planning</Link>
                            <Link href="/map" className="hover:text-primary transition-colors">Carte</Link>
                            <Link href="/analytics" className="hover:text-primary transition-colors">Analytique</Link>

                            {/* More Menu */}
                            <div className="relative group">
                                <button className="hover:text-primary transition-colors flex items-center gap-1">
                                    Plus
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <Link href="/admin" className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                                            <span>Administration</span>
                                        </div>
                                    </Link>
                                    <Link href="/fleet" className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                                            <span>Flotte</span>
                                        </div>
                                    </Link>
                                    <Link href="/roster" className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors last:rounded-b-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">calendar_view_week</span>
                                            <span>Planning Équipes</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="h-6 w-px bg-slate-200 mx-2"></div>

                        <div className="flex items-center gap-3">
                            <Link href="/messages" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-primary transition-colors" title="Messages">
                                <span className="material-symbols-outlined text-[20px]">chat</span>
                            </Link>
                            <Link href="/settings" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-primary transition-colors" title="Paramètres">
                                <span className="material-symbols-outlined text-[20px]">settings</span>
                            </Link>

                            <div className="text-right hidden sm:block ml-2">
                                <p className="text-xs font-semibold text-slate-900">{user.email.split('@')[0]}</p>
                                <p className="text-[10px] text-slate-500 uppercase">{user.role}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-red-600 transition-colors"
                                title="Déconnexion"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-primary">
                            Connexion
                        </Link>
                        <Link href="/register" className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            Inscription
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

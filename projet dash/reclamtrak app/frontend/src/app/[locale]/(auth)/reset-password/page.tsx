'use client';

import { Link } from '@/i18n/navigation';
import axios from 'axios';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setError('Token de réinitialisation manquant.');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas.');
            return;
        }

        if (password.length < 8) {
            toast.error('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.post('/api/auth/reset-password', { token, password });
            setSuccess(true);
            toast.success('Mot de passe mis à jour !');
        } catch (error: any) {
            console.error('Reset password error:', error);
            const message = error.response?.data?.error || 'Lien invalide ou expiré.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
            <div className="mb-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 text-white">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Choisissez votre nouveau mot de passe sécurisé.
                </p>
            </div>

            <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
                {success ? (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">Réussite !</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.
                            </p>
                        </div>
                        <Link
                            href="/login"
                            className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg text-center transition-all"
                        >
                            Se connecter
                        </Link>
                    </div>
                ) : error ? (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold text-red-600">Lien invalide</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {error}
                            </p>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="block w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3.5 rounded-lg text-center transition-all"
                        >
                            Demander un nouveau lien
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="password">
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="8 caractères minimum"
                                    className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="confirm">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    id="confirm"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Répétez le mot de passe"
                                    className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !password || password !== confirmPassword}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading && <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>}
                            <span>{loading ? 'Mise à jour...' : 'Réinitialiser le mot de passe'}</span>
                        </button>
                    </form>
                )}
            </div>

            <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
                © 2024 ReclamTrack Solutions. Tous droits réservés.
            </p>
        </div>
    );
}

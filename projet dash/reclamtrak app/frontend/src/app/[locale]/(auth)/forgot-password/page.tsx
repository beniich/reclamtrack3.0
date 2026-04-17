'use client';

import { Link } from '@/i18n/navigation';
import axios from 'axios';
import { ArrowLeft, Mail, Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('/api/auth/forgot-password', { email });
            setSubmitted(true);
            toast.success('Lien envoyé ! Vérifiez votre boîte mail.');
        } catch (error: any) {
            console.error('Forgot password error:', error);
            const message = error.response?.data?.error || 'Une erreur est survenue.';
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
                <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-xs">
                    Entrez votre adresse email pour recevoir un lien de réinitialisation.
                </p>
            </div>

            <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
                {submitted ? (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <Send className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">Email envoyé !</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Si un compte correspond à <b>{email}</b>, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
                            </p>
                        </div>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à la connexion
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Adresse Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                            <span>{loading ? 'Envoi...' : 'Envoyer le lien'}</span>
                        </button>

                        <div className="pt-2 text-center">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary text-sm transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Retour à la connexion
                            </Link>
                        </div>
                    </form>
                )}
            </div>

            <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
                © 2024 ReclamTrack Solutions. Tous droits réservés.
            </p>
        </div>
    );
}

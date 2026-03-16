'use client';

import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/store/authStore';
import { GoogleLogin } from '@react-oauth/google';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const locale = useLocale();
    const router = useRouter();

    // Utilisation du store pour la gestion de l'état global
    const { login, googleLogin } = useAuthStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast.success('Connexion réussie !');

            // Redirection avec locale pour garder le contexte i18n
            setTimeout(() => {
                router.push(`/${locale}/dashboard`);
            }, 100);

        } catch (error: any) {
            console.error('Login error:', error);
            const message = error.response?.data?.error || error.response?.data?.message || 'Erreur de connexion. Veuillez vérifier vos identifiants.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
        try {
            if (credentialResponse.credential) {
                await googleLogin(credentialResponse.credential);
                toast.success('Connexion Google réussie !');
                setTimeout(() => {
                    router.push(`/${locale}/dashboard`);
                }, 100);
            }
        } catch (error: any) {
            console.error('Google login error:', error);
            const message = error.response?.data?.error || error.response?.data?.message || 'Échec de la connexion Google';
            toast.error(message);
        }
    };

    const handleGoogleError = () => {
        toast.error('Échec de la connexion Google');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-brand-midnight font-display selection:bg-cyan-500 selection:text-white">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none"></div>

            {/* Logo / Branding Header */}
            <div className="mb-8 flex flex-col items-center gap-4">
                <img
                    src="/logo.png"
                    alt="ReclamTrack Logo"
                    className="h-20 w-20 rounded-2xl object-cover shadow-2xl shadow-cyan-500/30"
                />
                <div className="text-center">
                    <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic" suppressHydrationWarning>ReclamTrack</h1>
                    <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black mt-1">Intervention Management System</p>
                </div>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-[440px] glass-card rounded-[2rem] overflow-hidden">
                {/* Header badge */}
                <div className="w-full px-8 pt-8 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                        Authentification Sécurisée
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tight text-white">Connexion</h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Accès Autorisé Requis</p>
                </div>


                <div className="p-8">
                    <div className="mb-6 flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="filled_blue"
                            shape="pill"
                            text="signin_with"

                        />
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Ou continuer avec</span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Username/Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="identifier">Identifiant ou Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl notranslate" translate="no">mail</span>
                                <input
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                                    id="identifier"
                                    name="identifier"
                                    placeholder="Entrez votre email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Mot de passe</label>
                                <Link className="text-xs font-semibold text-primary hover:underline" href="/forgot-password">Mot de passe oublié ?</Link>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl notranslate" translate="no">lock</span>
                                <input
                                    className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                                    id="password"
                                    name="password"
                                    placeholder="Entrez votre mot de passe"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-xl notranslate" translate="no">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                className="w-4 h-4 text-primary bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded focus:ring-primary"
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="ml-2 block text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">Rester connecté</label>
                        </div>

                        {/* Sign In Button */}
                        <button
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                    <span>Connexion...</span>
                                </>
                            ) : (
                                <>
                                    <span>Se connecter</span>
                                    <span className="material-symbols-outlined text-lg notranslate" translate="no">login</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security Footer inside card */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                        <span className="material-symbols-outlined text-sm notranslate" translate="no">encrypted</span>
                        <span className="text-xs">Connexion chiffrée de bout en bout</span>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <a className="hover:text-primary transition-colors" href="#">Politique de sécurité</a>
                <a className="hover:text-primary transition-colors" href="#">Support</a>
                <a className="hover:text-primary transition-colors" href="#">Confidentialité</a>
            </div>

            <div className="mt-8 text-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">Pas encore de compte ? </span>
                <Link href="/register" className="text-primary hover:underline font-semibold">
                    Créer un compte
                </Link>
            </div>

            <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
                © 2024 ReclamTrack Solutions. Tous droits réservés.
            </p>
        </div>
    );
}

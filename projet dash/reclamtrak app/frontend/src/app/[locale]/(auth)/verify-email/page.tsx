'use client';

import { Link } from '@/i18n/navigation';
import axios from 'axios';
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const verificationAttempted = useRef(false);

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Token de vérification manquant.');
            return;
        }

        if (verificationAttempted.current) return;
        verificationAttempted.current = true;

        const verifyEmail = async () => {
            try {
                const response = await axios.post('/api/auth/verify-email', { token });
                setStatus('success');
                setMessage(response.data.message || 'Votre email a été vérifié avec succès !');
                toast.success('Email vérifié !');
            } catch (error: any) {
                console.error('Email verification error:', error);
                setStatus('error');
                setMessage(error.response?.data?.error || 'Le lien de vérification est invalide ou a expiré.');
                toast.error('Échec de la vérification.');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
            <div className="mb-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 text-white">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold">Vérification Email</h1>
            </div>

            <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                {status === 'loading' && (
                    <div className="space-y-6 py-4">
                        <div className="flex justify-center">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">
                            Vérification de votre adresse email en cours...
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">C'est fait !</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {message}
                            </p>
                        </div>
                        <Link
                            href="/login"
                            className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg text-center transition-all"
                        >
                            Aller à la connexion
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold text-red-600">Erreur</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {message}
                            </p>
                        </div>
                        <div className="space-y-3">
                            <Link
                                href="/login"
                                className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg text-center transition-all"
                            >
                                Retour à la connexion
                            </Link>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                Le lien a peut-être déjà été utilisé ou est trop ancien.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
                © 2024 ReclamTrack Solutions. Tous droits réservés.
            </p>
        </div>
    );
}

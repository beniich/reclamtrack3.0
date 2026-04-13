'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Shield, ShieldCheck, QrCode, Lock, AlertTriangle, Download, Trash2, CheckCircle, RefreshCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function SecuritySettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [settingUp, setSettingUp] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [totp, setTotp] = useState('');
    const [backupCodes, setBackupCodes] = useState<string[]>([]);

    const fetchUser = async () => {
        try {
            const res = await apiClient.get('/api/auth/me');
            setUser(res.data);
        } catch (err) {
            console.error('Failed to fetch user', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const startMfaSetup = async () => {
        try {
            setSettingUp(true);
            const res = await apiClient.post('/api/auth/mfa/setup');
            setQrCode(res.data.qrCode);
            setSecret(res.data.secret);
        } catch (err) {
            toast.error('Erreur initialisation MFA');
            setSettingUp(false);
        }
    };

    const confirmMfa = async () => {
        try {
            const res = await apiClient.post('/api/auth/mfa/enable', { secret, token: totp });
            setBackupCodes(res.data.backupCodes);
            toast.success('MFA Activé avec succès !');
            fetchUser();
            setSettingUp(false);
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Code invalide');
        }
    };

    const disableMfa = async () => {
        const token = prompt('Entrez votre code MFA actuel pour confirmer la désactivation :');
        if (!token) return;

        try {
            await apiClient.post('/api/auth/mfa/disable', { token });
            toast.success('MFA Désactivé');
            fetchUser();
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Erreur lors de la désactivation');
        }
    };

    if (loading) return <div className="flex justify-center p-12"><LoadingSpinner /></div>;

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 bg-[#0b0f0a] min-h-screen">
            <div className="border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-black text-white flex items-center gap-3">
                    <Shield className="text-emerald-500" />
                    Sécurité Haute Disponibilité
                </h1>
                <p className="text-sm text-zinc-500 mt-2">Gérez les accès avancés et la conformité SOC 2 de votre compte.</p>
            </div>

            {/* MFA STATUS CARD */}
            <div className={`p-8 rounded-3xl border ${user?.mfaEnabled ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-zinc-900 bg-zinc-950'} transition-all`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${user?.mfaEnabled ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-zinc-600'}`}>
                            <Lock size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Authentification à deux facteurs (2FA)</h2>
                            <p className="text-sm text-zinc-500 mt-1">
                                {user?.mfaEnabled 
                                    ? 'Votre compte est protégé par une validation TOTP obligatoire.' 
                                    : 'Ajoutez une couche de sécurité supplémentaire via Google Authenticator ou Authy.'}
                            </p>
                        </div>
                    </div>
                    {user?.mfaEnabled ? (
                        <button onClick={disableMfa} className="px-6 py-2.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl text-xs font-black uppercase hover:bg-rose-500 hover:text-white transition-all">
                            Désactiver 2FA
                        </button>
                    ) : (
                        <button onClick={startMfaSetup} disabled={settingUp} className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase hover:scale-105 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)]">
                            Configurer 2FA
                        </button>
                    )}
                </div>

                {/* SETUP STEP (IF ACTIVE) */}
                {settingUp && (
                    <div className="mt-10 p-8 border border-zinc-900 bg-black rounded-3xl space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="bg-white p-3 rounded-2xl">
                                <img src={qrCode} alt="MFA QR Code" className="w-48 h-48" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                     <QrCode className="text-emerald-500" />
                                     Étape 1 : Scannez le QR Code
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Ouvrez votre application d'authentification et scannez ce code. Si vous ne pouvez pas scanner, utilisez cette clé secrète :
                                </p>
                                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl font-mono text-xs text-emerald-400 break-all select-all">
                                    {secret}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border-t border-zinc-900 pt-8">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <CheckCircle className="text-emerald-500" />
                                Étape 2 : Vérifiez la connexion
                            </h3>
                            <div className="flex gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Entrez le code à 6 chiffres"
                                    maxLength={6}
                                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono text-center tracking-[0.5em] focus:border-emerald-500 outline-none"
                                    value={totp}
                                    onChange={(e) => setTotp(e.target.value)}
                                />
                                <button onClick={confirmMfa} className="px-8 bg-emerald-500 text-white rounded-xl font-black uppercase text-xs hover:bg-emerald-400 transition-all">
                                    Activer
                                </button>
                                <button onClick={() => setSettingUp(false)} className="px-8 bg-zinc-900 text-zinc-500 rounded-xl font-black uppercase text-xs hover:text-white transition-all">
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* BACKUP CODES (IF JUST ENABLED) */}
                {backupCodes.length > 0 && (
                    <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="text-amber-500" />
                            <h4 className="font-bold text-amber-500">Codes de secours (URGENT)</h4>
                        </div>
                        <p className="text-xs text-amber-500/70">
                            Enregistrez ces codes dans un endroit sûr. Ils sont le seul moyen d'accéder à votre compte si vous perdez votre téléphone.
                        </p>
                        <div className="grid grid-cols-2 gap-2 font-mono text-sm text-white">
                            {backupCodes.map((code, idx) => (
                                <div key={idx} className="p-2 bg-black/40 rounded-lg text-center">{code}</div>
                            ))}
                        </div>
                        <button onClick={() => window.print()} className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-500 hover:text-amber-400 transition-colors">
                            <Download size={12} /> Télécharger / Imprimer les codes
                        </button>
                    </div>
                )}
            </div>

            {/* PASSWORD HISTORY POLICY (SOC 2) */}
            <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-950">
                 <div className="flex gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-zinc-600 flex items-center justify-center">
                        <RefreshCcw size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight">Politique de Rotation</h2>
                        <p className="text-sm text-zinc-500 mt-1">Conformément aux normes CC6.1, l'historique de vos mots de passe est surveillé.</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs py-3 border-b border-zinc-900/50">
                        <span className="text-zinc-500">Dernier changement</span>
                        <span className="text-zinc-300 font-bold">{user?.passwordChangedAt ? new Date(user.passwordChangedAt).toLocaleDateString() : 'Inconnu'}</span>
                    </div>
                    <div className="flex justify-between text-xs py-3 border-b border-zinc-900/50">
                        <span className="text-zinc-500">Historique conservé</span>
                        <span className="text-emerald-500 font-bold">5 derniers hashs (Actif)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

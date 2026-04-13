'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Monitor, Smartphone, Globe, ShieldX, LogOut, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ActiveSessionsPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSessions = async () => {
        try {
            const res = await apiClient.get('/api/auth/sessions');
            setSessions(res.data || []);
        } catch (err) {
            console.error('Failed to load active sessions', err);
            toast.error('Erreur lors de la récupération des sessions');
        } finally {
            setLoading(false);
        }
    };

    const revokeSession = async (sessionId: string) => {
        if (!confirm('Voulez-vous vraiment révoquer cette session ? L\'utilisateur sera déconnecté immédiatement.')) return;
        
        try {
            await apiClient.delete(`/api/auth/sessions/${sessionId}`);
            toast.success('Session révoquée avec succès');
            setSessions(sessions.filter(s => s._id !== sessionId));
        } catch (err) {
            console.error('Failed to revoke session', err);
            toast.error('Erreur lors de la révocation');
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const getDeviceIcon = (userAgent: string) => {
        const ua = userAgent.toLowerCase();
        if (ua.includes('mobi') || ua.includes('android') || ua.includes('iphone')) return <Smartphone size={20} />;
        return <Monitor size={20} />;
    };

    const getBrowserName = (userAgent: string) => {
        const ua = userAgent;
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Navigateur Inconnu';
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-[#0b0f0a] min-h-screen font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Monitor className="text-indigo-500" />
                        Gestion des Sessions Actives
                    </h1>
                    <p className="text-sm text-zinc-500 mt-2">
                        Contrôlez les appareils et navigateurs actuellement connectés à votre compte (SOC 2 A.9 / ISO 27001).
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><LoadingSpinner /></div>
            ) : sessions.length === 0 ? (
                <div className="text-center py-24 text-zinc-500 border border-zinc-900/50 rounded-3xl bg-zinc-950/20">
                    <ShieldX size={48} className="mx-auto mb-4 text-zinc-700" />
                    <h2 className="text-xl font-bold text-white mb-2">Aucune session active</h2>
                    <p>C'est étrange... Vous devriez au moins voir votre session actuelle.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sessions.map((session) => (
                        <div key={session._id} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-all flex flex-col justify-between group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {getDeviceIcon(session.userAgent || '')}
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                        {getDeviceIcon(session.userAgent || '')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{getBrowserName(session.userAgent || '')}</h3>
                                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1">
                                            <Globe size={10} /> {session.ip || 'IP Inconnue'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                                        <Clock size={14} className="text-zinc-600" />
                                        Connecté le : <span className="text-zinc-200">{new Date(session.createdAt).toLocaleString('fr-FR')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                                        <CheckCircle2 size={14} className="text-emerald-500" />
                                        Expire le : <span className="text-zinc-200">{new Date(session.expiresAt).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => revokeSession(session._id)}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all"
                            >
                                <LogOut size={14} /> Révoquer l'accès
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="p-6 border border-amber-900/30 bg-amber-950/10 rounded-2xl flex gap-4 items-start">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                   <h4 className="text-amber-400 font-bold text-sm mb-1">Information SOC 2</h4>
                   <p className="text-xs text-amber-500/70 leading-relaxed">
                       La gestion des sessions actives permet de mitiger les risques liés au vol de cookies ou à la perte d'appareils physiques. 
                       En cas de doute sur un accès, révoquez immédiatement la session concernée.
                   </p>
                </div>
            </div>
        </div>
    );
}

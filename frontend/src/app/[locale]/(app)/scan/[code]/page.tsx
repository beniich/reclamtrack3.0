'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, QrCode, AlertTriangle, Box } from 'lucide-react';

export default function QRScanRedirectPage() {
    const params = useParams();
    const router = useRouter();
    const [status, setStatus] = useState<'analyzing' | 'not_found' | 'success'>('analyzing');
    const [assetCode, setAssetCode] = useState<string>('');

    useEffect(() => {
        // Simulate scanning logic
        const code = params?.code as string;
        setAssetCode(code);

        const timer = setTimeout(() => {
            // In a real app, we would query the backend here
            // e.g. await api.get(`/assets/by-code/${code}`)
            
            if (code === 'USINE-L1-POMPE-001' || code.includes('POMPE')) {
                setStatus('success');
                // Redirect to the actual asset after a short delay to show success
                setTimeout(() => {
                    router.push(`/assets/1`); // Using mock ID 1
                }, 1500);
            } else {
                setStatus('not_found');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [params, router]);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white">
            <div className="relative mb-12">
                {status === 'analyzing' && (
                    <div className="size-32 rounded-3xl border-2 border-indigo-500/30 flex items-center justify-center animate-pulse">
                        <QrCode className="size-16 text-indigo-500" />
                        <div className="absolute inset-0 border-t-2 border-indigo-500 animate-spin rounded-3xl"></div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="size-32 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center animate-in zoom-in">
                        <Box className="size-16 text-emerald-500" />
                    </div>
                )}

                {status === 'not_found' && (
                    <div className="size-32 rounded-3xl bg-red-500/10 border-2 border-red-500 flex items-center justify-center">
                        <AlertTriangle className="size-16 text-red-500" />
                    </div>
                )}
            </div>

            <div className="text-center space-y-4 max-w-xs">
                {status === 'analyzing' && (
                    <>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter">Analyse du Code...</h2>
                        <p className="text-sm font-medium text-slate-400">Vérification de la base de données équipement pour <span className="text-indigo-400 font-mono">{assetCode}</span></p>
                        <Loader2 className="size-6 text-indigo-500 animate-spin mx-auto mt-4" />
                    </>
                )}

                {status === 'success' && (
                    <>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-emerald-500">Équipement Trouvé</h2>
                        <p className="text-sm font-medium text-slate-400">Redirection vers la fiche technique de la machine...</p>
                    </>
                )}

                {status === 'not_found' && (
                    <>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-red-500">Code Inconnu</h2>
                        <p className="text-sm font-medium text-slate-400">Ce QR Code ne correspond à aucun actif dans le registre GMAO.</p>
                        <button 
                            onClick={() => router.push('/technician')}
                            className="mt-8 px-6 py-3 bg-white text-slate-900 rounded-xl font-black uppercase tracking-widest text-[10px]"
                        >
                            Retour au portail
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

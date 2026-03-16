'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import api from '@/lib/api';
import { Complaint } from '@/types';
import { Download, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { useRouter } from 'next/navigation';

export default function ComplaintListPage() {
    const router = useRouter();
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        const toastId = toast.loading('Génération de l\'export Excel...');
        try {
            const result = await api.get('/analytics/export/complaints');
            toast.dismiss(toastId);
            if (result?.data?.mode === 'local' && result?.data?.downloadUrl) {
                toast.success('Export prêt ! Téléchargement en cours...');
                window.open(result.data.downloadUrl, '_blank');
            } else if (result?.data?.mode === 'google_drive' && result?.data?.driveViewLink) {
                toast.success('Export sauvegardé sur Google Drive !');
                window.open(result.data.driveViewLink, '_blank');
            } else {
                toast.success(result?.message || 'Export réussi !');
            }
        } catch (err: unknown) {
            toast.dismiss(toastId);
            toast.error(err instanceof Error ? err.message : 'Erreur lors de l\'export');
        } finally {
            setExporting(false);
        }
    };

    useEffect(() => {
        api
            .get('/complaints')
            .then((res) => setComplaints(res || []))
            .catch((err) => {
                console.error(err);
                setComplaints([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }



    return (
        <div className="p-6 space-y-10 bg-brand-midnight min-h-screen font-display selection:bg-cyan-500 selection:text-white relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-cyan-400" />
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Operational Ledger</span>
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                        Registre des <span className="text-cyan-400 italic">Réclamations</span>
                    </h1>
                    <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px] mt-2 font-black ml-1">
                        CENTRALISATION DES PROTOCOLES D'INTERVENTION
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="flex items-center gap-3 bg-emerald-500 hover:brightness-110 disabled:opacity-60 text-white px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95"
                    >
                        {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        Exporter Protocoles
                    </button>
                    <Link
                        href="/complaints/new"
                        className="bg-brand-orange hover:brightness-110 text-white px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 flex items-center gap-3"
                    >
                        <FileText className="w-4 h-4" />
                        Nouveau Ticket
                    </Link>
                </div>
            </div>

            {complaints.length === 0 ? (
                <div className="glass-card rounded-[2.5rem] p-24 text-center border-white/5 flex flex-col items-center">
                    <div className="size-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6 border border-white/10">
                        <FileText className="w-10 h-10 text-slate-700" />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">Aucun enregistrement trouvé</h3>
                    <p className="text-sm text-slate-500 font-medium max-w-sm">Le registre est actuellement vide pour cette juridiction.</p>
                </div>
            ) : (
                <div className="glass-card rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative group">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">N° Identifiant</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Émetteur / Sujet</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Secteur / Service</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Priorité / État</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Propriétés Temporelles</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {complaints.map((c) => (
                                    <tr
                                        key={c._id}
                                        className="hover:bg-cyan-500/[0.02] cursor-pointer transition-colors group/row"
                                        onClick={() => router.push(`/complaints/${c._id}`)}
                                    >
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5 group-hover/row:scale-105 transition-transform inline-block">
                                                #{c.number || c._id?.slice(-6)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            {c.isAnonymous ? (
                                                <div className="font-black text-slate-500 uppercase tracking-widest text-[10px] italic">Accès Anonyme</div>
                                            ) : (
                                                <div className="flex flex-col">
                                                    <div className="font-black text-white uppercase tracking-tight text-sm">{c.firstName} {c.lastName}</div>
                                                    <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">{c.phone || 'No Auth Link'}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 capitalize">
                                            <div className="flex flex-col">
                                                <span className="font-black text-white text-[11px] uppercase tracking-widest mb-1">{c.category}</span>
                                                <span className="text-[10px] text-cyan-400 font-black uppercase opacity-60">{c.subcategory}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <StatusBadge status={c.status} size="sm" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <div className="text-xs font-black text-white uppercase tracking-tighter">
                                                    {new Date(c.createdAt).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                                                    {new Date(c.createdAt).toLocaleTimeString('fr-FR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    Calendar, Clock, MapPin, Phone, ArrowLeft, Printer,
    Edit, MessageSquare, ShieldCheck, AlertCircle, AlertTriangle,
    User, CheckCircle2, XCircle, Send, Lock, Loader2
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { formatDate, formatTime } from '@/lib/utils';
import type { Complaint, ComplaintComment, ComplaintStatus, TimelineEvent } from '@/types';
import toast from 'react-hot-toast';

// ─── Timeline Icon ─────────────────────────────────────────────────────────────
function TimelineIcon({ type }: { type: TimelineEvent['eventType'] }) {
    const map: Record<string, { icon: React.ReactNode; color: string }> = {
        created:          { icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-cyan-500 text-white' },
        assigned:         { icon: <User className="w-4 h-4" />, color: 'bg-blue-500 text-white' },
        status_changed:   { icon: <Edit className="w-4 h-4" />, color: 'bg-amber-500 text-white' },
        commented:        { icon: <MessageSquare className="w-4 h-4" />, color: 'bg-slate-500 text-white' },
        resolved:         { icon: <ShieldCheck className="w-4 h-4" />, color: 'bg-emerald-500 text-white' },
        closed:           { icon: <Lock className="w-4 h-4" />, color: 'bg-slate-400 text-white' },
        rejected:         { icon: <XCircle className="w-4 h-4" />, color: 'bg-rose-500 text-white' },
        priority_changed: { icon: <AlertTriangle className="w-4 h-4" />, color: 'bg-orange-500 text-white' },
    };
    const { icon, color } = map[type] ?? map.commented;
    return <div className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${color}`}>{icon}</div>;
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function formatMs(ms: number) {
    const h = Math.floor(ms / 3_600_000);
    const m = Math.floor((ms % 3_600_000) / 60_000);
    if (h > 48) return `${Math.round(h / 24)}j`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ComplaintDetailPage() {
    const router = useRouter();
    const params = useParams();
    const complaintId = params.id as string;

    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Action states
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [assignTeamName, setAssignTeamName] = useState('');
    const [assignTechName, setAssignTechName] = useState('');

    // Comments
    const [commentText, setCommentText] = useState('');
    const [isInternal, setIsInternal] = useState(false);
    const [sendingComment, setSendingComment] = useState(false);

    // Image modal
    const [selectedImage, setSelectedImage] = useState('');

    // ── Fetch ────────────────────────────────────────────────────────────────
    const fetchComplaint = useCallback(async () => {
        if (!complaintId) return;
        try {
            const data = await apiClient.get<Complaint>(`/complaints/${complaintId}`);
            setComplaint(data);
        } catch (err: any) {
            setError(err?.response?.status === 404 ? 'Réclamation introuvable' : 'Erreur de chargement');
        } finally {
            setLoading(false);
        }
    }, [complaintId]);

    useEffect(() => { fetchComplaint(); }, [fetchComplaint]);

    // ── Actions ──────────────────────────────────────────────────────────────
    const changeStatus = async (newStatus: ComplaintStatus, label: string) => {
        if (!complaint) return;
        setActionLoading(newStatus);
        try {
            await apiClient.patch(`/complaints/${complaintId}/status`, { status: newStatus });
            toast.success(`Statut mis à jour : ${label}`);
            fetchComplaint();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Erreur lors du changement de statut.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleAssign = async () => {
        if (!assignTeamName.trim()) { toast.error("Le nom de l'équipe est requis."); return; }
        setActionLoading('assign');
        try {
            await apiClient.post(`/complaints/${complaintId}/assign`, {
                teamName: assignTeamName,
                technicianName: assignTechName,
            });
            toast.success('Réclamation assignée avec succès !');
            setShowAssignModal(false);
            setAssignTeamName('');
            setAssignTechName('');
            fetchComplaint();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Erreur lors de l'assignation.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleSendComment = async () => {
        if (!commentText.trim()) { toast.error('Le commentaire est vide.'); return; }
        setSendingComment(true);
        try {
            await apiClient.post(`/complaints/${complaintId}/comments`, {
                content: commentText,
                isInternal,
            });
            toast.success('Commentaire ajouté.');
            setCommentText('');
            setIsInternal(false);
            fetchComplaint();
        } catch {
            toast.error("Erreur lors de l'envoi du commentaire.");
        } finally {
            setSendingComment(false);
        }
    };

    // ── Guards ────────────────────────────────────────────────────────────────
    if (loading) return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error || !complaint) return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <div className="bg-rose-500/10 p-4 rounded-full">
                <AlertCircle className="w-12 h-12 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{error || 'Introuvable'}</h2>
            <button onClick={() => router.back()} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold">
                Retour
            </button>
        </div>
    );

    const isSlaBreached = complaint.slaBreached;
    const isResolved = complaint.status === 'résolue' || complaint.status === 'fermée';

    return (
        <div className="min-h-screen animate-in fade-in duration-500">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Link href="list" className="text-sm font-semibold text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                            <ArrowLeft className="w-3 h-3" /> Réclamations
                        </Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-sm font-bold text-primary">#{complaint.number || complaint._id.slice(-6)}</span>
                        <StatusBadge status={complaint.status as any} />
                        <PriorityBadge priority={complaint.priority as any} />
                        {isSlaBreached && (
                            <span className="flex items-center gap-1 text-[10px] font-black text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg">
                                <AlertTriangle className="w-3 h-3" /> SLA dépassé
                            </span>
                        )}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{complaint.title}</h2>
                    <div className="text-slate-500 dark:text-slate-400 mt-2 flex flex-wrap items-center gap-4 text-sm font-medium">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-primary/70" />
                            {formatDate(complaint.createdAt)}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-primary/70" />
                            {formatTime(complaint.createdAt)}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-rose-500/70" />
                            {complaint.city}
                        </span>
                        {complaint.slaDueDate && !isResolved && (
                            <>
                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                                <span className={`flex items-center gap-1.5 text-xs font-bold ${isSlaBreached ? 'text-rose-500' : 'text-amber-500'}`}>
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    SLA : {formatDate(complaint.slaDueDate)}
                                </span>
                            </>
                        )}
                        {complaint.resolutionTimeMs && (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Résolu en {formatMs(complaint.resolutionTimeMs)}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <Printer className="w-4 h-4" /> Imprimer
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ── Left ── */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Timeline */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
                                <span className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Clock className="w-5 h-5" />
                                </span>
                                Historique
                            </h3>
                            <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                                {complaint.timeline?.length ?? 0} événements
                            </span>
                        </div>

                        {(!complaint.timeline || complaint.timeline.length === 0) ? (
                            <p className="text-sm text-slate-400 italic text-center py-8">Aucun historique disponible.</p>
                        ) : (
                            <div className="relative">
                                <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100 dark:bg-slate-800" />
                                <div className="space-y-6 pl-14">
                                    {[...complaint.timeline].reverse().map((ev, i) => (
                                        <div key={ev._id ?? i} className="relative">
                                            <div className="absolute -left-10 top-0">
                                                <TimelineIcon type={ev.eventType} />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{ev.message}</p>
                                                {ev.actorName && (
                                                    <p className="text-xs text-slate-400">par <span className="font-semibold">{ev.actorName}</span></p>
                                                )}
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                                    {formatDate(ev.createdAt)} · {formatTime(ev.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Description */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 uppercase tracking-tight">
                            Description
                        </h3>
                        <div className="text-slate-600 dark:text-slate-300 text-base leading-relaxed italic">
                            &quot;{complaint.description || 'Aucune description fournie.'}&quot;
                        </div>

                        {complaint.priority === 'urgent' && (
                            <div className="mt-6 bg-rose-50 dark:bg-rose-950/20 p-5 rounded-2xl border-l-4 border-rose-500 flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
                                <div>
                                    <p className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">Alerte Prioritaire</p>
                                    <p className="text-sm text-rose-700 dark:text-rose-300 leading-relaxed font-medium mt-1">
                                        Cette réclamation est marquée critique. Une intervention immédiate est requise.
                                    </p>
                                </div>
                            </div>
                        )}

                        {complaint.photos && complaint.photos.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Preuves Photographiques</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {complaint.photos.map((photo, idx) => (
                                        <div
                                            key={idx}
                                            className="group relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer"
                                            onClick={() => setSelectedImage(photo)}
                                        >
                                            <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Comments */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
                            Commentaires ({complaint.comments?.length ?? 0})
                        </h3>

                        {/* Comment list */}
                        {complaint.comments && complaint.comments.length > 0 ? (
                            <div className="space-y-4 mb-6">
                                {complaint.comments.map((c: ComplaintComment, i) => (
                                    <div key={c._id ?? i} className={`p-4 rounded-xl border ${c.isInternal ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-black text-slate-700 dark:text-slate-300">{c.authorName}</span>
                                            <div className="flex items-center gap-2">
                                                {c.isInternal && <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-lg">Note interne</span>}
                                                <span className="text-[10px] text-slate-400">{formatDate(c.createdAt)}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{c.content}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-8 mb-4 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                <MessageSquare className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-3" />
                                <p className="text-sm text-slate-400 italic">Aucun commentaire pour l&apos;instant.</p>
                            </div>
                        )}

                        {/* New comment form */}
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Ajouter un commentaire technique..."
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary resize-none"
                            />
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={isInternal} onChange={(e) => setIsInternal(e.target.checked)} className="w-4 h-4 rounded" />
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Note interne</span>
                                </label>
                                <button
                                    onClick={handleSendComment}
                                    disabled={sendingComment || !commentText.trim()}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {sendingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* ── Right ── */}
                <aside className="lg:col-span-4 space-y-6">

                    {/* Client Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h4 className="font-extrabold text-[10px] uppercase tracking-[0.2em] text-slate-400">Signalement</h4>
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="p-8 flex flex-col items-center">
                            <div className="size-20 rounded-[1.5rem] bg-gradient-to-br from-primary to-indigo-600 text-white flex items-center justify-center text-2xl font-black italic shadow-2xl shadow-primary/40 ring-4 ring-white dark:ring-slate-900 mb-4">
                                {complaint.isAnonymous ? '?' : (complaint.firstName?.charAt(0) || 'U')}
                            </div>
                            <p className="font-black text-slate-900 dark:text-white text-xl tracking-tight text-center">
                                {complaint.isAnonymous ? 'Citoyen Anonyme' : `${complaint.firstName} ${complaint.lastName}`}
                            </p>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1 mb-6">
                                Déclarant {complaint.isAnonymous ? 'Anonyme' : 'Identifié'}
                            </p>
                            <div className="w-full space-y-3">
                                {!complaint.isAnonymous && complaint.phone && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                        <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Téléphone</p>
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{complaint.phone}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Localisation</p>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{complaint.address}</p>
                                    </div>
                                </div>
                                {complaint.assignedTeamId && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
                                        <User className="w-4 h-4 text-blue-500 shrink-0" />
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Équipe assignée</p>
                                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{complaint.assignedTeamId.name}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Panel */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 text-white overflow-hidden relative group">
                        <div className="absolute -right-10 -bottom-10 size-48 bg-primary/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 relative z-10">Actions</h3>

                        <div className="grid grid-cols-2 gap-3 relative z-10">
                            {/* Résoudre */}
                            {complaint.status === 'en cours' && (
                                <button
                                    onClick={() => changeStatus('résolue', 'Résolue')}
                                    disabled={actionLoading === 'résolue'}
                                    className="flex flex-col items-center gap-2 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500 hover:border-emerald-500 transition-all disabled:opacity-50"
                                >
                                    {actionLoading === 'résolue' ? <Loader2 className="w-5 h-5 animate-spin text-emerald-400" /> : <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                                    <span className="text-[10px] font-black uppercase tracking-widest">Résoudre</span>
                                </button>
                            )}

                            {/* Assigner */}
                            {complaint.status !== 'fermée' && complaint.status !== 'rejetée' && (
                                <button
                                    onClick={() => setShowAssignModal(true)}
                                    disabled={!!actionLoading}
                                    className="flex flex-col items-center gap-2 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all disabled:opacity-50"
                                >
                                    <User className="w-5 h-5 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Assigner</span>
                                </button>
                            )}

                            {/* Urgent */}
                            {complaint.priority !== 'urgent' && complaint.status !== 'fermée' && (
                                <button
                                    onClick={async () => {
                                        setActionLoading('urgent');
                                        try {
                                            await apiClient.put(`/complaints/${complaintId}`, { priority: 'urgent' });
                                            toast.success('Priorité mise à Urgent !');
                                            fetchComplaint();
                                        } catch { toast.error('Erreur.'); }
                                        finally { setActionLoading(null); }
                                    }}
                                    disabled={!!actionLoading}
                                    className="flex flex-col items-center gap-2 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-rose-500 hover:border-rose-500 transition-all disabled:opacity-50"
                                >
                                    {actionLoading === 'urgent' ? <Loader2 className="w-5 h-5 animate-spin text-rose-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
                                    <span className="text-[10px] font-black uppercase tracking-widest">Urgent</span>
                                </button>
                            )}

                            {/* Rejeter */}
                            {(complaint.status === 'nouvelle' || complaint.status === 'en cours') && (
                                <button
                                    onClick={() => changeStatus('rejetée', 'Rejetée')}
                                    disabled={!!actionLoading}
                                    className="flex flex-col items-center gap-2 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-slate-700 hover:border-slate-600 transition-all disabled:opacity-50"
                                >
                                    {actionLoading === 'rejetée' ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> : <XCircle className="w-5 h-5 text-slate-400" />}
                                    <span className="text-[10px] font-black uppercase tracking-widest">Rejeter</span>
                                </button>
                            )}

                            {/* Fermer */}
                            {complaint.status === 'résolue' && (
                                <button
                                    onClick={() => changeStatus('fermée', 'Fermée')}
                                    disabled={!!actionLoading}
                                    className="col-span-2 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-slate-700 hover:border-slate-600 transition-all disabled:opacity-50"
                                >
                                    {actionLoading === 'fermée' ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Lock className="w-4 h-4 text-slate-400" />}
                                    <span className="text-[10px] font-black uppercase tracking-widest">Clôturer le dossier</span>
                                </button>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {/* ── Assign Modal ── */}
            {showAssignModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Assigner la réclamation</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Équipe *</label>
                                <input
                                    type="text"
                                    value={assignTeamName}
                                    onChange={(e) => setAssignTeamName(e.target.value)}
                                    placeholder="Nom de l'équipe..."
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Technicien (optionnel)</label>
                                <input
                                    type="text"
                                    value={assignTechName}
                                    onChange={(e) => setAssignTechName(e.target.value)}
                                    placeholder="Nom du technicien..."
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleAssign}
                                disabled={actionLoading === 'assign'}
                                className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:brightness-110 disabled:opacity-50 transition-all"
                            >
                                {actionLoading === 'assign' ? 'En cours...' : 'Assigner'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Image Modal ── */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-20 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setSelectedImage('')}
                >
                    <img
                        src={selectedImage}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}

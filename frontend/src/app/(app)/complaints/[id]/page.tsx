'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Types (Mock for features not yet in backend)
interface TimelineEvent {
    id: string;
    title: string;
    description: string;
    time: string;
    user: string;
    type: 'status' | 'comment' | 'assignment' | 'system';
}

interface Note {
    id: string;
    user: string;
    time: string;
    content: string;
    role: string;
    isInternal: boolean;
}

export default function ComplaintDetailPage() {
    const router = useRouter();
    const params = useParams();
    const complaintId = params.id as string;

    // States
    const [complaint, setComplaint] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [newNote, setNewNote] = useState('');
    const [isInternal, setIsInternal] = useState(false);
    const [activeTab, setActiveTab] = useState<'timeline' | 'notes' | 'files'>('timeline');
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        if (!complaintId) return;

        const fetchComplaint = async () => {
            try {
                const res = await api.get(`/complaints/${complaintId}`);
                setComplaint(res.data);
            } catch (err: any) {
                console.error(err);
                setError(err.response?.status === 404 ? "Réclamation introuvable" : "Erreur de chargement");
            } finally {
                setLoading(false);
            }
        };

        fetchComplaint();
    }, [complaintId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0a0a14]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !complaint) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a14] gap-4">
                <p className="text-red-500 font-bold">{error || "Introuvable"}</p>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
                >
                    Retour
                </button>
            </div>
        );
    }

    // Mapped Data
    const formattedDate = new Date(complaint.createdAt).toLocaleString('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short'
    });

    // Mock Timeline (Placeholder until backend implementation)
    const timeline: TimelineEvent[] = [
        { id: '1', title: 'Ticket créé', description: 'Signalé via le portail', time: formattedDate, user: 'Système', type: 'system' },
    ];

    const notes: Note[] = []; // Empty for now

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0a0a14] font-display">
            {/* Header Poli */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0a0a14]/80 backdrop-blur-md px-6 py-3 lg:px-10">
                <div className="flex items-center gap-6">
                    <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">arrow_back</span>
                    </button>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white italic uppercase leading-none">#{complaint.number}</h2>
                            <StatusBadge status={complaint.status} />
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Détails du Ticket d'Intervention</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <span className="material-symbols-outlined text-lg">print</span>
                        <span>Imprimer</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all">
                        <span>Éditer</span>
                    </button>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto w-full p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Colonne Gauche: Informations & Timeline */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Carte de Détails */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                        <div className="p-6 lg:p-8 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                    {complaint.title}
                                </h1>
                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                    <span className="material-symbols-outlined text-slate-500">info</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Catégorie</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 capitalize">{complaint.category} - {complaint.subcategory}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Équipe Assignée</p>
                                    <p className={`text-sm font-bold ${complaint.assignedTeamId ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500 italic'}`}>
                                        {complaint.assignedTeamId?.name || 'Non assigné'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Créé le</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{formattedDate}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Adresse</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate" title={`${complaint.address}, ${complaint.city}`}>{complaint.address}, {complaint.city}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-3">Description de l'incident</h3>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-4 border-primary/20">
                                    "{complaint.description || "Aucune description fournie."}"
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                        <div className="flex border-b border-slate-100 dark:border-slate-800">
                            {[
                                { id: 'timeline', label: 'Historique', icon: 'history' },
                                { id: 'notes', label: 'Commentaires', icon: 'forum' },
                                { id: 'files', label: 'Pièces Jointes', icon: 'attachment' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                    <span className="hidden sm:block">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="p-6 lg:p-8">
                            {activeTab === 'timeline' && (
                                <div className="space-y-8 relative before:absolute before:inset-0 before:left-[19px] before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                                    {timeline.map((event) => (
                                        <div key={event.id} className="relative flex gap-6 group">
                                            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 group-hover:border-primary transition-colors">
                                                <span className={`material-symbols-outlined text-sm ${event.type === 'system' ? 'text-slate-400' : event.type === 'status' ? 'text-orange-500' : 'text-primary'}`}>
                                                    {event.type === 'system' ? 'settings' : event.type === 'status' ? 'sync' : 'person'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{event.title}</h4>
                                                    <span className="text-[10px] font-bold text-slate-400">{event.time}</span>
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{event.description}</p>
                                                <p className="text-[10px] font-black text-primary uppercase mt-1">Saisie par {event.user}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'notes' && (
                                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">forum</span>
                                    <p className="text-sm font-medium">Bientôt disponible</p>
                                </div>
                            )}

                            {activeTab === 'files' && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {complaint.photos && complaint.photos.length > 0 ? (
                                        complaint.photos.map((photo: string, index: number) => {
                                            const imageUrl = photo.startsWith('http') ? photo : `${process.env.NEXT_PUBLIC_API_URL}/${photo}`;
                                            return (
                                                <div
                                                    key={index}
                                                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                                                    onClick={() => {
                                                        setSelectedImage(imageUrl);
                                                        setShowImageModal(true);
                                                    }}
                                                >
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Photo ${index + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-4xl">
                                                            zoom_in
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400">
                                            <span className="material-symbols-outlined text-4xl mb-2">attachment</span>
                                            <p className="text-sm font-medium">Aucune pièce jointe</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Colonne Droite: Client & Actions */}
                <div className="space-y-8">
                    {/* Carte Client Profil */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 lg:p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Contact Client</h3>
                            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-slate-400 text-lg">more_horiz</span>
                            </button>
                        </div>

                        {complaint.isAnonymous ? (
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="size-20 rounded-3xl bg-slate-200 dark:bg-slate-800 text-slate-400 flex items-center justify-center text-3xl font-black italic shadow-inner">
                                    ?
                                </div>
                                <div>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">Anonyme</p>
                                    <div className="flex items-center justify-center gap-1.5 mt-1">
                                        <span className="size-1.5 rounded-full bg-slate-400"></span>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Citoyen</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="size-20 rounded-3xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center text-3xl font-black italic shadow-2xl shadow-primary/30 ring-4 ring-white dark:ring-slate-900">
                                    {complaint.firstName?.charAt(0)}{complaint.lastName?.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">{complaint.firstName} {complaint.lastName}</p>
                                    <div className="flex items-center justify-center gap-1.5 mt-1">
                                        <span className="size-1.5 rounded-full bg-slate-300"></span>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 pt-4">
                            {!complaint.isAnonymous && (
                                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">call</span>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{complaint.phone || 'Non renseigné'}</span>
                                </div>
                            )}
                            <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <span className="material-symbols-outlined text-rose-500 shrink-0">location_on</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 italic leading-relaxed">{complaint.address}</span>
                            </div>
                        </div>

                        {!complaint.isAnonymous && (
                            <button className="w-full py-3.5 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3">
                                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                                Contacter le client
                            </button>
                        )}
                    </div>

                    {/* Centre de Contrôle Rapide */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 lg:p-8 space-y-6 text-white overflow-hidden relative group">
                        <div className="absolute -right-6 -bottom-6 size-40 bg-primary/20 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-700"></div>

                        <h3 className="text-xs font-black uppercase tracking-[0.2em] relative z-10 text-white/40">Gestion Opérationnelle</h3>

                        <div className="grid grid-cols-2 gap-3 relative z-10">
                            {[
                                { icon: 'task_alt', label: 'Résoudre', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white' },
                                { icon: 'person_add', label: 'Assigner', color: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white' },
                                { icon: 'warning', label: 'Escalader', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500 hover:text-white' },
                                { icon: 'flag', label: 'Priorité', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500 hover:text-white' },
                            ].map((action, i) => (
                                <button key={i} className={`flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all ${action.color}`}>
                                    <span className="material-symbols-outlined">{action.icon}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal Image */}
            {showImageModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-20 bg-black/95 backdrop-blur-sm transition-all animate-in fade-in duration-300" onClick={() => setShowImageModal(false)}>
                    <button className="absolute top-6 right-6 text-white hover:rotate-90 transition-all">
                        <span className="material-symbols-outlined text-4xl font-light">close</span>
                    </button>
                    <div className="relative max-w-5xl w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage} alt="Preview" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                    </div>
                </div>
            )}

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                
                body {
                    font-family: 'Outfit', sans-serif;
                }
                
                .font-display {
                    font-family: 'Outfit', sans-serif;
                }
            `}</style>
        </div>
    );
}

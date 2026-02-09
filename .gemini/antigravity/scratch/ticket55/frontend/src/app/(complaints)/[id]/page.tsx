'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

// Types
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

    // États
    const [newNote, setNewNote] = useState('');
    const [isInternal, setIsInternal] = useState(false);
    const [activeTab, setActiveTab] = useState<'timeline' | 'notes' | 'files'>('timeline');
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    // Données Mockées en Français
    const complaint = {
        id: complaintId || 'TK-8842',
        title: 'Panne critique de connectivité serveur - Aile Nord',
        customer: 'Robert J. Sterling',
        customerPhone: '+33 6 12 34 56 78',
        customerEmail: 'r.sterling@globex.com',
        address: '88 Avenue des Champs-Élysées, 75008 Paris',
        priority: 'urgent',
        status: 'in_progress',
        team: 'Équipe Alpha (Infrastructure)',
        category: 'Réseau & Serveurs',
        description: 'Le commutateur principal de l\'aile nord ne répond plus depuis 08h45 ce matin. Plusieurs services critiques sont actuellement hors ligne, impactant environ 150 employés. Une intervention physique semble nécessaire.',
        createdAt: '24 Mai 2024, 08:52',
        deadline: '24 Mai 2024, 12:00 (SLA 4h)',
        stats: {
            intervention_time: '1h 15m',
            components: 2,
            technicians: 3
        }
    };

    const timeline: TimelineEvent[] = [
        { id: '1', title: 'Ticket créé', description: 'Signalé via le portail citoyen par R. Sterling', time: '08:52', user: 'Système', type: 'system' },
        { id: '2', title: 'Priorité mise à jour', description: 'Changée de "Normal" à "Urgent" après analyse', time: '09:05', user: 'Admin Jean', type: 'status' },
        { id: '3', title: 'Équipe assignée', description: 'L\'équipe Alpha a été dépêchée sur place', time: '09:12', user: 'Système', type: 'assignment' },
        { id: '4', title: 'Note ajoutée', description: 'Technicien en route avec le matériel de rechange', time: '09:30', user: 'Marc Tech', type: 'comment' },
    ];

    const notes: Note[] = [
        { id: '1', user: 'Marc Tech', time: 'Il y a 45 min', content: 'J\'ai récupéré le switch de remplacement au dépôt. Arrivée prévue sur site dans 15 minutes.', role: 'Technicien Senior', isInternal: true },
        { id: '2', user: 'Admin Jean', time: 'Il y a 1h', content: 'Le client a été informé du délai d\'intervention par SMS.', role: 'Superviseur', isInternal: false },
    ];

    const attachments = [
        { id: '1', name: 'photo_panneau_electrique.jpg', size: '2.4 MB', type: 'image', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800' },
        { id: '2', name: 'rapport_incident_preliminaire.pdf', size: '1.1 MB', type: 'pdf', url: '#' },
    ];

    // Helpers
    const getStatusBadge = (status: string) => {
        const styles = {
            urgent: 'bg-red-500 text-white shadow-lg shadow-red-500/20',
            in_progress: 'bg-blue-500 text-white shadow-lg shadow-blue-500/20',
            resolved: 'bg-emerald-500 text-white',
            new: 'bg-slate-500 text-white'
        };
        const labels = {
            urgent: 'CRITIQUE',
            in_progress: 'EN COURS',
            resolved: 'RÉSOLU',
            new: 'NOUVEAU'
        };
        return <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${styles[status as keyof typeof styles]}`}>{labels[status as keyof typeof labels]}</span>;
    };

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
                            <h2 className="text-xl font-black text-slate-900 dark:text-white italic uppercase leading-none">{complaint.id}</h2>
                            {getStatusBadge(complaint.status)}
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
                        <span>Éditer le Ticket</span>
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
                                <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
                                    <span className="material-symbols-outlined text-red-500 animate-pulse">priority_high</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Catégorie</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{complaint.category}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Équipe Assignée</p>
                                    <p className="text-sm font-bold text-primary">{complaint.team}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Créé le</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{complaint.createdAt}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SLA / Deadline</p>
                                    <p className="text-sm font-bold text-rose-500">{complaint.deadline}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-3">Description de l'incident</h3>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-4 border-primary/20">
                                    "{complaint.description}"
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">timer</span>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Temps Écoulé</p>
                                        <p className="text-sm font-bold">1h 24m</p>
                                    </div>
                                </div>
                                <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl flex items-center gap-3">
                                    <span className="material-symbols-outlined text-emerald-500">engineering</span>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Techniciens</p>
                                        <p className="text-sm font-bold">3 actifs</p>
                                    </div>
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
                                <div className="space-y-6">
                                    {notes.map((note) => (
                                        <div key={note.id} className={`p-5 rounded-2xl border ${note.isInternal ? 'bg-amber-50/30 border-amber-100 dark:bg-amber-900/5 dark:border-amber-900/20' : 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800'}`}>
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary italic">
                                                        {note.user.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase">{note.user}</p>
                                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{note.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {note.isInternal && (
                                                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-500 text-white uppercase tracking-widest flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[10px]">lock</span>
                                                            Interne
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] font-bold text-slate-400">{note.time}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium line-clamp-3">
                                                {note.content}
                                            </p>
                                        </div>
                                    ))}

                                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <textarea
                                            value={newNote}
                                            onChange={(e) => setNewNote(e.target.value)}
                                            className="w-full rounded-2xl bg-slate-50 dark:bg-[#161625] border-none focus:ring-2 focus:ring-primary p-5 text-sm font-medium h-32 transition-all"
                                            placeholder="Tapez votre compte-rendu ou observation ici..."
                                        />
                                        <div className="flex items-center justify-between mt-4">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`relative w-10 h-6 rounded-full transition-all ${isInternal ? 'bg-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                                    <input type="checkbox" checked={isInternal} onChange={() => setIsInternal(!isInternal)} className="hidden" />
                                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${isInternal ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                                </div>
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Note Interne</span>
                                            </label>
                                            <button className="px-8 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                                                Publier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'files' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {attachments.map((file) => (
                                        <div
                                            key={file.id}
                                            onClick={() => file.type === 'image' && (setSelectedImage(file.url), setShowImageModal(true))}
                                            className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:scale-[1.02] transition-all group flex items-center gap-4 cursor-pointer"
                                        >
                                            <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                                <span className="material-symbols-outlined text-2xl">{file.type === 'pdf' ? 'picture_as_pdf' : 'image'}</span>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{file.size}</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">download</span>
                                        </div>
                                    ))}
                                    <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group min-h-[82px]">
                                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:rotate-90 transition-all">add_circle</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ajouter un fichier</span>
                                    </div>
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

                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="size-20 rounded-3xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center text-3xl font-black italic shadow-2xl shadow-primary/30 ring-4 ring-white dark:ring-slate-900">
                                {complaint.customer.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xl font-black text-slate-900 dark:text-white">{complaint.customer}</p>
                                <div className="flex items-center justify-center gap-1.5 mt-1">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Compte Vérifié</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4">
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group">
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">call</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{complaint.customerPhone}</span>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group">
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">mail</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">{complaint.customerEmail}</span>
                            </div>
                            <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <span className="material-symbols-outlined text-rose-500 shrink-0">location_on</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 italic leading-relaxed">"{complaint.address}"</span>
                            </div>
                        </div>

                        <button className="w-full py-3.5 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3">
                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                            Contacter le client
                        </button>
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

                        <Link href="/finance/costs" className="block w-full text-center py-4 rounded-2xl border border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all relative z-10">
                            Suivi des Coûts d'Intervention
                        </Link>
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

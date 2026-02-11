'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Types
interface RequestItem {
    id: string;
    description: string;
    quantity: number;
    justification: string;
}

// Mock Catalog (Until a real inventory model is implemented)
const CATALOG = [
    'Tuyau en cuivre (15mm)',
    'Raccord PVC 2 pouces',
    'Compteur d\'eau standard',
    'Câble fibre optique (Extérieur)',
    'Joint d\'étanchéité 500ml',
    'Gants de protection haute résistance',
    'Projecteur LED 50W',
    'Ciment séchage rapide (5kg)'
];

export default function MaterialRequestPage() {
    const router = useRouter();

    // State
    const [items, setItems] = useState<RequestItem[]>([
        { id: '1', description: '', quantity: 1, justification: '' }
    ]);
    const [selectedComplaintId, setSelectedComplaintId] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [notes, setNotes] = useState('');

    // Fetch Complaints
    const { data: complaints, isLoading: loadingComplaints } = useQuery({
        queryKey: ['complaints'],
        queryFn: async () => {
            const res = await api.get('/complaints');
            return res.data;
        }
    });

    // Mutation
    const submitMutation = useMutation({
        mutationFn: async (data: any) => {
            return api.post('/inventory/requisitions', data);
        },
        onSuccess: () => {
            toast.success('Demande de matériel envoyée !');
            router.push('/inventory/approvals');
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Erreur lors de l\'envoi');
        }
    });

    // Handlers
    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, justification: '' }]);
    };

    const removeItem = (id: string) => {
        if (items.length === 1) {
            toast.error('Au moins un article est requis');
            return;
        }
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof RequestItem, value: string | number) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSubmit = () => {
        // Validation
        const validItems = items.filter(i => i.description.trim() !== '');
        if (validItems.length === 0) {
            toast.error('Veuillez ajouter au moins un article valide');
            return;
        }

        submitMutation.mutate({
            complaintId: selectedComplaintId || undefined,
            items: validItems.map(({ description, quantity, justification }) => ({
                description,
                quantity,
                justification
            })),
            priority,
            notes
        });
    };

    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    if (loadingComplaints) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0a0a14]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0a0a14] font-display pb-24 transition-colors">
            {/* Header / Nav */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a14]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard/operations" className="flex items-center gap-3 group">
                            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-white text-xl">inventory_2</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black tracking-tight dark:text-white uppercase leading-none">RT Inventory</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Supply Chain</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Connecté en tant que</p>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">Technicien Senior</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800 border-2 border-primary/20 p-0.5">
                            <img src="https://ui-avatars.com/api/?name=Technicien&background=2424eb&color=fff" alt="Profile" className="w-full h-full object-cover rounded-[10px]" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-[1024px] mx-auto w-full px-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Hero / Title Section */}
                <div className="mb-10 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                        <Link href="/inventory" className="hover:text-primary transition-colors">Catalogue</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="text-primary italic">Réquisition Matérielle</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-none mb-3">
                        Demande de <span className="text-primary underline decoration-primary/20 underline-offset-8">Matériel</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
                        Formulaire officiel de réquisition pour les opérations de terrain. Les demandes seront traitées par le gestionnaire de stock.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Fields */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Info Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors"></div>

                            <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                                <div className="bg-primary/10 p-2 rounded-xl">
                                    <span className="material-symbols-outlined text-primary">analytics</span>
                                </div>
                                <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Contexte Opérationnel</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        Réclamation Liée <span className="text-slate-300 italic font-normal text-[9px] lowercase">(optionnel)</span>
                                    </label>
                                    <div className="relative group">
                                        <select
                                            className="w-full h-12 pl-4 pr-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none transition-all"
                                            value={selectedComplaintId}
                                            onChange={(e) => setSelectedComplaintId(e.target.value)}
                                        >
                                            <option value="">Aucun ticket spécifique</option>
                                            {complaints?.map((c: any) => (
                                                <option key={c._id} value={c._id}>#{c.number} - {c.title}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                            <span className="material-symbols-outlined shrink-0 text-xl group-hover:translate-y-0.5 transition-transform">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgence Opérationnelle</label>
                                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                                        {['Low', 'Medium', 'High'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setPriority(p)}
                                                className={`flex-1 py-2.5 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${priority === p
                                                    ? 'bg-white dark:bg-slate-700 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                            <div className="flex items-center justify-between p-6 lg:p-8 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="bg-amber-500/10 p-2 rounded-xl">
                                        <span className="material-symbols-outlined text-amber-500">inventory</span>
                                    </div>
                                    <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Lignes de Commande</h2>
                                </div>
                                <button
                                    onClick={addItem}
                                    className="group flex items-center gap-2 px-4 py-2 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">add_circle</span>
                                    Ajouter un Article
                                </button>
                            </div>

                            <div className="p-6 lg:p-8 space-y-4">
                                {items.map((item, idx) => (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all group/row border border-transparent hover:border-slate-200 dark:hover:border-slate-700 relative">
                                        <div className="md:col-span-6 space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Matériel</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                    type="text"
                                                    list={`catalog-${item.id}`}
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                    placeholder="Rechercher dans le catalogue..."
                                                />
                                                <datalist id={`catalog-${item.id}`}>
                                                    {CATALOG.map(option => <option key={option} value={option} />)}
                                                </datalist>
                                                <span className="absolute right-4 top-2.5 text-slate-400 material-symbols-outlined text-xl">search</span>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Quantité</label>
                                            <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-11">
                                                <button onClick={() => updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))} className="w-10 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                                                    <span className="material-symbols-outlined text-sm font-black">remove</span>
                                                </button>
                                                <input
                                                    className="w-full text-center border-none bg-transparent text-sm font-black p-0 focus:ring-0"
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                />
                                                <button onClick={() => updateItem(item.id, 'quantity', item.quantity + 1)} className="w-10 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                                                    <span className="material-symbols-outlined text-sm font-black">add</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-3 space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Justification</label>
                                            <input
                                                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs italic focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                placeholder="..."
                                                type="text"
                                                value={item.justification}
                                                onChange={(e) => updateItem(item.id, 'justification', e.target.value)}
                                            />
                                        </div>

                                        <div className="md:col-span-1 pt-6 flex justify-end">
                                            <button onClick={() => removeItem(item.id)} className="size-9 flex items-center justify-center text-slate-300 hover:text-rose-500 bg-slate-100 dark:bg-slate-800/50 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover/row:opacity-100">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Additional Notes */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 text-white space-y-6 relative overflow-hidden group">
                            <div className="absolute -bottom-10 -right-10 size-40 bg-primary/20 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-1000"></div>

                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Résumé des Notes</h3>

                            <div className="space-y-4 relative z-10">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instructions pour l'entrepôt</label>
                                <textarea
                                    className="w-full h-32 p-4 rounded-2xl border border-slate-800 bg-slate-950 text-sm italic placeholder:text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                                    placeholder="Préciser les conditions de transport, urgence spéciale ou lieu de retrait..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="pt-6 border-t border-white/5 space-y-3 relative z-10">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-bold uppercase tracking-widest">Articles Distincts</span>
                                    <span className="font-black italic">{items.length}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-bold uppercase tracking-widest">Quantité Totale</span>
                                    <span className="font-black italic text-primary text-lg">{totalQuantity}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl space-y-3">
                            <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest italic">
                                <span className="material-symbols-outlined text-sm">warning</span>
                                Rappel Sécurité
                            </div>
                            <p className="text-[11px] text-amber-600/70 font-medium leading-relaxed italic">
                                Vérifiez bien l'état du matériel au moment du retrait à l'entrepôt. Toute anomalie doit être signalée immédiatement.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Order Action Bar */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0a0a14]/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 py-4 z-50 transition-colors">
                <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="bg-primary/5 size-12 rounded-2xl flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">local_shipping</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temps de traitement</span>
                                <span className="text-sm font-black text-slate-800 dark:text-slate-200 italic leading-none mt-1">~2h Ouvrées</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
                            Brouillon
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitMutation.isPending}
                            className="flex-1 md:flex-none bg-primary hover:bg-blue-700 text-white px-12 py-3.5 rounded-2x rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {submitMutation.isPending ? (
                                <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Soumettre la Demande</span>
                                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">send</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}


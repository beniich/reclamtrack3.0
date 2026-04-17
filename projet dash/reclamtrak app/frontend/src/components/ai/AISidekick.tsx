'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { useComplaintsStore } from '@/store/complaintsStore';
import { useAuthStore } from '@/store/authStore';
import { X, Send, Bot, Sparkles, Loader2, Zap, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Complaint } from '@/types';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    type?: 'text' | 'tickets' | 'stats';
    data?: any;
}

// AI reasoning engine - processes user intents against real data
function processQuery(input: string, complaints: Complaint[], user: any): Message {
    const q = input.toLowerCase();

    // === URGENT / CRITICAL TICKETS ===
    if (q.includes('urgent') || q.includes('critique') || q.includes('critical')) {
        const urgent = complaints.filter(c => c.priority === 'urgent' && c.status !== 'résolue' && c.status !== 'fermée');
        if (urgent.length === 0) {
            return { role: 'assistant', content: '✅ Aucun ticket critique actif en ce moment. Tous les cas urgents ont été traités.' };
        }
        return {
            role: 'assistant',
            content: `🚨 J'ai détecté **${urgent.length} ticket(s) urgent(s)** actif(s).`,
            type: 'tickets',
            data: urgent.slice(0, 3)
        };
    }

    // === OPEN / ACTIVE TICKETS ===
    if (q.includes('ouvert') || q.includes('actif') || q.includes('open') || q.includes('activ') || q.includes('en cours')) {
        const active = complaints.filter(c => c.status === 'en cours' || c.status === 'nouvelle');
        return {
            role: 'assistant',
            content: `📋 Il y a actuellement **${active.length} ticket(s) actif(s)** en attente ou en intervention.`,
            type: 'tickets',
            data: active.slice(0, 3)
        };
    }

    // === RESOLVED / STATS ===
    if (q.includes('résolu') || q.includes('résolus') || q.includes('résoudre') || q.includes('résolution') || q.includes('today') || q.includes('aujourd')) {
        const resolved = complaints.filter(c => c.status === 'résolue');
        return {
            role: 'assistant',
            content: `✅ **${resolved.length} ticket(s)** ont été résolus. Excellent taux de traitement !`,
            type: 'stats',
            data: { resolved: resolved.length, total: complaints.length }
        };
    }

    // === SUMMARY / OVERVIEW ===
    if (q.includes('résumé') || q.includes('summary') || q.includes('bilan') || q.includes('état') || q.includes('status') || q.includes('overview')) {
        const total = complaints.length;
        const active = complaints.filter(c => c.status === 'en cours').length;
        const urgent = complaints.filter(c => c.priority === 'urgent').length;
        const resolved = complaints.filter(c => c.status === 'résolue').length;
        return {
            role: 'assistant',
            content: `📊 **Bilan opérationnel :**\n\n• Total : **${total}** réclamations\n• En cours : **${active}** interventions\n• Urgentes : **${urgent}** priorités\n• Résolues : **${resolved}** cas traités\n\nSystème opérationnel à **${total > 0 ? Math.round((resolved / total) * 100) : 0}%** de résolution.`,
            type: 'stats',
            data: { total, active, urgent, resolved }
        };
    }

    // === CATEGORY QUERIES ===
    const categories = ['eau', 'électricité', 'voirie', 'assainissement', 'gaz'];
    for (const cat of categories) {
        if (q.includes(cat)) {
            const catTickets = complaints.filter(c => c.category?.toLowerCase().includes(cat));
            return {
                role: 'assistant',
                content: `🔍 **${catTickets.length}** réclamation(s) trouvées dans la catégorie **${cat}**.`,
                type: 'tickets',
                data: catTickets.slice(0, 3)
            };
        }
    }

    // === NAVIGATION ===
    if (q.includes('tableau') || q.includes('dashboard')) {
        return { role: 'assistant', content: '📍 Je vous redirige vers le Tableau de Bord. Cliquez ici → /dashboard' };
    }
    if (q.includes('carte') || q.includes('map')) {
        return { role: 'assistant', content: '🗺️ La carte est disponible dans la section /map pour visualiser la distribution géographique.' };
    }
    if (q.includes('studio') || q.includes('design') || q.includes('schéma')) {
        return { role: 'assistant', content: '🔧 Le **Industrial Design Studio** est dans la section /technical-design. Créez vos schémas de tuyauterie et circuits électriques avec l\'assistance IA.' };
    }

    // === GREETING ===
    if (q.includes('bonjour') || q.includes('hello') || q.includes('salut')) {
        return {
            role: 'assistant',
            content: `Bonjour ${user?.name || 'Administrateur'} ! Je suis votre Agent IA ReclamTrack. Je peux analyser vos **${complaints.length}** tickets en temps réel. Demandez-moi un résumé, les urgences, ou une catégorie spécifique.`
        };
    }

    // === DEFAULT HELP ===
    return {
        role: 'assistant',
        content: `Je n'ai pas compris cette demande. Essayez :\n\n• **"tickets urgents"** — Afficher les priorités critiques\n• **"résumé opérationnel"** — Vue d'ensemble des données\n• **"tickets en cours"** — Interventions actives\n• **"tickets eau"** — Par catégorie`
    };
}

// Sub-component to render ticket cards in AI chat
const TicketCard = ({ ticket }: { ticket: Complaint }) => {
    const priorityColor = {
        urgent: 'border-red-500/50 bg-red-500/10 text-red-400',
        high: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
        medium: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
        low: 'border-slate-500/50 bg-slate-500/10 text-slate-400',
    }[ticket.priority] || 'border-slate-500/50 bg-slate-500/10 text-slate-400';

    return (
        <div className={cn("border rounded-xl p-3 mt-2 space-y-1", priorityColor)}>
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-70">#{ticket.number}</span>
                <span className="text-[9px] font-black uppercase tracking-widest">{ticket.priority}</span>
            </div>
            <p className="text-xs font-semibold text-white leading-tight truncate">{ticket.title}</p>
            <p className="text-[10px] opacity-60">{ticket.city} · {ticket.category}</p>
        </div>
    );
};

// Context-based greeting
function getContextGreeting(pathname: string, complaintsCount: number, user: any): string {
    const name = user?.name || 'Administrateur';
    if (pathname.includes('technical-design')) {
        return `Studio actif. Bonjour ${name} ! Je peux générer des composants ou vous guider dans vos schémas techniques. ${complaintsCount} tickets en attente en parallèle.`;
    }
    if (pathname.includes('map')) {
        return `Mode carte. Je peux analyser la distribution géographique de vos **${complaintsCount}** réclamations par secteur.`;
    }
    if (pathname.includes('complaints')) {
        return `Module réclamations actif. **${complaintsCount}** tickets chargés. Demandez-moi les urgences, un résumé ou filtrez par catégorie.`;
    }
    if (pathname.includes('analytics')) {
        return `Analytique opérationnelle. Je peux calculer le taux de résolution ou identifier les goulots d'étranglement parmi vos **${complaintsCount}** réclamations.`;
    }
    return `Bonjour ${name} ! Agent IA actif. **${complaintsCount}** tickets en mémoire. Demandez-moi un bilan, les urgences, ou cherchez par catégorie.`;
}

export const AISidekick: React.FC = () => {
    const { isAISidekickOpen, closeAISidekick } = useUIStore();
    const { complaints, fetchComplaints } = useComplaintsStore();
    const { user } = useAuthStore();
    const pathname = usePathname();

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    // Fetch real data when sidekick opens
    useEffect(() => {
        if (isAISidekickOpen && !hasInitialized.current) {
            hasInitialized.current = true;
            fetchComplaints().then(() => {
                const greeting = getContextGreeting(pathname, complaints.length, user);
                setMessages([{ role: 'assistant', content: greeting }]);
            });
        }
        if (!isAISidekickOpen) {
            hasInitialized.current = false;
            setMessages([]);
        }
    }, [isAISidekickOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = useCallback(async () => {
        if (!input.trim() || isTyping) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate brief AI processing delay
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));

        const response = processQuery(input, complaints, user);
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
    }, [input, isTyping, complaints, user]);

    const renderMessage = (msg: Message, i: number) => {
        const isUser = msg.role === 'user';
        return (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn("flex flex-col max-w-[90%]", isUser ? "ml-auto items-end" : "items-start")}
            >
                <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                    isUser
                        ? "bg-indigo-600 text-white rounded-tr-sm shadow-lg shadow-indigo-600/20"
                        : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-sm"
                )}>
                    {/* Render markdown-like bold */}
                    {msg.content.split('**').map((part, idx) =>
                        idx % 2 === 1 ? <strong key={idx} className="text-orange-400">{part}</strong> : <span key={idx}>{part}</span>
                    )}

                    {/* Ticket cards */}
                    {msg.type === 'tickets' && msg.data?.map((t: Complaint, i: number) => (
                        <TicketCard key={t._id || i} ticket={t} />
                    ))}

                    {/* Stats summary */}
                    {msg.type === 'stats' && msg.data && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            {msg.data.total !== undefined && (
                                <div className="bg-white/5 rounded-xl p-2 text-center border border-white/5">
                                    <p className="text-xl font-black text-white">{msg.data.total}</p>
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Total</p>
                                </div>
                            )}
                            {msg.data.active !== undefined && (
                                <div className="bg-orange-500/10 rounded-xl p-2 text-center border border-orange-500/20">
                                    <p className="text-xl font-black text-orange-400">{msg.data.active}</p>
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">En cours</p>
                                </div>
                            )}
                            {msg.data.urgent !== undefined && (
                                <div className="bg-red-500/10 rounded-xl p-2 text-center border border-red-500/20">
                                    <p className="text-xl font-black text-red-400">{msg.data.urgent}</p>
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Urgents</p>
                                </div>
                            )}
                            {msg.data.resolved !== undefined && (
                                <div className="bg-emerald-500/10 rounded-xl p-2 text-center border border-emerald-500/20">
                                    <p className="text-xl font-black text-emerald-400">{msg.data.resolved}</p>
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Résolus</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1 px-1">
                    {isUser ? 'Vous' : '⚡ Agent IA'}
                </span>
            </motion.div>
        );
    };

    const quickPrompts = ['Résumé opérationnel', 'Tickets urgents', 'En cours', 'Tickets eau'];

    return (
        <AnimatePresence>
            {isAISidekickOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAISidekick}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60]"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                        className="fixed right-4 top-4 bottom-4 w-[22rem] bg-[#0f0125]/95 backdrop-blur-3xl border border-orange-500/20 rounded-[2.5rem] shadow-[0_0_80px_rgba(249,115,22,0.08)] z-[70] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative p-5 border-b border-white/10 flex items-center justify-between overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-orange-500/10 pointer-events-none" />
                            <div className="relative flex items-center gap-3">
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-xl bg-orange-500/20 animate-pulse" />
                                    <Bot size={20} className="relative text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black uppercase italic tracking-tighter text-base leading-none">AI Sidekick</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{complaints.length} tickets chargés</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={closeAISidekick}
                                className="relative w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
                        >
                            {messages.map((msg, i) => renderMessage(msg, i))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-2xl rounded-tl-sm w-fit border border-white/10"
                                >
                                    <Loader2 size={13} className="text-orange-500 animate-spin" />
                                    <span className="text-[11px] text-slate-400 font-medium">Traitement cognitif...</span>
                                </motion.div>
                            )}
                        </div>

                        {/* Quick Prompts */}
                        <div className="px-4 pb-2 flex gap-2 flex-wrap">
                            {quickPrompts.map(p => (
                                <button
                                    key={p}
                                    onClick={() => { setInput(p); }}
                                    className="text-[10px] font-bold px-3 py-1.5 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 rounded-full text-slate-400 hover:text-orange-400 transition-all uppercase tracking-wide"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white/5 border-t border-white/10">
                            <div className="relative flex items-center">
                                <Sparkles size={15} className="absolute left-4 text-orange-500/60" />
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Requête opérationnelle..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-14 text-sm text-white placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/30 outline-none transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className={cn(
                                        "absolute right-2 w-9 h-9 flex items-center justify-center rounded-xl transition-all",
                                        !input.trim() || isTyping
                                            ? "text-slate-700"
                                            : "bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95"
                                    )}
                                >
                                    <Send size={15} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

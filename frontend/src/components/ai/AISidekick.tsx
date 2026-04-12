'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { X, Send, Bot, Sparkles, MessageSquare, Zap, Map as MapIcon, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const AISidekick: React.FC = () => {
    const { isAISidekickOpen, closeAISidekick } = useUIStore();
    const pathname = usePathname();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Context detection
    useEffect(() => {
        if (isAISidekickOpen && messages.length === 0) {
            let greeting = "Hello! I am your ReclamTrack AI assistant. How can I help you today?";
            
            if (pathname.includes('technical-design')) {
                greeting = "I see you're in the Design Studio. Ready to engineer some new components? I can help you with paths or layout logic.";
            } else if (pathname.includes('map')) {
                greeting = "Monitoring the field? I can help you analyze the geographic density of complaints.";
            } else if (pathname.includes('complaints')) {
                greeting = "Reviewing tickets? I can summarize the most urgent issues for you.";
            }

            setMessages([{ role: 'assistant', content: greeting }]);
        }
    }, [isAISidekickOpen, pathname, messages.length]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated AI response
        setTimeout(() => {
            let reply = "I'm processing your request. As an industrial assistant, I can help you manage tickets, analyze infrastructure, or optimize routes.";
            
            if (input.toLowerCase().includes('urgent')) {
                reply = "Analyzing active tickets... I've identified 3 critical leaks in the Salé sector that require immediate attention.";
            } else if (input.toLowerCase().includes('hello')) {
                reply = "Greetings. System status is nominal. How can I assist your operations?";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            setIsTyping(false);
        }, 1500);
    };

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
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidekick Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-4 top-4 bottom-4 w-96 bg-[#0f0125]/90 backdrop-blur-3xl border border-orange-500/20 rounded-[2.5rem] shadow-2xl z-[70] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-600/20 to-orange-500/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                                    <Bot size={20} className="animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black uppercase italic tracking-tighter leading-none">AI Sidekick</h3>
                                    <p className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mt-1">Operational Assistant</p>
                                </div>
                            </div>
                            <button 
                                onClick={closeAISidekick}
                                className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex flex-col max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                                        msg.role === 'user' 
                                            ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20" 
                                            : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 px-1">
                                        {msg.role === 'assistant' ? 'Agent' : 'You'}
                                    </span>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl w-max border border-white/10">
                                    <Sparkles size={14} className="text-orange-500 animate-spin" />
                                    <span className="text-xs text-slate-400 font-medium">Cognitive processing...</span>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white/5 border-t border-white/10">
                            <div className="relative">
                                <input 
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a command..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-14 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/40 outline-none transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className={cn(
                                        "absolute right-2 top-1.5 bottom-1.5 w-10 flex items-center justify-center rounded-xl transition-all",
                                        !input.trim() || isTyping
                                            ? "text-slate-600"
                                            : "bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:scale-105"
                                    )}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Context Ready</p>
                                <div className="h-px flex-1 bg-white/5" />
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="System Connected" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" title="High Priority Mode" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

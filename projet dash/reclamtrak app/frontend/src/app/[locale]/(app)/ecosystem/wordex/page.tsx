"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  LanguageIcon, 
  CommandLineIcon, 
  CubeTransparentIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export default function WordexDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-indigo-100/70 p-6 md:p-10 font-sans selection:bg-indigo-500/30">
      {/* Abstract Background Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-fuchsia-600 rounded-2xl flex items-center justify-center rotate-3 shadow-xl shadow-indigo-500/10">
            <LanguageIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">WORDEX <span className="text-white/20 font-light">|</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">PRIME</span></h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-400/60">Industrial Linguistic Processing Unit</p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <MagnifyingGlassIcon className="h-4 w-4 text-white/20" />
             </div>
             <input 
               type="text" 
               className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-indigo-500 outline-none w-64 transition-all" 
               placeholder="Filtrer les tokens..."
             />
           </div>
           <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white">
             <AdjustmentsHorizontalIcon className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Analytics Main Card */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
            
            <div className="relative z-10 flex justify-between items-start mb-8">
               <div>
                  <h2 className="text-white font-bold mb-1">Index de Visibilité Industrielle</h2>
                  <p className="text-xs text-white/40">Performance globale sur 30 jours</p>
               </div>
               <div className="text-right">
                  <span className="text-3xl font-black text-white">84.2</span>
                  <p className="text-[10px] text-emerald-400 font-bold tracking-widest mt-1 uppercase">Excellent Node</p>
               </div>
            </div>

            {/* Mock Chart Area */}
            <div className="h-48 flex items-end gap-1 mb-8">
               {[40, 65, 52, 80, 70, 90, 85, 95, 100, 80, 90, 75, 60, 85, 95].map((h, i) => (
                 <div key={i} className="flex-1 bg-white/5 group-hover:bg-indigo-500/10 transition-all rounded-t-sm relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                      className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-indigo-500 to-fuchsia-500 rounded-t-sm"
                    />
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
               {[
                 { label: "Mots-clés Indexés", val: "4,240", shift: "+12%" },
                 { label: "Temps de Réponse IA", val: "24ms", shift: "-4ms" },
                 { label: "Score Sémantique", val: "92%", shift: "+2.4%" },
               ].map((m, i) => (
                 <div key={i}>
                   <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">{m.label}</p>
                   <div className="flex items-center gap-2">
                     <span className="text-white font-bold">{m.val}</span>
                     <span className="text-[10px] text-emerald-400">{m.shift}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
             <div className="bg-gradient-to-br from-indigo-600 to-fuchsia-700 p-8 rounded-3xl shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
               <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity" />
               <RocketLaunchIcon className="w-12 h-12 text-white/20 absolute -right-4 -bottom-4 rotate-12" />
               <h3 className="text-lg font-bold mb-2">Déployer Workflow</h3>
               <p className="text-xs text-white/70 leading-relaxed mb-6">Optimisez vos assets numériques avec notre pipeline de traitement GPU haute performance.</p>
               <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">Activer</button>
             </div>

             <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Status des Nodes</h3>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               </div>
               <div className="space-y-4">
                 {[
                   { name: "Parser_Main", status: "OK", load: "24%" },
                   { name: "IA_Llama_3", status: "BUSY", load: "89%" },
                   { name: "Redis_Sync", status: "OK", load: "12%" },
                 ].map((node, i) => (
                   <div key={i} className="flex justify-between items-center font-mono text-[11px]">
                     <span className="text-white/60">{node.name}</span>
                     <div className="flex items-center gap-3">
                       <span className="bg-white/5 px-2 py-0.5 rounded text-white/40">{node.load}</span>
                       <span className={node.status === 'OK' ? 'text-emerald-400' : 'text-amber-400'}>{node.status}</span>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar / Logs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex-grow">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-6 px-2">Data Stream Live</h3>
            <div className="space-y-6">
              {[
                { time: "14:12", tag: "SYS", msg: "Linguistic mapping complete.", color: "text-indigo-400" },
                { time: "14:28", tag: "NET", msg: "Outbound connection latency: 14ms", color: "text-indigo-400" },
                { time: "14:45", tag: "OPS", msg: "New indexing job started (ID_845)", color: "text-fuchsia-400" },
                { time: "15:01", tag: "ERR", msg: "Invalid token structure at 0xF24", color: "text-red-400" },
                { time: "15:05", tag: "SYS", msg: "Auto-recovery node active.", color: "text-emerald-400" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="pt-1.5 flex flex-col items-center">
                    <div className="w-1 h-1 rounded-full bg-indigo-500/50" />
                    <div className="w-px flex-grow bg-indigo-500/10 mt-2" />
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-white/20">{log.time}</span>
                      <span className={`text-[10px] font-black tracking-widest ${log.color}`}>{log.tag}</span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed group-hover:text-white/80 transition-colors uppercase">{log.msg}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 border-t border-white/10 pt-6">
               <div className="flex items-center gap-3 mb-4">
                 <ShieldCheckIcon className="w-5 h-5 text-indigo-500" />
                 <span className="text-xs font-bold text-white uppercase tracking-widest">Compliance_Verify</span>
               </div>
               <div className="grid grid-cols-2 gap-2">
                 <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                   <p className="text-[9px] text-white/30 mb-1">DATA_SSL</p>
                   <p className="text-[10px] text-emerald-400 font-bold">STABLE</p>
                 </div>
                 <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                   <p className="text-[9px] text-white/30 mb-1">ENCR_256</p>
                   <p className="text-[10px] text-indigo-400 font-bold">READY</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

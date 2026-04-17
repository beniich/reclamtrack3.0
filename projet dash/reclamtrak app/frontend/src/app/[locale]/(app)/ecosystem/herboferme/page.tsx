"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  SunIcon, 
  CloudIcon, 
  BeakerIcon, 
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  MapIcon,
  ChartPieIcon,
  LifebuoyIcon
} from '@heroicons/react/24/outline';

export default function HerbofermeDashboard() {
  return (
    <div className="min-h-screen bg-[#022c22] text-emerald-100 font-sans p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-900/40 border-2 border-emerald-400/20">
            <SunIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white italic">Herbo<span className="text-emerald-400">ferme</span></h1>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/60">Digital Agriculture & Precision Farming OS</p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
             <div className="flex items-center gap-3">
               <CloudIcon className="w-5 h-5 text-emerald-400" />
               <div>
                 <p className="text-[10px] uppercase text-emerald-400/50">Météo Locale</p>
                 <p className="text-sm font-bold text-white">24°C • Ensoleillé</p>
               </div>
             </div>
           </div>
           <div className="w-12 h-12 bg-emerald-900 text-white rounded-2xl flex items-center justify-center border border-emerald-500/20">
             <MapIcon className="w-6 h-6" />
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Farm Telemetry */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Humidité Sol", val: "42%", trend: "Optimal", color: "text-blue-400" },
              { label: "Nutriments NPK", val: "N:82%", trend: "+2%", color: "text-emerald-400" },
              { label: "Surface Active", val: "12.4 Ha", trend: "100%", color: "text-amber-400" },
              { label: "Prévision Récolte", val: "14.2 T", trend: "+12%", color: "text-white" },
            ].map((node, i) => (
              <div key={i} className="bg-emerald-900/20 border border-emerald-500/10 p-5 rounded-3xl backdrop-blur-sm">
                <p className="text-[10px] uppercase font-bold text-emerald-500/50 tracking-widest mb-1">{node.label}</p>
                <h3 className="text-2xl font-black text-white">{node.val}</h3>
                <span className={`text-[10px] font-bold ${node.color}`}>{node.trend}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <GlobeAltIcon className="w-40 h-40" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ChartPieIcon className="w-5 h-5 text-emerald-400" />
                Distribution des Cultures
              </h2>
              
              <div className="space-y-6">
                {[
                  { name: "Blé Tendre", area: "5.2 Ha", pct: 45, color: "bg-amber-400" },
                  { name: "Olives (Arbequina)", area: "3.8 Ha", pct: 32, color: "bg-emerald-500" },
                  { name: "Maraîchage Bio", area: "2.4 Ha", pct: 18, color: "bg-blue-400" },
                  { name: "Autres", area: "1.0 Ha", pct: 5, color: "bg-slate-500" },
                ].map((crop, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-white/80">{crop.name} <span className="text-white/20 ml-2 font-normal">{crop.area}</span></span>
                      <span className="text-white/40">{crop.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${crop.pct}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full ${crop.color}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-950 p-6 rounded-[2.5rem] border border-emerald-500/10 flex flex-col h-full relative overflow-hidden">
             <div className="absolute bottom-0 right-0 p-6 opacity-20">
               <BeakerIcon className="w-24 h-24" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500/50 mb-6">Expertise IA</h3>
             <div className="bg-emerald-900/40 p-5 rounded-2xl mb-6 border border-emerald-400/10">
                <p className="text-sm leading-relaxed text-emerald-100/90 italic">
                  "L'IA détecte un risque d'infestation mineure sur la parcelle B-12. Activation suggérée du système de pulvérisation naturelle à 18h00."
                </p>
             </div>
             <button className="w-full py-3 bg-emerald-500 text-emerald-950 font-black uppercase text-xs tracking-widest rounded-xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all">
                Appliquer Protocole
             </button>
             
             <div className="mt-8 space-y-4">
                <p className="text-[10px] font-bold text-emerald-500/30 uppercase tracking-[0.3em]">Alertes Sensores</p>
                {[
                  { msg: "Capteur B4: Batterie Faible", time: "12m", priority: "Low" },
                  { msg: "Irrigation Zone 3: Active", time: "1h", priority: "Inf" },
                  { msg: "Fertilisation prévue demain", time: "2h", priority: "Inf" },
                ].map((alert, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-emerald-100/40">{alert.msg}</span>
                    <span className="text-[9px] font-mono text-emerald-500/40">{alert.time}</span>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                 <LifebuoyIcon className="w-6 h-6 text-emerald-400" />
               </div>
               <div>
                 <p className="text-xs font-bold text-white">Centre de Support</p>
                 <p className="text-[10px] text-emerald-400/40">Connecté avec Expert Bio</p>
               </div>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
}

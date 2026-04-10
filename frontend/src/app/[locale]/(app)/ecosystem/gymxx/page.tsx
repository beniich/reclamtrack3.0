"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrophyIcon, 
  UserGroupIcon, 
  BoltIcon, 
  ArrowTrendingUpIcon,
  FireIcon,
  HeartIcon,
  AcademicCapIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function GymXXDashboard() {
  return (
    <div className="min-h-screen bg-[#08090b] text-cyan-100 p-6 md:p-10 font-sans selection:bg-cyan-500/30">
      {/* Background patterns */}
      <div className="fixed top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[150px] -mr-96 -mt-96" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center rotate-45 shadow-2xl shadow-cyan-500/20">
            <BoltIcon className="w-8 h-8 text-black -rotate-45" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Gym<span className="text-cyan-500">XX</span></h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-cyan-400/60">High Performance Member OS</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
             <span className="text-xs font-black uppercase text-white">Live_Sync</span>
           </div>
           <button className="px-6 py-2 bg-cyan-500 text-black font-black uppercase text-xs tracking-widest rounded-sm hover:scale-105 transition-all">
             Nouveau Membre
           </button>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Stats */}
        <div className="space-y-6">
           {[
             { label: "Membres Actifs", val: "842", trend: "+12", icon: UserGroupIcon, color: "text-cyan-400" },
             { label: "Check-ins Today", val: "156", trend: "High", icon: RocketIcon, color: "text-white" },
             { label: "Retention Rate", val: "94.2%", trend: "+2.4%", icon: FireIcon, color: "text-orange-500" },
           ].map((stat, i) => (
             <div key={i} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] hover:border-cyan-500/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 bg-white/5 flex items-center justify-center rounded-xl group-hover:bg-cyan-500 group-hover:text-black transition-all ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stat.label}</span>
                </div>
                <h3 className="text-3xl font-black text-white">{stat.val}</h3>
                <p className={`text-[10px] font-black mt-1 ${stat.color}`}>{stat.trend}</p>
             </div>
           ))}
        </div>

        {/* Center Activity */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden h-full">
              <div className="flex justify-between items-center mb-10">
                 <div>
                   <h2 className="text-xl font-black text-white uppercase italic">Classes en Direct</h2>
                   <p className="text-xs text-white/20">Planning de la session matinale</p>
                 </div>
                 <TrophyIcon className="w-8 h-8 text-cyan-500 opacity-20" />
              </div>
              
              <div className="space-y-6">
                 {[
                   { time: "09:00", name: "Crossfit Advanced", trainer: "Coach Karim", load: 85, color: "bg-cyan-500" },
                   { time: "10:30", name: "Yoga Flow", trainer: "Sarah L.", load: 40, color: "bg-emerald-500" },
                   { time: "11:45", name: "HIIT Session", trainer: "Marc V.", load: 95, color: "bg-orange-500" },
                 ].map((cls, i) => (
                   <div key={i} className="flex flex-col gap-2 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all cursor-pointer">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-4">
                            <span className="text-xl font-black text-white/20 font-mono tracking-tighter">{cls.time}</span>
                            <div>
                               <p className="font-black text-white uppercase text-sm tracking-tight">{cls.name}</p>
                               <p className="text-[10px] font-bold text-white/30 uppercase">{cls.trainer}</p>
                            </div>
                         </div>
                         <span className="text-[10px] font-mono font-black py-1 px-3 bg-white/5 rounded-full text-white/50 tracking-widest">{cls.load}% Load</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${cls.load}%` }}
                           transition={{ duration: 1 }}
                           className={`h-full ${cls.color}`} 
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Insights */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-cyan-900/20 to-black p-8 rounded-[3rem] border border-cyan-500/10 text-center relative overflow-hidden group">
              <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
                 <FireIcon className="w-10 h-10 text-cyan-500" />
              </div>
              <h3 className="text-lg font-black text-white uppercase italic mb-3">Goal_Optimizer IX</h3>
              <p className="text-xs leading-relaxed text-white/40 mb-8 italic">"Augmentez l'intensité des cardio-trainings de 15% le mardi pour compenser la baisse d'activité saisonnière constatée l'an dernier."</p>
              <button className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-cyan-500 transition-colors shadow-2xl shadow-cyan-500/10">Appliquer Stratégie</button>
           </div>

           <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
              <div className="flex items-center gap-3 mb-6">
                 <ClockIcon className="w-5 h-5 text-cyan-500" />
                 <h3 className="text-xs font-black uppercase tracking-widest text-white/30">System_Trace</h3>
              </div>
              <div className="space-y-4 font-mono text-[9px]">
                 <div className="flex justify-between opacity-50"><span className="text-cyan-400">14:02</span> <span>RFID_UID: 4825 In</span></div>
                 <div className="flex justify-between opacity-50"><span className="text-cyan-400">14:15</span> <span>GATE_B: Opened</span></div>
                 <div className="flex justify-between opacity-50"><span className="text-cyan-400">14:38</span> <span>RFID_UID: 2199 In</span></div>
                 <div className="flex justify-between border-t border-white/5 pt-2 mt-2 font-bold"><span className="text-white">Active_Now</span> <span>42 Members</span></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// Minimal placeholder component since RocketIcon is not imported
function RocketIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.585 15.585a6.267 6.267 0 01-8.84 0 6.267 6.267 0 010-8.84 6.267 6.267 0 018.84 0 6.267 6.267 0 010 8.84zM15 15l5 5M9 9l-4-4" />
    </svg>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BuildingOffice2Icon as HotelIcon, 
  KeyIcon, 
  UserGroupIcon, 
  SparklesIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function HospitaliaDashboard() {
  return (
    <div className="min-h-screen bg-[#05070a] text-amber-100/70 p-6 md:p-10 font-sans">
      {/* Background patterns */}
      <div className="fixed top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500 rounded-full blur-[150px] -mr-96 -mt-96" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-amber-900/30">
            <HotelIcon className="w-9 h-9 text-slate-900" />
          </div>
          <div>
            <h1 className="text-4xl font-light tracking-tight text-white uppercase"><span className="font-black text-amber-500">Hospitalia</span> Harmony</h1>
            <p className="text-[10px] uppercase tracking-[0.6em] font-medium text-amber-200/40">Luxury PMS & Guest Management OS</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2">
             <MapPinIcon className="w-5 h-5 text-amber-500" />
             <span className="text-sm font-medium text-white italic">Marrakech, Palmeraie</span>
           </div>
           <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 p-1">
             <div className="w-full h-full rounded-full bg-amber-500/10 flex items-center justify-center">
               <span className="text-amber-500 text-xs font-bold">JD</span>
             </div>
           </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Reservation Grid */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Occupation", val: "92%", color: "amber-500" },
              { label: "Check-ins", val: "14", color: "blue-400" },
              { label: "Check-outs", val: "8", color: "orange-400" },
              { label: "ADR (MAD)", val: "2,450", color: "emerald-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl">
                <p className="text-[10px] uppercase font-bold text-white/20 tracking-widest mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black text-white">{stat.val}</h3>
                <div className={`h-1 w-12 bg-${stat.color} mt-4 rounded-full`} />
              </div>
            ))}
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl">
             <div className="flex justify-between items-center mb-10">
               <h2 className="text-xl font-bold text-white flex items-center gap-3">
                 <KeyIcon className="w-6 h-6 text-amber-500" />
                 État des Chambres
               </h2>
               <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Disponible</span>
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" /> Occupée</span>
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> Maintenance</span>
               </div>
             </div>

             <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {Array.from({ length: 24 }).map((_, i) => {
                  const status = i % 10 === 0 ? 'bg-red-500' : i % 3 === 0 ? 'bg-amber-500' : 'bg-emerald-500';
                  return (
                    <div key={i} className="group relative flex flex-col items-center">
                       <div className={`w-full aspect-square rounded-2xl ${status} bg-opacity-20 border border-white/5 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer overflow-hidden`}>
                          <span className="text-xs font-bold text-white mb-[-2px]">10{i+1}</span>
                          <div className={`absolute bottom-0 left-0 w-full h-1 ${status}`} />
                       </div>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>

        {/* Guest Services / Concierge */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-gradient-to-br from-amber-500/10 to-orange-950/20 border border-amber-500/10 p-10 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden group">
              <SparklesIcon className="absolute -right-10 -bottom-10 w-48 h-48 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000" />
              <h3 className="text-2xl font-light text-white mb-4 italic">Service Concierge IA</h3>
              <p className="text-sm leading-relaxed text-amber-100/60 mb-8">"L'Invité de la Suite Impériale a réservé un vol pour 18h. Le transfert VIP est positionné et la valise sera récupérée à 16h30."</p>
              <button className="w-full py-4 bg-amber-500 text-slate-950 font-black uppercase text-xs tracking-widest rounded-2xl shadow-2xl shadow-amber-500/20 hover:scale-[1.03] transition-all">
                Détails Transfert
              </button>
           </div>

           <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6">
                <BellAlertIcon className="w-6 h-6 text-amber-500" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/20">Alertes Service</h3>
              </div>
              <div className="space-y-6">
                 {[
                   { msg: "Room Service: 204 (Retard)", time: "12min", color: "text-red-400" },
                   { msg: "Housekeeping: 108 Prête", time: "Now", color: "text-emerald-400" },
                   { msg: "Valet: Arrivée prévue (Bentley)", time: "5min", color: "text-white" },
                 ].map((alert, i) => (
                   <div key={i} className="flex justify-between items-center group">
                      <p className={`text-xs font-medium ${alert.color} group-hover:translate-x-1 transition-transform`}>{alert.msg}</p>
                      <span className="text-[10px] font-mono opacity-30">{alert.time}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="flex gap-4">
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-center">
                 <CalendarDaysIcon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                 <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Réservations</p>
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-center">
                 <CreditCardIcon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                 <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Paiements</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

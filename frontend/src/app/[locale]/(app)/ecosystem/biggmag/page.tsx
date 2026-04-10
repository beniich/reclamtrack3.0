"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  ShoppingBagIcon, 
  ArrowPathIcon, 
  TagIcon,
  TruckIcon,
  ChatBubbleLeftIcon,
  ChartBarIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';

export default function BiggMagDashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-600 p-6 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-rose-200">
            <ShoppingCartIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bigg<span className="text-rose-500">Mag</span></h1>
            <p className="text-xs text-rose-400 font-bold uppercase tracking-widest">Global Marketplace Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-rose-500 transition-all shadow-lg">
            Nouveau Produit
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: "Ventes Hebdo", val: "42 850 MAD", shift: "+18%", icon: ChartBarIcon, color: "rose" },
             { label: "Commandes", val: "124", shift: "+5", icon: ShoppingBagIcon, color: "blue" },
             { label: "Taux Conv.", val: "4.2%", shift: "-0.2%", icon: TagIcon, color: "amber" },
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
             >
               <div className={`w-10 h-10 bg-${stat.color}-50 text-${stat.color}-500 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                 <stat.icon className="w-6 h-6" />
               </div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
               <div className="flex justify-between items-baseline">
                 <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                 <span className={`text-[11px] font-bold ${stat.shift.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.shift}</span>
               </div>
             </motion.div>
           ))}
           
           {/* Detailed Table / Feed */}
           <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm italic text-sm">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-lg font-bold text-slate-900 not-italic">Commandes Récentes</h2>
               <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-100" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-100" />
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
               </div>
             </div>
             
             <div className="space-y-6">
               {[
                 { id: "#BM-428", user: "Meryem K.", date: "10 min ago", price: "450 MAD", status: "Expédié" },
                 { id: "#BM-427", user: "Youssef T.", date: "45 min ago", price: "1200 MAD", status: "Traitement" },
                 { id: "#BM-426", user: "Sara H.", date: "2 hours ago", price: "240 MAD", status: "Livré" },
                 { id: "#BM-425", user: "Amine D.", date: "4 hours ago", price: "980 MAD", status: "Expédié" },
               ].map((order, i) => (
                 <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-4 rounded-xl transition-all">
                   <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-slate-100" />
                     <div>
                       <p className="font-bold text-slate-900 not-italic">{order.id} <span className="text-slate-400 font-normal ml-2">{order.user}</span></p>
                       <p className="text-[10px] text-slate-400 font-medium">{order.date}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-8">
                     <span className="font-bold text-slate-900">{order.price}</span>
                     <span className={`text-[10px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest ${
                       order.status === 'Expédié' ? 'bg-blue-50 text-blue-500' : 
                       order.status === 'Livré' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
                     }`}>{order.status}</span>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-rose-500 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-rose-200 relative overflow-hidden group">
            <Squares2X2Icon className="absolute -right-4 -top-4 w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-black mb-2 italic">Insights IA</h3>
            <p className="text-sm text-rose-100 font-medium leading-relaxed mb-6">"Le produit 'Sneakers Air Pro' a un taux de rebond de 40%. Suggère d'optimiser les images et de réduire le prix de 5%."</p>
            <button className="w-full py-3 bg-white text-rose-500 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-[1.03] transition-all">Optimiser Maintenant</button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <TruckIcon className="w-6 h-6 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Logistique Live</h3>
             </div>
             <div className="space-y-6">
               {[
                 { step: "Traitement", date: "Now", active: true },
                 { step: "En route vers hub", date: "Pending" },
                 { step: "Livraison prévue", date: "Tomorrow" },
               ].map((step, i) => (
                 <div key={i} className="flex gap-4 items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${step.active ? 'bg-rose-500 border-rose-500 ring-4 ring-rose-100' : 'bg-slate-200 border-slate-200'}`} />
                    <div>
                      <p className={`text-xs font-bold ${step.active ? 'text-slate-900' : 'text-slate-400'}`}>{step.step}</p>
                      <p className="text-[10px] text-slate-400">{step.date}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all">
             <div className="flex items-center gap-3">
               <ChatBubbleLeftIcon className="w-5 h-5 text-slate-400 group-hover:text-rose-500" />
               <span className="text-sm font-bold text-slate-900">Support Client</span>
             </div>
             <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

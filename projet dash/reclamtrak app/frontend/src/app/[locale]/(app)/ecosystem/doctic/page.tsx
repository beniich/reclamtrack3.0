"use client";

import React from 'react';
import { motion } from 'framer-motion';
// ... code continues ...
import JsonLd from '@/components/seo/JsonLd';
import { 
  HeartIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  ClipboardDocumentCheckIcon,
  VideoCameraIcon,
  BeakerIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function DocticDashboard() {
  const stats = [
    { label: "Consultations", value: "128", trend: "+12%", color: "text-emerald-400" },
    { label: "Nouveaux Patients", value: "42", trend: "+5%", color: "text-blue-400" },
    { label: "Revenu (MAD)", value: "32.4K", trend: "+8%", color: "text-amber-400" },
    { label: "Télé-consul.", value: "18", trend: "+24%", color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-300 font-sans p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white font-semibold">Doctic <span className="text-emerald-500 italic">Medical OS</span></h1>
          <p className="text-slate-500 text-sm">Bonjour, Dr. Benali • Vendredi 10 Avril 2026</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/20 transition-all">
            Nouvelle Consultation
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#161b22] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group"
          >
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <span className={`text-xs font-mono ${stat.color}`}>{stat.trend}</span>
            </div>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-2/3 group-hover:w-3/4 transition-all duration-1000" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#161b22] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-500" />
                Planning du jour
              </h2>
              <button className="text-xs text-emerald-500 hover:underline">Voir tout</button>
            </div>
            
            <div className="space-y-4">
              {[
                { time: "09:00", patient: "Ahmed Mansouri", type: "Consultation Générale", status: "Terminé" },
                { time: "10:30", patient: "Sara El Fassi", type: "Suivi Post-Op", status: "En cours", active: true },
                { time: "11:15", patient: "Karim Tazi", type: "Téléconsultation", status: "En attente" },
                { time: "14:00", patient: "Yassine Drissi", type: "Vaccination", status: "En attente" },
              ].map((rdv, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${rdv.active ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 bg-slate-900/50'}`}>
                  <span className="text-sm font-mono text-slate-500 w-12">{rdv.time}</span>
                  <div className="flex-grow">
                    <p className="text-sm font-semibold text-white">{rdv.patient}</p>
                    <p className="text-xs text-slate-500">{rdv.type}</p>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${
                    rdv.status === 'En cours' ? 'bg-blue-500/20 text-blue-400' : 
                    rdv.status === 'En attente' ? 'bg-slate-500/20 text-slate-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {rdv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-emerald-900/20 border border-emerald-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white flex items-center gap-2 mb-4">
              <BeakerIcon className="w-5 h-5 text-emerald-400" />
              Doctic AI <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full ml-2">Beta</span>
            </h2>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Basé sur les derniers rapports d'analyses du Patient El Fassi, l'IA suggère une vérification de la tension artérielle lors de la prochaine séance.
            </p>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 bg-emerald-500 text-white rounded-lg font-medium">Accepter Suggestion</button>
              <button className="text-xs px-3 py-1.5 bg-white/5 text-slate-300 rounded-lg">Ignorer</button>
            </div>
          </div>
        </div>

        {/* Sidebar Mini Components */}
        <div className="space-y-6">
          <div className="bg-[#161b22] border border-white/5 rounded-2xl p-6 text-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <VideoCameraIcon className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-white font-medium mb-1">Salle d'attente virtuelle</h3>
            <p className="text-xs text-slate-500 mb-4">3 patients attendent en ligne</p>
            <button className="w-full py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20">
              Ouvrir la Salle
            </button>
          </div>

          <div className="bg-[#161b22] border border-white/5 rounded-2xl p-6">
            <h2 className="text-sm font-medium text-white mb-4 uppercase tracking-widest text-slate-500">Flux d'activité</h2>
            <div className="space-y-4">
              {[
                { icon: UserGroupIcon, text: "Patient ajouté: Drissi Y.", time: "2m" },
                { icon: ClipboardDocumentCheckIcon, text: "Ordonnance signée", time: "15m" },
                { icon: ChatBubbleLeftRightIcon, text: "Nouveau message patient", time: "1h" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <activity.icon className="w-4 h-4 text-emerald-500" />
                  <p className="text-xs text-slate-300 flex-grow">{activity.text}</p>
                  <span className="text-[10px] text-slate-600 font-mono">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

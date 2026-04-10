"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  UserCircleIcon, 
  ChatBubbleBottomCenterTextIcon,
  VideoCameraIcon,
  ClockIcon,
  CheckBadgeIcon,
  Square3Stack3DIcon
} from '@heroicons/react/24/outline';

export default function MadrassaDashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-600 p-6 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <AcademicCapIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Madrassa <span className="text-indigo-600">LMS</span></h1>
            <p className="text-sm text-slate-400 font-medium">Portail Administratif • Campus de Casablanca</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-900">Prof. Yasmine Amrani</p>
            <p className="text-xs text-slate-400">Directrice Pédagogique</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Stats Column */}
        <div className="space-y-6">
          {[
            { label: "Élèves Inscrits", value: "1,240", icon: UserCircleIcon, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Cours Actifs", value: "48", icon: BookOpenIcon, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Note Moyenne", value: "16.5", icon: CheckBadgeIcon, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </motion.div>
          ))}

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
               <Square3Stack3DIcon className="w-20 h-20 -mr-6 -mt-6" />
            </div>
            <h4 className="text-sm font-bold mb-2">Mise à jour Système</h4>
            <p className="text-xs text-indigo-100 leading-relaxed mb-4">La nouvelle version du module d'examens est disponible. Essayez l'auto-correction par IA.</p>
            <button className="text-xs bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold hover:shadow-lg transition-all">En savoir plus</button>
          </div>
        </div>

        {/* Middle Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Emploi du temps aujourd'hui</h2>
              <ClockIcon className="w-5 h-5 text-slate-400" />
            </div>
            
            <div className="space-y-4">
              {[
                { time: "08:30 - 10:00", subject: "Mathématiques", teacher: "M. Khalid", class: "2nde B", status: "Terminé" },
                { time: "10:15 - 11:45", subject: "Physique-Chimie", teacher: "Mme Drissi", class: "Terminal S", status: "En cours", active: true },
                { time: "14:00 - 15:30", subject: "Histoire Géo", teacher: "Mme Bensaid", class: "3ème A", status: "Prochainement" },
              ].map((lesson, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${lesson.active ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-50 bg-slate-50/50'}`}>
                   <div className="text-center w-24 border-r border-slate-200 pr-4">
                     <p className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{lesson.time}</p>
                   </div>
                   <div className="flex-grow">
                     <p className="text-sm font-bold text-slate-900">{lesson.subject}</p>
                     <p className="text-xs text-slate-500">{lesson.teacher} • {lesson.class}</p>
                   </div>
                   <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                     lesson.status === 'En cours' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                   }`}>{lesson.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6 font-mono">Classe Virtuelle (Madrassa Live)</h2>
            <div className="aspect-video bg-slate-900 rounded-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                 <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                   <span className="text-xs text-white font-bold uppercase tracking-widest">En Direct</span>
                 </div>
                 <h3 className="text-white font-bold">Introduction à l'Algèbre Linéaire</h3>
                 <p className="text-xs text-slate-300">42 élèves regardent actuellement</p>
               </div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer">
                 <VideoCameraIcon className="w-16 h-16 text-white" />
               </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Notifications</h2>
             <div className="space-y-6">
               {[
                 { user: "Ahmed", action: "a rendu le devoir de Math", time: "5 min", color: "bg-blue-500" },
                 { user: "System", action: "Maintenance prévue à 20h", time: "1h", color: "bg-amber-500" },
                 { user: "Mme Drissi", action: "a partagé un nouveau support", time: "2h", color: "bg-emerald-500" },
               ].map((notif, i) => (
                 <div key={i} className="flex gap-3 items-start">
                   <div className={`w-8 h-8 rounded-xl ${notif.color} opacity-10 flex-shrink-0`} />
                   <div className="relative">
                     <p className="text-xs"><span className="font-bold text-slate-900">{notif.user}</span> {notif.action}</p>
                     <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Messages Récents</h2>
             <div className="space-y-4">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0" />
                   <div className="flex-grow">
                     <div className="h-2 w-20 bg-slate-100 rounded mb-2" />
                     <div className="h-1.5 w-full bg-slate-50 rounded" />
                   </div>
                 </div>
               ))}
             </div>
             <button className="w-full mt-6 py-3 border border-indigo-100 text-indigo-600 font-bold rounded-2xl text-xs hover:bg-indigo-50 transition-all">
               Voir la messagerie
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

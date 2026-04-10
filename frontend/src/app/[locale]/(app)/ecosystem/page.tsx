"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingLibraryIcon, // Gouvernance
  HeartIcon, // Santé
  ServerStackIcon, // Infrastructure
  BuildingOffice2Icon, // Hospitalité
  AcademicCapIcon, // Education
  WrenchScrewdriverIcon, // Industrie/Bolt/Mecanicpro
  ShoppingCartIcon, // E-commerce
  BoltIcon, // Cloud/Nexus
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function EcosystemDashboard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "Gouvernance Publique",
      icon: BuildingLibraryIcon,
      status: "Protocol Active",
      description: "Solution complète pour la gestion des réclamations et le suivi citoyen.",
      color: "from-blue-500 to-indigo-600",
      bgHover: "hover:bg-blue-50/5",
      link: "/dashboard",
      repo: "reclamtrack3.0"
    },
    {
      title: "Santé Digitale",
      icon: HeartIcon,
      status: "Protocol Active",
      description: "Optimisation de l'écosystème hospitalier et du suivi patient (Doctic Care).",
      color: "from-emerald-400 to-teal-500",
      bgHover: "hover:bg-emerald-50/5",
      link: "/ecosystem/doctic",
      repo: "doctic-care",
    },
    {
      title: "Infrastructure & Web",
      icon: ServerStackIcon,
      status: "Protocol Active",
      description: "Infrastructure haute performance, gestion DevOps, Cloud et réseau (Nexus).",
      color: "from-gray-700 to-gray-900",
      bgHover: "hover:bg-gray-50/5",
      link: "/ecosystem/nexus",
      repo: "herbute",
    },
    {
      title: "Hospitalité",
      icon: BuildingOffice2Icon,
      status: "Protocol Active",
      description: "Système complet de PMS pour la gestion des hôtels et hébergements.",
      color: "from-amber-400 to-orange-500",
      bgHover: "hover:bg-amber-50/5",
      link: "/ecosystem/hospitalia",
      repo: "hospitalia-harmony",
    },
    {
      title: "Éducation & Campus",
      icon: AcademicCapIcon,
      status: "Protocol Active",
      description: "Gestion des écoles, universités, élèves, professeurs et cours en ligne.",
      color: "from-purple-500 to-fuchsia-600",
      bgHover: "hover:bg-purple-50/5",
      link: "/ecosystem/madrassa",
      repo: "madrassa",
    },
    {
      title: "E-Commerce & Retail",
      icon: ShoppingCartIcon,
      status: "Protocol Active",
      description: "Marketplace digitale, expéditions, et gestion des commandes (BiggMag).",
      color: "from-pink-500 to-rose-600",
      bgHover: "hover:bg-pink-50/5",
      link: "/ecosystem/biggmag",
      repo: "biggmag_marketplace",
    },
    {
      title: "Agriculture & Écologie",
      icon: BoltIcon,
      status: "Protocol Active",
      description: "Suivi des cultures, gestion des exploitations et fermes digitales (Herboferme).",
      color: "from-green-500 to-lime-600",
      bgHover: "hover:bg-green-50/5",
      link: "/ecosystem/herboferme",
      repo: "herboferme",
    },
    {
      title: "Performance & Sport",
      icon: WrenchScrewdriverIcon,
      status: "Protocol Active",
      description: "Gestion des clubs de sport, performance athlétique et membres (GymXX).",
      color: "from-cyan-500 to-blue-600",
      bgHover: "hover:bg-cyan-50/5",
      link: "/ecosystem/gymxx",
      repo: "gymxx",
    },
    {
      title: "Industrie & Flotte",
      icon: WrenchScrewdriverIcon,
      status: "Protocol Active",
      description: "Solution sur mesure pour ingénieurs, mécaniciens et gestion de flotte (MecanicPro).",
      color: "from-orange-500 to-red-600",
      bgHover: "hover:bg-orange-50/5",
      link: "/ecosystem/mecanicpro",
      repo: "mecanicpro",
    },
    {
      title: "Analytics & SEO",
      icon: ChartPieIcon,
      status: "Protocol Active",
      description: "Unité de traitement linguistique industrielle et métriques SEO (Wordex).",
      color: "from-indigo-500 to-fuchsia-600",
      bgHover: "hover:bg-indigo-50/5",
      link: "/ecosystem/wordex",
      repo: "wordex",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 text-white p-8 md:p-14 overflow-hidden relative">
      {/* Decorative Blur Overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto mb-16 relative z-10"
      >
        <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm md:text-base font-medium text-slate-300 mb-4 backdrop-blur-md">
          ✨ Écosystème Global
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Portail <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Multi-Projets</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">
          Centralisez la navigation vers toutes vos plateformes métiers. Activez vos environnements d'un simple clic pour la santé, l'industrie, ou l'éducation.
        </p>
      </motion.div>

      {/* Grid of Projects */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md overflow-hidden transition-all duration-300 ${project.bgHover} hover:border-white/20`}
            >
              {/* Animated Gradient Background on Hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Protocol Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.color} bg-opacity-20 shadow-lg`}>
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">{project.status}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* GitHub Ref & Link */}
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono bg-white/5 px-2 py-1 rounded">
                    {project.repo}
                  </span>
                  
                  <Link href={project.link} className="flex items-center gap-1 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                    Lancer <ChevronRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Contact */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="max-w-7xl mx-auto mt-20 relative z-10"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-md flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">Besoin d'une solution sur mesure ?</h2>
            <p className="text-slate-400">Nos ingénieurs conçoivent votre écosystème personnalisé de A à Z. Contactez-nous pour intégrer un nouveau pipeline.</p>
          </div>
          
          <button className="relative z-10 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-white/10">
            Contactez le support
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

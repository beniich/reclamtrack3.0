
'use client';

import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  size?: number;
}

export function AnimatedLogo({ className = "", size = 40 }: AnimatedLogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      
      {/* 1. Global Aura */}
      <motion.div
        className="absolute inset-0 bg-amber-400/10 rounded-full blur-[60px]"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* 2. Main Logo Container */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Base Logo Image */}
        <img 
          src="/assets/logo/logo.png" 
          alt="ReclamTrack Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.15)]"
        />

        {/* ⚡ BRIGHTENING THE TOP CLOUD NODES (Boutons au dessus du nuage) ⚡ */}
        {/* Adds glowing points specifically on the rounded peaks of the cloud */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Left Top Node Glow */}
            <motion.div 
               className="w-[15%] h-[15%] bg-white/40 rounded-full blur-md"
               animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
               transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
               style={{ position: 'absolute', top: '15%', left: '25%', mixBlendMode: 'screen' }}
            />
            {/* Center Top Node Glow (Highest peak) */}
            <motion.div 
               className="w-[20%] h-[15%] bg-white/50 rounded-full blur-lg"
               animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.15, 1] }}
               transition={{ duration: 3, repeat: Infinity }}
               style={{ position: 'absolute', top: '10%', left: '40%', mixBlendMode: 'screen' }}
            />
            {/* Right Top Node Glow */}
            <motion.div 
               className="w-[15%] h-[15%] bg-white/40 rounded-full blur-md"
               animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
               transition={{ duration: 3, repeat: Infinity, delay: 1 }}
               style={{ position: 'absolute', top: '18%', right: '23%', mixBlendMode: 'screen' }}
            />
            
            {/* Scanning Light Strip (Extra-clear for the top) */}
            <motion.div 
              className="absolute w-full h-[5%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
              animate={{ translateX: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
              style={{ top: '15%', rotate: '-15deg' }}
            />
        </div>

        {/* ⚡ THE ZIGZAG BOLT EFFECT (REMAINING SYNCED) ⚡ */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute overflow-visible filter drop-shadow-[0_0_8px_#fbbf24]">
                <defs>
                    <linearGradient id="bolt-grad-v2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="60%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#fff" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M 52 35 L 43 51 L 54 49 L 46 68"
                    fill="none"
                    stroke="url(#bolt-grad-v2)"
                    strokeWidth="2.0" // Thicker for better visibility
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ opacity: [0, 1, 0, 1, 0, 0] }}
                    transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 1.2 }}
                />
            </svg>
            <motion.div 
               className="w-[10%] h-[10%] bg-amber-200 rounded-full blur-[10px] opacity-70"
               animate={{ opacity: [0.1, 0.6, 0.1] }}
               transition={{ duration: 1, repeat: Infinity }}
               style={{ position: 'absolute', top: '50%', left: '48%', mixBlendMode: 'screen' }}
            />
        </div>
      </motion.div>
    </div>
  );
}

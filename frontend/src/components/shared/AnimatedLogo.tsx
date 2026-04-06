
'use client';

import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  size?: number;
}

export function AnimatedLogo({ className = "", size = 40 }: AnimatedLogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-purple-500/20 rounded-xl blur-md"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Logo Image */}
      <motion.div
        className="relative z-10 w-full h-full"
        animate={{
          y: [0, -3, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src="/assets/logo/logo.png" 
          alt="ReclamTrack Logo" 
          className="w-full h-full object-contain logo-cloud"
        />
        
        {/* Animated Bolt Overlay (Simple CSS effect via class) */}
        <div className="absolute inset-0 pointer-events-none logo-bolt" />
      </motion.div>
    </div>
  );
}

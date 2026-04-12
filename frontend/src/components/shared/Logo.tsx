'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
    variant?: 'white' | 'orange';
}

export function Logo({ className = "", size = 32, showText = false, variant = 'orange' }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <motion.div 
                className="relative flex items-center justify-center p-1"
                style={{ width: size, height: size }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Branding Icon Container */}
                <div className="absolute inset-0 bg-transparent rounded-xl border-orange-500/20 rotate-3 group-hover:rotate-6 transition-transform"></div>
                
                {/* Purple Shield Logo Image */}
                <img 
                    src="/assets/shield_logo.png" 
                    alt="ReclamTrack Pro Logo"
                    className="relative z-10 w-full h-full object-contain drop-shadow-lg"
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-full animate-pulse-slow"></div>
            </motion.div>

            {showText && (
                <div className="flex flex-col">
                    <h1 className="text-xl font-display font-black tracking-tighter uppercase italic leading-none">
                        <span className="text-slate-900 dark:text-white">RECLAMTRACK</span>
                        <span className="text-orange-500 ml-1.5 not-italic">PRO</span>
                    </h1>
                </div>
            )}
        </div>
    );
}

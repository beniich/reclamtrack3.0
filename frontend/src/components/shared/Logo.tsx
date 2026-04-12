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
                className="relative flex items-center justify-center"
                style={{ width: size, height: size }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Orange Background/Icon Container */}
                <div className="absolute inset-0 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20 rotate-3 group-hover:rotate-6 transition-transform"></div>
                
                {/* Cloud Icon */}
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="relative z-10 w-[70%] h-[70%] text-white"
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M17.5 19c.721 0 1.441-.312 1.968-.936a2.83 2.83 0 0 0 .532-2.564 3.1 3.1 0 0 0-1.85-2.001 7.42 7.42 0 0 0-14.3-1.63 4.3 4.3 0 0 0-1.25 8.131c.465.133.935.2 1.4.2z" />
                </svg>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-orange-500/30 blur-xl rounded-full animate-pulse-slow"></div>
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

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export function Button({ 
  className, 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  disabled,
  ...props 
}: ButtonProps) {
  
  const variants = {
    primary: 'bg-orange-600 dark:bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 border-none',
    secondary: 'bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 shadow-lg',
    outline: 'bg-transparent border-2 border-slate-200 dark:border-orange-500/20 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-orange-500/10 active:scale-95',
    ghost: 'bg-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-[10px]',
    md: 'px-6 py-2.5 text-xs',
    lg: 'px-8 py-3.5 text-sm',
    xl: 'px-10 py-5 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-display font-black uppercase tracking-widest italic transition-all duration-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative group',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : null}
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

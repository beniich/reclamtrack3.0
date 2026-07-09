'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1 w-24 h-10 animate-pulse" />
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="flex bg-slate-100 dark:bg-background border border-slate-200 dark:border-primary/20 rounded-full p-1 relative shadow-inner">
      {/* Active Indicator Slider */}
      <motion.div
        className="absolute h-8 w-11 bg-white dark:bg-primary rounded-full shadow-md z-0"
        animate={{ x: isDark ? 44 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Light Toggle */}
      <button type="button"
        onClick={() => setTheme('light')}
        className={cn(
          "relative z-10 w-11 h-8 flex items-center justify-center transition-colors",
          !isDark ? "text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        )}
        title="Mode Clair"
        aria-label="Activer le mode clair"
      >
        <Sun className="w-4 h-4" />
      </button>

      {/* Dark Toggle */}
      <button type="button"
        onClick={() => setTheme('dark')}
        className={cn(
          "relative z-10 w-11 h-8 flex items-center justify-center transition-colors",
          isDark ? "text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        )}
        title="Mode Sombre"
        aria-label="Activer le mode sombre"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}

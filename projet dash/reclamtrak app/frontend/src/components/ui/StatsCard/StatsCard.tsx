'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StatsCardProps {
    title: string
    value: string | number
    subtitle?: string
    icon: LucideIcon
    trend?: {
        value: string
        isPositive: boolean
    }
    color?: 'blue' | 'green' | 'amber' | 'red' | 'purple'
    className?: string
    style?: React.CSSProperties
}

export function StatsCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    color = 'blue',
    className,
    style
}: StatsCardProps) {
    const colorVariants = {
        blue: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
        green: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
        amber: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
        red: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
        purple: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20',
    }

    return (
        <div
            className={cn(
                "bg-white dark:bg-slate-900/50 dark:backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200 dark:border-orange-500/10 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-orange-500/10 hover:-translate-y-1 group",
                className
            )}
            style={style}
        >
            <div className="flex items-center gap-5">
                <div className={cn('p-4 rounded-2xl border transition-transform duration-500 group-hover:scale-110 shadow-sm', colorVariants[color])}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1 truncate">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{value}</p>
                        {subtitle && (
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{subtitle}</span>
                        )}
                    </div>
                    {trend && (
                        <div className="flex items-center gap-2 mt-2">
                            <span className={cn(
                                'text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-widest',
                                trend.isPositive 
                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' 
                                    : 'bg-rose-50 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'
                            )}>
                                <span>{trend.isPositive ? '↑' : '↓'}</span>
                                <span>{trend.value}</span>
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Performance</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

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
        blue: 'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20',
        green: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
        amber: 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20',
        red: 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20',
        purple: 'bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20',
    }

    const trendColors = {
        positive: 'text-emerald-500 dark:text-emerald-400',
        negative: 'text-rose-500 dark:text-rose-400',
    }

    return (
        <div
            className={cn(
                "glass-card rounded-[2rem] p-6 border border-white/5 shadow-xl transition-all duration-500 hover:shadow-cyan-500/10 hover:-translate-y-1 group",
                className
            )}
            style={style}
        >
            <div className="flex items-center gap-5">
                <div className={cn('p-4 rounded-2xl border transition-transform duration-500 group-hover:scale-110 shadow-lg', colorVariants[color])}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1 truncate">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{value}</p>
                        {subtitle && (
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest truncate">{subtitle}</span>
                        )}
                    </div>
                    {trend && (
                        <div className="flex items-center gap-2 mt-2">
                            <span className={cn(
                                'text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-widest',
                                trend.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                            )}>
                                <span>{trend.isPositive ? '↑' : '↓'}</span>
                                <span>{trend.value}</span>
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest opacity-60">Performance</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

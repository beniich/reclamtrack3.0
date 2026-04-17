'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react'
import { StatusBadge, PriorityBadge } from '../StatusBadge/StatusBadge'
import { formatDate, formatTime } from '@/lib/utils'
import type { Complaint } from '@/types'

export interface ComplaintCardProps {
    complaint: Complaint
    className?: string
}

export function ComplaintCard({ complaint, className }: ComplaintCardProps) {
    const t = useTranslations('Common')
    // Map our internal statuses/priorities to the ones expected by the badges if necessary
    // or define the badges to handle our internal types.

    return (
        <Link
            href={`/complaints/${complaint._id || (complaint as any).id}`}
            className="group block bg-white dark:bg-slate-900/50 dark:backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200 dark:border-orange-500/10 hover:border-indigo-300 dark:hover:border-orange-500/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-orange-500/10 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent dark:from-orange-500 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">
                        #{complaint.number || complaint._id?.slice(-6) || 'N/A'}
                    </span>
                    <StatusBadge status={complaint.status as any} />
                </div>
                <PriorityBadge priority={complaint.priority as any} />
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-orange-400 transition-colors uppercase italic leading-tight">
                {complaint.title}
            </h3>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                {complaint.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400/50 dark:text-violet-400/50" />
                    <span>{formatDate(complaint.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400/50 dark:text-violet-400/50" />
                    <span>{formatTime(complaint.createdAt)}</span>
                </div>
                {complaint.address && (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-400/50 dark:text-violet-400/50" />
                        <span className="truncate max-w-[150px]">{complaint.address}</span>
                    </div>
                )}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-violet-500/10 border border-indigo-100 dark:border-violet-500/20 flex items-center justify-center shadow-sm dark:shadow-violet-500/10 transition-transform group-hover:scale-110">
                        <span className="text-xs font-black text-indigo-600 dark:text-violet-400 uppercase">
                            {(complaint.technicianId as any)?.name?.charAt(0) || '?'}
                        </span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('technician')}</p>
                        <p className="text-[11px] font-bold text-slate-900 dark:text-white">
                            {(complaint.technicianId as any)?.name || t('notAssigned')}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-orange-400 font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                    {t('details')} <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
    )
}

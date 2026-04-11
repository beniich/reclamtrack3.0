'use client'

import React from 'react'
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
    // Map our internal statuses/priorities to the ones expected by the badges if necessary
    // or define the badges to handle our internal types.

    return (
        <Link
            href={`/complaints/${complaint._id || (complaint as any).id}`}
            className="group block bg-white rounded-[2rem] p-6 border border-slate-200 hover:border-indigo-300 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        #{complaint.number || complaint._id?.slice(-6) || 'N/A'}
                    </span>
                    <StatusBadge status={complaint.status as any} />
                </div>
                <PriorityBadge priority={complaint.priority as any} />
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-indigo-600 transition-colors uppercase italic leading-tight">
                {complaint.title}
            </h3>

            <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                {complaint.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400/50" />
                    <span>{formatDate(complaint.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400/50" />
                    <span>{formatTime(complaint.createdAt)}</span>
                </div>
                {complaint.address && (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-400/50" />
                        <span className="truncate max-w-[150px]">{complaint.address}</span>
                    </div>
                )}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110">
                        <span className="text-xs font-black text-indigo-600 uppercase">
                            {(complaint.technicianId as any)?.name?.charAt(0) || '?'}
                        </span>
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Technicien</p>
                        <p className="text-[11px] font-bold text-slate-900">
                            {(complaint.technicianId as any)?.name || 'Non assigné'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                    Détails <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
    )
}

import React from 'react';
import { Users } from 'lucide-react';

// Types pour les props
interface Personnel {
    name: string;
    role: string;
    status: 'online' | 'break' | 'offline';
    img: string;
}

interface Order {
    id: string;
    title: string;
    type: 'urgent' | 'standard';
    duration: string;
    dept: string;
    deptIcon: string;
}

const personnelList: Personnel[] = [
    { name: 'Alex Henderson', role: 'Technician II (Elec)', status: 'online', img: 'https://i.pravatar.cc/150?u=alex' },
    { name: 'Sarah Jenkins', role: 'Lead Engineer (Water)', status: 'online', img: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Marcus Vane', role: 'Break • Ends 14:00', status: 'break', img: 'https://i.pravatar.cc/150?u=marcus' }
];

const pendingOrders: Order[] = [
    { id: '#WO-9842', title: 'Main Pipe Leak - Sector 4B', type: 'urgent', duration: '2h 30m', dept: 'Water Dept', deptIcon: 'water_drop' },
    { id: '#WO-9845', title: 'HVAC Inspection - Tower C', type: 'standard', duration: '1h 00m', dept: 'HVAC', deptIcon: 'ac_unit' }
];

export default function SidebarLeft({ onOpenAssignment }: { onOpenAssignment: () => void }) {
    return (
        <aside className="w-72 bg-surface-dark border-r border-border-dark flex flex-col shrink-0 h-full">
            {/* Available Personnel */}
            <div className="flex-1 flex flex-col min-h-0 border-b border-border-dark">
                <div className="p-4 flex items-center justify-between bg-surface-dark/50">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Users className="text-sm" /> Available Personnel
                    </h2>
                    <span className="bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/20">
                        12 ONLINE
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
                    {personnelList.map((person, idx) => (
                        <div
                            key={idx}
                            className={`p-2 rounded-lg border border-border-dark bg-slate-800/40 hover:border-primary/50 hover:bg-violet-500/15 cursor-grab active:cursor-grabbing transition-colors flex items-center gap-3 group ${person.status === 'break' ? 'opacity-60' : ''}`}
                        >
                            <div className="relative">
                                <img
                                    alt="Staff"
                                    className="h-8 w-8 rounded-full border border-slate-700 bg-slate-800"
                                    src={person.img}
                                />
                                <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${person.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'} border-2 border-slate-900 rounded-full`}></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-200 group-hover:text-white">{person.name}</p>
                                <p className="text-[10px] text-slate-500 uppercase">{person.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pending Orders */}
            <div className="flex-1 flex flex-col min-h-0 bg-background-dark/20">
                <div className="p-4 flex items-center justify-between bg-surface-dark border-b border-border-dark">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">assignment_late</span> Pending Orders
                    </h2>
                    <span className="text-[10px] font-bold text-primary">05 NEW</span>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
                    {pendingOrders.map((order) => (
                        <div
                            key={order.id}
                            onClick={onOpenAssignment}
                            className={`bg-slate-800 p-3 rounded-lg shadow-lg border-l-4 ${order.type === 'urgent' ? 'border-red-500' : 'border-primary'} cursor-pointer hover:bg-slate-700/80 transition-colors`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold text-slate-500">{order.id}</span>
                                <span className={`bg-${order.type === 'urgent' ? 'red' : 'slate'}-900/40 text-${order.type === 'urgent' ? 'red' : 'slate'}-400 border border-${order.type === 'urgent' ? 'red' : 'slate'}-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase`}>
                                    {order.type}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-200 mb-2">{order.title}</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span className="material-symbols-outlined text-[12px]">schedule</span> {order.duration}
                                <span className="material-symbols-outlined text-[12px] ml-1">{order.deptIcon}</span> {order.dept}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}

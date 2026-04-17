'use client';

import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AddVehiclePage() {
    return (
        <div className="p-8 space-y-8 max-w-2xl">
            <header className="flex items-center gap-4">
                <Link href="/fleet" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Add New Vehicle</h2>
                    <p className="text-sm text-slate-500 font-medium">Register a new vehicle in the fleet management system.</p>
                </div>
            </header>

            <form className="bg-white dark:bg-[#1c1c30] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Plate Number</label>
                        <input type="text" placeholder="e.g. TX-7742-G" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Vehicle Type</label>
                        <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary">
                            <option>Van</option>
                            <option>Truck</option>
                            <option>Box Truck</option>
                            <option>Service Car</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Model / Brand</label>
                        <input type="text" placeholder="e.g. Volvo FH16" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Initial Mileage</label>
                        <input type="number" placeholder="0" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                    <Link href="/fleet" className="px-6 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold">Cancel</Link>
                    <button type="submit" className="flex items-center gap-2 px-8 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        Create Vehicle
                    </button>
                </div>
            </form>
        </div>
    );
}

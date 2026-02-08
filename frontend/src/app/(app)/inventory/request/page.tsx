'use client';

import { useState } from 'react';
import Link from 'next/link';

// Types
interface RequestItem {
    id: string;
    description: string;
    quantity: number;
    justification: string;
}

// Mock Data
const mockCatalog = [
    'Copper Pipe (15mm)',
    'PVC Pipe 2-inch (Industrial)',
    'Water Meter (Standard Unit)',
    'Fiber Optic Cable (Outdoor)',
    'Joint Sealant 500ml',
    'Safety Gloves (Heavy Duty)'
];

const mockComplaints = [
    { id: 'REC-8921', label: 'REC-8921 (Water Leak Main St.)' },
    { id: 'REC-8922', label: 'REC-8922 (Pressure Drop Blvd.)' },
    { id: 'REC-8923', label: 'REC-8923 (Meter Replacement)' }
];

export default function MaterialRequestPage() {
    // State
    const [items, setItems] = useState<RequestItem[]>([
        { id: '1', description: 'Copper Pipe (15mm)', quantity: 12, justification: 'Main pipe repair' },
        { id: '2', description: 'Water Meter (Standard Unit)', quantity: 1, justification: 'Replacement for broken unit' }
    ]);
    const [complaintId, setComplaintId] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [notes, setNotes] = useState('');

    // Handlers
    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, justification: '' }]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof RequestItem, value: string | number) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-lg">
                                <span className="material-symbols-outlined text-white">inventory_2</span>
                            </div>
                            <h1 className="text-lg font-bold tracking-tight">ReclamTrack Inventory</h1>
                        </Link>
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/complaints/list" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Complaints</Link>
                            <Link href="/inventory/request" className="text-sm font-bold text-primary border-b-2 border-primary py-4">Materials</Link>
                            <Link href="/inventory" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Inventory</Link>
                            <Link href="/reports" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Reporting</Link>
                        </nav>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                        <img src="https://ui-avatars.com/api/?name=Technician+User&background=2424eb&color=fff" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-[1024px] mx-auto w-full px-6 py-8">
                {/* Breadcrumbs & Title */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <Link href="/inventory" className="hover:text-primary transition-colors">Inventory</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-slate-900 dark:text-slate-100 font-medium">Material Requisition</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Material Requisition Form</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base">Request materials for active field operations and repairs.</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* General Information Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">info</span>
                        <h2 className="text-lg font-bold">General Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900 dark:text-white">Complaint ID</label>
                            <div className="relative">
                                <select
                                    className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                                    value={complaintId}
                                    onChange={(e) => setComplaintId(e.target.value)}
                                >
                                    <option value="">Select ID (REC-XXXX)</option>
                                    {mockComplaints.map(c => (
                                        <option key={c.id} value={c.id}>{c.label}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900 dark:text-white">Priority</label>
                            <div className="flex gap-2">
                                {['Low', 'Medium', 'High', 'Urgent'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPriority(p)}
                                        className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${priority === p
                                                ? 'border-primary bg-primary/10 text-primary font-bold'
                                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Material Items Dynamic List */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined">list_alt</span>
                            <h2 className="text-lg font-bold">Requested Items</h2>
                        </div>
                        <button onClick={addItem} className="flex items-center gap-2 text-primary hover:bg-primary/5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            Add Material
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Item Catalog Selection</th>
                                    <th className="px-6 py-4 w-32">Quantity</th>
                                    <th className="px-6 py-4">Justification</th>
                                    <th className="px-6 py-4 w-16"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {items.map((item) => (
                                    <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="relative">
                                                <input
                                                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-primary focus:border-primary"
                                                    type="text"
                                                    list={`catalog-${item.id}`}
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                    placeholder="Search item..."
                                                />
                                                <datalist id={`catalog-${item.id}`}>
                                                    {mockCatalog.map(option => <option key={option} value={option} />)}
                                                </datalist>
                                                <span className="absolute right-3 top-2 text-slate-400 material-symbols-outlined text-[18px]">search</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden h-10">
                                                <button onClick={() => updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))} className="px-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                                    <span className="material-symbols-outlined text-[16px]">remove</span>
                                                </button>
                                                <input
                                                    className="w-full text-center border-none bg-transparent text-sm p-0 focus:ring-0"
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                />
                                                <button onClick={() => updateItem(item.id, 'quantity', item.quantity + 1)} className="px-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-primary focus:border-primary"
                                                placeholder="e.g. For main pipe repair"
                                                type="text"
                                                value={item.justification}
                                                onChange={(e) => updateItem(item.id, 'justification', e.target.value)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="mb-8">
                    <label className="block text-slate-900 dark:text-white text-sm font-semibold mb-2">Request Summary / Additional Notes</label>
                    <textarea
                        className="w-full h-32 p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary"
                        placeholder="Add any extra instructions for the warehouse team..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>
            </main>

            {/* Sticky Footer Summary */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
                <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Items</span>
                            <span className="text-xl font-black text-primary">{items.length} <span className="text-sm font-medium text-slate-400">Positions</span></span>
                        </div>
                        <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Quantity</span>
                            <span className="text-xl font-black text-slate-900 dark:text-white">{totalQuantity} <span className="text-sm font-medium text-slate-400">Units</span></span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-8 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Save as Draft
                        </button>
                        <button className="flex-1 md:flex-none bg-primary hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-bold shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2">
                            <span>Submit Request</span>
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}


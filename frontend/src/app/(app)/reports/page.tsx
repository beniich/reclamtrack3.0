'use client';

import { useState } from 'react';
import Link from 'next/link';

// Types
type ReportFormat = 'PDF' | 'EXCEL' | 'CSV';
type ReportFrequency = 'MONTHLY' | 'ANNUAL' | 'CUSTOM';
type ReportStatus = 'ARCHIVED' | 'COLD_STORAGE' | 'COMPRESSED' | 'PROCESSING';

interface Report {
    id: string;
    name: string;
    description: string;
    date: string;
    format: ReportFormat;
    size: string;
    status: ReportStatus;
    icon: string;
    color: string;
}

// Mock Data
const mockReports: Report[] = [
    {
        id: '1',
        name: 'Annual_Summary_FY2023.pdf',
        description: 'Full year comprehensive',
        date: 'Oct 28, 2023',
        format: 'PDF',
        size: '4.2 MB',
        status: 'ARCHIVED',
        icon: 'picture_as_pdf',
        color: 'text-red-500'
    },
    {
        id: '2',
        name: 'Complaints_Data_Sept_2023.xlsx',
        description: 'Monthly raw data export',
        date: 'Oct 02, 2023',
        format: 'EXCEL',
        size: '1.8 MB',
        status: 'COLD_STORAGE',
        icon: 'table_view',
        color: 'text-emerald-500'
    },
    {
        id: '3',
        name: 'Intervention_Logs_Archive.csv',
        description: 'Historical archive backup',
        date: 'Aug 15, 2023',
        format: 'CSV',
        size: '28.4 MB',
        status: 'COMPRESSED',
        icon: 'csv',
        color: 'text-amber-500'
    },
    {
        id: '4',
        name: 'CSAT_Quarterly_Q3.pdf',
        description: 'In queue for generation',
        date: 'Processing...',
        format: 'PDF',
        size: '--',
        status: 'PROCESSING',
        icon: 'pending_actions',
        color: 'text-primary'
    }
];

export default function ReportsPage() {
    // State
    const [frequency, setFrequency] = useState<ReportFrequency>('MONTHLY');
    const [selectedFormat, setSelectedFormat] = useState<ReportFormat>('PDF');
    const [isGenerating, setIsGenerating] = useState(false);

    // Handlers
    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2000);
    };

    const getStatusBadge = (status: ReportStatus) => {
        switch (status) {
            case 'ARCHIVED': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">ARCHIVED</span>;
            case 'COLD_STORAGE': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 uppercase">COLD STORAGE</span>;
            case 'COMPRESSED': return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">COMPRESSED</span>;
            case 'PROCESSING': return (
                <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3 animate-[loading_1s_ease-in-out_infinite]"></div>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Navigation */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">analytics</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">ReclamTrack Portal</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Dashboard</Link>
                        <Link href="/complaints/list" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Complaints</Link>
                        <Link href="/reports" className="text-primary text-sm font-bold border-b-2 border-primary pb-1">Reporting</Link>
                        <Link href="/settings" className="text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">Settings</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 items-center gap-2 border border-transparent focus-within:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                        <input
                            type="text"
                            placeholder="Global Search..."
                            className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400 p-0"
                        />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=2424eb&color=fff" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            <main className="flex-1 px-6 py-8 max-w-[1400px] mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                            <span className="material-symbols-outlined text-[18px]">history_edu</span>
                            <span>Reporting Engine V10.0</span>
                        </div>
                        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">Reporting & Archiving</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">Generate comprehensive annual or monthly reports. Manage historical records and export datasets for external analysis.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg h-11 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                            <span className="material-symbols-outlined text-[20px]">help</span>
                            Documentation
                        </button>
                        <button className="flex items-center gap-2 rounded-lg h-11 px-6 bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            New Report Job
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Configuration */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">settings_input_component</span>
                                Configuration
                            </h2>
                            <div className="flex flex-col gap-5">
                                {/* Date Range Type */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Report Frequency</label>
                                    <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                        <button onClick={() => setFrequency('MONTHLY')} className={`py-2 text-xs font-bold rounded-md shadow-sm transition-all ${frequency === 'MONTHLY' ? 'bg-white dark:bg-slate-700 text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}>Monthly</button>
                                        <button onClick={() => setFrequency('ANNUAL')} className={`py-2 text-xs font-bold rounded-md shadow-sm transition-all ${frequency === 'ANNUAL' ? 'bg-white dark:bg-slate-700 text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}>Annual</button>
                                        <button onClick={() => setFrequency('CUSTOM')} className={`py-2 text-xs font-bold rounded-md shadow-sm transition-all ${frequency === 'CUSTOM' ? 'bg-white dark:bg-slate-700 text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}>Custom</button>
                                    </div>
                                </div>
                                {/* Date Selection */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Select Period</label>
                                    <div className="relative">
                                        <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm font-medium">
                                            <span>October 2023 - November 2023</span>
                                            <span className="material-symbols-outlined text-slate-400">calendar_month</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Data Types */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Data Categories</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                                            <input defaultChecked className="rounded text-primary focus:ring-primary bg-transparent border-slate-300 dark:border-slate-700" type="checkbox" />
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Complaints Data</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Status, resolution times, categories</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                                            <input className="rounded text-primary focus:ring-primary bg-transparent border-slate-300 dark:border-slate-700" type="checkbox" />
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Interventions</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Technician logs, field visit reports</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                                            <input className="rounded text-primary focus:ring-primary bg-transparent border-slate-300 dark:border-slate-700" type="checkbox" />
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Customer Satisfaction</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">CSAT scores and feedback text</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                {/* Export Format */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Export Format</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setSelectedFormat('PDF')} className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${selectedFormat === 'PDF' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-500'}`}>
                                            <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                                            <span className="text-[10px] font-black uppercase">PDF</span>
                                        </button>
                                        <button onClick={() => setSelectedFormat('EXCEL')} className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${selectedFormat === 'EXCEL' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-500'}`}>
                                            <span className="material-symbols-outlined text-[24px]">table_view</span>
                                            <span className="text-[10px] font-black uppercase">Excel</span>
                                        </button>
                                        <button onClick={() => setSelectedFormat('CSV')} className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${selectedFormat === 'CSV' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-500'}`}>
                                            <span className="material-symbols-outlined text-[24px]">csv</span>
                                            <span className="text-[10px] font-black uppercase">CSV</span>
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full mt-4 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transform active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                                >
                                    {isGenerating ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">refresh</span>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">autostop</span>
                                            Generate Report Now
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: History & Archives */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                                <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined">folder_zip</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Archived Size</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">12.4 GB</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                                <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined">description</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reports</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">142</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                                <div className="size-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Run</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">2h ago</p>
                                </div>
                            </div>
                        </div>

                        {/* History Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col flex-1">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-slate-900 dark:text-white text-xl font-bold">Historical Archive</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Past reports and cold-storage intervention logs</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-1 focus:ring-primary" placeholder="Search archives..." type="text" />
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                                    </div>
                                    <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                        <span className="material-symbols-outlined">filter_list</span>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4">Report Name</th>
                                            <th className="px-6 py-4">Generated Date</th>
                                            <th className="px-6 py-4">Format</th>
                                            <th className="px-6 py-4 text-right">Size</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {mockReports.map((report) => (
                                            <tr key={report.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`material-symbols-outlined ${report.color} group-hover:scale-110 transition-transform`}>{report.icon}</span>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{report.name}</p>
                                                            <p className="text-xs text-slate-500">{report.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{report.date}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-500">{report.format}</td>
                                                <td className="px-6 py-4 text-right text-sm font-medium">{report.size}</td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(report.status)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            disabled={report.status === 'PROCESSING'}
                                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <span className="material-symbols-outlined">download</span>
                                                        </button>
                                                        <button
                                                            disabled={report.status === 'PROCESSING'}
                                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <span className="material-symbols-outlined">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <div className="mt-auto p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Showing {mockReports.length} of 142 results</p>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Previous</button>
                                    <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-md shadow-primary/10">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Automated Tasks Section */}
                <div className="mt-8 bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 text-white flex flex-wrap items-center justify-between gap-6 overflow-hidden relative shadow-xl">
                    <div className="absolute -right-12 -top-12 opacity-10">
                        <span className="material-symbols-outlined text-[200px]">auto_awesome</span>
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined">schedule_send</span>
                            Automated Tasks Engine
                        </h3>
                        <p className="text-blue-100 text-lg">Set up recurring report schedules to be sent directly to your email or cloud storage every month. Save time on repetitive data extraction tasks.</p>
                    </div>
                    <div className="relative z-10">
                        <button className="bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                            <span className="material-symbols-outlined">settings_suggest</span>
                            Manage Schedules
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}


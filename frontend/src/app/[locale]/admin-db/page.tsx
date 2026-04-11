'use client';

import React, { useState } from "react";
import BDRDashboard from "@/components/admin-db/dashboards/BDRDashboard";
import NetVizDashboard from "@/components/admin-db/dashboards/NetVizDashboard";
import QManagerDashboard from "@/components/admin-db/dashboards/QManagerDashboard";
import CloudMonitorDashboard from "@/components/admin-db/dashboards/CloudMonitorDashboard";
import DBASentinelDashboard from "@/components/admin-db/dashboards/DBASentinelDashboard";

// Tabs configuration
const TABS = [
    { id: 'bdr', label: 'Backup & DR', icon: 'cloud_sync', component: BDRDashboard },
    { id: 'netviz', label: 'Network Viz', icon: 'hub', component: NetVizDashboard },
    { id: 'qmanager', label: 'Queue Manager', icon: 'layers', component: QManagerDashboard },
    { id: 'cloudmonitor', label: 'Cloud Monitor', icon: 'query_stats', component: CloudMonitorDashboard },
    { id: 'dbasentinel', label: 'DBA Sentinel', icon: 'terminal', component: DBASentinelDashboard },
];

export default function AdminDbPage() {
    const [activeTabId, setActiveTabId] = useState('bdr');

    const ActiveComponent = TABS.find(tab => tab.id === activeTabId)?.component || BDRDashboard;

    return (
        <div className="flex flex-col h-screen bg-slate-50 transition-colors overflow-hidden">
            {/* Navigation Bar */}
            <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 z-50 shadow-sm flex-shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Enterprise DB Admin</h1>
                    <div className="h-6 w-px bg-slate-200"></div>
                    <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTabId(tab.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] uppercase font-black tracking-widest transition-all ${activeTabId === tab.id
                                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                <span className="hidden md:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-bold border border-green-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        System Healthy
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden relative">
                <ActiveComponent />
            </main>
        </div>
    );
}

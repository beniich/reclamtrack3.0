'use client';
import { useTranslations } from 'next-intl';

import React, { useState } from "react";
import BDRDashboard from "@/components/admin-db/dashboards/BDRDashboard";
import NetVizDashboard from "@/components/admin-db/dashboards/NetVizDashboard";
import QManagerDashboard from "@/components/admin-db/dashboards/QManagerDashboard";
import CloudMonitorDashboard from "@/components/admin-db/dashboards/CloudMonitorDashboard";
import DBASentinelDashboard from "@/components/admin-db/dashboards/DBASentinelDashboard";

export default function AdminDbPage() {
    const t = useTranslations('Admin');
    const tCommon = useTranslations('Common');
    const [activeTabId, setActiveTabId] = useState('bdr');

    // Tabs configuration
    const TABS = [
        { id: 'bdr', label: t('backup'), icon: 'cloud_sync', component: BDRDashboard },
        { id: 'netviz', label: t('netviz'), icon: 'hub', component: NetVizDashboard },
        { id: 'qmanager', label: t('qmanager'), icon: 'layers', component: QManagerDashboard },
        { id: 'cloudmonitor', label: t('cloudmonitor'), icon: 'query_stats', component: CloudMonitorDashboard },
        { id: 'dbasentinel', label: t('dbasentinel'), icon: 'terminal', component: DBASentinelDashboard },
    ];

    const ActiveComponent = TABS.find(tab => tab.id === activeTabId)?.component || BDRDashboard;

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            {/* Navigation Bar */}
            <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-orange-500/10 z-50 shadow-sm flex-shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{t('title')}</h1>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTabId(tab.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] uppercase font-black tracking-widest transition-all ${activeTabId === tab.id
                                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-orange-400 shadow-sm border border-slate-200 dark:border-orange-500/20'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700'
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
                        {tCommon('systemHealthy')}
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

'use client';

import { Bell, Fuel, Gauge, Shield } from 'lucide-react';

export default function FleetSettingsPage() {
    return (
        <div className="p-8 space-y-8">
            <header>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Fleet Settings</h2>
                <p className="text-sm text-slate-500 font-medium">Configure thresholds, notifications, and fleet management parameters.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Maintenance Settings */}
                <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <Gauge className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold">Maintenance Thresholds</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="mileage-alert" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mileage Alert (km)</label>
                            <input id="mileage-alert" type="number" defaultValue="5000" aria-label="Mileage alert threshold in kilometers" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label htmlFor="service-interval" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Service Interval (Days)</label>
                            <input id="service-interval" type="number" defaultValue="180" aria-label="Service interval in days" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    </div>
                </div>

                {/* Operational Settings */}
                <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Fuel className="w-5 h-5 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold">Fuel Management</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="low-fuel-alert" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Low Fuel Alert (%)</label>
                            <input id="low-fuel-alert" type="number" defaultValue="15" aria-label="Low fuel alert threshold percentage" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <div>
                                <p className="text-sm font-bold">Track Fuel Usage</p>
                                <p className="text-[10px] text-slate-500">Automatically calculate fuel consumption per trip</p>
                            </div>
                            <div className="w-10 h-5 bg-primary rounded-full relative">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Bell className="w-5 h-5 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-bold">Alert Notifications</h3>
                    </div>

                    <div className="space-y-3">
                        {['Critical Maintenance Due', 'Vehicle Speeding', 'Zone Boundary Breach', 'Grounded Vehicle Report'].map((alert) => (
                            <div key={alert} className="flex items-center justify-between py-2">
                                <label htmlFor={`alert-${alert}`} className="text-sm font-medium">{alert}</label>
                                <input id={`alert-${alert}`} type="checkbox" defaultChecked aria-label={`Enable notification for ${alert}`} className="w-4 h-4 rounded text-primary" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Access Control */}
                <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Shield className="w-5 h-5 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold">Fleet Access</h3>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs text-slate-500">Manage who can dispatch vehicles and schedule maintenance.</p>
                        <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors">
                            Manage Permissions
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
                <button className="px-6 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold">Reset Defaults</button>
                <button className="px-8 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20">Save Changes</button>
            </div>
        </div>
    );
}

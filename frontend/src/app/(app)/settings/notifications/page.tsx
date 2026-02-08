'use client';

import { useState } from 'react';
import Link from 'next/link';

// Types
interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    icon: string;
    iconColor: string;
    bgColor: string;
    smsEnabled: boolean;
    emailEnabled: boolean;
    smsTemplate: string;
    emailTemplate: string;
}

// Mock Data
const defaultSettings: NotificationSetting[] = [
    {
        id: 'new_complaint',
        title: 'New Complaint Alerts',
        description: 'Triggered when a citizen submits a new issue report.',
        icon: 'notification_add',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        smsEnabled: true,
        emailEnabled: true,
        smsTemplate: 'Alert: Your complaint #[ID] has been logged. Our team is reviewing the details. Track here: [Link]',
        emailTemplate: 'Dear [Customer_Name], we have received your complaint [Complaint_ID] regarding [Category]...'
    },
    {
        id: 'team_dispatch',
        title: 'Team Dispatched Alerts',
        description: 'Triggered when a field crew is assigned to a specific task.',
        icon: 'local_shipping',
        iconColor: 'text-orange-600',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        smsEnabled: true,
        emailEnabled: false,
        smsTemplate: 'A technical team ([Team_Name]) has been dispatched to [Location] for #[ID].',
        emailTemplate: ''
    },
    {
        id: 'issue_resolved',
        title: 'Issue Resolved Alerts',
        description: 'Triggered upon successful closing of an intervention ticket.',
        icon: 'task_alt',
        iconColor: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        smsEnabled: true,
        emailEnabled: true,
        smsTemplate: 'Issue #[ID] resolved. Thank you for your patience.',
        emailTemplate: 'Great news! Your issue #[ID] has been marked as resolved by our technical team...'
    }
];

export default function NotificationSettingsPage() {
    const [settings, setSettings] = useState<NotificationSetting[]>(defaultSettings);

    const toggleChannel = (id: string, channel: 'smsEnabled' | 'emailEnabled') => {
        setSettings(settings.map(s =>
            s.id === id ? { ...s, [channel]: !s[channel] } : s
        ));
    };

    const updateTemplate = (id: string, field: 'smsTemplate' | 'emailTemplate', value: string) => {
        setSettings(settings.map(s =>
            s.id === id ? { ...s, [field]: value } : s
        ));
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-lg">
                                <span className="material-symbols-outlined text-white">settings</span>
                            </div>
                            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Admin Panel</h1>
                        </Link>
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Dashboard</Link>
                            <Link href="/settings/notifications" className="text-sm font-bold text-primary border-b-2 border-primary py-4">Settings</Link>
                        </nav>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=2424eb&color=fff" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Notification & Alert Settings</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl">Configure how the system communicates with users and field teams. Manage SMS/Email triggers and customize templates.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">
                            Reset Defaults
                        </button>
                        <button className="px-6 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="grid gap-8">
                    {settings.map((setting) => (
                        <section key={setting.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full ${setting.bgColor} ${setting.iconColor} flex items-center justify-center`}>
                                            <span className="material-symbols-outlined">{setting.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{setting.title}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{setting.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">SMS</span>
                                            <div className="relative inline-flex items-center h-5 w-10">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={setting.smsEnabled}
                                                    onChange={() => toggleChannel(setting.id, 'smsEnabled')}
                                                />
                                                <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-full peer-checked:bg-primary transition-colors"></div>
                                                <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">Email</span>
                                            <div className="relative inline-flex items-center h-5 w-10">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={setting.emailEnabled}
                                                    onChange={() => toggleChannel(setting.id, 'emailEnabled')}
                                                />
                                                <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-full peer-checked:bg-primary transition-colors"></div>
                                                <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={`p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity ${(!setting.smsEnabled && !setting.emailEnabled) ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                <div className={`space-y-3 ${!setting.emailEnabled ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Template</label>
                                        <button className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
                                            <span className="material-symbols-outlined text-[14px]">add_circle</span> Insert Variable
                                        </button>
                                    </div>
                                    <textarea
                                        className="w-full h-32 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm p-3 resize-none"
                                        value={setting.emailTemplate}
                                        onChange={(e) => updateTemplate(setting.id, 'emailTemplate', e.target.value)}
                                        placeholder="Enter email template..."
                                    ></textarea>
                                </div>
                                <div className={`space-y-3 ${!setting.smsEnabled ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">SMS Template</label>
                                        <span className={`text-[10px] font-bold ${setting.smsTemplate.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>{setting.smsTemplate.length} / 160 characters</span>
                                    </div>
                                    <textarea
                                        className="w-full h-32 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm p-3 resize-none"
                                        value={setting.smsTemplate}
                                        onChange={(e) => updateTemplate(setting.id, 'smsTemplate', e.target.value)}
                                        placeholder="Enter SMS template..."
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                    ))}

                    {/* Tags / Placeholders Guide */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                        <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-sm">info</span> Available Variables
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {['[Customer_Name]', '[Complaint_ID]', '[Category]', '[Team_Name]', '[Location]', '[Resolution_Date]', '[Tracking_URL]'].map(tag => (
                                <span key={tag} className="px-2 py-1 bg-white dark:bg-slate-800 text-xs font-mono border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-400 font-bold">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-4">
                        <button className="px-8 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">Discard changes</button>
                        <button className="px-8 py-3 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Save Notification Profile
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}


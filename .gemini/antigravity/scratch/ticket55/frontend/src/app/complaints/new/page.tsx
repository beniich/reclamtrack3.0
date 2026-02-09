'use client';

export default function NewComplaintPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#0e0e1b] dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
            {/* Header / TopNavBar Section */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-white">
                        <span className="material-symbols-outlined">shield_person</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">Intervention Manager</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">System Admin Panel</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-2 mr-4">
                        <a href="/complaints" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">List View</a>
                    </div>
                    <button className="flex items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                    <button className="flex items-center gap-2 rounded-xl h-10 px-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined">account_circle</span>
                        <span className="text-sm font-bold">Officer J. Doe</span>
                    </button>
                </div>
            </header>

            <main className="flex flex-1 flex-col items-center py-8 px-4 lg:py-12">
                <div className="w-full max-w-[960px] flex flex-col gap-8">
                    {/* Page Title & Progress Intro */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">New Complaint Intake</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base">Standard incident reporting and intervention workflow.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">Step 2 of 3</span>
                            <div className="w-48 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '66%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Stepper Progress UI */}
                    <div className="grid grid-cols-3 gap-4 w-full">
                        {/* Step 1 Done */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center size-8 rounded-full bg-green-500 text-white">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                </div>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">Caller Information</span>
                            </div>
                            <div className="h-1 bg-green-500 rounded-full"></div>
                        </div>
                        {/* Step 2 Active */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center size-8 rounded-full bg-primary text-white ring-4 ring-primary/20">
                                    <span className="text-sm font-bold">2</span>
                                </div>
                                <span className="text-sm font-bold text-primary">Problem Details</span>
                            </div>
                            <div className="h-1 bg-primary rounded-full"></div>
                        </div>
                        {/* Step 3 Pending */}
                        <div className="flex flex-col gap-2 opacity-50">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <div className="flex items-center justify-center size-8 rounded-full bg-slate-200 dark:bg-slate-800">
                                    <span className="text-sm font-bold">3</span>
                                </div>
                                <span className="text-sm font-bold">Location & Map</span>
                            </div>
                            <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                        </div>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {/* Form Content */}
                        <div className="p-6 lg:p-10 flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">Nature of the Incident</h2>
                                <p className="text-slate-500 dark:text-slate-400">Provide specific details about the problem and set a priority level for response teams.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nature Dropdown */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nature of Complaint</label>
                                    <div className="relative">
                                        <select className="form-select w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3.5 focus:border-primary focus:ring-primary appearance-none">
                                            <option>Public Disturbance</option>
                                            <option>Infrastructure Damage</option>
                                            <option>Sanitation/Waste</option>
                                            <option>Noise Complaint</option>
                                            <option>Traffic/Parking Issue</option>
                                            <option>Other</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">expand_more</span>
                                    </div>
                                </div>

                                {/* Priority Radio/Select */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Priority Level</label>
                                    <div className="flex gap-2">
                                        <label className="flex-1 cursor-pointer group">
                                            <input className="hidden peer" name="priority" type="radio" value="medium" defaultChecked />
                                            <div className="flex items-center justify-center h-12 rounded-lg border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all group-hover:border-slate-300 dark:group-hover:border-slate-700">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 peer-checked:text-primary">Medium</span>
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer group">
                                            <input className="hidden peer" name="priority" type="radio" value="high" />
                                            <div className="flex items-center justify-center h-12 rounded-lg border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/10 transition-all group-hover:border-slate-300 dark:group-hover:border-slate-700">
                                                <span className="text-xs font-bold uppercase tracking-wider text-red-600 group-hover:text-red-700">High</span>
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer group">
                                            <input className="hidden peer" name="priority" type="radio" value="urgent" />
                                            <div className="flex items-center justify-center h-12 rounded-lg border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 peer-checked:border-red-700 peer-checked:bg-red-100 dark:peer-checked:bg-red-900/30 transition-all group-hover:border-slate-300 dark:group-hover:border-slate-700">
                                                <span className="text-xs font-bold uppercase tracking-wider text-red-800 dark:text-red-400 group-hover:text-red-900">Urgent</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Description - Full Width */}
                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Detailed Description</label>
                                    <textarea
                                        className="form-textarea w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 focus:border-primary focus:ring-primary placeholder:text-slate-400 min-h-[140px]"
                                        placeholder="Please describe the situation in detail, including specific timestamps or observable hazards..."
                                    ></textarea>
                                </div>

                                {/* Attachments Placeholder */}
                                <div className="md:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Attachments (Optional)</label>
                                    <div className="mt-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group">
                                        <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">upload_file</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Drag and drop photos or documents here</p>
                                        <p className="text-xs text-slate-400 mt-1">Maximum file size: 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step Navigation Footer */}
                        <div className="px-6 lg:px-10 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <button className="flex items-center gap-2 h-12 px-6 rounded-lg text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                                <span>Back</span>
                            </button>
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 h-12 px-6 rounded-lg text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                    <span>Save Draft</span>
                                </button>
                                <button className="flex items-center gap-2 h-12 px-10 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                                    <span>Next Step</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 Preview Content (Subtle hint of what's next) */}
                    <div className="bg-white/50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center gap-6 backdrop-blur-sm">
                        <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 relative">
                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-50" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                            <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">location_on</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Next: Precise Location</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">You will be asked to pin the incident location on an interactive map and provide the nearest street address.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Help Tooltip Floating Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="flex items-center justify-center size-14 rounded-full bg-slate-900 dark:bg-primary text-white shadow-xl hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">support_agent</span>
                </button>
            </div>
        </div>
    );
}

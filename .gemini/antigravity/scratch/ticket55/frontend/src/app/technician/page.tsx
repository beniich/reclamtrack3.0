'use client';

export default function TechnicianDashboard() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0e0e1b] dark:text-white min-h-screen font-display">
            <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
                {/* Header / Top Nav Bar */}
                <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e7e7f3] dark:border-white/10 px-4 lg:px-10 py-3">
                    <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 text-primary">
                                <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
                                <h2 className="text-[#0e0e1b] dark:text-white text-xl font-black leading-tight tracking-tight">TECHFLOW</h2>
                            </div>
                            <nav className="hidden md:flex items-center gap-6">
                                <a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">Schedule</a>
                                <a className="text-[#4d4d99] dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">Inventory</a>
                                <a className="text-[#4d4d99] dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">History</a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center bg-[#e7e7f3] dark:bg-white/10 rounded-xl px-3 py-1.5 gap-2">
                                <span className="material-symbols-outlined text-sm text-[#4d4d99] dark:text-gray-400">cloud_done</span>
                                <span className="text-xs font-bold text-[#4d4d99] dark:text-gray-300">SYNCED</span>
                            </div>
                            <button className="flex items-center justify-center rounded-xl size-10 bg-[#e7e7f3] dark:bg-white/10 text-[#0e0e1b] dark:text-white hover:bg-[#d8d8e6] dark:hover:bg-white/20 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop")' }}
                            ></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 lg:p-10 space-y-8">
                    {/* Page Title & Status */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <p className="text-primary font-bold text-sm uppercase tracking-widest">Technician Dashboard</p>
                            <h1 className="text-4xl font-black tracking-tight">Today's Agenda</h1>
                            <p className="text-[#4d4d99] dark:text-gray-400 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                Friday, Oct 25 • 4 interventions pending
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-[#e7e7f3] dark:border-white/10 rounded-xl px-6 py-3 font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-lg">sync</span>
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Active Task Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
                                Current Active Task
                            </h2>
                            <span className="text-xs font-black bg-red-100 text-red-600 px-3 py-1 rounded-full uppercase">Priority: Critical</span>
                        </div>
                        <div className="bg-white dark:bg-white/5 rounded-2xl border border-primary/20 shadow-xl shadow-primary/5 overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                {/* Map/Visual Area */}
                                <div className="lg:w-1/3 min-h-[240px] relative">
                                    <div
                                        className="absolute inset-0 bg-center bg-cover"
                                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop")' }}
                                    >
                                        <div className="absolute inset-0 bg-primary/10"></div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-black shadow-lg shadow-primary/40 hover:scale-[1.02] transition-transform">
                                            <span className="material-symbols-outlined">directions_car</span>
                                            OPEN GPS NAVIGATION
                                        </button>
                                    </div>
                                </div>
                                {/* Content Area */}
                                <div className="lg:w-2/3 p-6 lg:p-8 flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full uppercase">Job #4492 • HVAC REPAIR</span>
                                            <div className="flex items-center gap-2 text-primary font-mono font-bold text-xl">
                                                <span className="material-symbols-outlined">timer</span>
                                                00:45:12
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black">Global Logistics Center</h3>
                                            <p className="text-[#4d4d99] dark:text-gray-400 text-lg flex items-start gap-2">
                                                <span className="material-symbols-outlined text-primary">location_on</span>
                                                123 Industrial Way, North Wing, Loading Dock 4
                                            </p>
                                            <div className="p-4 bg-background-light dark:bg-white/5 rounded-xl border-l-4 border-primary">
                                                <p className="text-sm font-bold uppercase text-[#4d4d99] mb-1">Complaint Description</p>
                                                <p className="text-[#0e0e1b] dark:text-gray-200">Unusual grinding noise in unit B-12 and complete cooling failure in the server room area. Requires immediate inspection of compressor.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <button className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-green-600 text-white py-4 rounded-xl font-black text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
                                            <span className="material-symbols-outlined">check_circle</span>
                                            MARK AS RESOLVED
                                        </button>
                                        <button className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-[#e7e7f3] dark:bg-white/10 text-[#0e0e1b] dark:text-white py-4 rounded-xl font-black text-lg hover:bg-[#d8d8e6] dark:hover:bg-white/20 transition-colors">
                                            <span className="material-symbols-outlined">pause</span>
                                            PAUSE WORK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Upcoming List */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">list_alt</span>
                            Next Interventions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Task Item 2 */}
                            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-[#e7e7f3] dark:border-white/10 flex flex-col justify-between hover:border-primary/50 transition-colors">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-black bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">JOB #4495</span>
                                        <span className="text-xs font-bold text-[#4d4d99]">14:30 - 16:00</span>
                                    </div>
                                    <h4 className="font-bold text-lg leading-tight">Riverside Apartment Complex</h4>
                                    <p className="text-sm text-[#4d4d99] dark:text-gray-400 line-clamp-1">442 Water St. • Intercom Malfunction</p>
                                </div>
                                <div className="mt-6 flex gap-2">
                                    <button className="flex-1 bg-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">START WORK</button>
                                    <button className="px-3 bg-[#e7e7f3] dark:bg-white/10 rounded-lg text-primary hover:bg-[#d8d8e6] dark:hover:bg-white/20 transition-colors">
                                        <span className="material-symbols-outlined text-sm">map</span>
                                    </button>
                                </div>
                            </div>
                            {/* Task Item 3 */}
                            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-[#e7e7f3] dark:border-white/10 flex flex-col justify-between hover:border-primary/50 transition-colors">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-black bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">JOB #4501</span>
                                        <span className="text-xs font-bold text-[#4d4d99]">16:30 - 17:30</span>
                                    </div>
                                    <h4 className="font-bold text-lg leading-tight">Metro Bank HQ</h4>
                                    <p className="text-sm text-[#4d4d99] dark:text-gray-400 line-clamp-1">88 Financial Plaza • Routine Maintenance</p>
                                </div>
                                <div className="mt-6 flex gap-2">
                                    <button className="flex-1 bg-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">START WORK</button>
                                    <button className="px-3 bg-[#e7e7f3] dark:bg-white/10 rounded-lg text-primary hover:bg-[#d8d8e6] dark:hover:bg-white/20 transition-colors">
                                        <span className="material-symbols-outlined text-sm">map</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bottom Floating Action for Support (Mobile/Tablet Friendly) */}
                    <div className="fixed bottom-6 right-6 flex flex-col gap-3">
                        <button className="size-14 rounded-full bg-white dark:bg-[#111121] shadow-2xl border border-[#e7e7f3] dark:border-white/10 flex items-center justify-center text-[#0e0e1b] dark:text-white hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                        <button className="size-14 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">phone_in_talk</span>
                        </button>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-auto py-8 px-10 border-t border-[#e7e7f3] dark:border-white/10 text-center">
                    <p className="text-sm text-[#4d4d99] dark:text-gray-400">© 2026 TechField Pro • Field Operations Management</p>
                </footer>
            </div>
        </div>
    );
}

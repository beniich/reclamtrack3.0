'use client';

import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full glass-effect border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-9 bg-primary rounded-lg text-white">
                            <span className="material-symbols-outlined text-xl">account_balance</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Reclam<span className="text-primary">Track</span></h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <Link href="#features" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Features</Link>
                        <Link href="#solutions" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Solutions</Link>
                        <Link href="#pricing" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Pricing</Link>
                        <Link href="/system-info" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Resources</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-4 py-2">
                            Login
                        </Link>
                        <Link href="/complaints/new" className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                            New Complaint
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-8 max-w-xl animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Next-Gen Municipal OS
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                                Efficient Municipal Service <span className="text-primary">Management</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                                Streamline citizen complaints, automate field interventions, and improve service delivery with our all-in-one management platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                <Link href="/complaints/new" className="bg-primary text-white h-14 px-8 rounded-xl font-bold text-lg shadow-xl shadow-primary/25 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
                                    Report an Issue
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                                <Link href="/login" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-14 px-8 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center">
                                    Admin Portal
                                </Link>
                            </div>
                            {/* Stats Ribbon for Credibility */}
                            <div className="pt-10 flex items-center gap-8 border-t border-slate-200 dark:border-slate-800 mt-4">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">50+</span>
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Municipalities</span>
                                </div>
                                <div className="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">98%</span>
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Resolution Rate</span>
                                </div>
                                <div className="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">24/7</span>
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Live Support</span>
                                </div>
                            </div>
                        </div>
                        {/* Hero Mockup/Illustration */}
                        <div className="relative group animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-blue-400/20 blur-3xl rounded-full opacity-50"></div>
                            <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-[4/3]">
                                {/* Simplified Dashboard Mockup Representation */}
                                <div className="w-full h-full p-6 flex flex-col gap-6">
                                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                        <div className="flex gap-2">
                                            <div className="size-2 rounded-full bg-red-400"></div>
                                            <div className="size-2 rounded-full bg-yellow-400"></div>
                                            <div className="size-2 rounded-full bg-green-400"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-20 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 p-3">
                                            <div className="h-2 w-10 bg-primary/30 rounded mb-2"></div>
                                            <div className="h-4 w-16 bg-primary rounded"></div>
                                        </div>
                                        <div className="h-20 bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                                            <div className="h-2 w-10 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                                            <div className="h-4 w-16 bg-slate-300 dark:bg-slate-600 rounded"></div>
                                        </div>
                                        <div className="h-20 bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                                            <div className="h-2 w-10 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                                            <div className="h-4 w-16 bg-slate-300 dark:bg-slate-600 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                            <span className="material-symbols-outlined text-[100px] text-slate-400">map</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-slate-900/50 to-transparent"></div>
                                        {/* Mock Map Marker */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
                                            <span className="material-symbols-outlined text-4xl text-red-500 drop-shadow-xl">location_on</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="bg-slate-50 dark:bg-slate-900/50 py-24">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Core Capabilities</h2>
                            <h3 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                Engineered for Public Service Excellence and Citizen Satisfaction
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature Card 1 */}
                            <div className="group p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 card-hover">
                                <div className="size-14 bg-blue-50 dark:bg-blue-900/30 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">location_on</span>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Real-time Tracking</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Monitor every complaint from submission to resolution with live GPS and status updates. Never lose sight of progress.
                                </p>
                            </div>
                            {/* Feature Card 2 */}
                            <div className="group p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 card-hover">
                                <div className="size-14 bg-blue-50 dark:bg-blue-900/30 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">groups</span>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Team Coordination</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Dispatch work orders instantly to field crews and sync communications in a single unified dashboard for all departments.
                                </p>
                            </div>
                            {/* Feature Card 3 */}
                            <div className="group p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 card-hover">
                                <div className="size-14 bg-blue-50 dark:bg-blue-900/30 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">monitoring</span>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Smart Reporting</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Generate data-driven insights and compliance reports with one click to optimize resource allocation and budget planning.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Banner */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="relative bg-primary rounded-[2.5rem] p-10 lg:p-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                            <div className="relative z-10 text-center lg:text-left">
                                <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Ready to modernize your services?</h2>
                                <p className="text-blue-100 text-lg opacity-90">Join 50+ municipalities already using ReclamTrack to drive efficiency.</p>
                            </div>
                            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                                <Link href="/login" className="bg-white text-primary h-14 px-10 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center">
                                    Start Free Trial
                                </Link>
                                <button className="bg-primary border border-white/30 text-white h-14 px-10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center size-8 bg-primary rounded text-white">
                                <span className="material-symbols-outlined text-lg">account_balance</span>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Reclam<span className="text-primary">Track</span></h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                            Providing digital governance infrastructure for the next generation of city and utility management.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6 text-slate-900 dark:text-white">Product</h5>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Mobile App</Link></li>
                            <li><Link href="/dashboard" className="hover:text-primary transition-colors">Field Dashboard</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">API Access</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6 text-slate-900 dark:text-white">Company</h5>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6 text-slate-900 dark:text-white">Support</h5>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6 text-slate-900 dark:text-white">Legal</h5>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500">© 2024 ReclamTrack Solutions. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">share</span>
                        </Link>
                        <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">public</span>
                        </Link>
                        <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">mail</span>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

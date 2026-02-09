export default function HomePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg text-white" style={{ backgroundColor: '#2424eb' }}>
                            <span className="material-symbols-outlined text-xl">account_balance</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">CMS <span style={{ color: '#2424eb' }}>Admin</span></h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="/system-info">Operations Guide</a>
                        <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Solutions</a>
                        <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Pricing</a>
                        <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Resources</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <a href="/login" className="hidden sm:block text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-4 py-2">
                            Login
                        </a>
                        <a href="/dashboard" className="text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all" style={{ backgroundColor: '#2424eb', boxShadow: '0 10px 30px rgba(36, 36, 235, 0.2)' }}>
                            Get Started
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-8 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit" style={{ backgroundColor: 'rgba(36, 36, 235, 0.1)', color: '#2424eb' }}>
                            <span className="material-symbols-outlined text-sm">verified</span>
                            Next-Gen Municipal OS
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                            Efficient Municipal Service <span style={{ color: '#2424eb' }}>Management</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            Streamline citizen complaints, automate field interventions, and improve service delivery with our all-in-one management platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                            <a href="/dashboard" className="text-white h-14 px-8 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 group" style={{ backgroundColor: '#2424eb', boxShadow: '0 20px 40px rgba(36, 36, 235, 0.25)' }}>
                                Book a Demo
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-14 px-8 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                View Roadmap
                            </button>
                        </div>

                        {/* Stats Ribbon */}
                        <div className="pt-10 flex items-center gap-8 border-t border-slate-200 dark:border-slate-800 mt-4">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">50+</span>
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Municipalities</span>
                            </div>
                            <div className="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">98%</span>
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Resolution Rate</span>
                            </div>
                            <div className="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">24/7</span>
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Live Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Mockup */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-blue-400/20 blur-3xl rounded-full opacity-50"></div>
                        <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-[4/3]">
                            <div className="w-full h-full p-6 flex flex-col gap-6">
                                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-20 rounded-lg border p-3" style={{ backgroundColor: 'rgba(36, 36, 235, 0.05)', borderColor: 'rgba(36, 36, 235, 0.1)' }}>
                                        <div className="h-2 w-10 rounded mb-2" style={{ backgroundColor: 'rgba(36, 36, 235, 0.3)' }}></div>
                                        <div className="h-4 w-16 rounded" style={{ backgroundColor: '#2424eb' }}></div>
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
                                <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 relative overflow-hidden flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700" style={{ fontSize: '100px' }}>map</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white dark:bg-slate-900/50 py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-bold text-sm tracking-[0.2em] uppercase mb-4" style={{ color: '#2424eb' }}>Core Capabilities</h2>
                        <h3 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                            Engineered for Public Service Excellence and Citizen Satisfaction
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300" style={{ borderColor: 'rgba(36, 36, 235, 0.1)' }}>
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(36, 36, 235, 0.1)', color: '#2424eb' }}>
                                <span className="material-symbols-outlined text-3xl">location_on</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 dark:text-white">Real-time Tracking</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Monitor every complaint from submission to resolution with live GPS and status updates. Never lose sight of progress.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(36, 36, 235, 0.1)', color: '#2424eb' }}>
                                <span className="material-symbols-outlined text-3xl">groups</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 dark:text-white">Team Coordination</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Dispatch work orders instantly to field crews and sync communications in a single unified dashboard for all departments.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(36, 36, 235, 0.1)', color: '#2424eb' }}>
                                <span className="material-symbols-outlined text-3xl">monitoring</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 dark:text-white">Smart Reporting</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Generate data-driven insights and compliance reports with one click to optimize resource allocation and budget planning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="relative rounded-[2.5rem] p-10 lg:p-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10" style={{ backgroundColor: '#2424eb' }}>
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10 text-center lg:text-left">
                            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Ready to modernize your services?</h2>
                            <p className="text-blue-100 text-lg opacity-90">Join 50+ municipalities already using CMS to drive efficiency.</p>
                        </div>
                        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                            <a href="/dashboard" className="bg-white h-14 px-10 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center" style={{ color: '#2424eb' }}>
                                Start Free Trial
                            </a>
                            <button className="border border-white/30 text-white h-14 px-10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all" style={{ backgroundColor: 'rgba(36, 36, 235, 1)' }}>
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center w-8 h-8 rounded text-white" style={{ backgroundColor: '#2424eb' }}>
                                <span className="material-symbols-outlined text-lg">account_balance</span>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight">CMS <span style={{ color: '#2424eb' }}>Admin</span></h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                            Providing digital governance infrastructure for the next generation of city and utility management.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6">Product</h5>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Mobile App</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Field Dashboard</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">API Access</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6">Company</h5>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Case Studies</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6">Support</h5>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6">Legal</h5>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500">© 2024 CMS Municipal Solutions. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="text-slate-400 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                        <a className="text-slate-400 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">public</span>
                        </a>
                        <a className="text-slate-400 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">mail</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

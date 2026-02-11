import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default async function LandingPage() {
    const tNav = await getTranslations('Navbar');
    const tLanding = await getTranslations('Landing');
    const tFooter = await getTranslations('Footer');

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-9 bg-primary rounded-lg text-white shadow-lg shadow-primary/25">
                            <span className="material-symbols-outlined text-xl">account_balance</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CMS <span className="text-primary">Admin</span></h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">{tNav('features')}</Link>
                        <Link href="#solutions" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">{tNav('solutions')}</Link>
                        <Link href="#pricing" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">{tNav('pricing')}</Link>
                        <Link href="/system-info" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">{tNav('resources')}</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors px-4 py-2">
                            {tNav('login')}
                        </Link>
                        <Link href="/login" className="bg-primary text-white text-sm font-black px-6 py-2.5 rounded-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                            {tNav('getStarted')}
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-40 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent_50%)]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-8 max-w-xl animate-in fade-in slide-in-from-left-8 duration-1000">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                {tLanding('heroBadge')}
                            </div>
                            <h1 className="text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-slate-900 dark:text-white">
                                {tLanding('heroTitle').split(' ').slice(0, 2).join(' ')} <br />
                                {tLanding('heroTitle').split(' ').slice(2, 4).join(' ')} <br />
                                <span className="text-primary">{tLanding('heroTitle').split(' ').slice(4).join(' ')}</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {tLanding('heroSubtitle')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                <Link href="/login" className="bg-primary text-white h-14 px-10 rounded-full font-black text-lg shadow-2xl shadow-primary/40 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
                                    {tLanding('bookDemo')}
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                                <Link href="/login" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-14 px-10 rounded-full font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center">
                                    {tLanding('viewRoadmap')}
                                </Link>
                            </div>
                            {/* Stats Info Cards */}
                            <div className="pt-12 grid grid-cols-3 gap-8">
                                <div className="flex flex-col border-l-2 border-slate-100 dark:border-slate-800 pl-6">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">50+</span>
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{tLanding('statsMunicipalities')}</span>
                                </div>
                                <div className="flex flex-col border-l-2 border-slate-100 dark:border-slate-800 pl-6">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">98%</span>
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{tLanding('statsResolution')}</span>
                                </div>
                                <div className="flex flex-col border-l-2 border-slate-100 dark:border-slate-800 pl-6">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">24/7</span>
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{tLanding('statsSupport')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Mockup */}
                        <div className="relative group animate-in fade-in zoom-in duration-1000 delay-200">
                            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/10 to-blue-400/10 blur-[100px] rounded-full opacity-60"></div>
                            <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-none overflow-hidden aspect-[4/3] p-6 lg:p-8">
                                <div className="flex items-center justify-between mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">
                                    <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                    <div className="flex gap-2">
                                        <div className="size-2.5 rounded-full bg-red-400"></div>
                                        <div className="size-2.5 rounded-full bg-yellow-400"></div>
                                        <div className="size-2.5 rounded-full bg-green-400"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`h-24 rounded-2xl p-4 ${i === 1 ? 'bg-primary/10 border border-primary/20' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
                                            <div className={`h-1.5 w-8 rounded-full mb-3 ${i === 1 ? 'bg-primary/40' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                            <div className={`h-4 w-12 rounded-full ${i === 1 ? 'bg-primary/60' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-1 h-[240px] bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <span className="material-symbols-outlined text-[140px] text-slate-400">public</span>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/80 dark:from-slate-900/80 to-transparent"></div>

                                    {/* Mock Markers */}
                                    <div className="absolute top-1/4 left-1/3 size-4 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-800 shadow-xl animate-pulse"></div>
                                    <div className="absolute bottom-1/3 right-1/4 size-4 bg-yellow-500 rounded-full border-4 border-white dark:border-slate-800 shadow-xl"></div>
                                    <div className="absolute top-1/2 right-1/2 size-4 bg-primary rounded-full border-4 border-white dark:border-slate-800 shadow-xl"></div>

                                    {/* Small Info Widget */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 w-44">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary text-sm font-bold leading-none">person_pin_circle</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full mb-1"></div>
                                                <div className="h-1.5 w-1/2 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="bg-white dark:bg-[#0a0a0f] py-32">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-primary font-black text-[10px] tracking-[0.3em] uppercase mb-4">{tLanding('featuresBadge')}</h2>
                            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                                {tLanding('featuresTitle')}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { title: tLanding('rtTracking'), icon: 'location_on', desc: tLanding('rtTrackingDesc') },
                                { title: tLanding('teamCoord'), icon: 'groups', desc: tLanding('teamCoordDesc') },
                                { title: tLanding('smartReporting'), icon: 'monitoring', desc: tLanding('smartReportingDesc') }
                            ].map((f, i) => (
                                <div key={i} className="group p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                                    <div className="size-16 bg-primary/5 text-primary rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <span className="material-symbols-outlined text-3xl font-bold">{f.icon}</span>
                                    </div>
                                    <h4 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">{f.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                        {f.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Banner */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="relative bg-gradient-to-br from-primary to-blue-700 rounded-[3rem] p-12 lg:p-20 overflow-hidden flex flex-col items-center justify-center text-center gap-10">
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-[600px] bg-white/5 rounded-full blur-[120px]"></div>
                            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-[600px] bg-blue-400/10 rounded-full blur-[120px]"></div>
                            <div className="relative z-10 max-w-2xl">
                                <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">{tLanding('ctaTitle')}</h2>
                                <p className="text-blue-100 text-xl font-medium opacity-90">{tLanding('ctaSubtitle')}</p>
                            </div>
                            <div className="relative z-10 flex flex-col sm:flex-row gap-6">
                                <Link href="/login" className="bg-white text-primary h-16 px-12 rounded-2xl font-black text-xl shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center">
                                    {tLanding('startTrial')}
                                </Link>
                                <button className="bg-primary-dark border border-white/20 text-white h-16 px-12 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
                                    {tLanding('contactSales')}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-[#0a0a0f] border-t border-slate-200 dark:border-slate-800 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-6 gap-16">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex items-center justify-center size-9 bg-primary rounded-lg text-white">
                                <span className="material-symbols-outlined text-xl">account_balance</span>
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">CMS <span className="text-primary">Admin</span></h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-medium">
                            {tFooter('description')}
                        </p>
                    </div>
                    <div>
                        <h5 className="font-black text-[11px] uppercase tracking-widest mb-8 text-slate-900 dark:text-white">{tFooter('product')}</h5>
                        <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">{tFooter('mobileApp')}</Link></li>
                            <li><Link href="/dashboard" className="hover:text-primary transition-colors">{tFooter('fieldDashboard')}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('apiAccess')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-[11px] uppercase tracking-widest mb-8 text-slate-900 dark:text-white">{tFooter('company')}</h5>
                        <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('aboutUs')}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('caseStudies')}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('careers')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-[11px] uppercase tracking-widest mb-8 text-slate-900 dark:text-white">{tFooter('support')}</h5>
                        <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('documentation')}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('security')}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('helpCenter')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-[11px] uppercase tracking-widest mb-8 text-slate-900 dark:text-white">{tFooter('legal')}</h5>
                        <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('privacyPolicy')}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{tFooter('termsOfService')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-24 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-sm font-medium text-slate-400">© 2024 CMS Municipal Solutions. {tFooter('rights')}</p>
                    <div className="flex gap-8">
                        {['share', 'public', 'mail'].map((icon) => (
                            <Link key={icon} href="#" className="text-slate-300 hover:text-primary transition-all duration-300 hover:scale-125">
                                <span className="material-symbols-outlined text-xl">{icon}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

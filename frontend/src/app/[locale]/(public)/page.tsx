import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function LandingPage() {
    const tNav = await getTranslations('Navbar');
    const tLanding = await getTranslations('Landing');
    const tFooter = await getTranslations('Footer');

    return (
        <div className="flex flex-col min-h-screen bg-brand-midnight text-slate-200 font-sans selection:bg-brand-orange selection:text-white transition-colors duration-300">
            {/* Glass Navigation */}
            <header className="fixed top-0 w-full z-50 glass-nav">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-2 group cursor-pointer">
                        <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </div>
                        <span className="text-xl font-display font-bold tracking-tight text-white uppercase">ReclamTrack <span className="text-brand-orange">Pro</span></span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
                        <div className="relative group cursor-pointer">
                            <span className="hover:text-brand-orange transition-colors flex items-center uppercase tracking-widest text-[10px] font-black">
                                {tNav('solutions')}
                                <span className="material-symbols-outlined text-xs ml-1">expand_more</span>
                            </span>
                        </div>
                        <Link href="/pricing" className="hover:text-brand-orange transition-colors uppercase tracking-widest text-[10px] font-black">{tNav('pricing')}</Link>
                        <Link href="#architecture" className="hover:text-brand-orange transition-colors uppercase tracking-widest text-[10px] font-black">Architecture</Link>
                    </nav>

                    <div className="flex items-center space-x-6">
                        <LanguageSwitcher />
                        <Link href="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-colors">
                            {tNav('login')}
                        </Link>
                        <Link href="/login" className="px-6 py-2.5 bg-brand-orange hover:bg-orange-600 text-white rounded-full transition-all orange-glow text-[10px] font-black uppercase tracking-widest">
                            {tNav('getStarted')}
                        </Link>
                    </div>
                </div>
            </header>

            <main className="gradient-bg flex-1">
                {/* Hero Section */}
                <section className="relative pt-48 pb-32 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 w-[600px] h-[600px] bg-brand-orange/5 blur-[150px] rounded-full animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full glass-card text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                            <span className="w-2 h-2 bg-brand-orange rounded-full animate-ping"></span>
                            <span className="text-slate-400">{tLanding('heroBadge')}</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-display font-extrabold leading-[0.9] mb-10 tracking-tighter uppercase italic">
                            {tLanding('heroTitle').split(' ').slice(0, 4).join(' ')} <br />
                            <span className="text-brand-orange not-italic">{tLanding('heroTitle').split(' ').slice(4).join(' ')}</span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed font-light">
                            {tLanding('heroSubtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/login" className="w-full sm:w-auto px-10 py-5 bg-brand-orange hover:bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all orange-glow transform hover:scale-105 active:scale-95">
                                {tLanding('bookDemo')}
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto px-10 py-5 glass-card text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                {tLanding('viewRoadmap')}
                                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                            </Link>
                        </div>

                        {/* Network Illustration */}
                        <div className="mt-24 relative flex justify-center animate-float">
                            <div className="w-full max-w-5xl aspect-video rounded-[3rem] overflow-hidden glass-card p-3 p-2 bg-gradient-to-br from-white/10 to-transparent">
                                <div className="w-full h-full rounded-[2.5rem] bg-brand-midnight relative overflow-hidden group">
                                    <Image
                                        alt="Network Visualization"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXtI2seLtcgaXHr1neshRW3AeZEcCgDAFLtOdNNwaf5TLx972p1iaUp3BIwrUR3H5WnGSpEf7ay4n1FuXEqMVvkGj98Rf9jM1gWBuyn3PBokIyxUMhXm6GNFjSRgRWNiIEUkYhxApmbinTzv8ZI8MBRV8c7P-7hpxfpTIGiftwxxm49U474HvK53CZZ3bPpXsumZOS6feAcC0DdcZZT9oRrmyKt42asdgkEQs9T8_3jyWNidIFPf7tk2RTREA0BsuKiMhM_DkbkC0"
                                        fill
                                        className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[10s]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-transparent to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 border-y border-white/5 bg-white/[0.01]" id="stats">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
                            {[
                                { val: "500+", key: "statsClients" },
                                { val: "99.9%", key: "statsUptime" },
                                { val: "10+", key: "statsModules" },
                                { val: "FR", key: "statsHosting" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <div className="text-4xl md:text-5xl font-display font-black text-white mb-3 tracking-tighter group-hover:text-brand-orange transition-colors">
                                        {stat.val}
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">
                                        {tLanding(stat.key)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Service Architecture Section */}
                <section className="py-32" id="solutions">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-24">
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase italic tracking-tighter">
                                {tLanding('solutionsTitle')}
                            </h2>
                            <div className="h-1.5 w-32 bg-brand-orange rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[
                                { icon: 'gov', color: 'blue', title: 'govTitle', desc: 'govDesc', symbol: 'account_balance', href: '/services/governance' },
                                { icon: 'health', color: 'cyan', title: 'healthTitle', desc: 'healthDesc', symbol: 'medical_services', href: '/services/healthcare' },
                                { icon: 'infra', color: 'blue', title: 'infraTitle', desc: 'infraDesc', symbol: 'lan', href: '/services/infrastructure' },
                                { icon: 'hotel', color: 'emerald', title: 'hotelTitle', desc: 'hotelDesc', symbol: 'hotel', href: '/services/hospitality' },
                                { icon: 'edu', color: 'amber', title: 'eduTitle', desc: 'eduDesc', symbol: 'school', href: '/services/education' }
                            ].map((service, i) => (
                                <Link key={i} href={service.href} className="glass-card p-10 rounded-[3rem] group h-full flex flex-col hover:-translate-y-4 duration-700">
                                    <div className={`w-14 h-14 bg-${service.color}-500/20 text-${service.color}-400 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all`}>
                                        <span className="material-symbols-outlined text-3xl font-bold">{service.symbol}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{tLanding(service.title)}</h3>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group-hover:border-brand-orange/30 transition-all flex-grow">
                                        <p className="font-black text-brand-orange mb-3 text-xs uppercase tracking-widest">Protocol Active</p>
                                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                                            {tLanding(service.desc)}
                                        </p>
                                    </div>
                                </Link>
                            ))}

                            {/* Cloud Industrie+ (Custom) */}
                            <div className="glass-card p-10 rounded-[3rem] bg-brand-orange/10 border-brand-orange/20 group h-full flex flex-col hover:-translate-y-4 duration-700">
                                <div className="w-14 h-14 bg-brand-orange text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-brand-orange/20">
                                    <span className="material-symbols-outlined text-3xl">bolt</span>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-6 uppercase italic tracking-tight">{tLanding('customTitle')}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light mb-10">
                                    {tLanding('customDesc')}
                                </p>
                                <Link href="/contact" className="mt-auto text-brand-orange font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 group/btn">
                                    {tFooter('helpCenter')}
                                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Architecture Section */}
                <section className="py-32 bg-white/[0.02]" id="architecture">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-16">
                                <div>
                                    <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-10 uppercase italic tracking-tighter">
                                        {tLanding('trustTitle')}
                                    </h2>
                                    <div className="h-1.5 w-32 bg-brand-orange rounded-full"></div>
                                </div>

                                <div className="space-y-12">
                                    {[
                                        { icon: 'shield_lock', title: 'trustSecurity', desc: 'trustSecurityDesc' },
                                        { icon: 'public', title: 'trustSovereign', desc: 'trustSovereignDesc' },
                                        { icon: 'api', title: 'trustApi', desc: 'trustApiDesc' }
                                    ].map((trust, i) => (
                                        <div key={i} className="flex items-start space-x-6 group">
                                            <div className="p-4 bg-brand-orange/20 rounded-2xl text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                                                <span className="material-symbols-outlined text-3xl">{trust.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{tLanding(trust.title)}</h4>
                                                <p className="text-slate-400 font-light leading-relaxed">
                                                    {tLanding(trust.desc)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-10 bg-brand-orange/20 blur-[100px] rounded-full opacity-40"></div>
                                <div className="relative glass-card p-4 rounded-[3rem] overflow-hidden shadow-2xl border-white/5">
                                    <div className="w-full aspect-[4/3] rounded-[2.5rem] bg-brand-midnight relative overflow-hidden p-2">
                                         <Image
                                            alt="Platform Dashboard"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGCX8Sh_h2aCiP-0ovT4zNtSM_OqE4kF9E51Ud1us2Sl9D4k2OFfurWAmvPJAa0zfBxai5BdsZqAJ8lK2Cg5uBIU4_Llup9Z6QdtwR7MQAxgI_eovysR77WsD1WSj3gJuqYOkPFVv6dW3_CSsyGMmlv2xQR3r_zCB1kZCEx8AkGPKZA0nE9RU0aLBlLAJcpKuPktNM4TxpJUS6ApK88fxJEHj7TF69FKGYboX8fVHYYgRNIn2VLwasN76C3vb7ahZ3Iaj8f-8g02U"
                                            fill
                                            className="object-cover opacity-80 rounded-[2rem]"
                                        />
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl border-brand-orange/50 shadow-2xl hidden md:block">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center animate-pulse">
                                            <span className="material-symbols-outlined text-3xl font-bold">verified</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white uppercase tracking-widest mb-1">Systèmes Opérationnels</p>
                                            <p className="text-[10px] text-green-400 font-black tracking-widest uppercase">Latence : 12ms</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-40 text-center px-6">
                    <div className="max-w-5xl mx-auto glass-card p-16 md:p-32 rounded-[4rem] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-50"></div>
                        <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-10 uppercase italic tracking-tighter leading-[0.9]">
                            {tLanding('ctaTitle')}
                        </h2>
                        <p className="text-slate-400 text-xl font-light mb-16 tracking-tight">
                            {tLanding('ctaSubtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-8">
                            <Link href="/contact" className="px-12 py-5 bg-brand-orange hover:bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all orange-glow transform hover:scale-105 active:scale-95">
                                {tLanding('contactExpert')}
                            </Link>
                            <Link href="/pricing" className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-3 group/btn2">
                                {tLanding('explorePricing')}
                                <span className="material-symbols-outlined text-sm group-hover/btn2:rotate-45 transition-transform duration-500">payments</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-brand-midnight pt-32 pb-16 border-t border-white/5 relative overflow-hidden" id="footer">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-20 lg:gap-10 mb-24">
                        <div className="col-span-2 space-y-10">
                            <div className="flex items-center space-x-3 group cursor-pointer">
                                <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-xl shadow-brand-orange/20">
                                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    </svg>
                                </div>
                                <span className="text-2xl font-display font-black text-white uppercase italic">ReclamTrack <span className="text-brand-orange not-italic">Pro</span></span>
                            </div>
                            <p className="text-slate-500 text-lg font-light leading-relaxed max-w-sm">
                                {tFooter('description')}
                            </p>
                            <div className="flex space-x-6">
                                {['public', 'alternate_email', 'hub'].map((icon, i) => (
                                    <Link key={i} href="#" className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-orange hover:border-brand-orange/50 transition-all duration-500">
                                        <span className="material-symbols-outlined">{icon}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {[
                            { title: tFooter('product'), links: [tFooter('mobileApp'), tFooter('fieldDashboard'), tFooter('apiAccess')] },
                            { title: tFooter('company'), links: [tFooter('aboutUs'), tFooter('caseStudies'), tFooter('careers')] },
                            { title: tFooter('support'), links: [tFooter('documentation'), tFooter('security'), tFooter('helpCenter')] },
                            { title: tFooter('legal'), links: [tFooter('privacyPolicy'), tFooter('termsOfService'), "/legal/cookies"] }
                        ].map((col, i) => (
                            <div key={i} className="space-y-8">
                                <h4 className="text-brand-orange font-black text-[10px] uppercase tracking-[0.4em]">{col.title}</h4>
                                <ul className="space-y-5">
                                    {col.links.map((link, j) => (
                                        <li key={j}>
                                            <Link href={typeof link === 'string' && link.startsWith('/') ? link : '#'} className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-[0.1em]">
                                                {typeof link === 'string' && link.includes('/') ? link.split('/').pop()?.toUpperCase() : link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">© {new Date().getFullYear()} ReclamTrack Pro / Global Ecosystem</p>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black text-slate-600 flex items-center uppercase tracking-[0.2em]">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                                All Systems Nominal
                            </span>
                        </div>
                    </div>
                </div>

                {/* Visual Accent */}
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-orange/5 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2"></div>
            </footer>
        </div>
    );
}

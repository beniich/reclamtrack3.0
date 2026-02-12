'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: "Starter",
            price: "0",
            description: "Perfect for small towns and basic internal tracking.",
            features: [
                { text: "Basic complaint tracking", included: true },
                { text: "Limited to 10 complaints / mo", included: true },
                { text: "Standard email support", included: true },
                { text: "Team management", included: false },
            ],
            buttonText: "Choose Starter",
            popular: false
        },
        {
            name: "Professional",
            price: isYearly ? "39" : "49",
            description: "The standard for growing municipalities and agencies.",
            features: [
                { text: "Unlimited complaints", included: true, bold: true },
                { text: "Advanced analytics & heatmaps", included: true, bold: true },
                { text: "Team management (up to 10 users)", included: true, bold: true },
                { text: "Priority 24/7 support", included: true, bold: true },
                { text: "Automated workflow triggers", included: true, bold: true },
            ],
            buttonText: "Choose Professional",
            popular: true,
            subtext: isYearly ? "Billed $468 annually" : null
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Dedicated solutions for large-scale operations with volume discounts.",
            features: [
                { text: "White-label citizen portal", included: true },
                { text: "Dedicated server & database", included: true },
                { text: "Full REST API access", included: true },
                { text: "SLA guarantees & uptime monitoring", included: true },
                { text: "Dedicated account manager", included: true },
            ],
            buttonText: "Contact Sales",
            popular: false
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0e0e1b] dark:text-[#f8f8fc] min-h-screen font-display">
            <main className="flex flex-1 flex-col items-center py-12 px-6 lg:px-20 max-w-7xl mx-auto w-full">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 animate-fade-in">Flexible Plans for Every Need</h1>
                    <p className="text-lg text-[#4d4d99] dark:text-[#a0a0d0]">
                        Empower your team with the right tools to streamline complaint tracking, improve resolution rates, and boost citizen satisfaction.
                    </p>
                    {/* Billing Toggle */}
                    <div className="mt-10 flex flex-col items-center">
                        <div className="flex items-center gap-4">
                            <span className={`text-sm font-semibold transition-opacity ${!isYearly ? 'opacity-100' : 'opacity-60'}`}>Monthly</span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                className="relative w-14 h-7 bg-[#d0d0e7] dark:bg-[#2a2a4a] rounded-full p-1 transition-colors focus:outline-none"
                            >
                                <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${isYearly ? 'translate-x-7' : 'translate-x-0'}`}></div>
                            </button>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold transition-opacity ${isYearly ? 'opacity-100' : 'opacity-60'}`}>Yearly</span>
                                <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400">
                                    Save 20%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col rounded-xl border border-solid p-8 transition-all hover:scale-[1.02] ${plan.popular
                                ? 'relative border-2 border-primary bg-white dark:bg-[#1a1a30] shadow-xl z-10'
                                : 'border-[#d0d0e7] dark:border-[#2a2a4a] bg-white dark:bg-[#1a1a30] shadow-sm'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-2">
                                    {plan.name} {plan.name === "Professional" && <span className="text-primary font-black">(Gold)</span>}
                                </h3>
                                <div className="flex flex-col">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">
                                            {plan.price !== "Custom" ? `$${plan.price}` : plan.price}
                                        </span>
                                        {plan.price !== "Custom" && (
                                            <span className="text-sm opacity-60">/{isYearly ? 'month' : 'month'}</span>
                                        )}
                                    </div>
                                    {plan.subtext && (
                                        <span className="text-xs font-semibold text-primary mt-1">{plan.subtext}</span>
                                    )}
                                </div>
                                <p className="mt-4 text-sm text-[#4d4d99] dark:text-[#a0a0d0]">{plan.description}</p>
                            </div>

                            <div className="flex-1 space-y-4 mb-8 text-sm">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className={`flex items-start gap-3 ${!feature.included ? 'opacity-40 grayscale' : ''}`}>
                                        {feature.included ? (
                                            <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                                        ) : (
                                            <XCircle className="w-5 h-5 shrink-0" />
                                        )}
                                        <span className={('bold' in feature && feature.bold) ? 'font-medium' : ''}>{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={plan.name === "Professional" ? "/en/pricing/summary" : "#"}
                                className={`w-full py-3 px-4 rounded-lg font-bold text-sm text-center transition-all ${plan.popular
                                    ? 'bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/25'
                                    : 'bg-[#e7e7f3] dark:bg-[#2a2a4a] text-primary dark:text-[#f8f8fc] hover:opacity-80'
                                    }`}
                            >
                                {plan.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="mt-20 text-center py-8 border-t border-[#d0d0e7] dark:border-[#2a2a4a] w-full">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#4d4d99] dark:text-[#a0a0d0] mb-8">Trusted by 500+ Municipalities Worldwide</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">domain</span>
                            <span className="font-bold">METRO CITY</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">location_city</span>
                            <span className="font-bold">TECH HUB</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">apartment</span>
                            <span className="font-bold">URBAN DEPT</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">corporate_fare</span>
                            <span className="font-bold">TOWN GOV</span>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20 w-full max-w-3xl">
                    <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="group bg-white dark:bg-[#1a1a30] rounded-lg border border-[#d0d0e7] dark:border-[#2a2a4a] p-4 cursor-pointer">
                            <summary className="flex items-center justify-between font-medium">
                                <span>Can I change my plan later?</span>
                                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="pt-4 text-sm text-[#4d4d99] dark:text-[#a0a0d0] leading-relaxed">
                                Yes, you can upgrade or downgrade your plan at any time from your admin dashboard. Changes to billing will be reflected in your next invoice.
                            </div>
                        </details>
                        <details className="group bg-white dark:bg-[#1a1a30] rounded-lg border border-[#d0d0e7] dark:border-[#2a2a4a] p-4 cursor-pointer">
                            <summary className="flex items-center justify-between font-medium">
                                <span>Do you offer discounts for educational institutions?</span>
                                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="pt-4 text-sm text-[#4d4d99] dark:text-[#a0a0d0] leading-relaxed">
                                We certainly do. Contact our sales team with your institutional credentials to learn more about our 25% discount for educational and non-profit organizations.
                            </div>
                        </details>
                    </div>
                </div>
            </main>
        </div>
    );
}

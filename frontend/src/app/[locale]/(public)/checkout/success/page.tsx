'use client';

import React from 'react';
import Link from 'next/link';
import {
    CheckCircle2,
    Download,
    LayoutDashboard,
    ArrowRight
} from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-slate-100 antialiased">
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-[560px] bg-white dark:bg-[#162a16] rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    {/* Hero Section with Pattern */}
                    <div className="relative h-32 bg-primary/10 flex items-center justify-center">
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
                                backgroundSize: '16px 16px'
                            }}
                        ></div>
                        <div className="relative bg-white dark:bg-background-dark rounded-full p-4 shadow-lg translate-y-8">
                            <CheckCircle2 className="text-primary w-16 h-16" strokeWidth={3} />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="pt-12 pb-10 px-8 text-center">
                        <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight mb-2">Payment Successful!</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">Welcome to the <span className="text-primary font-semibold">Gold Plan</span>. We&apos;re excited to have you onboard.</p>

                        {/* Order Summary */}
                        <div className="bg-background-light dark:bg-background-dark/40 rounded-lg p-6 mb-8 border border-gray-100 dark:border-gray-800 text-left">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Subscription Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">Transaction ID</span>
                                    <span className="text-gray-900 dark:text-white text-sm font-medium">#TXN-20260212</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">Date</span>
                                    <span className="text-gray-900 dark:text-white text-sm font-medium">February 12, 2026</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-900 dark:text-white text-sm font-semibold">Amount Paid</span>
                                    <span className="text-primary text-lg font-bold">$49.00<span className="text-xs font-normal text-gray-500">/mo</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href="/en/dashboard"
                                className="flex-1 bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Go to Dashboard
                            </Link>
                            <button className="flex-1 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 hover:border-primary text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Invoice
                            </button>
                        </div>

                        {/* Quick Start Footer */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                New here? <Link className="text-primary font-medium hover:underline inline-flex items-center gap-1" href="#">
                                    Check out our Quick Start Guide
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-8 px-6 text-center">
                <p className="text-gray-400 dark:text-gray-600 text-xs">
                    © 2026 CMS Admin Inc. All rights reserved.
                    <span className="mx-2">•</span>
                    <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <span className="mx-2">•</span>
                    <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                </p>
            </footer>
        </div>
    );
}

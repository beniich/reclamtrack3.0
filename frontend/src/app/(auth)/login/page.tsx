'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background-light dark:bg-background-dark transition-colors duration-200 font-display">
            {/* Logo / Branding Header */}
            <div className="mb-8 flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-white text-3xl">shield_person</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">IMS Secure</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Intervention Management System</p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* Header Image Component Style */}
                <div className="w-full h-32 bg-primary/10 flex items-center justify-center overflow-hidden relative">
                    <div
                        className="absolute inset-0 opacity-10 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCf-Sk1u3Dvs0aBHThfocpPqpAV-DzyqkHPPTAUSU_PqnsG_V09B1VCGb6JWS2rQWjye7nun2qQJdaiiaK0yWglbmxz9DRxEH5JRmXPgPCQRITJFokOS5EfXcwQmRpe_1c6ChlhELBzAMb6jlZxVCucIqPk3zqRO9jnXr9PIA5H96Ybo6JO1ZBlGEnmJNzgUcvnG7SeL4_Jf0B9B6-eGi-BNtRBFLNXOIH6Ypm1NHcRllOFkisWyqOtMWeIXhezrHOY1gvd0hONs75m')" }}
                    ></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-primary dark:text-primary">Welcome Back</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium">Authentication Required</p>
                    </div>
                </div>

                <div className="p-8">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {/* Username/Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="identifier">Username or Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                <input
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                                    id="identifier"
                                    name="identifier"
                                    placeholder="Enter your email address"
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                                <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                <input
                                    className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input className="w-4 h-4 text-primary bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded focus:ring-primary" id="remember" type="checkbox" />
                            <label className="ml-2 block text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">Keep me logged in</label>
                        </div>

                        {/* Sign In Button */}
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2" type="submit">
                            <span>Sign In</span>
                            <span className="material-symbols-outlined text-lg">login</span>
                        </button>
                    </form>

                    {/* Security Footer inside card */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                        <span className="material-symbols-outlined text-sm">encrypted</span>
                        <span className="text-xs">End-to-end encrypted connection</span>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <a className="hover:text-primary transition-colors" href="#">Security Policy</a>
                <a className="hover:text-primary transition-colors" href="#">Support Center</a>
                <a className="hover:text-primary transition-colors" href="#">Privacy</a>
            </div>

            <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
                © 2024 Intervention Management Systems. All rights reserved.
            </p>
        </div>
    );
}

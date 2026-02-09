
'use client';

import Link from 'next/link';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background-light dark:bg-background-dark transition-colors duration-200">
            {/* Logo / Branding */}
            <div className="mb-8 flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 text-white">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">IMS Secure</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Intervention Management System</p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* Header Image */}
                <div className="w-full h-32 bg-primary/10 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCf-Sk1u3Dvs0aBHThfocpPqpAV-DzyqkHPPTAUSU_PqnsG_V09B1VCGb6JWS2rQWjye7nun2qQJdaiiaK0yWglbmxz9DRxEH5JRmXPgPCQRITJFokOS5EfXcwQmRpe_1c6ChlhELBzAMb6jlZxVCucIqPk3zqRO9jnXr9PIA5H96Ybo6JO1ZBlGEnmJNzgUcvnG7SeL4_Jf0B9B6-eGi-BNtRBFLNXOIH6Ypm1NHcRllOFkisWyqOtMWeIXhezrHOY1gvd0hONs75m')] bg-cover bg-center"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-primary dark:text-primary">Welcome Back</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium">Authentication Required</p>
                    </div>
                </div>

                <div className="p-8">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {/* Username/Email */}
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Username or Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    placeholder="Enter your email address"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Password
                                </label>
                                <Link href="#" className="text-xs font-semibold text-primary hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 text-primary bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded focus:ring-primary"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-slate-600 dark:text-slate-400">
                                Keep me logged in
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            <span>Sign In</span>
                            <LogIn className="w-5 h-5" />
                        </Button>
                    </form>

                    {/* Security Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs">End-to-end encrypted connection</span>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <Link href="#" className="hover:text-primary transition-colors">Security Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Support Center</Link>
                <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            </div>

            <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
                © 2024 Intervention Management Systems. All rights reserved.
            </p>
        </div>
    );
}

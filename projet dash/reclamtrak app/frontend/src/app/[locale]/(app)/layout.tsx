'use client';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

import { useAuth } from '@/hooks/useAuth';
import useNotifications from '@/hooks/useNotifications';
import { useAuthStore } from '@/store/authStore';
import { useOrgStore } from '@/store/orgStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    const { _hasHydrated, token } = useAuthStore();
    const { fetchOrganizations, organizations } = useOrgStore();
    const router = useRouter();
    useNotifications();

    useEffect(() => {
        if (_hasHydrated && !user && !token) {
            router.push('/login');
        }
    }, [user, token, _hasHydrated, router]);

    useEffect(() => {
        if (user && token && organizations.length === 0) {
            fetchOrganizations();
        }
    }, [user, token, organizations.length, fetchOrganizations]);

    if (!_hasHydrated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
                    <p className="text-sm text-slate-400 font-medium">Initialisation...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-background text-foreground selection:bg-indigo-500/10 transition-colors duration-500 overflow-hidden">
            <Sidebar />
            
            <div className="flex flex-col flex-1 relative overflow-hidden h-screen">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
                </div>

                <Header />
                
                <main className="flex-1 overflow-y-auto min-h-0 relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200/50 dark:scrollbar-thumb-violet-500/10">
                    <div className="max-w-[1600px] mx-auto px-6 py-8">
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );

}


'use client';

import Header from '@/components/Header';
import { Footer } from '@/components/layout/Footer';
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
            <div className="flex items-center justify-center min-h-screen bg-[#0a1628]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
                    <p className="text-sm text-white/30 font-medium">Initialisation...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0f1a] text-white selection:bg-indigo-500/30">
            <Header />
            <div className="flex flex-1 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
                </div>

                <Sidebar />
                <main className="flex-1 overflow-y-auto min-h-0 relative">
                    <div className="max-w-[1600px] mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );

}


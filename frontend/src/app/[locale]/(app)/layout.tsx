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
        <div className="flex flex-col min-h-screen bg-brand-midnight text-white">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto min-h-0">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
                        {children}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}


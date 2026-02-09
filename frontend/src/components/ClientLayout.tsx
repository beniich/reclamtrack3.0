'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isTechnician = pathname?.startsWith('/technician');
    const isMap = pathname?.startsWith('/map');

    const isFleet = pathname?.startsWith('/fleet');
    const isAdminSystem = pathname?.startsWith('/admin/system');

    // Full screen layouts (No global Header/Footer)
    if (isTechnician || isFleet || isAdminSystem) {
        return <>{children}</>;
    }

    // Map: App Header, No Footer (maybe?), Full Width, No Padding
    if (isMap) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 w-full relative">
                    {children}
                </main>
            </div>
        );
    }

    // Default: App Header, Footer, Centered Content
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
            <Footer />
        </div>
    );
}

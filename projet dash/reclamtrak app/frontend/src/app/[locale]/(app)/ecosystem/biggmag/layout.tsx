import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BiggMag Marketplace | CloudIndustry LTD',
    description: 'Enterprise Marketplace engine for global retail and logistics management.',
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

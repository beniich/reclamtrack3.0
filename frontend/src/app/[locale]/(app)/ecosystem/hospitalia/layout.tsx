import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hospitalia Harmony | CloudIndustre LTD',
    description: 'Luxury PMS and Guest Management OS for independent hotels and groups.',
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

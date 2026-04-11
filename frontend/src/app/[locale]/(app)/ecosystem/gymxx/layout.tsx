import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GymXX | CloudIndustre LTD',
    description: 'High-performance member OS for fitness clubs and sports centers.',
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

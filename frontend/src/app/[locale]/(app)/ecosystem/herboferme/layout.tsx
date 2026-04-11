import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Herboferme | CloudIndustre LTD',
    description: 'Precision Agriculture OS. Monitor soil health and crop distribution in real-time.',
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

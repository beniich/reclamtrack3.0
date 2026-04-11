import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Madrassa | CloudIndustre LTD',
    description: 'Modern LMS and school management platform for digital-first educational institutions.',
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

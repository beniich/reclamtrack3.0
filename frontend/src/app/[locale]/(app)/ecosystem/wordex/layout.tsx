import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Wordex | CloudIndustre LTD',
    description: 'Industrial linguistic processing and advanced SEO analytics dashboard.',
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

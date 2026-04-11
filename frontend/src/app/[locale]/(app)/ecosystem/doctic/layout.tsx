import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Doctic Care | CloudIndustre LTD',
    description: 'Advanced Industrial Health OS for clinics and hospitals. Optimize patient flows and medical resources with Doctic Care.',
};

export default function DocticLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

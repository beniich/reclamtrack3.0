import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MecanicPro | CloudIndustry LTD',
    description: 'Industrial Fleet & Management OS. High-telemetry tracking and AI-driven workshop diagnostics.',
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

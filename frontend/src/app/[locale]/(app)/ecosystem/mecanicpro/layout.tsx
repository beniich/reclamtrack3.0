import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MecanicPro | CloudIndustre LTD',
    description: 'Industrial Fleet & Management OS. High-telemetry tracking and AI-driven workshop diagnostics.',
};

export default function MecanicProLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

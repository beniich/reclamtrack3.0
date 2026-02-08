import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ReclamTrack - Accueil',
    description: 'Plateforme de gestion des réclamations et interventions municipales',
};

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

export const metadata: Metadata = {
    title: 'ReclamTrack - Gestion des Services Municipaux',
    description: 'Plateforme complète de gestion des réclamations et interventions municipales. Suivez, gérez et résolvez les demandes citoyennes en temps réel.',
    keywords: ['gestion municipale', 'réclamations', 'interventions', 'services publics', 'ville intelligente'],
    authors: [{ name: 'ReclamTrack Solutions' }],
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' }
    ],
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        title: 'ReclamTrack - Gestion des Services Municipaux',
        description: 'Plateforme complète de gestion des réclamations et interventions municipales',
        siteName: 'ReclamTrack',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className="light" suppressHydrationWarning>
            <head>
                {/* Material Symbols Icons */}
                <link 
                    rel="stylesheet" 
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
                />
                {/* Preconnect for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}

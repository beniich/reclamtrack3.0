import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-brand-midnight text-white selection:bg-cyan-500 selection:text-white">
            <Header showSearch={false} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}


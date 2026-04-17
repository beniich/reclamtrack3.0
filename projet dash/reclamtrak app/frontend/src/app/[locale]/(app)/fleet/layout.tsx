'use client';

export default function FleetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

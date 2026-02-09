import DashboardHeader from '../../components/layout/DashboardHeader';
import DashboardSidebar from '../../components/layout/DashboardSidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen">
            <DashboardHeader />
            <div className="flex flex-1 overflow-hidden">
                <DashboardSidebar />
                <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

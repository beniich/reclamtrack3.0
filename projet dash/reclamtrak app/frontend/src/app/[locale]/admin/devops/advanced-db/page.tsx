import DbDashboard from "@/components/advanced-ui/DbDashboard";
import { Footer } from "@/components/devops-dashboards/layout/Footer";
import { Header } from "@/components/devops-dashboards/layout/Header";

export default function AdvancedDbPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark gradient-bg flex flex-col">
      <Header />
      <main className="flex-1">
        <DbDashboard />
      </main>
      <Footer />
    </div>
  );
}

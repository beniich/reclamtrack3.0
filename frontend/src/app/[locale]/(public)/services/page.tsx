'use client';

import { useState } from 'react';
import {
    Droplets,
    Zap,
    Lightbulb,
    Trash2,
    Hammer,
    Trees,
} from 'lucide-react';
import { Header } from '@/components/services/Header';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Modal } from '@/components/services/Modal';
import { SERVICES } from '@/lib/services-data';

const ICONS = {
    water: <Droplets className="w-8 h-8" />,
    electricity: <Zap className="w-8 h-8" />,
    lighting: <Lightbulb className="w-8 h-8" />,
    waste: <Trash2 className="w-8 h-8" />,
    roads: <Hammer className="w-8 h-8" />,
    parks: <Trees className="w-8 h-8" />,
};

export default function ServicesPage() {
    const [selectedService, setSelectedService] = useState<string | null>(null);

    const handleReportIssue = (serviceId: string) => {
        setSelectedService(serviceId);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Hero Section */}
                <section className="mb-12">
                    <div className="relative rounded-xl overflow-hidden bg-slate-900 h-64 flex items-center p-12">
                        <div className="absolute inset-0 opacity-30">
                            <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-600" />
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                How can we help you today?
                            </h2>
                            <p className="text-slate-200 text-lg">
                                Access essential municipal services, contact emergency maintenance
                                teams, or report infrastructure issues directly to the city
                                administration.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            icon={ICONS[service.id as keyof typeof ICONS]}
                            status={service.status}
                            details={service.details}
                            onReportIssue={() => handleReportIssue(service.id)}
                        />
                    ))}
                </div>
            </main>

            {/* Report Issue Modal */}
            <Modal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                title={`Report Issue: ${SERVICES.find(s => s.id === selectedService)?.title}`}
                description="Please provide details about the issue you're experiencing"
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Issue Description
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                            rows={4}
                            placeholder="Describe the issue..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="Street or area..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setSelectedService(null)}
                            className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Submit Report
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

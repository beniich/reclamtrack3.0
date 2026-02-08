'use client';

import PlanningCalendar from '@/components/PlanningCalendar';
import { Calendar } from 'lucide-react';

export default function PlanningPage() {
    return (
        <section className="max-w-6xl mx-auto py-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Planning mensuel
            </h2>
            <PlanningCalendar />
        </section>
    );
}

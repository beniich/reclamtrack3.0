'use client';

export default function PlanningPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Planning</h1>
            <p className="text-gray-600">Planning mensuel des interventions.</p>
            <div className="mt-6 bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">Aucun créneau de planning. La base de données n'est pas connectée.</p>
            </div>
        </div>
    );
}

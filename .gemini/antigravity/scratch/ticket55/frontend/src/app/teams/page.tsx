'use client';

export default function TeamsPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Équipes</h1>
            <p className="text-gray-600">Liste des équipes disponibles pour les interventions.</p>
            <div className="mt-6 bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">Aucune équipe configurée. La base de données n'est pas connectée.</p>
            </div>
        </div>
    );
}

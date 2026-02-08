'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Complaint } from '@/types';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FileText } from 'lucide-react';

export default function ComplaintListPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get('/complaints')
            .then((res) => setComplaints(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    const statusColors = {
        nouvelle: 'bg-blue-100 text-blue-800',
        'en cours': 'bg-yellow-100 text-yellow-800',
        résolue: 'bg-green-100 text-green-800',
        fermée: 'bg-gray-100 text-gray-800'
    };

    return (
        <section className="max-w-6xl mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Liste des réclamations
                </h2>
                <Link
                    href="/complaints/new"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Nouvelle réclamation
                </Link>
            </div>

            {complaints.length === 0 ? (
                <div className="bg-white rounded-lg border p-12 text-center text-gray-500">
                    Aucune réclamation pour le moment.
                </div>
            ) : (
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N°</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom / Prénom</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nature</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {complaints.map((c) => (
                                <tr key={c._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm">{c.number}</td>
                                    <td className="px-6 py-4">
                                        {c.firstName} {c.lastName}
                                    </td>
                                    <td className="px-6 py-4 capitalize">{c.leakType}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(c.createdAt).toLocaleDateString('fr-FR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

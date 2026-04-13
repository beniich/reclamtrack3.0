'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, Key, Shield, Plus, Lock } from 'lucide-react';
import { useState } from 'react';

export default function SSHManagementPage() {
    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gestion SSH</h1>
                    <p className="text-slate-500 mt-2">Gérez les paires de clés SSH et les accès serveurs sécurisés</p>
                </div>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                    <Plus size={18} />
                    <span>Nouvelle Clé</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Clés Actives</CardTitle>
                        <Key className="h-5 w-5 text-slate-700" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">12</div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Serveurs Connectés</CardTitle>
                        <ServerIcon className="h-5 w-5 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">8</div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Clés Expirées</CardTitle>
                        <Lock className="h-5 w-5 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">2</div>
                        <p className="text-xs text-orange-600 mt-1">Nécessite une rotation</p>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder pour la liste des clés */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                        <Terminal className="h-5 w-5" />
                        Registre des Clés SSH Autorises
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center p-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                        Intégration en cours avec `/api/ssh`. Les clés apparaîtront ici.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function ServerIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
            <line x1="6" x2="6.01" y1="6" y2="6" />
            <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
    )
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, GitCommit, GitMerge, RefreshCw } from 'lucide-react';

export default function DevOpsPage() {
    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Outils DevOps & CI/CD</h1>
                    <p className="text-slate-500 mt-2">Gestion des déploiements continus et pipelines Vercel/GitHub</p>
                </div>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                    <RefreshCw size={18} />
                    <span>Déclencher Build</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Dernier Commit</CardTitle>
                        <GitCommit className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 font-mono truncate">feat: harmonization</div>
                        <p className="text-xs text-slate-500 mt-1">Il y a 10 minutes</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">État du Build</CardTitle>
                        <GitMerge className="h-5 w-5 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600">SUCCÈS</div>
                        <p className="text-xs text-slate-500 mt-1">Vercel Production</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Branche Active</CardTitle>
                        <GitBranch className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">main</div>
                        <p className="text-xs text-slate-500 mt-1">Environnement Protégé</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                        Historique des Déploiements
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center p-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                        Récupération des logs via `/api/devops` en cours...
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Cpu, HardDrive, Network } from 'lucide-react';

export default function MonitoringPage() {
    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Supervision & Télémétrie</h1>
                    <p className="text-slate-500 mt-2">Vue d'ensemble de la santé des microservices et serveurs</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Charge CPU Globale</CardTitle>
                        <Cpu className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">42%</div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Mémoire (RAM)</CardTitle>
                        <HardDrive className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">12.4 GB</div>
                    </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-emerald-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Uptime</CardTitle>
                        <Activity className="h-5 w-5 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">99.98%</div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-cyan-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Bande Passante</CardTitle>
                        <Network className="h-5 w-5 text-cyan-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">1.2 GB/s</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                        Grafana Dashboards
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center p-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                        Intégration iFrame Grafana en cours (via `/api/monitoring`).
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

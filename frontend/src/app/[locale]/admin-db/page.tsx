'use client';

import React, { useEffect, useState } from "react";
import MetricCard from "@/components/admin-db/ui/MetricCard";
import ReplicationChart from "@/components/admin-db/ui/ReplicationChart";
import BackupTimeline from "@/components/admin-db/ui/BackupTimeline";
import ClusterCard from "@/components/admin-db/ui/ClusterCard";
import Terminal from "@/components/admin-db/ui/Terminal";
import { dbAdminApi } from "@/services/dbAdminService";

interface Metrics {
    replicationLagMs: number;
    diskUsagePct: number;
    ioThroughputIOPS: number;
    lastBackup: string;
    activeNodes: number;
}

function generateFakeChartData() {
    // génère 36 points (une point toutes 20 min sur 12 h)
    const points = [];
    for (let i = 0; i <= 800; i += 25) {
        const y = Math.round(140 + Math.random() * 40); // entre 140-180
        points.push({ x: i, y });
    }
    return points;
}

export default function AdminDbPage() {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [replicas, setReplicas] = useState<any[]>([]);
    const [backups, setBackups] = useState<any[]>([]);
    const [clusters, setClusters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Chargement initial + rafraîchissement toutes les 10 s
    useEffect(() => {
        const loadAll = async () => {
            try {
                const [metricsRes, replicasRes, backupsRes, clustersRes] = await Promise.all([
                    dbAdminApi.getMetrics(),
                    dbAdminApi.getReplicas(),
                    dbAdminApi.getBackups(),
                    dbAdminApi.getClusters(),
                ]);
                setMetrics(metricsRes.data);
                setReplicas(replicasRes.data);
                setBackups(backupsRes.data);
                setClusters(clustersRes.data);
            } catch (error) {
                console.error("Erreur lors du chargement des données DB:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAll();
        const interval = setInterval(loadAll, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <main className="flex-1 px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full">
                {/* Titre + boutons */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Enterprise Database</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Gérez vos clusters, réplicas et sauvegardes en temps réel.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm font-medium">
                            <span className="material-symbols-outlined text-lg">warning</span> Emergency Pause
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-sm font-medium shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">add_circle</span> Add Replica
                        </button>
                    </div>
                </div>

                {/* ---------- QUICK METRICS ---------- */}
                <div className="grid gap-6 mb-8 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        title="Replication Lag"
                        value={metrics?.replicationLagMs ?? "--"}
                        unit="ms"
                        icon="sync"
                        badge={`${metrics?.replicationLagMs ?? "--"} ms lag`}
                    />
                    <MetricCard
                        title="Backup Status"
                        value={metrics?.lastBackup ?? "--"}
                        icon="backup"
                    />
                    <MetricCard
                        title="Disk Utilisation"
                        value={metrics?.diskUsagePct ? `${metrics.diskUsagePct}%` : "--"}
                        icon="save"
                    />
                    <MetricCard
                        title="I/O Throughput"
                        value={metrics?.ioThroughputIOPS ?? "--"}
                        unit=" IOPS"
                        icon="speed"
                    />
                </div>

                {/* ---------- GRAPHS ---------- */}
                <div className="grid gap-8 xl:grid-cols-2">
                    <ReplicationChart data={generateFakeChartData()} />
                    <BackupTimeline backups={backups} />
                </div>

                {/* ---------- CLUSTERS ---------- */}
                <section className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Clusters & Replicas
                        </h2>
                        <span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                            {clusters.length} Nodes Active
                        </span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {clusters.map((c) => (
                            <ClusterCard key={c.id} cluster={c} />
                        ))}
                    </div>
                </section>

                {/* ---------- TERMINAL ---------- */}
                <Terminal />
            </main>
        </div>
    );
}

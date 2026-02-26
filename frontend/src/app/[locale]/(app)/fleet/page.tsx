'use client';

import apiClient from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useOrgStore } from '@/store/orgStore';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Vehicle {
    _id: string;
    plateNumber: string;
    type: string;
    details: string;
    status: 'available' | 'in_use' | 'maintenance' | 'repair';
    fuelLevel: number;
    mileage: number;
    lastMaintenance: string | null;
    nextMaintenanceDue: string | null;
    driverId?: { name: string } | null;
}

interface Summary {
    total: number;
    available: number;
    maintenance: number;
    in_use: number;
    lowFuel: number;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

type FilterTab = 'all' | 'maintenance' | 'in_use' | 'available';

const statusConfig = {
    available: { label: 'Available', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
    in_use: { label: 'On Duty', color: 'bg-blue-100 text-blue-700 dark:bg-primary/20 dark:text-blue-400' },
    maintenance: { label: 'Maintenance', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    repair: { label: 'In Repair', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
};

const fuelColor = (level: number) => {
    if (level < 25) return 'bg-red-500';
    if (level < 50) return 'bg-amber-500';
    return 'bg-emerald-500';
};

export default function FleetPage() {
    const { user } = useAuthStore();
    const { activeOrganization, isLoading: isOrgLoading } = useOrgStore();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [summary, setSummary] = useState<Summary>({ total: 0, available: 0, maintenance: 0, in_use: 0, lowFuel: 0 });
    const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 10, pages: 1 });
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filterTab, setFilterTab] = useState<FilterTab>('all');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [statusEditId, setStatusEditId] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchQuery), 350);
        return () => clearTimeout(t);
    }, [searchQuery]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuId(null);
                setStatusEditId(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const fetchVehicles = async (page = 1) => {
        if (!activeOrganization) return;
        setIsLoading(true);
        try {
            const params: Record<string, string> = {
                page: String(page),
                limit: '10',
            };
            if (debouncedSearch) params.search = debouncedSearch;
            if (filterTab !== 'all') params.status = filterTab;

            const res = await apiClient.get<{ data: Vehicle[]; summary: Summary; pagination: Pagination }>('/fleet/vehicles', params);
            setVehicles(res.data || []);
            setSummary(res.summary || { total: 0, available: 0, maintenance: 0, in_use: 0, lowFuel: 0 });
            setPagination(res.pagination || { total: 0, page: 1, limit: 10, pages: 1 });
        } catch (err) {
            console.error('Failed to fetch fleet vehicles:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isOrgLoading) fetchVehicles(1);
    }, [activeOrganization, isOrgLoading, debouncedSearch, filterTab]);

    const handleDeleteVehicle = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;
        try {
            await apiClient.delete(`/fleet/vehicles/${id}`);
            setVehicles(prev => prev.filter(v => v._id !== id));
            setSummary(prev => ({ ...prev, total: prev.total - 1 }));
        } catch (err) {
            console.error('Failed to delete vehicle:', err);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const updated = await apiClient.put<{ data: Vehicle }>(`/fleet/vehicles/${id}/status`, { status: newStatus });
            setVehicles(prev => prev.map(v => v._id === id ? (updated as any).data || updated : v));
            setStatusEditId(null);
            setOpenMenuId(null);
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleDownloadCSV = async () => {
        if (!activeOrganization) return;
        setIsDownloading(true);
        try {
            const token = localStorage.getItem('auth_token');
            const orgId = localStorage.getItem('active_organization_id');
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/fleet/vehicles/export`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-organization-id': orgId || '',
                    }
                }
            );
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `fleet-vehicles-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to export CSV:', err);
        } finally {
            setIsDownloading(false);
        }
    };

    const tabs: { key: FilterTab; label: string }[] = [
        { key: 'all', label: 'All Vehicles' },
        { key: 'maintenance', label: 'Service Due' },
        { key: 'in_use', label: 'On Assignment' },
        { key: 'available', label: 'Idle' },
    ];

    const formatDate = (date: string | null) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getMaintenanceStatus = (vehicle: Vehicle) => {
        if (!vehicle.nextMaintenanceDue) return null;
        const due = new Date(vehicle.nextMaintenanceDue);
        const now = new Date();
        const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return { label: `Overdue by ${Math.abs(diffDays)} days`, color: 'text-red-400' };
        if (diffDays < 30) return { label: `Due in ${diffDays} days`, color: 'text-amber-500' };
        return null;
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                    <h2 className="text-lg font-bold">Vehicle Fleet Monitoring</h2>
                    <div className="relative w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input
                            className="w-full bg-slate-100 dark:bg-[#242447] border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all outline-none"
                            placeholder="Search plates, models..."
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {/* Download CSV */}
                    <button
                        onClick={handleDownloadCSV}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-[#242447] text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                        title="Download fleet data as CSV"
                    >
                        <span className="material-symbols-outlined text-base">
                            {isDownloading ? 'hourglass_empty' : 'download'}
                        </span>
                        {isDownloading ? 'Exporting...' : 'Export CSV'}
                    </button>
                    <button className="p-2 rounded-lg bg-slate-100 dark:bg-[#242447] text-slate-600 dark:text-white relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-[#242447]"></span>
                    </button>
                    <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800"></div>
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-xs font-bold">{user.name || user.email?.split('@')[0]}</p>
                                <p className="text-[10px] text-slate-500">{(user as any).role || 'Fleet User'}</p>
                            </div>
                            <div className="h-9 w-9 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center text-primary font-black text-sm uppercase">
                                {(user.name || user.email || '?').charAt(0)}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500 dark:text-[#9292c8]">TOTAL VEHICLES</span>
                        <span className="material-symbols-outlined text-primary">local_shipping</span>
                    </div>
                    <h3 className="text-3xl font-black">{isLoading ? '...' : summary.total}</h3>
                </div>
                <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500 dark:text-[#9292c8]">ON ASSIGNMENT</span>
                        <span className="material-symbols-outlined text-blue-400">task_alt</span>
                    </div>
                    <h3 className="text-3xl font-black">{isLoading ? '...' : summary.in_use}</h3>
                </div>
                <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ring-1 ring-amber-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500 dark:text-[#9292c8]">MAINTENANCE ALERTS</span>
                        <span className="material-symbols-outlined text-amber-500">warning</span>
                    </div>
                    <h3 className="text-3xl font-black">{isLoading ? '...' : summary.maintenance}</h3>
                </div>
                <div className="bg-white dark:bg-[#1c1c30] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ring-1 ring-red-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-slate-500 dark:text-[#9292c8]">LOW FUEL WARNINGS</span>
                        <span className="material-symbols-outlined text-red-500">ev_station</span>
                    </div>
                    <h3 className="text-3xl font-black">{isLoading ? '...' : summary.lowFuel}</h3>
                </div>
            </div>

            {/* Filters & Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex bg-slate-100 dark:bg-[#242447] p-1 rounded-lg w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilterTab(tab.key)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
                                filterTab === tab.key
                                    ? 'bg-white dark:bg-primary text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-500 dark:text-[#9292c8] hover:text-slate-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <Link
                    href="/fleet/vehicles/new"
                    className="flex items-center gap-2 bg-slate-800 dark:bg-[#242447] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add New Vehicle
                </Link>
            </div>

            {/* Vehicle Health Table */}
            <div className="bg-white dark:bg-[#1c1c30] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden" ref={menuRef}>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-[#242447]/50 text-slate-500 dark:text-[#9292c8] text-[11px] font-bold uppercase tracking-wider">
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Vehicle Plate</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Model / Type</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Fuel Level</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Last Maintenance</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Mileage</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">Status</th>
                            <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
                        {isLoading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i}>
                                    {Array(7).fill(0).map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : vehicles.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-16 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="material-symbols-outlined text-5xl opacity-30">local_shipping</span>
                                        <p className="text-sm font-medium">
                                            {searchQuery ? `No vehicles found for "${searchQuery}"` : 'No vehicles found.'}
                                        </p>
                                        {!searchQuery && (
                                            <Link href="/fleet/vehicles/new" className="text-primary text-xs font-bold hover:underline">
                                                + Add your first vehicle
                                            </Link>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            vehicles.map(vehicle => {
                                const maintStatus = getMaintenanceStatus(vehicle);
                                const cfg = statusConfig[vehicle.status] || statusConfig.available;
                                const isMenuOpen = openMenuId === vehicle._id;
                                const isStatusEdit = statusEditId === vehicle._id;

                                return (
                                    <tr key={vehicle._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-8 w-8 rounded flex items-center justify-center text-sm ${
                                                    vehicle.status === 'maintenance' ? 'bg-red-500/10 text-red-500' :
                                                    vehicle.status === 'in_use' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-emerald-500/10 text-emerald-500'
                                                }`}>
                                                    <span className="material-symbols-outlined text-lg">
                                                        {vehicle.status === 'maintenance' ? 'build' :
                                                         vehicle.status === 'in_use' ? 'directions_car' : 'check_circle'}
                                                    </span>
                                                </div>
                                                <span className="font-bold tracking-wide font-mono">{vehicle.plateNumber}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{vehicle.details}</span>
                                                <span className="text-[10px] text-slate-400 capitalize">{vehicle.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full max-w-[120px]">
                                                <div className="flex items-center justify-between text-[10px] mb-1 font-bold">
                                                    <span>{vehicle.fuelLevel}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${fuelColor(vehicle.fuelLevel)}`} style={{ width: `${vehicle.fuelLevel}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className={`font-semibold ${maintStatus?.color || 'text-slate-700 dark:text-slate-300'}`}>
                                                    {formatDate(vehicle.lastMaintenance)}
                                                </span>
                                                {maintStatus && (
                                                    <span className={`text-[10px] ${maintStatus.color}`}>{maintStatus.label}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">
                                            {vehicle.mileage.toLocaleString()} km
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${cfg.color}`}>
                                                {cfg.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button
                                                onClick={() => {
                                                    setOpenMenuId(isMenuOpen ? null : vehicle._id);
                                                    setStatusEditId(null);
                                                }}
                                                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-slate-400 text-xl">more_vert</span>
                                            </button>

                                            {isMenuOpen && (
                                                <div className="absolute right-6 top-12 z-50 bg-white dark:bg-[#1c1c30] border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl shadow-black/20 min-w-[180px] overflow-hidden">
                                                    {isStatusEdit ? (
                                                        <div className="p-2">
                                                            <p className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">Change Status</p>
                                                            {Object.entries(statusConfig).map(([key, val]) => (
                                                                <button
                                                                    key={key}
                                                                    onClick={() => handleStatusChange(vehicle._id, key)}
                                                                    className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
                                                                >
                                                                    <span className={`w-2 h-2 rounded-full ${
                                                                        key === 'available' ? 'bg-emerald-500' :
                                                                        key === 'in_use' ? 'bg-blue-500' :
                                                                        key === 'maintenance' ? 'bg-red-500' : 'bg-amber-500'
                                                                    }`} />
                                                                    {val.label}
                                                                </button>
                                                            ))}
                                                            <button
                                                                onClick={() => setStatusEditId(null)}
                                                                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                            >
                                                                ← Back
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{vehicle.plateNumber}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => setStatusEditId(vehicle._id)}
                                                                className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-base text-slate-500">sync_alt</span>
                                                                Change Status
                                                            </button>
                                                            <Link
                                                                href={`/fleet/vehicles/${vehicle._id}`}
                                                                className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                                                                onClick={() => setOpenMenuId(null)}
                                                            >
                                                                <span className="material-symbols-outlined text-base text-slate-500">visibility</span>
                                                                View Details
                                                            </Link>
                                                            <Link
                                                                href="/fleet/interventions"
                                                                className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                                                                onClick={() => setOpenMenuId(null)}
                                                            >
                                                                <span className="material-symbols-outlined text-base text-amber-500">build</span>
                                                                Schedule Maintenance
                                                            </Link>
                                                            <button
                                                                onClick={() => { handleDeleteVehicle(vehicle._id); setOpenMenuId(null); }}
                                                                className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 border-t border-slate-100 dark:border-slate-700 transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-base">delete</span>
                                                                Delete Vehicle
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
                <div className="px-6 py-4 bg-slate-50 dark:bg-[#242447]/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">
                        Showing {vehicles.length} of {pagination.total} vehicles
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => fetchVehicles(pagination.page - 1)}
                            disabled={pagination.page <= 1 || isLoading}
                            className="px-3 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-white dark:hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-slate-500">
                            {pagination.page} / {pagination.pages}
                        </span>
                        <button
                            onClick={() => fetchVehicles(pagination.page + 1)}
                            disabled={pagination.page >= pagination.pages || isLoading}
                            className="px-3 py-1 rounded bg-white dark:bg-primary border border-slate-200 dark:border-primary text-xs font-bold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

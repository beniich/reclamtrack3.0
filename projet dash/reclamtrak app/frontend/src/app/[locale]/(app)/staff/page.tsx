'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { staffApi } from '@/lib/api';
import { useOrgStore } from '@/store/orgStore';
import { Building2, Edit2, Filter, Mail, MoreVertical, Phone, Search, ShieldCheck, Trash2, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function StaffPage() {
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { activeOrganization, isLoading: isOrgLoading } = useOrgStore();

    useEffect(() => {
        const fetchStaff = async () => {
            if (!activeOrganization) return;
            try {
                const data = await staffApi.getAll();
                setStaff(data);
            } catch (error) {
                console.error('Error fetching staff:', error);
                toast.error('Impossible de charger le personnel');
            } finally {
                setLoading(false);
            }
        };

        if (!isOrgLoading) {
            fetchStaff();
        }
    }, [activeOrganization, isOrgLoading]);

    const filteredStaff = staff.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 bg-brand-midnight min-h-screen font-display selection:bg-cyan-500 selection:text-white">
            <div className="absolute top-0 right-0 w-full h-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none"></div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                        <ShieldCheck className="text-cyan-400 w-8 h-8" />
                        Personnel & Opérateurs
                    </h1>
                    <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px] mt-1 font-black ml-11">
                        CENTRE DE COMMANDE DES ÉQUIPES TECHNIQUES
                    </p>
                </div>
                <button className="bg-brand-orange hover:brightness-110 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all flex items-center gap-3">
                    <UserPlus className="w-4 h-4" />
                    Enrôler un Agent
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 transition-colors group-focus-within:text-cyan-400" />
                    <input
                        type="text"
                        placeholder="RECHERCHE PAR NOM, EMAIL OU RÔLE..."
                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold tracking-widest outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all text-white placeholder:text-slate-600 uppercase"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-700 dark:text-slate-300">
                        <Filter className="w-4 h-4" />
                        Filtrer
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-700 dark:text-slate-300">
                        Exporter
                    </button>
                </div>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredStaff.length > 0 ? (
                    filteredStaff.map((member) => (
                        <div key={member._id} className="glass-card rounded-3xl p-6 relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-right from-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-bold text-primary shadow-inner">
                                    {member.avatar ? (
                                        <img src={member.avatar} alt={member.name} className="w-full h-full rounded-2xl object-cover" />
                                    ) : (
                                        member.name.split(' ').map((n: string) => n[0]).join('')
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{member.name}</h3>
                                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider">{member.role}</p>
                                    <div className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                        member.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                        member.status === 'on_leave' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                    }`}>
                                        <span className={`size-1.5 rounded-full mr-1.5 ${
                                            member.status === 'active' ? 'bg-emerald-500' :
                                            member.status === 'on_leave' ? 'bg-amber-500' :
                                            'bg-slate-400'
                                        }`}></span>
                                        {member.status || 'Active'}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 pt-5 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span className="truncate">{member.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span>{member.phone || 'Non renseigné'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <Building2 className="w-4 h-4 text-slate-400" />
                                    <span>{member.department || 'Département Global'}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button className="flex-1 py-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2">
                                    <Edit2 className="w-3 h-3" />
                                    Modifier
                                </button>
                                <button className="flex-1 py-2 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-200 dark:border-red-800/50 transition-all flex items-center justify-center gap-2">
                                    <Trash2 className="w-3 h-3" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-white dark:bg-slate-900 border border-dash border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-center">
                        <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aucun employé trouvé</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-xs px-4">
                            Nous n'avons trouvé aucun membre du personnel correspondant à votre recherche.
                        </p>
                        <button className="mt-6 text-primary font-bold hover:underline">
                            Réinitialiser la recherche
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

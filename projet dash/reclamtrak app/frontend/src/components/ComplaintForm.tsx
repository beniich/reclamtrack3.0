'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from './ui/button';

interface FormValues {
    firstName: string;
    lastName: string;
    address: string; // Adresse incident
    reporterAddress: string; // Adresse domicile réclamant
    phone: string;
    leakType: string;
    description?: string;
    reporterLocation?: { latitude: number; longitude: number; accuracy: number };
}

export default function ComplaintForm() {
    const router = useRouter();
    const [values, setValues] = useState<FormValues>({
        firstName: '',
        lastName: '',
        address: '',
        reporterAddress: '',
        phone: '',
        leakType: '',
        description: ''
    });
    const [geoLoading, setGeoLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const captureLocation = () => {
        setGeoLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setValues(v => ({
                    ...v,
                    reporterLocation: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        accuracy: pos.coords.accuracy
                    }
                }));
                setGeoLoading(false);
            },
            () => {
                setError("Impossible de récupérer votre position.");
                setGeoLoading(false);
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = {
                ...values,
                reporterMetadata: {
                    browser: navigator.userAgent,
                    os: navigator.platform
                }
            };
            await api.post('/complaints', payload);
            router.push('/complaints/list');
        } catch (e: any) {
            setError(e.response?.data?.message || 'Erreur lors de l\'enregistrement');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-3xl mx-auto bg-white rounded shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Nouvelle réclamation</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        required
                        value={values.firstName}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        required
                        value={values.lastName}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Localisation de l'incident</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Adresse de l'incident (Rue, Quartier...)"
                        required
                        value={values.address}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Votre adresse (Réclamant)</label>
                    <input
                        type="text"
                        name="reporterAddress"
                        placeholder="Votre adresse de résidence"
                        value={values.reporterAddress}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="flex items-center gap-4 py-2">
                    <button 
                        type="button"
                        onClick={captureLocation}
                        className={`text-[10px] font-black uppercase px-3 py-2 rounded-lg border transition-all ${values.reporterLocation ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                    >
                        {geoLoading ? 'Localisation...' : values.reporterLocation ? '✓ Position GPS Capturée' : '📍 Capturer ma position GPS'}
                    </button>
                    {values.reporterLocation && <span className="text-[9px] text-slate-400 font-mono">{values.reporterLocation.latitude.toFixed(4)}, {values.reporterLocation.longitude.toFixed(4)}</span>}
                </div>

                <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    required
                    value={values.phone}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />

                <select
                    name="leakType"
                    required
                    value={values.leakType}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                >
                    <option value="">-- Nature de la fuite --</option>
                    <option value="eau">Eau</option>
                    <option value="electricite">Électricité</option>
                    <option value="menuiserie">Menuiserie</option>
                    <option value="soudure">Soudure</option>
                    <option value="maconnerie">Maçonnerie</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Description détaillée (optionnelle)"
                    rows={3}
                    value={values.description}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center disabled:opacity-50"
                >
                    {loading && <LoadingSpinner />}
                    <span className="ml-2">{loading ? 'Enregistrement…' : 'Enregistrer'}</span>
                </button>
            </form>
        </section>
    );
}

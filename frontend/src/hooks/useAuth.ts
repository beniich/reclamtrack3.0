'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

interface AuthResponse {
    token: string;
    user: { id: string; email: string; role: string };
}

/** Hook simplifié pour login / register / logout */
export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setUser, setToken, logout } = useAuthStore();

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post<AuthResponse>('/auth/login', {
                email,
                password
            });
            setToken(data.token);
            setUser(data.user);
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.token);
            }
            return true;
        } catch (e: any) {
            setError(e.response?.data?.message || 'Erreur de connexion');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post<AuthResponse>('/auth/register', {
                email,
                password
            });
            setToken(data.token);
            setUser(data.user);
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.token);
            }
            return true;
        } catch (e: any) {
            setError(e.response?.data?.message || "Erreur d'inscription");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, register, logout, loading, error };
};

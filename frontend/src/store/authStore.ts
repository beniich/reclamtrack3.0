import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { authApi } from '@/lib/api';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,

            setUser: (user) => set({ user }),
            setToken: (token) => {
                set({ token });
                if (token) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('auth_token', token);
                    }
                } else {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_token');
                    }
                }
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authApi.login({ email, password });
                    const { user, token } = response as any;

                    set({ user, token, isLoading: false });

                    if (token && typeof window !== 'undefined') {
                        localStorage.setItem('auth_token', token);
                    }
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.response?.data?.message || 'Identifiants invalides'
                    });
                    throw error;
                }
            },

            logout: () => {
                set({ user: null, token: null });
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                    window.location.href = '/login';
                }
            },

            checkAuth: async () => {
                set({ isLoading: true });
                try {
                    const user = await authApi.me();
                    set({ user, isLoading: false });
                } catch (error) {
                    set({ user: null, token: null, isLoading: false });
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_token');
                    }
                }
            }
        }),
        {
            name: 'reclamtrack-auth-storage',
            partialize: (state) => ({ user: state.user, token: state.token })
        }
    )
);

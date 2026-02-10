import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'dispatcher' | 'staff' | 'super_admin' | 'manager' | 'technician' | 'warehouse_manager' | 'citizen';
}

interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            logout: () => set({ user: null, token: null })
        }),
        { name: 'reclamtrack-auth' }
    )
);

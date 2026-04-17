'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { syncEngine } from '@/services/SyncEngine';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { checkAuth, token, _hasHydrated } = useAuthStore();

    useEffect(() => {
        if (_hasHydrated && token) {
            console.log('[AuthProvider] Hydrated with token, verifying auth...');
            checkAuth();
            
            // Démarrer le moteur de synchronisation local-first
            syncEngine.start();
        }

        return () => {
            syncEngine.stop();
        };
    }, [_hasHydrated, token, checkAuth]);

    return <>{children}</>;
}

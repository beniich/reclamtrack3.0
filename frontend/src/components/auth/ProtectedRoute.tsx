
'use client';

import { usePermissions } from '@/hooks/usePermissions';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Permission, Role } from '@/lib/rbac/permissions';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermissions?: Permission[];
    requiredRole?: Role;
    requireAll?: boolean;
    fallback?: ReactNode;
}

export function ProtectedRoute({
    children,
    requiredPermissions = [],
    requiredRole,
    requireAll = false,
    fallback,
}: ProtectedRouteProps) {
    const { canAny, canAll, isRoleOrHigher } = usePermissions();

    // Vérification du rôle
    if (requiredRole && !isRoleOrHigher(requiredRole)) {
        if (fallback) return <>{fallback}</>;
        redirect('/unauthorized');
    }

    // Vérification des permissions
    if (requiredPermissions.length > 0) {
        const hasAccess = requireAll
            ? canAll(requiredPermissions)
            : canAny(requiredPermissions);

        if (!hasAccess) {
            if (fallback) return <>{fallback}</>;
            redirect('/unauthorized');
        }
    }

    return <>{children}</>;
}

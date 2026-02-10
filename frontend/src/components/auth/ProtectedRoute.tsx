// components/auth/ProtectedRoute.tsx
'use client';

import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
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
    const { can, canAny, canAll, isRoleOrHigher, role } = usePermissions();
    const router = useRouter();

    useEffect(() => {
        // Only redirect if we have a role (loaded) but access is denied
        if (role) {
            let accessDenied = false;

            // Check Role
            if (requiredRole && !isRoleOrHigher(requiredRole)) {
                accessDenied = true;
            }

            // Check Permissions
            if (requiredPermissions.length > 0) {
                const hasAccess = requireAll
                    ? canAll(requiredPermissions)
                    : canAny(requiredPermissions);

                if (!hasAccess) {
                    accessDenied = true;
                }
            }

            if (accessDenied && !fallback) {
                router.push('/unauthorized'); // Ensure this route exists or redirect to home
            }
        }
    }, [role, requiredRole, requiredPermissions, requireAll, canAll, canAny, isRoleOrHigher, router, fallback]);

    // If role is not yet loaded, maybe show loading? For now rendering children if checks pass or fallback if not
    // Actually, better to render nothing or loading while checking
    if (!role) {
        return null; // Or loading spinner
    }

    // Vérification du rôle
    if (requiredRole && !isRoleOrHigher(requiredRole)) {
        if (fallback) return <>{fallback}</>;
        return null;
    }

    // Vérification des permissions
    if (requiredPermissions.length > 0) {
        const hasAccess = requireAll
            ? canAll(requiredPermissions)
            : canAny(requiredPermissions);

        if (!hasAccess) {
            if (fallback) return <>{fallback}</>;
            return null;
        }
    }

    return <>{children}</>;
}

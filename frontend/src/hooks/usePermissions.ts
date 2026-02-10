// hooks/usePermissions.ts
'use client';

import { useAuthStore } from '@/store/authStore'; // Assuming authStore exists and has user data
import { useMemo } from 'react';
import { Permission, Role, ROLE_PERMISSIONS, isRoleHigherOrEqual } from '@/lib/rbac/permissions';

export function usePermissions() {
    const { user } = useAuthStore();
    const userRole = user?.role as Role;

    const permissions = useMemo(() => {
        if (!userRole) return [];
        return ROLE_PERMISSIONS[userRole] || [];
    }, [userRole]);

    const can = (permission: Permission): boolean => {
        return permissions.includes(permission);
    };

    const canAny = (requiredPermissions: Permission[]): boolean => {
        return requiredPermissions.some((perm) => permissions.includes(perm));
    };

    const canAll = (requiredPermissions: Permission[]): boolean => {
        return requiredPermissions.every((perm) => permissions.includes(perm));
    };

    const isRole = (role: Role): boolean => {
        return userRole === role;
    };

    const isRoleOrHigher = (role: Role): boolean => {
        return isRoleHigherOrEqual(userRole, role);
    };

    return {
        permissions,
        can,
        canAny,
        canAll,
        isRole,
        isRoleOrHigher,
        role: userRole,
    };
}

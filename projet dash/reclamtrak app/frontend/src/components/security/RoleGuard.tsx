'use client';

import { usePermissions } from '@/hooks/usePermissions';
import { Role } from '@/lib/rbac/permissions';
import { ReactNode } from 'react';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: Role[];
  minRole?: Role;
  fallback?: ReactNode;
}

/**
 * RoleGuard Component
 *
 * Hides or displays its children based on the current user's role.
 * You can either provide an array of exactly allowed roles `allowedRoles={['EDITOR', 'MODERATOR']}`,
 * or a minimum role level `minRole="EDITOR"` (this user and higher roles will see the children).
 */
export function RoleGuard({
  children,
  allowedRoles,
  minRole,
  fallback = null
}: RoleGuardProps) {
  const { role, isRoleOrHigher } = usePermissions();

  if (!role) {
    return <>{fallback}</>;
  }

  // Exact match logic
  if (allowedRoles && allowedRoles.length > 0) {
    if (allowedRoles.includes(role)) {
        return <>{children}</>;
    }
  }

  // Hierarchical match logic
  if (minRole) {
    if (isRoleOrHigher(minRole)) {
        return <>{children}</>;
    }
  }

  // If neither matches, or no props provided, hide content
  return <>{fallback}</>;
}

import { describe, expect, it } from 'vitest';
import { hasPermission, Permission, Role } from './permissions';

describe('RBAC permissions', () => {
    it('should grant SUPER_ADMIN all permissions', () => {
        const allPermissions = Object.values(Permission);
        allPermissions.forEach(perm => {
            expect(hasPermission(Role.SUPER_ADMIN, perm)).toBe(true);
        });
    });

    it('should grant CITIZEN only basic permissions', () => {
        expect(hasPermission(Role.CITIZEN, Permission.CREATE_COMPLAINT)).toBe(true);
        expect(hasPermission(Role.CITIZEN, Permission.VIEW_COMPLAINTS)).toBe(true);
        expect(hasPermission(Role.CITIZEN, Permission.MANAGE_USERS)).toBe(false);
        expect(hasPermission(Role.CITIZEN, Permission.SYSTEM_SETTINGS)).toBe(false);
    });

    it('should handle unauthenticated or unknown roles gracefully', () => {
        expect(hasPermission('UNKNOWN' as any, Permission.VIEW_COMPLAINTS)).toBe(false);
        expect(hasPermission('' as any, Permission.VIEW_COMPLAINTS)).toBe(false);
    });
});

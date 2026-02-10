// lib/rbac/permissions.ts

export enum Permission {
    // Complaints
    VIEW_COMPLAINTS = 'view:complaints',
    CREATE_COMPLAINT = 'create:complaint',
    EDIT_COMPLAINT = 'edit:complaint',
    DELETE_COMPLAINT = 'delete:complaint',
    ASSIGN_COMPLAINT = 'assign:complaint',
    RESOLVE_COMPLAINT = 'resolve:complaint',

    // Teams
    VIEW_TEAMS = 'view:teams',
    MANAGE_TEAMS = 'manage:teams',
    ASSIGN_TEAM_MEMBERS = 'assign:team_members',

    // Inventory
    VIEW_INVENTORY = 'view:inventory',
    MANAGE_INVENTORY = 'manage:inventory',
    APPROVE_REQUISITIONS = 'approve:requisitions',
    CREATE_REQUISITION = 'create:requisition',

    // Analytics
    VIEW_ANALYTICS = 'view:analytics',
    EXPORT_DATA = 'export:data',

    // Users & Admin
    VIEW_USERS = 'view:users',
    MANAGE_USERS = 'manage:users',
    MANAGE_ROLES = 'manage:roles',
    VIEW_AUDIT_LOGS = 'view:audit_logs',
    SYSTEM_SETTINGS = 'system:settings',
}

export enum Role {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    MANAGER = 'manager',
    TECHNICIAN = 'technician',
    WAREHOUSE_MANAGER = 'warehouse_manager',
    CITIZEN = 'citizen',
}

// Role Hierarchy (pour héritage de permissions)
export const ROLE_HIERARCHY: Record<Role, number> = {
    [Role.SUPER_ADMIN]: 100,
    [Role.ADMIN]: 80,
    [Role.MANAGER]: 60,
    [Role.WAREHOUSE_MANAGER]: 50,
    [Role.TECHNICIAN]: 40,
    [Role.CITIZEN]: 20,
};

// Permissions par rôle
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    [Role.SUPER_ADMIN]: Object.values(Permission), // Toutes les permissions

    [Role.ADMIN]: [
        Permission.VIEW_COMPLAINTS,
        Permission.CREATE_COMPLAINT,
        Permission.EDIT_COMPLAINT,
        Permission.DELETE_COMPLAINT,
        Permission.ASSIGN_COMPLAINT,
        Permission.RESOLVE_COMPLAINT,
        Permission.VIEW_TEAMS,
        Permission.MANAGE_TEAMS,
        Permission.ASSIGN_TEAM_MEMBERS,
        Permission.VIEW_INVENTORY,
        Permission.MANAGE_INVENTORY,
        Permission.APPROVE_REQUISITIONS,
        Permission.VIEW_ANALYTICS,
        Permission.EXPORT_DATA,
        Permission.VIEW_USERS,
        Permission.MANAGE_USERS,
        Permission.VIEW_AUDIT_LOGS,
    ],

    [Role.MANAGER]: [
        Permission.VIEW_COMPLAINTS,
        Permission.CREATE_COMPLAINT,
        Permission.EDIT_COMPLAINT,
        Permission.ASSIGN_COMPLAINT,
        Permission.RESOLVE_COMPLAINT,
        Permission.VIEW_TEAMS,
        Permission.ASSIGN_TEAM_MEMBERS,
        Permission.VIEW_INVENTORY,
        Permission.CREATE_REQUISITION,
        Permission.VIEW_ANALYTICS,
        Permission.EXPORT_DATA,
    ],

    [Role.WAREHOUSE_MANAGER]: [
        Permission.VIEW_COMPLAINTS,
        Permission.VIEW_INVENTORY,
        Permission.MANAGE_INVENTORY,
        Permission.APPROVE_REQUISITIONS,
        Permission.CREATE_REQUISITION,
    ],

    [Role.TECHNICIAN]: [
        Permission.VIEW_COMPLAINTS,
        Permission.EDIT_COMPLAINT,
        Permission.VIEW_TEAMS,
        Permission.VIEW_INVENTORY,
        Permission.CREATE_REQUISITION,
    ],

    [Role.CITIZEN]: [
        Permission.VIEW_COMPLAINTS,
        Permission.CREATE_COMPLAINT,
    ],
};

// Vérification des permissions
export function hasPermission(userRole: Role, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.includes(permission);
}

export function hasAnyPermission(userRole: Role, permissions: Permission[]): boolean {
    return permissions.some((permission) => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole: Role, permissions: Permission[]): boolean {
    return permissions.every((permission) => hasPermission(userRole, permission));
}

export function isRoleHigherOrEqual(userRole: Role, targetRole: Role): boolean {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[targetRole];
}

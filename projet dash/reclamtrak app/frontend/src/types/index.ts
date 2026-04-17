export type ComplaintStatus = 'nouvelle' | 'en cours' | 'résolue' | 'fermée' | 'rejetée';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface TimelineEvent {
    _id?: string;
    eventType: 'created' | 'assigned' | 'status_changed' | 'commented' | 'resolved' | 'closed' | 'rejected' | 'priority_changed';
    message: string;
    actorName?: string;
    oldValue?: string;
    newValue?: string;
    createdAt: string;
}

export interface ComplaintComment {
    _id?: string;
    content: string;
    authorName: string;
    isInternal: boolean;
    createdAt: string;
}

export interface Complaint {
    _id: string;
    number: string;
    // Step 1
    category: string;
    subcategory: string;
    priority: Priority;
    title: string;
    description: string;

    // Step 2
    address: string;
    city: string;
    district: string;
    postalCode?: string;
    location?: { latitude: number; longitude: number };

    // Step 3
    photos: string[];
    documents?: { name: string; url: string }[];
    audioNote?: string;

    // Step 4 (Contact)
    isAnonymous: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;

    // Workflow
    status: ComplaintStatus;
    assignedTeamId?: { _id: string; name: string; status?: string };
    technicianId?: { _id: string; name: string; email: string };
    assignedAt?: string;

    // SLA & lifecycle
    slaDueDate?: string;
    resolvedAt?: string;
    closedAt?: string;
    rejectedAt?: string;
    resolutionTimeMs?: number;
    slaBreached?: boolean;   // Computed by backend

    // Rich data
    timeline: TimelineEvent[];
    comments: ComplaintComment[];

    // GMAO / Industrial fields
    assetId?: {
        _id: string;
        name: string;
        code: string;
        criticality?: 'A' | 'B' | 'C';
        [key: string]: any;
    };
    impact?: number;

    // Enhanced reporter data
    reporterAddress?: string;
    reporterLocation?: { latitude: number; longitude: number };
    reporterMetadata?: {
        os?: string;
        browser?: string;
        ip?: string;
        [key: string]: any;
    };

    createdAt: string;
    updatedAt: string;
}

export interface Team {
    _id: string;
    name: string;                // Eau, Électricité, …
    status: 'disponible' | 'intervention' | 'repos';
    location?: { lat: number; lng: number };
}

export interface PlanningSlot {
    _id: string;
    teamId: string;
    teamName: string;
    start: string;              // ISO date‑time
    end: string;
    complaintNumber?: string;   // si un ticket est lié
}

export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    role: 'admin' | 'dispatcher' | 'staff' | 'citizen' | 'technician';
    organizationId?: string;
}

export interface Assignment {
    _id: string;
    complaintId: string | any;
    teamId: string | any;
    assignedAt: string;
    status: 'affecté' | 'en cours' | 'terminé';
}

// Types from Roadmap 2
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    code?: string;
    message?: string;
    timestamp?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
    status?: string[];
    category?: string[];
    priority?: string[];
    dateFrom?: string;
    dateTo?: string;
    search?: string;
}

export interface TimelineEvent {
    id: string;
    type: 'created' | 'assigned' | 'in_progress' | 'resolved' | 'closed' | 'note';
    title: string;
    description: string;
    timestamp: string;
    actor?: string;
}

export interface Organization {
    _id: string;
    name: string;
    slug: string;
    ownerId: string;
    logo?: string;
    subscription: {
        plan: 'FREE' | 'PRO' | 'ENTERPRISE';
        status: 'ACTIVE' | 'TRIAL' | 'PAST_DUE' | 'CANCELED';
        expiresAt?: string;
        maxUsers?: number;
        maxTickets?: number;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Membership {
    _id: string;
    userId: string;
    organizationId: string | Organization;
    roles: string[];
    status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
    joinedAt: string;
}

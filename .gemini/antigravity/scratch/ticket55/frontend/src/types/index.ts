export interface Complaint {
    _id: string;
    number: string;            // numéro unique
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    leakType: string;
    description?: string;
    status: 'nouvelle' | 'en cours' | 'résolue' | 'fermée';
    createdAt: string;
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
    role: 'admin' | 'dispatcher' | 'staff';
}

export interface Assignment {
    _id: string;
    complaintId: string;
    teamId: string;
    assignedAt: string;
    status: 'affecté' | 'en cours' | 'terminé';
}

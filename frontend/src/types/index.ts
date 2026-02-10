export interface Complaint {
    _id: string;
    number: string;
    // Step 1
    category: string;
    subcategory: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    title: string;
    description: string;

    // Step 2
    address: string;
    city: string;
    district: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;

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
    status: 'nouvelle' | 'en cours' | 'résolue' | 'fermée' | 'rejetée';
    assignedTeamId?: { _id: string; name: string }; // Populated
    technicianId?: { _id: string; name: string; email: string }; // Populated

    createdAt: string;
    updatedAt: string;

    // Legacy support (optional)
    leakType?: string;
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

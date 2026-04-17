export const getMockDataForRoute = (url: string, _method?: string, _requestData?: unknown) => {
    // Auth endpoints
    if (url.includes('/auth/login')) {
        return {
            user: {
                _id: 'mock-admin-id',
                name: 'Admin Demo',
                email: 'admin@reclamtrack.com',
                role: 'superadmin',
                isEmailVerified: true
            },
            accessToken: 'mock-jwt-token-demo-12345'
        };
    }
    
    if (url.includes('/auth/me')) {
        return {
            _id: 'mock-admin-id',
            name: 'Admin Demo',
            email: 'admin@reclamtrack.com',
            role: 'superadmin',
            isEmailVerified: true
        };
    }

    if (url.includes('/organizations')) {
        return {
            organizations: [
                {
                    _id: 'mock-org-1',
                    name: 'ReclamTrack Enterprise (Demo)',
                    slug: 'reclamtrack-demo',
                    subscription: { plan: 'ENTERPRISE', status: 'ACTIVE' },
                    membership: { roles: ['OWNER'] }
                }
            ]
        };
    }

    // Analytics Dashboard Data
    if (url.includes('/analytics/dashboard')) {
        return {
            totalComplaints: 124,
            activeComplaints: 45,
            resolvedComplaints: 79,
            avgSatisfaction: 4.8,
            complaintsByStatus: {
                new: 12,
                assigned: 15,
                inProgress: 18,
                resolved: 70,
                closed: 9
            }
        };
    }

    if (url.includes('/analytics/performance')) {
        return {
            averageResolutionTime: '1.2 jours',
            firstResponseTime: '45 min',
            completionRate: 85,
            onTimeRate: 92,
            byCategory: [
                { category: 'Électricité', completionRate: 90, avgTime: '1 jour' },
                { category: 'Plomberie', completionRate: 75, avgTime: '2 jours' },
                { category: 'Voirie', completionRate: 88, avgTime: '1.5 jours' }
            ]
        };
    }

    if (url.includes('/complaints')) {
        return [
            {
                _id: 'comp-1',
                number: 'REC-2024-001',
                title: 'Panne électrique générale',
                category: 'Électricité',
                priority: 'urgent',
                status: 'en cours',
                createdAt: new Date().toISOString()
            },
            {
                _id: 'comp-2',
                number: 'REC-2024-002',
                title: 'Fuite d\'eau',
                category: 'Plomberie',
                priority: 'high',
                status: 'nouvelle',
                createdAt: new Date().toISOString()
            }
        ];
    }

    if (url.includes('/teams')) {
        return [
            { _id: 'team-1', name: 'Équipe Électricité', status: 'disponible' },
            { _id: 'team-2', name: 'Équipe Plomberie', status: 'sur site' }
        ];
    }

    // Default fallback array or object depending on GET pattern
    return [];
};

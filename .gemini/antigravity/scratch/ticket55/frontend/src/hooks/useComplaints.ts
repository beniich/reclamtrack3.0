import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export interface Complaint {
    id: string;
    ticketId: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
    description: string;
    location: {
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    photos: string[];
    reportedBy: {
        id: string;
        name: string;
        email: string;
    };
    assignedTo?: {
        id: string;
        name: string;
        department: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface ComplaintFilters {
    status?: string;
    priority?: string;
    category?: string;
    search?: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

/**
 * Hook principal pour gérer la liste des réclamations
 */
export const useComplaints = (initialFilters: ComplaintFilters = {}) => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 20,
        total: 0,
        pages: 0
    });
    const [filters, setFilters] = useState<ComplaintFilters>(initialFilters);

    const fetchComplaints = useCallback(async (page: number = 1) => {
        try {
            setLoading(true);
            setError(null);

            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                ...Object.fromEntries(
                    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== '')
                )
            });

            const response = await api.get(`/complaints?${queryParams}`);
            const data = response.data;

            setComplaints(data.data);
            setPagination(data.pagination);
        } catch (err: any) {
            console.error('Erreur fetch complaints:', err);
            setError(err.response?.data?.error || 'Erreur lors du chargement des réclamations');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const refreshComplaints = () => {
        fetchComplaints(pagination.page);
    };

    const goToPage = (page: number) => {
        fetchComplaints(page);
    };

    const updateFilters = (newFilters: Partial<ComplaintFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const resetFilters = () => {
        setFilters({});
    };

    useEffect(() => {
        fetchComplaints(1);
    }, [fetchComplaints]);

    return {
        complaints,
        loading,
        error,
        pagination,
        filters,
        fetchComplaints,
        refreshComplaints,
        goToPage,
        updateFilters,
        resetFilters
    };
};

/**
 * Hook pour créer une réclamation
 */
export const useCreateComplaint = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createComplaint = async (data: Partial<Complaint>) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post('/complaints', data);
            return response.data.data;
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || 'Erreur lors de la création';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return { createComplaint, loading, error };
};

/**
 * Hook pour une réclamation individuelle
 */
export const useComplaint = (id: string) => {
    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComplaint = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/complaints/${id}`);
            setComplaint(response.data.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erreur chargement réclamation');
        } finally {
            setLoading(false);
        }
    }, [id]);

    const updateComplaint = async (updates: Partial<Complaint>) => {
        try {
            const response = await api.patch(`/complaints/${id}`, updates);
            setComplaint(response.data.data);
            return response.data.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.error || 'Erreur mise à jour');
        }
    };

    const assignToTeam = async (teamId: string) => {
        try {
            const response = await api.post(`/complaints/${id}/assign`, { teamId });
            setComplaint(response.data.data);
            return response.data.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.error || 'Erreur assignation');
        }
    };

    useEffect(() => {
        if (id) fetchComplaint();
    }, [id, fetchComplaint]);

    return {
        complaint,
        loading,
        error,
        updateComplaint,
        assignToTeam,
        refetch: fetchComplaint
    };
};

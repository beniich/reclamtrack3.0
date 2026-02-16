import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';
import { API_ROUTES } from '@reclamtrack/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // Add auth token if available
                let token: string | null = null;
                if (typeof window !== 'undefined') {
                    token = localStorage.getItem('auth_token');
                }
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                if (typeof window !== 'undefined') {
                    const orgId = localStorage.getItem('active_organization_id');
                    if (orgId) {
                        config.headers['x-organization-id'] = orgId;
                    }
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response: AxiosResponse<ApiResponse>) => {
                return response;
            },
            (error: AxiosError<ApiResponse>) => {
                if (error.response) {
                    // Handle specific error codes
                    switch (error.response.status) {
                        case 401:
                            // Unauthorized - redirect to login
                            if (typeof window !== 'undefined' && !window.location.pathname.includes(API_ROUTES.auth.login)) {
                                localStorage.removeItem('auth_token');
                                window.location.href = '/login';
                            }
                            break;
                        case 403:
                            // Forbidden
                            console.error('Access forbidden');
                            break;
                        case 404:
                            // Not found
                            console.error('Resource not found');
                            break;
                        case 500:
                            // Server error
                            console.error('Server error');
                            break;
                    }
                } else if (error.request) {
                    // Network error
                    console.error('Network error:', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    // Generic request methods
    async get<T = any>(url: string, params?: any): Promise<T> {
        const response = await this.client.get<ApiResponse<T>>(url, { params });
        // Handle both wrapped and unwrapped responses
        return (response.data?.data || response.data) as T;
    }

    async post<T = any>(url: string, data?: any): Promise<T> {
        const response = await this.client.post<ApiResponse<T>>(url, data);
        return (response.data?.data || response.data) as T;
    }

    async put<T = any>(url: string, data?: any): Promise<T> {
        const response = await this.client.put<ApiResponse<T>>(url, data);
        return (response.data?.data || response.data) as T;
    }

    async patch<T = any>(url: string, data?: any): Promise<T> {
        const response = await this.client.patch<ApiResponse<T>>(url, data);
        return (response.data?.data || response.data) as T;
    }

    async delete<T = any>(url: string): Promise<T> {
        const response = await this.client.delete<ApiResponse<T>>(url);
        return (response.data?.data || response.data) as T;
    }

    // File upload
    async upload<T = any>(url: string, formData: FormData): Promise<T> {
        const response = await this.client.post<ApiResponse<T>>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return (response.data?.data || response.data) as T;
    }

    // Download file
    async download(url: string, filename: string): Promise<void> {
        const response = await this.client.get(url, {
            responseType: 'blob',
        });

        if (typeof window !== 'undefined') {
            const blob = new Blob([response.data]);
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        }
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export specific API endpoints
export const authApi = {
    login: (credentials: { email: string; password: string }) =>
        apiClient.post(API_ROUTES.auth.login, credentials),
    logout: () => apiClient.post(API_ROUTES.auth.logout),
    me: () => apiClient.get(API_ROUTES.auth.me),
    refreshToken: () => apiClient.post(API_ROUTES.auth.refresh),
    googleLogin: (credential: string) => apiClient.post('/auth/google', { credential }), // Not in shared yet, keep as is or add
};

export const complaintsApi = {
    getAll: (params?: any) => apiClient.get(API_ROUTES.complaints.root, params),
    getById: (id: string) => apiClient.get(API_ROUTES.complaints.byId(id)),
    create: (data: any) => apiClient.post(API_ROUTES.complaints.root, data),
    update: (id: string, data: any) => apiClient.put(API_ROUTES.complaints.byId(id), data),
    delete: (id: string) => apiClient.delete(API_ROUTES.complaints.byId(id)),
    uploadPhoto: (id: string, formData: FormData) =>
        apiClient.upload(`${API_ROUTES.complaints.root}/${id}/photos`, formData),
};

export const teamsApi = {
    getAll: (params?: any) => apiClient.get(API_ROUTES.teams.root, params),
    getById: (id: string) => apiClient.get(API_ROUTES.teams.byId(id)),
    create: (data: any) => apiClient.post(API_ROUTES.teams.root, data),
    update: (id: string, data: any) => apiClient.put(API_ROUTES.teams.byId(id), data),
    delete: (id: string) => apiClient.delete(API_ROUTES.teams.byId(id)),
};

export const interventionsApi = {
    getAll: (params?: any) => apiClient.get('/interventions', params),
    getById: (id: string) => apiClient.get(`/interventions/${id}`),
    create: (data: any) => apiClient.post('/interventions', data),
    update: (id: string, data: any) => apiClient.put(`/interventions/${id}`, data),
    delete: (id: string) => apiClient.delete(`/interventions/${id}`),
};

export const inventoryApi = {
    getAll: (params?: any) => apiClient.get(API_ROUTES.inventory.root, params), // Mapped to /requisitions by microservice, but frontend accesses via gateway/alias?
    // Wait, the shared route says /inventory/requisitions.
    // If we use microservices direct port access, it would be localhost:3006/api/inventory...
    // If we use monolith (current), we need to ensure /inventory/requisitions exists or is aliased.
    // In monolith: inventory.ts has /requisitions (mounted at /api/inventory/requisitions? No, mounted at /api/inventory... wait)
    // backend/src/index.ts mounts inventoryRoutes at /api/inventory?
    // backend/src/routes/inventory.ts has router.get('/requisitions', ...)
    // So the URL is /api/inventory/requisitions.
    // The Shared Route is /inventory/requisitions.
    // API_BASE_URL is /api.
    // So apiClient.get('/inventory/requisitions') -> /api/inventory/requisitions. Correct.
    getById: (id: string) => apiClient.get(API_ROUTES.inventory.byId(id)),
    update: (id: string, data: any) => apiClient.put(API_ROUTES.inventory.byId(id), data),
    createRequest: (data: any) => apiClient.post('/inventory/requests', data), // Should use alias from shared? Shared has no 'createRequest' alias specifically, but aliases exist in backend.
    getRequests: (params?: any) => apiClient.get('/inventory/requests', params),
    approveRequest: (id: string) => apiClient.post(API_ROUTES.inventory.approve(id)),
    rejectRequest: (id: string, reason: string) =>
        apiClient.post(API_ROUTES.inventory.reject(id), { reason }),
};

export const analyticsApi = {
    getDashboard: (params?: any) => apiClient.get(API_ROUTES.analytics.dashboard, params),
    getComplaintStats: (params?: any) => apiClient.get('/analytics/complaints', params),
    getTeamStats: (params?: any) => apiClient.get('/analytics/teams', params),
    exportReport: (type: string, params?: any) =>
        apiClient.download(`/analytics/export/${type}`, `report-${type}-${Date.now()}.pdf`),
};

export const adminApi = {
    getUsers: (params?: any) => apiClient.get('/admin/users', params),
    createUser: (data: any) => apiClient.post('/admin/users', data),
    updateUser: (id: string, data: any) => apiClient.put(`/admin/users/${id}`, data),
    deleteUser: (id: string) => apiClient.delete(`/admin/users/${id}`),
    getAuditLogs: (params?: any) => apiClient.get('/admin/audit-logs', params),
    getSystemStatus: () => apiClient.get('/admin/system/status'),
};

export const staffApi = {
    getAll: () => apiClient.get('/staff'),
    create: (data: any) => apiClient.post('/staff', data),
};

export const rosterApi = {
    get: (params: { week: string }) => apiClient.get('/roster', params),
    update: (data: { week: string; shifts: any[] }) => apiClient.post('/roster/update', data),
};

export const leaveApi = {
    getAll: () => apiClient.get('/leave'),
    updateStatus: (id: string, status: string) => apiClient.patch(`/leave/${id}/status`, { status }),
};

export const organizationsApi = {
    getAll: () => apiClient.get('/organizations'),
    getById: (id: string) => apiClient.get(`/organizations/${id}`),
    create: (data: any) => apiClient.post('/organizations', data),
    update: (id: string, data: any) => apiClient.put(`/organizations/${id}`, data),
    getMyOrganizations: () => apiClient.get('/organizations/me/memberships'),
    getMembers: (id: string) => apiClient.get(`/organizations/${id}/members`),
    inviteMember: (id: string, email: string, roles: string[]) =>
        apiClient.post(`/organizations/${id}/members`, { email, role: roles[0] }), // Backend expects 'role' singular for now
    updateMemberRole: (id: string, membershipId: string, roles: string[]) =>
        apiClient.patch(`/organizations/${id}/members/${membershipId}`, { roles }),
    removeMember: (id: string, membershipId: string) =>
        apiClient.delete(`/organizations/${id}/members/${membershipId}`),
};

export default apiClient;

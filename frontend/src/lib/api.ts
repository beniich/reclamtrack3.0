import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'; // Updated default port to 5001

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
                            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
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
        apiClient.post('/auth/login', credentials),
    logout: () => apiClient.post('/auth/logout'),
    me: () => apiClient.get('/auth/me'),
    refreshToken: () => apiClient.post('/auth/refresh'),
};

export const complaintsApi = {
    getAll: (params?: any) => apiClient.get('/complaints', params),
    getById: (id: string) => apiClient.get(`/complaints/${id}`),
    create: (data: any) => apiClient.post('/complaints', data),
    update: (id: string, data: any) => apiClient.put(`/complaints/${id}`, data),
    delete: (id: string) => apiClient.delete(`/complaints/${id}`),
    uploadPhoto: (id: string, formData: FormData) =>
        apiClient.upload(`/complaints/${id}/photos`, formData),
};

export const teamsApi = {
    getAll: (params?: any) => apiClient.get('/teams', params),
    getById: (id: string) => apiClient.get(`/teams/${id}`),
    create: (data: any) => apiClient.post('/teams', data),
    update: (id: string, data: any) => apiClient.put(`/teams/${id}`, data),
    delete: (id: string) => apiClient.delete(`/teams/${id}`),
};

export const interventionsApi = {
    getAll: (params?: any) => apiClient.get('/interventions', params),
    getById: (id: string) => apiClient.get(`/interventions/${id}`),
    create: (data: any) => apiClient.post('/interventions', data),
    update: (id: string, data: any) => apiClient.put(`/interventions/${id}`, data),
    delete: (id: string) => apiClient.delete(`/interventions/${id}`),
};

export const inventoryApi = {
    getAll: (params?: any) => apiClient.get('/inventory', params),
    getById: (id: string) => apiClient.get(`/inventory/${id}`),
    update: (id: string, data: any) => apiClient.put(`/inventory/${id}`, data),
    createRequest: (data: any) => apiClient.post('/inventory/requests', data),
    getRequests: (params?: any) => apiClient.get('/inventory/requests', params),
    approveRequest: (id: string) => apiClient.post(`/inventory/requests/${id}/approve`),
    rejectRequest: (id: string, reason: string) =>
        apiClient.post(`/inventory/requests/${id}/reject`, { reason }),
};

export const analyticsApi = {
    getDashboard: (params?: any) => apiClient.get('/analytics/dashboard', params),
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

export default apiClient;

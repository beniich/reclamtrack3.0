import axios from 'axios';

// Utiliser l'URL de base configurée ou celle par défaut
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const dbAdminApi = {
    getMetrics: () => axios.get(`${API_URL}/db/metrics`),
    getReplicas: () => axios.get(`${API_URL}/db/replicas`),
    getBackups: () => axios.get(`${API_URL}/db/backups`),
    getClusters: () => axios.get(`${API_URL}/db/clusters`),
};

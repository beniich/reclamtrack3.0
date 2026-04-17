import { create } from 'zustand';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export interface TechnicalSchema {
  _id: string;
  name: string;
  description?: string;
  projectData: string;
  thumbnailData?: string;
  createdAt: string;
  updatedAt: string;
}

interface SchemaState {
  schemas: TechnicalSchema[];
  currentSchema: TechnicalSchema | null;
  isLoading: boolean;
  error: string | null;

  fetchSchemas: () => Promise<void>;
  getSchema: (id: string) => Promise<TechnicalSchema | null>;
  createSchema: (data: Partial<TechnicalSchema>) => Promise<TechnicalSchema | null>;
  updateSchema: (id: string, data: Partial<TechnicalSchema>) => Promise<TechnicalSchema | null>;
  deleteSchema: (id: string) => Promise<boolean>;
  setCurrentSchema: (schema: TechnicalSchema | null) => void;
}

export const useSchemaStore = create<SchemaState>((set, get) => ({
  schemas: [],
  currentSchema: null,
  isLoading: false,
  error: null,

  setCurrentSchema: (schema) => set({ currentSchema: schema }),

  fetchSchemas: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/api/technical-schemas');
      set({ schemas: response.data.data, isLoading: false });
    } catch (error: any) {
      console.error('Error fetching schemas:', error);
      set({
        error: error.response?.data?.message || 'Erreur lors du chargement des schémas',
        isLoading: false,
      });
    }
  },

  getSchema: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/api/technical-schemas/${id}`);
      set({ currentSchema: response.data.data, isLoading: false });
      return response.data.data;
    } catch (error: any) {
      console.error(`Error fetching schema ${id}:`, error);
      set({
        error: error.response?.data?.message || 'Archivage introuvable',
        isLoading: false,
      });
      return null;
    }
  },

  createSchema: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/api/technical-schemas', data);
      const newSchema = response.data.data;
      set((state) => ({
        schemas: [newSchema, ...state.schemas],
        currentSchema: newSchema,
        isLoading: false,
      }));
      toast.success('Schéma sauvegardé avec succès');
      return newSchema;
    } catch (error: any) {
      console.error('Error creating schema:', error);
      set({
        error: error.response?.data?.message || 'Erreur lors de la sauvegarde du schéma',
        isLoading: false,
      });
      toast.error('Erreur lors de la sauvegarde');
      return null;
    }
  },

  updateSchema: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/api/technical-schemas/${id}`, data);
      const updatedSchema = response.data.data;
      set((state) => ({
        schemas: state.schemas.map((s) => (s._id === id ? updatedSchema : s)),
        currentSchema: state.currentSchema?._id === id ? updatedSchema : state.currentSchema,
        isLoading: false,
      }));
      toast.success('Schéma mis à jour');
      return updatedSchema;
    } catch (error: any) {
      console.error(`Error updating schema ${id}:`, error);
      set({
        error: error.response?.data?.message || 'Erreur lors de la mise à jour',
        isLoading: false,
      });
      toast.error('Erreur lors de la mise à jour');
      return null;
    }
  },

  deleteSchema: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/api/technical-schemas/${id}`);
      set((state) => ({
        schemas: state.schemas.filter((s) => s._id !== id),
        currentSchema: state.currentSchema?._id === id ? null : state.currentSchema,
        isLoading: false,
      }));
      toast.success('Schéma supprimé');
      return true;
    } catch (error: any) {
      console.error(`Error deleting schema ${id}:`, error);
      set({
        error: error.response?.data?.message || 'Erreur lors de la suppression',
        isLoading: false,
      });
      toast.error('Erreur de suppression');
      return false;
    }
  },
}));

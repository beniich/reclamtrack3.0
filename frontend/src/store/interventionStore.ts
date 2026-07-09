import { create } from 'zustand';
import { interventionsApi } from '@/lib/api';

export type InterventionCategory = 'WATER' | 'ELECTRICITY' | 'GAS';
export type InterventionPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';

export interface Intervention {
    _id?: string; // MongoDB ID
    id?: string;  // Local fallback ID
    code: string;
    title: string;
    category: InterventionCategory;
    priority: InterventionPriority;
    startTime: string;
    endTime: string;
    date: string;
    teamName: string;
    teamLead: string;
    location: string;
    customerName: string;
    status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'UNSCHEDULED';
}

interface InterventionState {
    interventions: Intervention[];
    isLoading: boolean;
    error: string | null;
    fetchInterventions: () => Promise<void>;
    addIntervention: (intervention: Omit<Intervention, 'id' | '_id' | 'code'>) => Promise<void>;
    updateIntervention: (id: string, intervention: Partial<Intervention>) => Promise<void>;
    deleteIntervention: (id: string) => Promise<void>;
}

export const useInterventionStore = create<InterventionState>((set, get) => ({
    interventions: [],
    isLoading: false,
    error: null,
    
    fetchInterventions: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await interventionsApi.getAll();
            set({ interventions: Array.isArray(data) ? data : [], isLoading: false });
        } catch (error: any) {
            console.error('Failed to fetch interventions', error);
            set({ error: error.message || 'Failed to fetch interventions', isLoading: false });
        }
    },
    
    addIntervention: async (intervention) => {
        set({ isLoading: true, error: null });
        try {
            // Generates a local code if the backend doesn't
            const codeNumber = Math.floor(8000 + Math.random() * 1000);
            const payload = { ...intervention, code: `#INT-${codeNumber}` };
            
            const newIntervention = await interventionsApi.create(payload);
            set((state) => ({ 
                interventions: [...state.interventions, newIntervention],
                isLoading: false
            }));
        } catch (error: any) {
            console.error('Failed to add intervention', error);
            set({ error: error.message || 'Failed to add intervention', isLoading: false });
        }
    },
    
    updateIntervention: async (id, updatedFields) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await interventionsApi.update(id, updatedFields);
            set((state) => ({
                interventions: state.interventions.map(int => 
                    (int._id === id || int.id === id) ? { ...int, ...updated } : int
                ),
                isLoading: false
            }));
        } catch (error: any) {
            console.error('Failed to update intervention', error);
            set({ error: error.message || 'Failed to update intervention', isLoading: false });
        }
    },
    
    deleteIntervention: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await interventionsApi.delete(id);
            set((state) => ({
                interventions: state.interventions.filter(int => (int._id !== id && int.id !== id)),
                isLoading: false
            }));
        } catch (error: any) {
            console.error('Failed to delete intervention', error);
            set({ error: error.message || 'Failed to delete intervention', isLoading: false });
        }
    }
}));

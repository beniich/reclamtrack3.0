import { create } from 'zustand';

interface UIState {
    isAISidekickOpen: boolean;
    toggleAISidekick: () => void;
    openAISidekick: () => void;
    closeAISidekick: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isAISidekickOpen: false,
    toggleAISidekick: () => set((state) => ({ isAISidekickOpen: !state.isAISidekickOpen })),
    openAISidekick: () => set({ isAISidekickOpen: true }),
    closeAISidekick: () => set({ isAISidekickOpen: false }),
}));

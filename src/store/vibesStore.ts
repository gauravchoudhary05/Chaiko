import { create } from "zustand";

export type BusyLevel = "Quiet" | "Buzzing" | "Packed";

interface VibesState {
    busyLevel: BusyLevel;
    waitMinutes: number;
    cycleLevel: () => void;
}

const LEVELS: { level: BusyLevel; wait: number }[] = [
    { level: "Quiet", wait: 0 },
    { level: "Buzzing", wait: 15 },
    { level: "Packed", wait: 30 },
];

export const useVibesStore = create<VibesState>((set, get) => ({
    busyLevel: "Buzzing",
    waitMinutes: 15,
    cycleLevel: () => {
        const current = LEVELS.findIndex((l) => l.level === get().busyLevel);
        const next = LEVELS[(current + 1) % LEVELS.length];
        set({ busyLevel: next.level, waitMinutes: next.wait });
    },
}));

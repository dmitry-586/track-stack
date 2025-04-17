import { create } from "zustand";
import { Roadmap, userRoadmap } from "@/interfaces/interfaces";
import { API_URL } from "@/constants/api";
import axios from "axios";

interface RoadmapsStore {
  roadmaps: Roadmap[];
  userRoadmaps: userRoadmap[];
  selectedRoadmap: Roadmap | null;
  isRoadmapVisible: boolean;
  setRoadmaps: (roadmaps: Roadmap[]) => void;
  selectRoadmap: (id: string) => void;
  toggleVisibility: (state?: boolean) => void;
  getUserRoadmaps: (userId: string | null) => Promise<userRoadmap[]>;
}

export const useRoadmapsStore = create<RoadmapsStore>((set) => ({
  roadmaps: [],
  userRoadmaps: [],
  selectedRoadmap: null,
  isRoadmapVisible: false,

  setRoadmaps: (roadmaps) => set({ roadmaps }),

  selectRoadmap: (id) =>
    set((state) => ({
      selectedRoadmap: state.roadmaps.find((r) => r.roadmapId === id) || null,
    })),

  toggleVisibility: (state) =>
    set((prev) => ({
      isRoadmapVisible:
        typeof state === "boolean" ? state : !prev.isRoadmapVisible,
    })),

  getUserRoadmaps: async (userId: string | null): Promise<userRoadmap[]> => {
    try {
      const url = `${API_URL}/api/roadmaps/user/${userId}`;
      const response = await axios.get(url);
      const userRoadmaps: userRoadmap[] = response.data;
      set({ userRoadmaps: userRoadmaps });
      return userRoadmaps;
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
      return [];
    }
  },
}));

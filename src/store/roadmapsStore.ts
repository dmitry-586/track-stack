import { create } from "zustand";
import { Roadmap, userRoadmap } from "@/interfaces/interfaces";
import { API_URL } from "@/constants/api";
import axios from "axios";

interface RoadmapsStore {
  roadmaps: Roadmap[];
  userRoadmaps: userRoadmap[];
  selectedRoadmap: Roadmap | null;
  setSelectedRoadmap: (roadmap: Roadmap | null) => void;
  isRoadmapVisible: boolean;
  toggleVisibility: (state?: boolean) => void;
  getUserRoadmaps: (userId: string | null) => Promise<userRoadmap[]>;
  getAllRoadmaps: () => Promise<Roadmap[]>;
}

export const useRoadmapsStore = create<RoadmapsStore>((set) => ({
  roadmaps: [],
  userRoadmaps: [],
  selectedRoadmap: null,
  isRoadmapVisible: false,

  setSelectedRoadmap: (roadmap) => set({ selectedRoadmap: roadmap }),

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

  getAllRoadmaps: async (): Promise<Roadmap[]> => {
    try {
      const url = `${API_URL}/api/roadmaps`;
      const response = await axios.get(url);
      const roadmaps: Roadmap[] = response.data;
      set({ roadmaps: roadmaps });
      return roadmaps;
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
      return [];
    }
  },
}));

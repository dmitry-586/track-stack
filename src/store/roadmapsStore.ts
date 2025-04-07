import { DEFAULT_OPTION } from "@/constants/skillsPage";
import { Roadmap } from "@/interfaces/interfaces";
import { create } from "zustand";

interface RoadmapsStore {
  roadmaps: Roadmap[];
  selectedRoadmap: Roadmap | null;
  setRoadmaps: (roadmaps: Roadmap[]) => void;
  setSelectedRoadmap: (roadmap: Roadmap) => void;
}

export const useRoadmapsStore = create<RoadmapsStore>()((set) => ({
  roadmaps: [],
  selectedRoadmap: DEFAULT_OPTION,
  setRoadmaps: (roadmaps) => {
    set({ roadmaps });
  },
  setSelectedRoadmap: (roadmap) => {
    set({ selectedRoadmap: roadmap });
  },
}));

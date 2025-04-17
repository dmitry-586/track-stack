import { create } from "zustand";
import {
  Roadmap,
  RoadmapOption,
  Skill,
  userSkill,
} from "@/interfaces/interfaces";
import axios from "axios";
import { API_URL } from "@/constants/api";
import { DEFAULT_OPTION } from "@/constants/skillsPage";
import { persist } from "zustand/middleware";

interface SkillsStore {
  allSkills: Skill[];
  userSkills: userSkill[];
  focusSkills: userSkill[];
  selectedRoadmap: RoadmapOption;

  addFocusSkill: (skillId: string, userId: string) => Promise<void>;
  removeFocusSkill: (skillId: string, userId: string) => Promise<void>;
  getAllSkills: (roadmapId?: string) => Promise<Skill[]>;
  getUserSkills: (userId: string, roadmapId?: string) => Promise<userSkill[]>;
  getFocusSkills: (userId: string) => Promise<userSkill[]>;
  addUserSkill: (skillId: string, userId: string) => Promise<void>;
  removeUserSkill: (skillId: string, userId: string) => Promise<void>;
  updateSkillProgress: (
    skillId: string,
    userId: string,
    progress: number
  ) => Promise<void>;
  setSelectedRoadmap: (roadmap: Roadmap) => void;
}

export const useSkillsStore = create<SkillsStore>()(
  persist(
    (set, get) => ({
      allSkills: [],
      userSkills: [],
      focusSkills: [],
      selectedRoadmap: DEFAULT_OPTION,

      getAllSkills: async (roadmapId?: string) => {
        try {
          const url = `${API_URL}/api/skills${
            roadmapId ? `?roadmapId=${roadmapId}` : ""
          }`;
          const response = await axios.get(url);
          const skills = Array.isArray(response.data) ? response.data : [];
          set({ allSkills: skills });
          return skills;
        } catch (error) {
          console.error("Ошибка при загрузке навыков:", error);
          return [];
        }
      },

      getUserSkills: async (userId: string, roadmapId?: string) => {
        try {
          const url = `${API_URL}/api/skills/user/${userId}${
            roadmapId ? `?roadmapId=${encodeURIComponent(roadmapId)}` : ""
          }`;
          const response = await axios.get(url);
          const skills = response.data;
          set({ userSkills: skills });
          return skills;
        } catch (error) {
          console.error("Ошибка при загрузке навыков пользователя:", error);
          return [];
        }
      },

      getFocusSkills: async (userId: string) => {
        try {
          const response = await axios.get(
            `${API_URL}/api/skills/user/${userId}/focus`
          );
          const skills = response.data;
          set({ focusSkills: skills });
          return skills;
        } catch (error) {
          console.error("Ошибка при загрузке фокус-навыков:", error);
          return [];
        }
      },

      addUserSkill: async (skillId: string, userId: string) => {
        try {
          await axios.post(`${API_URL}/api/skills/${skillId}/user/${userId}`);
          const updatedSkills = await get().getUserSkills(userId);
          set({ userSkills: updatedSkills });
        } catch (error) {
          console.error("Ошибка при добавлении навыка пользователю:", error);
          throw error;
        }
      },

      removeUserSkill: async (skillId: string, userId: string) => {
        try {
          await axios.delete(`${API_URL}/api/skills/${skillId}/user/${userId}`);
          const updatedSkills = await get().getUserSkills(userId);
          set({ userSkills: updatedSkills });
        } catch (error) {
          console.error("Ошибка при удалении навыка у пользователя:", error);
          throw error;
        }
      },

      updateSkillProgress: async (
        skillId: string,
        userId: string,
        progress: number
      ) => {
        try {
          await axios.put(
            `${API_URL}/api/skills/${skillId}/user/${userId}/progress`,
            { progress }
          );
          const updatedSkills = await get().getUserSkills(userId);
          set({ userSkills: updatedSkills });
        } catch (error) {
          console.error("Ошибка при обновлении прогресса навыка:", error);
          throw error;
        }
      },

      addFocusSkill: async (skillId: string, userId: string) => {
        try {
          const { userSkills, focusSkills } = get();
          const skillToAdd = [...userSkills, ...focusSkills].find(
            (s) => s.skillId === skillId
          );

          if (!skillToAdd) {
            throw new Error("Навык не найден");
          }

          await axios.post(
            `${API_URL}/api/skills/${skillId}/user/${userId}/focus`
          );

          set({
            userSkills: userSkills.filter((s) => s.skillId !== skillId),
            focusSkills: [...focusSkills, skillToAdd],
          });
        } catch (error) {
          console.error("Ошибка добавления:", error);
          throw error;
        }
      },

      removeFocusSkill: async (skillId: string, userId: string) => {
        try {
          const { focusSkills, userSkills } = get();
          const skillToRemove = focusSkills.find((s) => s.skillId === skillId);

          if (!skillToRemove) {
            throw new Error("Навык не найден в фокусе");
          }

          await axios.delete(
            `${API_URL}/api/skills/${skillId}/user/${userId}/focus`
          );

          set({
            userSkills: userSkills.filter((s) => s.skillId !== skillId),
            focusSkills: [...focusSkills, skillToRemove],
          });
        } catch (error) {
          console.error("Ошибка удаления:", error);
          throw error;
        }
      },

      setSelectedRoadmap: (roadmap) => set({ selectedRoadmap: roadmap }),
    }),
    {
      name: "skills-storage",
      partialize: (state) => ({
        selectedRoadmap: state.selectedRoadmap,
        focusSkills: state.focusSkills,
      }),
    }
  )
);

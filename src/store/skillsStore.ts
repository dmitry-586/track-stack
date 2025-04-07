import { create } from "zustand";
import { Skill } from "@/interfaces/interfaces";
import axios from "axios";
import { API_URL } from "@/constants/api";

interface SkillsStore {
  allSkills: Skill[];
  userSkills: Skill[];
  focusSkills: Skill[];
  setUserSkills: (skills: Skill[]) => void;
  setFocusSkills: (skills: Skill[]) => void;
  addFocusSkill: (skillName: string) => Promise<void>;
  removeFocusSkill: (skillName: string) => Promise<void>;
  fetchAllSkills: (roadmapId?: string) => Promise<Skill[]>;
  fetchUserSkills: (roadmapId?: string) => Promise<Skill[]>;
  fetchFocusSkills: (roadmapId?: string) => Promise<Skill[]>;
}

export const useSkillsStore = create<SkillsStore>()((set, get) => ({
  allSkills: [],
  userSkills: [],
  focusSkills: [],

  setUserSkills: (skills) => set({ userSkills: skills }),
  setFocusSkills: (skills) => set({ focusSkills: skills }),

  fetchAllSkills: async (roadmapId?: string) => {
    try {
      const url = `${API_URL}/api/skills${
        roadmapId ? `?roadmapId=${roadmapId}` : ""
      }`;
      const response = await axios.get(url);
      const skills = response.data;
      set({ allSkills: skills });
      return skills;
    } catch (error) {
      console.error("Ошибка при загрузке навыков:", error);
      return [];
    }
  },

  fetchUserSkills: async (roadmapId?: string) => {
    try {
      const url = `${API_URL}/api/skills/user${
        roadmapId ? `?roadmapId=${roadmapId}` : ""
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

  fetchFocusSkills: async (roadmapId?: string) => {
    try {
      const url = `${API_URL}/api/skills/focus${
        roadmapId ? `?roadmapId=${roadmapId}` : ""
      }`;
      const response = await axios.get(url);
      const skills = response.data;
      set({ focusSkills: skills });
      return skills;
    } catch (error) {
      console.error("Ошибка при загрузке фокус-навыков:", error);
      return [];
    }
  },

  addFocusSkill: async (skillName: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/skills/focus`, {
        skillName: skillName,
      });
      set({
        focusSkills: [...get().focusSkills, response.data],
        userSkills: get().userSkills.map((skill) =>
          skill.name === skillName ? { ...skill, isFocus: true } : skill
        ),
      });
    } catch (error) {
      console.error("Ошибка при добавлении фокус-навыка:", error);
      throw error;
    }
  },

  removeFocusSkill: async (skillName: string) => {
    try {
      await axios.delete(`${API_URL}/api/skills/focus`, {
        data: { skillName: skillName },
      });
      set({
        focusSkills: get().focusSkills.filter((s) => s.name !== skillName),
        userSkills: get().userSkills.map((skill) =>
          skill.name === skillName ? { ...skill, isFocus: false } : skill
        ),
      });
    } catch (error) {
      console.error("Ошибка при удалении фокус-навыка:", error);
      throw error;
    }
  },
}));

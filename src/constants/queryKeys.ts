import { FOCUS_OPTION } from "./skillsPage";

export const QUERY_KEYS = {
  USER_SKILLS: "userSkills",
  ALL_SKILLS: "allSkills",
  FOCUS_SKILLS: "focusSkills",
  ROADMAPS: "roadmaps",
} as const;

export const getQueryKey = {
  userSkills: (userId: string, roadmapId?: string) => [
    roadmapId === FOCUS_OPTION.roadmapId
      ? QUERY_KEYS.FOCUS_SKILLS
      : QUERY_KEYS.USER_SKILLS,
    userId,
    roadmapId,
  ],
  allSkills: () => [QUERY_KEYS.ALL_SKILLS],
  focusSkills: (userId: string) => [QUERY_KEYS.FOCUS_SKILLS, userId],
  roadmaps: () => [QUERY_KEYS.ROADMAPS],
};

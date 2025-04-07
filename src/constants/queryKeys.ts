export const QUERY_KEYS = {
  USER_SKILLS: "userSkills",
  ALL_SKILLS: "allSkills",
  FOCUS_SKILLS: "focusSkills",
  ROADMAPS: "roadmaps",
} as const;

export const getQueryKey = {
  userSkills: (roadmapId?: string) =>
    roadmapId ? [QUERY_KEYS.USER_SKILLS, roadmapId] : [QUERY_KEYS.USER_SKILLS],
  allSkills: () => [QUERY_KEYS.ALL_SKILLS],
  focusSkills: () => [QUERY_KEYS.FOCUS_SKILLS],
  roadmaps: () => [QUERY_KEYS.ROADMAPS],
};

export interface Roadmap {
  roadmapId: string;
  title: string;
  complexity?: string;
  color?: string;
  stages?: number;
  technologies?: string;
}

export interface userRoadmap {
  userId: string;
  roadmapId: string;
  progress: string;
  roadmap: Roadmap;
}

export interface Skill {
  skillId: string;
  name: string;
  roadmapIds: string[];
}

export interface userSkill {
  userId: string;
  skillId: string;
  progress: string;
  skill: Skill;
}

export interface SkillsButtonProps {
  title: string;
  onClick?: () => void;
}

export interface User {
  id: string;
  email: string;
}

export interface RoadmapOption extends Roadmap {
  progress?: number;
}


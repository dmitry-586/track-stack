export interface Roadmap {
  name: string;
  progress: number;
  roadmapId: string;
}

export interface Skill {
  name: string;
  progress: number;
  roadmapId: string;
}

export interface SkillsButtonProps {
  title: string;
  onClick?: () => void;
}

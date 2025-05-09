export interface Roadmap {
	roadmapId: string
	title: string
	complexity?: string
	color?: string
	stages?: number
	technologies?: string
}

export interface UserRoadmap {
	userId: string
	roadmapId: string
	progress: string
	roadmap: Roadmap
}

export interface Skill {
	skillId: string
	name: string
	roadmapIds: string[]
}

export interface UserSkill {
	userId: string
	skillId: string
	progress: number
	skill: Skill
}

export interface SkillsButtonProps {
	title: string
	onClick?: () => void
}

export interface User {
	id: string
	email: string
}

export interface RoadmapOption extends Roadmap {
	progress?: number
}

export interface Task {
	taskId: string
	title: string
	skillId: string
	skill: {
		skillId: string
		name: string
		roadmapIds: string[]
	}
}

export interface UserTask {
	userId: string
	taskId: string
	completed: boolean
	task: Task
}

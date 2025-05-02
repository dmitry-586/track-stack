import { API_URL } from "@/constants/api"
import { Roadmap, UserRoadmap } from "@/interfaces/interfaces"
import axios from "axios"
import { create } from "zustand"

interface RoadmapsStore {
	roadmaps: Roadmap[]
	userRoadmaps: UserRoadmap[]
	selectedRoadmap: Roadmap | null
	setSelectedRoadmap: (roadmap: Roadmap | null) => void
	isRoadmapVisible: boolean
	toggleVisibility: (state?: boolean) => void
	getUserRoadmaps: (userId: string | null) => Promise<UserRoadmap[]>
	getAllRoadmaps: () => Promise<Roadmap[]>
}

export const useRoadmapsStore = create<RoadmapsStore>(set => ({
	roadmaps: [],
	userRoadmaps: [],
	selectedRoadmap: null,
	isRoadmapVisible: false,

	setSelectedRoadmap: roadmap => set({ selectedRoadmap: roadmap }),

	toggleVisibility: state =>
		set(prev => ({
			isRoadmapVisible:
				typeof state === "boolean" ? state : !prev.isRoadmapVisible,
		})),

	getUserRoadmaps: async (userId: string | null): Promise<UserRoadmap[]> => {
		try {
			const url = `${API_URL}/api/roadmaps/user/${userId}`
			const response = await axios.get(url)
			const userRoadmaps: UserRoadmap[] = response.data
			set({ userRoadmaps: userRoadmaps })
			return userRoadmaps
		} catch (error) {
			console.error("Ошибка при загрузке:", error)
			return []
		}
	},

	getAllRoadmaps: async (): Promise<Roadmap[]> => {
		try {
			const url = `${API_URL}/api/roadmaps`
			const response = await axios.get(url)
			const roadmaps: Roadmap[] = response.data
			set({ roadmaps: roadmaps })
			return roadmaps
		} catch (error) {
			console.error("Ошибка при загрузке:", error)
			return []
		}
	},
}))

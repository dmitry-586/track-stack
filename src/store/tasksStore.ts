import { API_URL } from "@/constants/api"
import { Task, UserTask } from "@/interfaces/interfaces"
import axios from "axios"
import { create } from "zustand"

interface TaskStore {
	allTasks: Task[]
	userTasks: UserTask[]

	getAllTasks: () => Promise<Task[]>
	getUserTasks: (userId: string) => Promise<UserTask[]>
	updateUserTaskStatus: (
		taskId: string,
		userId: string,
		completed: boolean
	) => Promise<void>
}

export const useTaskStore = create<TaskStore>((set, get) => ({
	allTasks: [],
	userTasks: [],

	getAllTasks: async () => {
		try {
			const response = await axios.get<Task[]>(`${API_URL}/api/tasks`)
			set({ allTasks: response.data })
			return response.data
		} catch (error) {
			console.error("Ошибка при загрузке задач:", error)
			return []
		}
	},

	getUserTasks: async (userId: string) => {
		try {
			const response = await axios.get<UserTask[]>(
				`${API_URL}/api/tasks/user/${userId}`
			)
			set({ userTasks: response.data })
			return response.data
		} catch (error) {
			console.error("Ошибка при загрузке пользовательских задач:", error)
			return []
		}
	},

	updateUserTaskStatus: async (taskId, userId, completed) => {
		try {
			const { allTasks, userTasks } = get()

			const newUserTasks = userTasks.some(ut => ut.taskId === taskId)
				? userTasks.map(ut =>
						ut.taskId === taskId ? { ...ut, completed } : ut
				  )
				: [
						...userTasks,
						{
							taskId,
							userId,
							completed,
							task: allTasks.find(t => t.taskId === taskId)!,
						},
				  ]

			set({ userTasks: newUserTasks })

			await axios.patch(`${API_URL}/api/tasks/${taskId}/user/${userId}`, {
				completed,
			})
		} catch (error) {
			const { userTasks } = get()
			set({
				userTasks: userTasks.map(ut =>
					ut.taskId === taskId ? { ...ut, completed: !completed } : ut
				),
			})
			console.error("Ошибка при обновлении задачи:", error)
		}
	},
}))

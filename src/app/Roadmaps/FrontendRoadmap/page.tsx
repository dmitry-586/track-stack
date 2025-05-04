"use client"

import { getQueryKey } from "@/constants/queryKeys"
import { useTaskStore } from "@/store/tasksStore"
import { useUserStore } from "@/store/userStore"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useMemo } from "react"

const SKILL_ORDER = [
	"HTML",
	"CSS",
	"Инструменты",
	"Java Script",
	"Практика",
	"Дополнительно",
]

export default function FrontendRoadmapPage() {
	const queryClient = useQueryClient()
	const taskStore = useTaskStore()
	const userStore = useUserStore()

	// Загрузка данных
	const { data: allTasks } = useQuery({
		queryKey: ["allTasks"],
		queryFn: () => taskStore.getAllTasks(),
	})

	const handleToggleCheck = async (taskId: string, currentStatus: boolean) => {
		if (!userStore.id) return

		try {
			await taskStore.updateUserTaskStatus(taskId, userStore.id, !currentStatus)

			// Инвалидация всех связанных запросов
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: getQueryKey.userSkills(userStore.id),
					exact: false,
				}),
				queryClient.invalidateQueries({
					queryKey: getQueryKey.focusSkills(userStore.id),
					exact: false,
				}),
				queryClient.invalidateQueries({
					queryKey: getQueryKey.userRoadmaps(),
					exact: false,
				}),
				queryClient.invalidateQueries({
					queryKey: ["userTasks", userStore.id],
					exact: false,
				}),
			])
		} catch (error) {
			console.error("Ошибка при обновлении задачи:", error)
		}
	}

	// Объединение данных
	const mergedTasks = useMemo(() => {
		return (
			allTasks?.map(task => ({
				...task,
				completed:
					taskStore.userTasks.find(
						ut => ut.taskId === task.taskId && ut.userId === userStore.id
					)?.completed ?? false,
			})) || []
		)
	}, [allTasks, taskStore.userTasks, userStore.id])

	// Группировка задач
	const groupedTasks = useMemo(() => {
		return mergedTasks.reduce(
			(acc: Record<string, typeof mergedTasks>, task) => {
				const skillName = task.skill.name
				if (!acc[skillName]) acc[skillName] = []
				acc[skillName].push(task)
				return acc
			},
			{}
		)
	}, [mergedTasks])

	// Формирование блоков
	const blocks = useMemo(() => {
		return SKILL_ORDER.map(skillName => ({
			title: skillName,
			items: (groupedTasks[skillName] || [])
				.sort((a, b) => a.taskId.localeCompare(b.taskId))
				.map(task => ({
					text: task.title,
					checked: task.completed,
					taskId: task.taskId,
				})),
		}))
	}, [groupedTasks])

	return (
		<section className="px-[60px] py-10">
			<header className="flex justify-between">
				<div className="bg-[#31323E] rounded-[20px] shadow-outset flex justify-center items-center h-[70px] w-fit px-10">
					<h2 className="text-[24px] font-medium">Frontend Roadmap</h2>
				</div>
				<div className="flex gap-5 items-center">
					<button
						onClick={() => console.log("Назад")}
						className="size-[50px] bg-[#60519B] rounded-full flex justify-center items-center cursor-pointer shadow-outset"
					>
						<Image
							src="/NavMenu/roadmaps.svg"
							alt="icon"
							width={25}
							height={25}
						/>
					</button>
					<div className="bg-[#31323E] rounded-[20px] shadow-outset flex justify-center items-center gap-2 h-[70px] w-[250px]">
						<h2 className="text-[20px] font-medium">Уровень: </h2>
						<h2 className="text-[24px] font-medium text-[#9884E6]">trainee</h2>
					</div>
				</div>
			</header>

			<main className="mt-10 flex flex-col gap-[15px]">
				{/* Первая строка */}
				<div className="flex">
					{blocks.slice(0, 3).map((block, blockIndex) => (
						<div key={blockIndex} className="flex items-center">
							<div className="bg-[#31323E] rounded-[20px] h-[250px] w-[280px] shadow-outset p-5">
								<h3 className="text-[24px] font-medium mb-4">{block.title}</h3>
								<ul className="space-y-3">
									{block.items.map((item) => (
										<li
											key={item.taskId}
											className="flex items-center gap-2 text-[18px]"
										>
											<input
												type="checkbox"
												checked={item.checked}
												onChange={() =>
													handleToggleCheck(item.taskId, item.checked)
												}
												className="custom-checkbox"
											/>
											<span
												className={
													item.checked ? "line-through opacity-50" : ""
												}
											>
												{item.text}
											</span>
										</li>
									))}
								</ul>
							</div>
							{blockIndex < 2 && (
								<Image
									src="/RoadmapPage/arrow.svg"
									alt="arrow"
									width={50}
									height={50}
									className="mx-[15px]"
								/>
							)}
						</div>
					))}
				</div>

				{/* Стрелка вниз */}
				<div className="flex justify-end mr-[115px]">
					<Image
						src="/RoadmapPage/arrow.svg"
						alt="arrow down"
						width={50}
						height={50}
						className="hidden lg:block rotate-90"
					/>
				</div>

				{/* Вторая строка (справа налево) */}
				<div className="flex flex-row-reverse">
					{blocks.slice(3, 6).map((block, index) => {
						const originalIndex = index + 3
						return (
							<div key={originalIndex} className="flex items-center">
								{index < 2 && (
									<Image
										src="/RoadmapPage/arrow.svg"
										alt="arrow"
										width={50}
										height={50}
										className="mx-[15px] rotate-180"
									/>
								)}
								<div className="bg-[#31323E] rounded-[20px] h-[250px] w-[280px] shadow-outset p-5">
									<h3 className="text-[24px] font-medium mb-4">
										{block.title}
									</h3>
									<ul className="space-y-3">
										{block.items.map((item) => (
											<li
												key={item.taskId}
												className="flex items-center gap-2 text-[18px]"
											>
												<input
													type="checkbox"
													checked={item.checked}
													onChange={() =>
														handleToggleCheck(item.taskId, item.checked)
													}
													className="custom-checkbox"
												/>
												<span
													className={
														item.checked ? "line-through opacity-50" : ""
													}
												>
													{item.text}
												</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						)
					})}
				</div>
			</main>
		</section>
	)
}

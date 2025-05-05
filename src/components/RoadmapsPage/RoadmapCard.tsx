import { useRoadmapsStore } from "@/store/roadmapsStore"
import { useUserStore } from "@/store/userStore"
import Link from "next/link"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@/constants/queryKeys"
import toast from "react-hot-toast"

interface RoadmapCardProps {
	roadmapId: string
	title: string
	complexity?: string
	stages?: number
	technologies?: string
	color?: string
	isActive?: boolean
}

export default function RoadmapCard({
	roadmapId,
	title,
	complexity,
	stages,
	technologies,
	color,
	isActive = false,
}: RoadmapCardProps) {
	const { id: userId } = useUserStore()
	const { addRoadmapToUser } = useRoadmapsStore()
	const [isAdding, setIsAdding] = useState(false)
	const queryClient = useQueryClient()

	const handleAddRoadmap = async () => {
		if (isAdding) return
		
		setIsAdding(true)
		const toastId = toast.loading("Добавление роадмепа...")
		
		try {
			const success = await addRoadmapToUser(roadmapId, userId)
			if (success) {
				await queryClient.invalidateQueries({
					queryKey: getQueryKey.userRoadmaps(),
				})
				toast.success("Роадмеп успешно добавлен!", { id: toastId })
			} else {
				toast.error("Не удалось добавить роадмеп", { id: toastId })
			}
		} catch (error) {
			console.log(error)
			toast.error("Произошла ошибка при добавлении роадмепа", { id: toastId })
		} finally {
			setIsAdding(false)
		}
	}

	return (
		<div className="bg-[#31323E] rounded-[20px] pt-[25px] px-[30px] pb-[20px] flex flex-col gap-[20px] w-[490px] h-[310px] relative shadow-outset">
			<h2 className="text-[32px] font-medium">{title}</h2>
			<span
				style={{ backgroundColor: color }}
				className="size-4 rounded-full absolute top-[20px] right-[20px]"
			/>
			<div className="flex gap-[15px] text-[18px]">
				<p className="text-[#BFC0D1]">Сложность:</p>
				<p>{complexity}</p>
			</div>
			<div className="flex gap-[15px] text-[18px]">
				<p className="text-[#BFC0D1]">Этапов:</p>
				<p>{stages}</p>
			</div>
			<div className="flex flex-col gap-[15px] text-[18px]">
				<p className="text-[#BFC0D1]">Основные технологии:</p>
				<p>{technologies}</p>
			</div>
			<div className="flex justify-between mt-auto">
				<Link
					href={`/Roadmaps/${roadmapId}`}
					className="text-[#BFC0D1] text-[18px] cursor-pointer"
				>
					Подробнее...
				</Link>
				{!isActive && (
					<button
						onClick={handleAddRoadmap}
						className={`text-[18px] text-[#9884E6] transition-opacity ${
							roadmapId === "frontend" ? "cursor-pointer" : "cursor-not-allowed"
						} ${isAdding ? "opacity-50" : ""}`}
						disabled={roadmapId !== "frontend" || isAdding}
					>
						{isAdding ? "Добавление..." : "Добавить в изучение"}
					</button>
				)}
			</div>
		</div>
	)
}

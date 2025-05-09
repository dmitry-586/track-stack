"use client"

import { getQueryKey } from "@/constants/queryKeys"
import { FOCUS_OPTION } from "@/constants/skillsPage"
import { useSkillsStore } from "@/store/skillsStore"
import { useUserStore } from "@/store/userStore"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useMemo } from "react"
import { SkillsSkeleton } from "../Skeletons/SkillsSkeleton"

interface SkillsListProps {
	sortDirection: "asc" | "desc"
}

export function SkillsList({ sortDirection }: SkillsListProps) {
	const { id: userId } = useUserStore()
	const { getUserSkills, selectedRoadmap, focusSkills, getFocusSkills } =
		useSkillsStore()
	const isFocusMode = selectedRoadmap?.roadmapId === FOCUS_OPTION.roadmapId

	const {
		data: skills,
		isLoading,
		error,
	} = useQuery({
		queryKey: getQueryKey.userSkills(userId, selectedRoadmap?.roadmapId),
		queryFn: async () => {
			if (!userId) return []
			const result = await getUserSkills(userId, selectedRoadmap?.roadmapId)
			useSkillsStore.setState({ userSkills: result })
			return result
		},
		enabled: !!userId && !isFocusMode,
		staleTime: 0,
		refetchOnWindowFocus: true,
	})

	const {
		data: focusSkillsData,
		isLoading: isFocusLoading,
		error: focusError,
	} = useQuery({
		queryKey: getQueryKey.focusSkills(userId),
		queryFn: async () => {
			if (!userId) return []
			const result = await getFocusSkills(userId)
			useSkillsStore.setState({ focusSkills: result })
			return result
		},
		enabled: !!userId && isFocusMode,
		staleTime: 0,
		refetchOnWindowFocus: true,
	})

	const displayedSkills = useMemo(() => {
		const skillsToDisplay = isFocusMode
			? focusSkillsData || focusSkills
			: skills || []

		return [...skillsToDisplay].sort((a, b) => {
			const progressA = +a.progress
			const progressB = +b.progress

			return sortDirection === "asc"
				? progressA - progressB
				: progressB - progressA
		})
	}, [isFocusMode, focusSkillsData, focusSkills, skills, sortDirection])

	const content = useMemo(() => {
		const loading = isFocusMode ? isFocusLoading : isLoading
		const errorOccurred = isFocusMode ? focusError : error

		if (loading) {
			return <SkillsSkeleton />
		}

		if (errorOccurred) {
			return (
				<div className="flex flex-col items-center justify-center h-[280px] text-white">
					<p className="text-xl mb-2">Ошибка загрузки данных</p>
					<p className="text-sm text-gray-400">Попробуйте обновить страницу</p>
				</div>
			)
		}

		if (displayedSkills.length === 0) {
			return (
				<div className="flex flex-col items-center justify-center h-[280px] text-white">
					<p className="text-xl mb-2">
						{isFocusMode ? "Нет фокус-навыков" : "Нет навыков"}
					</p>
					<p className="text-sm text-gray-400">
						{isFocusMode
							? "Добавьте навыки для изучения"
							: "Начните изучение прямо сейчас"}
					</p>
				</div>
			)
		}

		return (
			<div className="flex flex-col gap-[20px] overflow-y-auto custom-scrollbar h-[280px]">
				{displayedSkills.map(skill => (
					<div
						key={skill.skillId}
						className="flex items-center justify-between text-[18px] text-white pl-10 pr-[40px]"
					>
						<div className="flex items-center gap-[10px]">
							<Image
								src="/HomePage/ponchik.svg"
								alt="icon"
								width={14}
								height={14}
							/>
							{skill.skill.name}
						</div>
						<div
							className={`w-[200px] text-center ${
								+skill.progress === 100 ? "text-[#9884E6]" : ""
							}`}
						>
							{skill.progress}%
						</div>
					</div>
				))}
			</div>
		)
	}, [
		isLoading,
		isFocusLoading,
		error,
		focusError,
		displayedSkills,
		isFocusMode,
	])

	return content
}

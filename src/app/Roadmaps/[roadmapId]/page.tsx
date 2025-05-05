"use client"

import FrontendRoadmapPage from "@/components/FrontendRoadmapPage"
import { useRouter } from "next/navigation"
import { use } from "react"

interface RoadmapPageProps {
	params: Promise<{
		roadmapId: string
	}>
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
	const router = useRouter()
	const { roadmapId } = use(params)

	if (roadmapId === "frontend") {
		return <FrontendRoadmapPage />
	}

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="text-center flex flex-col w-[400px] h-[220px] bg-[#31323E] rounded-[20px] justify-center items-center">
				<h1 className="text-2xl font-bold mb-4">Roadmap в разработке...</h1>
				<p className="text-[#BFC0D1] mb-6 leading-normal">
					Этот роадмеп пока находится в разработке. Попробуйте позже.
				</p>
				<button
					onClick={() => router.back()}
					className="text-[#9884E6] text-[18px] cursor-pointer hover:text-[#BFC0D1] transition-colors"
				>
					Вернуться назад
				</button>
			</div>
		</div>
	)
}

"use client"

import RoadmapCard from "@/components/RoadmapsPage/RoadmapCard"
import { getQueryKey } from "@/constants/queryKeys"
import { useRoadmapsStore } from "@/store/roadmapsStore"
import { useUserStore } from "@/store/userStore"
import { useQuery } from "@tanstack/react-query"

export default function RoadmapsPage() {
	const { getAllRoadmaps } = useRoadmapsStore()
	const { id: userId } = useUserStore()

	const { data: allRoadmaps } = useQuery({
		queryKey: getQueryKey.allRoadmaps(),
		queryFn: async () => {
			return await getAllRoadmaps()
		},
	})

	const { data: userRoadmaps } = useQuery({
		queryKey: getQueryKey.userRoadmaps(),
		queryFn: async () => {
			return await useRoadmapsStore.getState().getUserRoadmaps(userId)
		},
	})

	const isRoadmapActive = (roadmapId: string) => {
		return userRoadmaps?.some(roadmap => roadmap.roadmapId === roadmapId) ?? false
	}

	return (
		<section className="relative w-full h-full min-h-screen px-[60px] py-10 overflow-hidden">
			<div className="w-full h-full flex justify-center items-center">
				<div className="grid grid-cols-2 gap-10 w-fit">
					{allRoadmaps?.map(card => (
						<div key={card.roadmapId}>
							<RoadmapCard
								roadmapId={card.roadmapId}
								title={card.title}
								complexity={card.complexity}
								color={card.color}
								stages={card.stages}
								technologies={card.technologies}
								isActive={isRoadmapActive(card.roadmapId)}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

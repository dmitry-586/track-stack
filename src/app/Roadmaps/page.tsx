"use client"

import RoadmapCard from "@/components/RoadmapsPage/RoadmapCard"
import { getQueryKey } from "@/constants/queryKeys"
import { useRoadmapsStore } from "@/store/roadmapsStore"
import { useQuery } from "@tanstack/react-query"

export default function RoadmapsPage() {
	const { getAllRoadmaps } = useRoadmapsStore()

	const { data: allRoadmaps } = useQuery({
		queryKey: getQueryKey.allRoadmaps(),
		queryFn: async () => {
			return await getAllRoadmaps()
		},
	})

	return (
		<section className="relative w-full h-full min-h-screen px-[60px] py-10 overflow-hidden">
			<div className="w-full h-full flex justify-center items-center">
				<div className="grid grid-cols-2 gap-10 w-fit">
					{allRoadmaps?.map(card => (
						<div key={card.roadmapId}>
							<RoadmapCard {...card} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

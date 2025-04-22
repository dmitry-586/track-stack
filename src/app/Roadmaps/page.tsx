"use client";

import { useRoadmapsStore } from "@/store/roadmapsStore";
import InProgress from "@/components/RoadmapsPage/InProgress";
import { useQuery } from "@tanstack/react-query";
import { getQueryKey } from "@/constants/queryKeys";
import RoadmapCard from "@/components/RoadmapsPage/RoadmapCard";

export default function RoadmapsPage() {
  const {
    isRoadmapVisible,
    setSelectedRoadmap,
    toggleVisibility,
    getAllRoadmaps,
  } = useRoadmapsStore();

  const { data: allRoadmaps } = useQuery({
    queryKey: getQueryKey.allRoadmaps(),
    queryFn: async () => {
      return await getAllRoadmaps();
    },
  });

  return (
    <section className="relative w-full h-full min-h-screen px-[60px] py-10 overflow-hidden">
      {!isRoadmapVisible ? (
        <div className="w-full h-full">
          <div className="grid grid-cols-2 gap-10 w-full">
            {allRoadmaps?.map((card) => (
              <div key={card.roadmapId}>
                <RoadmapCard
                  {...card}
                  onClick={() => {
                    setSelectedRoadmap(card);
                    toggleVisibility(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <InProgress />
      )}
    </section>
  );
}

"use client";

import { useRoadmapsStore } from "@/store/roadmapsStore";
import InProgress from "@/components/RoadmapsPage/InProgress";

export default function RoadmapsPage() {
  const { isRoadmapVisible } =
    useRoadmapsStore();


  return (
    <section className="relative w-full h-full min-h-screen px-[60px] py-10 overflow-hidden">
      {!isRoadmapVisible ? (
        <div className="w-full h-full">
          <div className="grid grid-cols-2 gap-10 w-full">
            {/* {roadmaps?.map((card) => (
              <div key={card.id}>
                <RoadmapCard
                  {...card}
                  onClick={() => {
                    selectRoadmap(card.id);
                    toggleVisibility(true);
                  }}
                />
              </div>
            ))} */}
          </div>
        </div>
      ) : (
        <InProgress />
      )}
    </section>
  );
}

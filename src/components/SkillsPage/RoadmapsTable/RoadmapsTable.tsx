"use client";

import Image from "next/image";
import { RoadmapsSkeleton } from "../Skeletons/RoadmapsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_OPTION } from "@/constants/skillsPage";
import { getQueryKey } from "@/constants/queryKeys";
import { useRoadmapsStore } from "@/store/roadmapsStore";
import { useUserStore } from "@/store/userStore";

const RoadmapRow = ({
  title,
  progress,
}: {
  title: string;
  progress: string;
}) => (
  <div className="flex items-center justify-between text-[18px] text-white pl-10 pr-[40px] h-[40px]">
    <div className="flex items-center gap-[10px]">
      <Image src="/HomePage/ponchik.svg" alt="" width={14} height={14} />
      {title}
    </div>
    <div
      className={`w-[100px] text-right ${
        +progress === 100 ? "text-[#9884E6]" : ""
      }`}
    >
      {progress}%
    </div>
  </div>
);

function RoadmapsContent() {
  const { getUserRoadmaps } = useRoadmapsStore();
  const { id: userId } = useUserStore();

  const {
    data: roadmaps,
    error,
    isLoading,
  } = useQuery({
    queryKey: getQueryKey.userRoadmaps(),
    queryFn: () => getUserRoadmaps(userId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <RoadmapsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[120px] text-white">
        <p className="text-xl mb-2">Ошибка загрузки данных</p>
        <p className="text-sm text-gray-400">Попробуйте обновить страницу</p>
      </div>
    );
  }

  if (!roadmaps) {
    return (
      <div className="flex flex-col items-center justify-center h-[120px] text-white">
        <p className="text-xl mb-2">Нет активных roadmap</p>
        <p className="text-sm text-gray-400">Добавьте новую roadmap</p>
      </div>
    );
  }

  const filteredRoadmaps = roadmaps.filter(
    (roadmap) => roadmap.roadmapId !== DEFAULT_OPTION.roadmapId,
  );

  return (
    <div className="h-[120px] overflow-y-auto snap-y snap-mandatory custom-scrollbar">
      <div className="h-full flex flex-col">
        {filteredRoadmaps.map((roadmap, index) => (
          <div key={index} className="snap-start h-[40px]">
            <RoadmapRow
              title={roadmap.roadmap.title}
              progress={roadmap.progress}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RoadmapsTable() {
  return (
    <div className="bg-[#31323E] rounded-[20px] py-[25px] shadow-outset w-full h-[210px] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between text-[22px] text-white font-medium mb-[20px] pl-10 pr-[50px]">
        <span>Активные roadmap:</span>
      </div>
      <RoadmapsContent />
    </div>
  );
}

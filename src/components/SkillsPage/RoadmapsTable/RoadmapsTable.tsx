"use client";

import { useRoadmapsStore } from "@/store/roadmapsStore";
import Image from "next/image";
import { RoadmapsSkeleton } from "../Skeletons/RoadmapsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/constants/api";
import axios from "axios";
import { DEFAULT_OPTION } from "@/constants/skillsPage";
import { getQueryKey } from "@/constants/queryKeys";

const RoadmapRow = ({ name, progress }: { name: string; progress: number }) => (
  <div className="flex items-center justify-between text-[18px] text-white pl-10 pr-[40px] h-[40px]">
    <div className="flex items-center gap-[10px]">
      <Image src="/HomePage/ponchik.svg" alt="" width={14} height={14} />
      {name}
    </div>
    <div
      className={`w-[100px] text-right ${
        progress === 100 ? "text-[#9884E6]" : ""
      }`}
    >
      {progress}%
    </div>
  </div>
);

function RoadmapsContent() {
  const { setRoadmaps } = useRoadmapsStore();

  const {
    data: roadmaps,
    isLoading,
    error,
  } = useQuery({
    queryKey: getQueryKey.roadmaps(),
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/roadmaps`);
      const data = [DEFAULT_OPTION, ...response.data];
      setRoadmaps(data);
      return data;
    },
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

  if (!roadmaps || roadmaps.length <= 1) {
    return (
      <div className="flex flex-col items-center justify-center h-[120px] text-white">
        <p className="text-xl mb-2">Нет активных roadmap</p>
        <p className="text-sm text-gray-400">Добавьте новую roadmap</p>
      </div>
    );
  }

  const filteredRoadmaps = roadmaps.filter(
    (roadmap) => roadmap.roadmapId !== DEFAULT_OPTION.roadmapId
  );

  return (
    <div className="h-[120px] overflow-y-auto snap-y snap-mandatory custom-scrollbar">
      <div className="h-full flex flex-col">
        {filteredRoadmaps.map((roadmap) => (
          <div key={roadmap.roadmapId} className="snap-start h-[40px]">
            <RoadmapRow name={roadmap.name} progress={roadmap.progress} />
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

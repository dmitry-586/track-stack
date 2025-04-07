"use client";

import { useRoadmapsStore } from "@/store/roadmapsStore";
import { useQuery } from "@tanstack/react-query";
import { SkillsSkeleton } from "../Skeletons/SkillsSkeleton";
import Image from "next/image";
import { useSkillsStore } from "@/store/skillsStore";
import { useEffect } from "react";
import { getQueryKey } from "@/constants/queryKeys";
import { DEFAULT_OPTION, FOCUS_OPTION } from "@/constants/skillsPage";

interface SkillsListProps {
  sortDirection: "asc" | "desc";
}

export function SkillsList({ sortDirection }: SkillsListProps) {
  const { selectedRoadmap } = useRoadmapsStore();
  const { fetchUserSkills, setUserSkills, focusSkills } = useSkillsStore();

  // Определяем roadmapId для запроса
  const roadmapId =
    selectedRoadmap?.roadmapId === FOCUS_OPTION.roadmapId
      ? undefined // Для фокус-навыков не передаем roadmapId
      : selectedRoadmap?.roadmapId === DEFAULT_OPTION.roadmapId
      ? undefined // Для всех навыков не передаем roadmapId
      : selectedRoadmap?.roadmapId; // Для конкретного roadmap передаем его ID

  const {
    data: skills,
    isLoading,
    error,
  } = useQuery({
    queryKey: getQueryKey.userSkills(roadmapId),
    queryFn: () => fetchUserSkills(roadmapId),
  });

  useEffect(() => {
    if (skills) {
      setUserSkills(skills);
    }
  }, [skills, setUserSkills]);

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[280px] text-white">
        <p className="text-xl mb-2">Ошибка загрузки данных</p>
        <p className="text-sm text-gray-400">Попробуйте обновить страницу</p>
      </div>
    );
  }

  if (!skills || skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[280px] text-white">
        <p className="text-xl mb-2">Нет навыков</p>
        <p className="text-sm text-gray-400">Добавьте новый навык</p>
      </div>
    );
  }

  let filteredSkills = skills;

  // Дополнительная фильтрация для фокус-навыков
  if (selectedRoadmap?.roadmapId === FOCUS_OPTION.roadmapId) {
    filteredSkills = skills.filter((skill) =>
      focusSkills.some((focusSkill) => focusSkill.name === skill.name)
    );
  }

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (sortDirection === "asc") {
      return a.progress - b.progress;
    }
    return b.progress - a.progress;
  });

  return (
    <div className="flex flex-col gap-[20px] overflow-y-auto custom-scrollbar h-[280px]">
      {sortedSkills.map((skill) => (
        <div
          key={skill.name}
          className="flex items-center justify-between text-[18px] text-white pl-10 pr-[40px]"
        >
          <div className="flex items-center gap-[10px]">
            <Image src="/HomePage/ponchik.svg" alt="" width={14} height={14} />
            {skill.name}
          </div>
          <div
            className={`w-[200px] text-center ${
              skill.progress === 100 ? "text-[#9884E6]" : ""
            }`}
          >
            {skill.progress}%
          </div>
        </div>
      ))}
    </div>
  );
}

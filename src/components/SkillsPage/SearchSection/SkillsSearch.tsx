"use client";

import { useSkillsStore } from "@/store/skillsStore";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getQueryKey } from "@/constants/queryKeys";
import FocusSkeleton from "../Skeletons/FocusSkeleton";

type SkillAction = "add" | "remove";

export default function SkillsSearch() {
  const {
    userSkills,
    focusSkills,
    addFocusSkill,
    removeFocusSkill,
    fetchFocusSkills,
  } = useSkillsStore();

  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);

  const { isLoading: isFetchLoading, error: fetchError } = useQuery({
    queryKey: getQueryKey.focusSkills(),
    queryFn: () => fetchFocusSkills(),
  });

  if (fetchError) {
    toast.error("Ошибка загрузки фокус-навыков", { position: "top-center" });
  }

  const filteredSkills = userSkills.filter((skill) => {
    const nameMatch = skill.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const progressMatch = skill.progress >= 50;
    return nameMatch && progressMatch;
  });

  const handleSkillAction = async (skillName: string, action: SkillAction) => {
    setIsActionLoading(true);
    try {
      if (action === "add") {
        await addFocusSkill(skillName);
        toast.success("Навык успешно добавлен", { position: "top-center" });
      } else {
        await removeFocusSkill(skillName);
        toast.success("Навык успешно удален", { position: "top-center" });
      }
      queryClient.invalidateQueries({
        queryKey: getQueryKey.focusSkills(),
      });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || "Произошла ошибка"
          : "Произошла ошибка";
      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setIsActionLoading(false);
    }
  };

  const isLoading = isFetchLoading || isActionLoading;

  return (
    <section className="flex flex-col gap-[25px]">
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-[25px] rounded-[20px] bg-[#31323E] text-[20px] text-white placeholder-[#BFC0D1] outline-none h-[70px] shadow-outset pr-[70px]"
          placeholder="Поиск навыков..."
          disabled={isLoading}
        />
        <div className="absolute right-[25px] top-1/2 -translate-y-1/2">
          <Image
            src="/SkillsPage/searchIcon.svg"
            alt="Поиск"
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className="bg-[#31323E] pl-[30px] py-[20px] rounded-[20px] w-full h-[380px] overflow-hidden shadow-outset">
        <h3 className="text-[20px] mb-[25px]">Фокус-навыки:</h3>
        <div className="space-y-[20px] h-[300px] overflow-y-auto custom-scrollbar pr-[20px]">
          {isLoading ? (
            <FocusSkeleton />
          ) : filteredSkills.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-400">
                {searchTerm ? "Ничего не найдено" : "Нет доступных навыков"}
              </p>
            </div>
          ) : (
            filteredSkills.map((skill) => {
              const isFocusSkill = focusSkills.some(
                (s) => s.name === skill.name
              );
              return (
                <div
                  key={skill.name}
                  className="flex justify-between items-center text-white"
                >
                  <div className="flex items-center gap-[10px]">
                    <Image
                      src="/HomePage/ponchik.svg"
                      alt=""
                      width={14}
                      height={14}
                    />
                    <p>{skill.name}</p>
                  </div>
                  <button
                    onClick={() =>
                      handleSkillAction(
                        skill.name,
                        isFocusSkill ? "remove" : "add"
                      )
                    }
                    disabled={isLoading}
                    className={`h-[30px] w-[150px] text-sm rounded-[20px] shadow-outset hover:opacity-90 cursor-pointer transition-all ${
                      isFocusSkill
                        ? "bg-[#B94A4A] hover:bg-[#9C3C3C]"
                        : "bg-[#60519B] hover:bg-[#403572]"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isLoading
                      ? "Загрузка..."
                      : isFocusSkill
                      ? "Удалить"
                      : "Добавить"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

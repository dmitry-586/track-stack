import { getQueryKey } from "@/constants/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import FocusSkeleton from "../Skeletons/FocusSkeleton";
import { useSkillsStore } from "@/store/skillsStore";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";

type SkillAction = "add" | "remove";

interface Props {
  searchTerm: string;
}

export default function FocusContent({ searchTerm }: Props) {
  const { id: userId } = useUserStore();
  const {
    focusSkills,
    addFocusSkill,
    removeFocusSkill,
    getFocusSkills,
    getUserSkills,
  } = useSkillsStore();

  const queryClient = useQueryClient();
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const { data: { queryFocusSkills = [], skills = [] } = {}, isLoading } =
    useQuery({
      queryKey: ["focusData"],
      queryFn: async () => {
        if (!userId) return { queryFocusSkills: [], skills: [] };

        const [queryFocusSkills, skills] = await Promise.all([
          getFocusSkills(userId),
          getUserSkills(userId),
        ]);

        return { queryFocusSkills, skills };
      },
      enabled: !!userId,
      staleTime: 0,
      refetchOnWindowFocus: true,
    });

  const filteredSkills = skills.filter(
    (skill) =>
      skill.skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      Number(skill.progress) > 49
  );

  const handleSkillAction = useCallback(
    async (skillId: string, action: SkillAction) => {
      if (!userId || actionInProgress) {
        return;
      }

      setActionInProgress(skillId);
      const skillName =
        skills.find((s) => s.skillId === skillId)?.skill.name || "Навык";

      try {
        const actionFn = action === "remove" ? removeFocusSkill : addFocusSkill;
        await actionFn(skillId, userId);

        toast.success(
          `Навык "${skillName}" ${
            action === "remove" ? "удален из" : "добавлен в"
          } фокуса`,
          { position: "top-center", icon: action === "remove" ? "🗑️" : "🎯" }
        );

        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["focusData"],
          }),
          queryClient.invalidateQueries({
            queryKey: getQueryKey.focusSkills(userId),
          }),
          queryClient.invalidateQueries({
            queryKey: getQueryKey.userSkills(userId),
          }),
          queryClient.invalidateQueries({
            queryKey: getQueryKey.userRoadmaps(),
          }),
        ]);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";
        toast.error(`Ошибка: ${errorMessage}`, {
          position: "top-center",
          icon: "❌",
          duration: 3000,
        });
      } finally {
        setActionInProgress(null);
      }
    },
    [
      userId,
      actionInProgress,
      skills,
      removeFocusSkill,
      addFocusSkill,
      queryClient,
    ]
  );

  const content = useMemo(() => {
    if (isLoading) {
      return <FocusSkeleton />;
    }

    if (filteredSkills?.length === 0) {
      return (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400">
            {searchTerm ? "Ничего не найдено" : "Нет доступных навыков"}
          </p>
        </div>
      );
    }

    return (
      <>
        {filteredSkills.map((skill) => {
          const isFocusSkill = [
            ...(queryFocusSkills || []),
            ...focusSkills,
          ].some((s) => s.skillId === skill.skillId);

          const isProcessing = actionInProgress === skill.skillId;

          return (
            <div
              key={`${skill.skillId}-${isFocusSkill ? "focus" : "user"}`}
              className="flex justify-between items-center text-white"
            >
              <div className="flex items-center gap-[10px]">
                <Image
                  src="/HomePage/ponchik.svg"
                  alt=""
                  width={14}
                  height={14}
                />
                <p>{skill.skill.name}</p>
              </div>
              <button
                onClick={() =>
                  handleSkillAction(
                    skill.skillId,
                    isFocusSkill ? "remove" : "add"
                  )
                }
                disabled={!!actionInProgress}
                className={`h-[30px] w-[150px] text-sm rounded-[20px] shadow-outset hover:opacity-90 cursor-pointer transition-all ${
                  isFocusSkill
                    ? "bg-[#B94A4A] hover:bg-[#9C3C3C]"
                    : "bg-[#60519B] hover:bg-[#403572]"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isProcessing
                  ? "Загрузка..."
                  : isFocusSkill
                  ? "Удалить"
                  : "Добавить"}
              </button>
            </div>
          );
        })}
      </>
    );
  }, [
    isLoading,
    filteredSkills,
    focusSkills,
    searchTerm,
    queryFocusSkills,
    actionInProgress,
    handleSkillAction,
  ]);

  return content;
}

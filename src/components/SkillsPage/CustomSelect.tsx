"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { DEFAULT_OPTION, FOCUS_OPTION } from "@/constants/skillsPage";
import { useRoadmapsStore } from "@/store/roadmapsStore";
import { useSkillsStore } from "@/store/skillsStore";
import { RoadmapOption } from "@/interfaces/interfaces";

export function CustomSelect() {
  const { userRoadmaps } = useRoadmapsStore();
  const { focusSkills, selectedRoadmap, setSelectedRoadmap } = useSkillsStore();
  const [isOpen, setIsOpen] = useState(false);

  const transformedRoadmaps = useMemo(() => {
    return userRoadmaps.map((roadmap) => ({
      roadmapId: roadmap.roadmapId,
      title: roadmap.roadmap.title,
      complexity: roadmap.roadmap.complexity,
      color: roadmap.roadmap.color,
      stages: roadmap.roadmap.stages,
      technologies: roadmap.roadmap.technologies,
      progress: roadmap.progress,
    }));
  }, [userRoadmaps]);

  const allOptions = useMemo(() => {
    return [DEFAULT_OPTION, FOCUS_OPTION, ...transformedRoadmaps];
  }, [transformedRoadmaps]);

  const displayValue = selectedRoadmap || DEFAULT_OPTION;

  const handleSelect = async (option: RoadmapOption) => {
    setSelectedRoadmap(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <m.div
        className="bg-[#31323E] rounded-[20px] py-5 px-10 shadow-outset w-full outline-none text-[22px] text-white cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        <span>{displayValue.title}</span>
        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <Image
            src="/SkillsPage/select-arrow.svg"
            alt="Dropdown arrow"
            width={36}
            height={18}
          />
        </m.div>
      </m.div>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 w-full bg-[#31323E] rounded-[20px] shadow-outset overflow-hidden z-10 mt-[10px]"
          >
            {allOptions.map((option, index) => (
              <m.div
                key={`${option.roadmapId}-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className={`py-3 px-10 text-[22px] text-white cursor-pointer transition-colors ${
                  option.roadmapId === displayValue.roadmapId
                    ? "bg-[#60519B]"
                    : "hover:bg-[#4A4B5A]"
                }`}
                onClick={() => handleSelect(option)}
              >
                <m.p whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  {option.title}
                  {option.roadmapId === FOCUS_OPTION.roadmapId && (
                    <span className="ml-2 text-sm text-purple-300">
                      ({focusSkills.length})
                    </span>
                  )}
                </m.p>
              </m.div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

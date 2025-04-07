"use client";

import { useState } from "react";
import { SkillsList } from "./SkillsList";
import Image from "next/image";

export default function SkillsContent() {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="bg-[#31323E] rounded-[20px] py-[25px] shadow-outset w-full h-[380px] overflow-hidden">
      <div className="flex items-center justify-between text-[22px] text-white font-medium mb-[25px] pl-10 pr-[50px]">
        <span>Навык</span>
        <div
          className="w-[200px] text-center flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleSort}
        >
          <span>Прогресс</span>
          <Image
            src="/SkillsPage/arrow-top-right.svg"
            alt=""
            width={16}
            height={16}
            className={`transition-transform mt-[3px] ${
              sortDirection === "asc" ? "" : "rotate-90"
            }`}
          />
        </div>
      </div>
      <SkillsList sortDirection={sortDirection} />
    </div>
  );
}

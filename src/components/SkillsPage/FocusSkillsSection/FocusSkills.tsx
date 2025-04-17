"use client";

import { useState } from "react";
import Image from "next/image";
import FocusContent from "./FocusContent";

export default function FocusSkills() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="flex flex-col gap-[25px]">
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-[25px] rounded-[20px] bg-[#31323E] text-[20px] text-white placeholder-[#BFC0D1] outline-none h-[70px] shadow-outset pr-[70px]"
          placeholder="Поиск навыков..."
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
          <FocusContent searchTerm={searchTerm} />
        </div>
      </div>
    </section>
  );
}

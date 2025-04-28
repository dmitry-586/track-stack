"use client";

import { useRoadmapsStore } from "@/store/roadmapsStore";

export default function InProgress() {
  const { toggleVisibility, selectedRoadmap } = useRoadmapsStore();

  return (
    <section className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[500px] h-[200px] bg-[#31323E] rounded-[20px]">
        <p className="text-[22px] mb-8 text-center">
          Roadmap - &#8221;{selectedRoadmap?.title}&#8221; <br /> еще
          разрабатывается
        </p>

        <button
          onClick={() => toggleVisibility(false)}
          className="w-[350px] h-[60px] bg-[#60519B] rounded-[20px] cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Вернуться к списку roadmaps
        </button>
      </div>
    </section>
  );
}

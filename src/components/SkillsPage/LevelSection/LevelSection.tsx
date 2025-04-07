"use client";

import { useEffect, useRef } from "react";

export function LevelSection() {
  const level = 10; 
  const progress = 80; 
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 40;
      const offset = circumference - (progress / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [progress]);

  return (
    <section className="bg-[#31323E] rounded-[20px] p-5 shadow-outset w-full h-[210px] flex justify-between">
      <div className="flex flex-col justify-between h-full">
        <h3 className="text-2xl font-medium">Уровень</h3>
        <div className="flex flex-col gap-1 items-center w-fit">
          <p className="text-sm">Прогресс уровня:</p>
          <div className="flex gap-1 text-[#45A54E] items-center">
            <span className="text-[32px] font-medium">{progress}</span>
            <span className="text-2xl">%</span>
          </div>
        </div>

        <p className="text-sm text-[#BFC0D1] leading-snug">
          Вы на правильном пути!
          <br />
          Осталось немного!
        </p>
      </div>

      <div className="relative flex items-center justify-center w-32 h-32 my-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Фоновый круг */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#60519B"
            strokeWidth="10"
          />
          {/* Прогресс */}
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#45A54E"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={2 * Math.PI * 40}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="absolute text-3xl font-medium">{level}</span>
      </div>
    </section>
  );
}

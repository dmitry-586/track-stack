import React from "react";

const FocusSkeleton = () => {
  return (
    <div className="flex flex-col gap-[20px] overflow-hidden">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between text-[18px] text-white"
        >
          <div className="flex items-center gap-[10px]">
            <div className="w-4 h-4 bg-[#4A4B5A] rounded animate-pulse" />
            <div className="w-30 h-5 bg-[#4A4B5A] rounded animate-pulse" />
          </div>
          <div className="w-[150px] h-[30px] bg-[#4A4B5A] rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default FocusSkeleton;

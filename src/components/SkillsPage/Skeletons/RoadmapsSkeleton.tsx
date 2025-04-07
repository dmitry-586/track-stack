export function RoadmapsSkeleton() {
  return (
    <div className="flex flex-col gap-[20px] overflow-hidden">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between text-[18px] text-white pl-10 pr-[40px]"
        >
          <div className="flex items-center gap-[10px]">
            <div className="w-4 h-4 bg-[#4A4B5A] rounded animate-pulse" />
            <div className="w-40 h-5 bg-[#4A4B5A] rounded animate-pulse" />
          </div>
          <div className="w-16 h-6 bg-[#4A4B5A] rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

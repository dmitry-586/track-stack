"use client";

import { CustomSelect } from "../../components/SkillsPage/CustomSelect";
import SkillsContent from "@/components/SkillsPage/SkillsTable/SkillsTable";
import RoadmapsTable from "@/components/SkillsPage/RoadmapsTable/RoadmapsTable";
import SkillsSearch from "@/components/SkillsPage/SearchSection/SkillsSearch";
import { LevelSection } from "@/components/SkillsPage/LevelSection/LevelSection";

export default function SkillsPage() {
  return (
    <section className="flex gap-10 py-10 px-[60px] w-full">
      <div className="flex flex-1 flex-col gap-[30px] max-w-[550px]">
        <CustomSelect />
        <SkillsContent />
        <RoadmapsTable />
      </div>
      <div className="flex flex-1 flex-col gap-[30px] max-w-[470px]">
        <SkillsSearch />
        <LevelSection />
      </div>
    </section>
  );
}

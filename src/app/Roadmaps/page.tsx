import RoadmapCard from "@/components/RoadmapsPage/RoadmapCard";

export default function page() {
  return (
    <section className="px-[60px] py-10">
      <div className="grid grid-cols-2 gap-10">
        <RoadmapCard
          title="Frontend-разработчик"
          complexity="подходит для новичков"
          stages={10}
          technologies="HTML - CSS - JS - REACT - TS - NEXT"
          color="#45A54E"
        />
        <RoadmapCard
          title="Backend-разработчик JS"
          complexity="требует опыта"
          stages={12}
          technologies="JS - Node - Express - Nest - PostgreSQL"
          color="#BE9244"
        />
        <RoadmapCard
          title="Data Science"
          complexity="для уверенных разработчиков"
          stages={17}
          technologies="Python - Pandas - Matplotlib - TensorFlow - SQL"
          color="#B94A4A"
        />
        <RoadmapCard
          title="RUST-разработчик"
          complexity="экспертный уровень"
          stages={11}
          technologies="Rust - Ownership - WebAssembly - Blockchain"
          color="#6A4CE0"
        />
      </div>
    </section>
  );
}

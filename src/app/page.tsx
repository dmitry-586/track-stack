import Image from "next/image";
import Link from "next/link";

const ROADMAPS = [
  "Frontend-разработчик",
  "Backend-разработчик",
  "Искусственный интеллект",
  "Облачные технологии и DevOps",
  "Data Science (Аналитика данных)",
];

export default function Home() {
  return (
    <section className="flex text-[#1E202C] py-10 px-[60px] w-full gap-[60px]">
      <div>
        <h1 className="text-[40px] font-medium">Построй свой путь в IT</h1>
        <h2 className="text-[18px] mt-2">СТАНЬ ВОСТРЕБОВАННЫМ РАЗРАБОТЧИКОМ</h2>
        <div className="flex gap-[25px] mt-10">
          <Button href="/Skills">Начать сейчас</Button>
          <Button href="/Roadmaps">Выбрать путь</Button>
        </div>
        <div className="bg-[#31323E] rounded-[20px] w-full px-10 py-[25px] mt-[60px] shadow-outset">
          <p className="text-[22px] text-white font-medium">
            Популярные roadmap:
          </p>
          <ul className="flex flex-col gap-[25px] mt-[25px]">
            {ROADMAPS.map((roadmap) => (
              <RoadmapItem key={roadmap} text={roadmap} />
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-[#31323E] rounded-[20px] w-full px-10 py-[25px] shadow-outset">
        <h3 className="text-[30px] text-[#BFC0D1] text-center font-medium">
          КРАТКИЙ ГАЙД
        </h3>
      </div>
    </section>
  );
}

const RoadmapItem = ({ text }: { text: string }) => (
  <li className="flex gap-[10px] text-[18px] text-white">
    <Image src="/HomePage/ponchik.svg" alt="" width={14} height={14} />
    {text}
  </li>
);

const Button = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <Link href={href}>
    <button className="w-[210px] h-[60px] bg-[#60519B] rounded-[20px] text-[20px] text-white font-medium shadow-outset hover:bg-[#403572] cursor-pointer transition-all duration-250 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center">
      {children}
    </button>
  </Link>
);

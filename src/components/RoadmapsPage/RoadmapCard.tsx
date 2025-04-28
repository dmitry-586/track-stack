import Link from 'next/link'

interface RoadmapCardProps {
	title: string
	complexity?: string
	stages?: number
	technologies?: string
	color?: string
}

export default function RoadmapCard({
	title,
	complexity,
	stages,
	technologies,
	color,
}: RoadmapCardProps) {
	return (
		<div className='bg-[#31323E] rounded-[20px] pt-[25px] px-[30px] pb-[20px] flex flex-col gap-[20px] w-[490px] h-[310px] relative shadow-outset'>
			<h2 className='text-[32px] font-medium'>{title}</h2>
			<span
				style={{ backgroundColor: color }}
				className='size-4 rounded-full absolute top-[20px] right-[20px]'
			/>
			<div className='flex gap-[15px] text-[18px]'>
				<p className='text-[#BFC0D1]'>Сложность:</p>
				<p>{complexity}</p>
			</div>
			<div className='flex gap-[15px] text-[18px]'>
				<p className='text-[#BFC0D1]'>Этапов:</p>
				<p>{stages}</p>
			</div>
			<div className='flex flex-col gap-[15px] text-[18px]'>
				<p className='text-[#BFC0D1]'>Основные технологии:</p>
				<p>{technologies}</p>
			</div>
			<div className='flex justify-between mt-auto'>
				<Link
					href='/Roadmaps/FrontendRoadmap'
					className='text-[#BFC0D1] text-[18px] cursor-pointer'
				>
					Подробнее...
				</Link>
				<button className='text-[#9884E6] text-[18px] cursor-pointer'>
					Добавить в изучение
				</button>
			</div>
		</div>
	)
}

'use client'

import Image from 'next/image'
import { useState } from 'react'

interface RoadmapBlock {
	title: string
	items: RoadmapItem[]
}

interface RoadmapItem {
	text: string
	checked: boolean
}

export default function FrontendRoadmapPage() {
	const [blocks, setBlocks] = useState<RoadmapBlock[]>([
		{
			title: 'HTML',
			items: [
				{ text: 'Основные теги', checked: true },
				{ text: 'Списки, таблицы, формы', checked: false },
				{ text: 'Семантическая верстка', checked: false },
			],
		},
		{
			title: 'CSS',
			items: [
				{ text: 'Селекторы и свойства', checked: true },
				{ text: 'Позиционирование', checked: false },
				{ text: 'Простые анимации', checked: false },
			],
		},
		{
			title: 'Инструменты',
			items: [
				{ text: 'Работа с VS Code', checked: true },
				{ text: 'DevTools браузера (Console, Elements)', checked: true },
				{ text: 'Основы Git (git init, git commit, GitHub)', checked: false },
			],
		},
	])

	const handleToggleCheck = (blockIndex: number, itemIndex: number) => {
		setBlocks(prev =>
			prev.map((block, bIdx) => {
				if (bIdx !== blockIndex) return block
				return {
					...block,
					items: block.items.map((item, iIdx) =>
						iIdx === itemIndex ? { ...item, checked: !item.checked } : item
					),
				}
			})
		)
	}

	return (
		<section className='px-[60px] py-10'>
			<header className='flex justify-between'>
				<div className='bg-[#31323E] rounded-[20px] shadow-outset flex justify-center items-center h-[70px] w-fit px-10'>
					<h2 className='text-[24px] font-medium'>Frontend Roadmap</h2>
				</div>
				<div className='flex gap-5 items-center'>
					<button
						onClick={() => console.log('Назад')} // Замените на свою логику
						className='size-[50px] bg-[#60519B] rounded-full flex justify-center items-center cursor-pointer shadow-outset'
					>
						<Image
							src='/NavMenu/roadmaps.svg'
							alt='icon'
							width={25}
							height={25}
						/>
					</button>
					<div className='bg-[#31323E] rounded-[20px] shadow-outset flex justify-center items-center gap-2 h-[70px] w-[250px]'>
						<h2 className='text-[20px] font-medium'>Уровень: </h2>
						<h2 className='text-[24px] font-medium text-[#9884E6]'>trainee</h2>
					</div>
				</div>
			</header>

			<main className='mt-10 flex gap-[15px] flex-wrap'>
				{blocks.map((block, blockIndex) => (
					<div key={blockIndex} className='flex items-center gap-[15px]'>
						<div className='bg-[#31323E] rounded-[20px] h-[250px] w-[280px] shadow-outset p-5'>
							<h3 className='text-[24px] font-medium mb-4'>{block.title}</h3>
							<ul className='space-y-3'>
								{block.items.map((item, itemIndex) => (
									<li
										key={itemIndex}
										className='flex items-center gap-2 text-[18px]'
									>
										<input
											type='checkbox'
											checked={item.checked}
											onChange={() => handleToggleCheck(blockIndex, itemIndex)}
											className='custom-checkbox'
										/>
										<span
											className={item.checked ? 'line-through opacity-50' : ''}
										>
											{item.text}
										</span>
									</li>
								))}
							</ul>
						</div>
						{blockIndex < blocks.length - 1 && (
							<Image
								src='/RoadmapPage/arrow.svg'
								alt='arrow'
								width={50}
								height={50}
								className='hidden lg:block'
							/>
						)}
					</div>
				))}
			</main>
		</section>
	)
}

'use client';
import React, { useState } from 'react';

export interface ScreenshotItem {
	src: string;
	alt: string;
	type?: 'image' | 'video'; // Defaults to image if not provided
}

interface CarouselProps {
	items: ScreenshotItem[];
}

export const Carousel = ({ items }: CarouselProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handlePrev = () => {
		setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
	};

	return (
		<div
			className="relative mt-6"
			role="region"
			aria-roledescription="carousel"
		>
			<div className="overflow-hidden">
				<div
					className="flex -ml-4 transition-transform duration-500"
					style={{
						transform: `translate3d(${-currentSlide * 100}%, 0px, 0px)`,
					}}
				>
					{items.map((item, index) => (
						<div
							key={item.src + index}
							role="group"
							aria-roledescription="slide"
							className="min-w-0 shrink-0 grow-0 basis-full pl-4"
						>
							<div className="group relative">
								<div className="block outline-none ring-inset ring-blue-500 focus-visible:ring static aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-zinc-700">
									<div className="relative size-full">
										{item.type === 'video' ? (
											<video
												src={item.src}
												controls
												autoPlay
												playsInline
												preload="metadata"
												className="w-full h-full object-cover rounded-2xl"
											>
												Your browser does not support the video tag.
											</video>
										) : (
											<img
												alt={item.alt}
												className="relative w-full h-full object-cover rounded-2xl"
												src={item.src}
											/>
										)}
									</div>
								</div>

								<div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-white via-white/75 to-transparent dark:from-zinc-900 dark:via-zinc-900/75" />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Navigation Buttons */}
			<div className="flex items-center justify-center gap-3 sm:gap-6 absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-neutral-800/10 dark:border-zinc-700 bg-white dark:bg-zinc-800 sm:bottom-6">
				<button
					className="cursor-pointer rounded-full p-2 hover:bg-neutral-50 dark:hover:bg-zinc-700"
					onClick={handlePrev}
				>
					<svg
						className="h-4 w-4"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							d="M15 18l-6-6 6-6"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<div className="flex items-center gap-1">
					{items.map((_, index) => (
						<button
							key={index}
							className="rounded-full p-0.5 sm:p-1.5"
							onClick={() => setCurrentSlide(index)}
						>
							<div
								className={`relative isolate h-1.5 overflow-hidden rounded-full transition-all ${
									currentSlide === index
										? 'w-6 bg-black dark:bg-zinc-100'
										: 'w-1.5 bg-black/20 dark:bg-zinc-600'
								}`}
							/>
						</button>
					))}
				</div>
				<button
					className="cursor-pointer rounded-full p-2 hover:bg-neutral-50 dark:hover:bg-zinc-700"
					onClick={handleNext}
				>
					<svg
						className="h-4 w-4"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							d="M9 6l6 6-6 6"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};
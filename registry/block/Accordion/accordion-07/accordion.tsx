'use client';
import {
	User,
	BookOpen,
	GraduationCap,
	Users,
	ChevronDown,
} from 'lucide-react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const accordionItems = [
	{
		value: 'about',
		title: 'About me',
		icon: <User className="h-6 w-6 text-purple-700 p-[0.5px] rounded-md" />,
		content:
			'I am a passionate developer with experience in web development and design. My focus is on creating beautiful, functional interfaces with modern technologies.',
	},
	{
		value: 'portfolio',
		title: 'Portfolio',
		icon: <BookOpen className="h-6 w-6 text-green-700 p-[0.5px] rounded-md" />,
		content:
			'Check out my latest projects and case studies showcasing my skills in React, Next.js, and modern UI design principles.',
	},
	{
		value: 'courses',
		title: 'Courses',
		icon: (
			<GraduationCap className="h-6 w-6 text-red-700 p-[0.5px] rounded-md" />
		),
		content:
			"Explore the courses I've created to help others learn web development, covering everything from fundamentals to advanced techniques.",
	},
	{
		value: 'social',
		title: 'Social Media',
		icon: <Users className="h-6 w-6 text-sky-500 p-[0.5px] rounded-md" />,
		content:
			'Connect with me on Twitter, GitHub, and LinkedIn to stay updated with my latest work and insights.',
	},
];

export default function AccordionComponent7() {
	return (
		<main className="flex min-h-screen w-full items-center justify-center p-4 md:p-8">
			<div className="w-full max-w-2xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold dark:text-zinc-100">
						My Developer Profile
					</h1>
					<p className="mt-2 text-muted-foreground">
						Explore my skills, projects, and online presence
					</p>
				</div>

				<Accordion
					type="single"
					collapsible
					className="w-full space-y-4"
				>
					{accordionItems.map((item) => (
						<AccordionItem
							key={item.value}
							value={item.value}
							className={cn(
								'group overflow-hidden rounded-xl border transition-all duration-300',
								'bg-[#ffff] hover:bg-gray-50/70 hover:shadow-md',
								'border border-gray-300 shadow-zinc-900',
								'dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-800/40',
								'data-[state=open]:border-gray-400/50 data-[state=open]:shadow-md',
								'data-[state=open]:shadow-[0_4px_5px_0_rgba(0,0,0,0.47)] data-[state=open]:bg-zinc-50/70'
							)}
						>
							<AccordionTrigger
								className={cn(
									'px-6 py-4 hover:no-underline transition-colors',
									'flex items-center justify-between w-full',
									'text-left font-medium text-foreground',
									'[&>svg]:hidden'
								)}
							>
								<div className="flex items-center space-x-4">
									<span
										className={cn('p-2 ', 'transition-colors duration-300')}
									>
										{item.icon}
									</span>
									<span className="text-lg text-gray-900 dark:text-zinc-50">
										{item.title}
									</span>
								</div>
								<div
									className={cn(
										'h-6 w-6 flex items-center justify-center rounded-full',
										'bg-zinc-300/80 text-gray-800 ',
										'dark:bg-zinc-600/80 dark:text-zinc-100',
										'dark:group-hover:bg-zinc-700/60',
										'transition-all duration-300',
										'group-data-[state=open]:rotate-180'
									)}
								>
									<ChevronDown className="h-4 w-4" />
								</div>
							</AccordionTrigger>
							<AccordionContent
								className={cn(
									'px-6 pb-6 pt-2 text-gray-800 dark:text-zinc-200',
									'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden'
								)}
							>
								<p className="leading-relaxed">{item.content}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</main>
	);
}

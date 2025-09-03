'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs';
import { ChevronDown } from 'lucide-react';

const accordionItems = [
	{
		value: 'basic',
		title: 'Basic Accordion',
		subtitle: 'Default blue variant with no icon',
		icon: null,
	},
	{
		value: 'github',
		title: 'GitHub',
		subtitle: 'Connect with developers',
		icon: <BsGithub className="h-5 w-5 text-gray-600 dark:text-gray-50" />,
	},
	{
		value: 'twitter',
		title: 'Twitter',
		subtitle: 'Share your thoughts',
		icon: <BsTwitter className="h-5 w-5 text-sky-500 dark:text-sky-500" />,
	},
	{
		value: 'discord',
		title: 'Discord',
		subtitle: 'Join our community',
		icon: <BsDiscord className="h-5 w-5 text-blue-900 dark:text-blue-900" />,
	},
];

export default function AccordionComponent8() {
	return (
		<div className="w-full max-w-md mx-auto p-6">
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
							'rounded-2xl border border-zinc-200 bg-white overflow-hidden',
							'dark:border-zinc-700 dark:bg-zinc-800',
							'transition-all duration-200 hover:shadow-md',
							'dark:hover:shadow-zinc-800/80 dark:shadow-zinc-800/80'
						)}
					>
						<AccordionTrigger
							className={cn(
								'px-6 py-4 hover:no-underline',
								'flex items-center justify-between w-full',
								'group',
								'[&>svg]:hidden'
							)}
						>
							<div className="flex items-center gap-4">
								{item.icon && (
									<div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-600">
										{item.icon}
									</div>
								)}
								<div className="flex flex-col items-start">
									<span className="text-base font-medium text-gray-900 dark:text-zinc-100">
										{item.title}
									</span>
									<span className="text-sm text-gray-500 dark:text-zinc-400">
										{item.subtitle}
									</span>
								</div>
							</div>
							<div
								className={cn(
									'ml-4 h-6 w-6 flex items-center justify-center rounded-full',
									'bg-gray-100 text-gray-600',
									'dark:bg-zinc-700 dark:text-zinc-300',
									'group-hover:bg-gray-200 dark:group-hover:bg-zinc-600',
									'transition-all duration-200'
								)}
							>
								<ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
							</div>
						</AccordionTrigger>
						<AccordionContent className="px-6 pb-4">
							<p className="text-gray-600 dark:text-zinc-300">
								This is the content for {item.title}. You can customize this
								content based on your needs.
							</p>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}

import React from 'react';
import { Plus, Minus } from 'lucide-react';
import {
	Accordion,
	AccordionItem as ShadAccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/accordion';

// Define accordion items data with content as arrays for numbered steps
const accordionItems = [
	{
		id: 'item-1',
		title: 'Web Browser',
		content: [
			'Download the app from the App Store or Google Play.',
			'Open the app and tap Sign up.',
			'Choose your target language and current proficiency level.',
			'Select a subscription plan.',
			'Sign in with your Apple or Google account.',
		],
	},
	{
		id: 'item-2',
		title: 'Mobile App',
		content: [
			'Download from App Store or Google Play.',
			'Open the app.',
			'Tap "Sign Up".',
			'Enter your information.',
			'Confirm your account.',
		],
	},
	{
		id: 'item-3',
		title: 'Tablet Devices',
		content: [
			"Get the app from your tablet's store.",
			'Launch the application.',
			'Select "Create Account".',
			'Complete the registration form.',
		],
	},
	{
		id: 'item-4',
		title: 'Smart TV',
		content: [
			'Find our app in the TV app store.',
			'Install the application.',
			'Open and choose "Sign Up".',
			'Follow on-screen instructions.',
		],
	},
];

// Accordion Item Component
const AccordionItem = ({
	id,
	title,
	content,
}: {
	id: string;
	title: string;
	content: string[];
}) => (
	<ShadAccordionItem
		value={id}
		data-orientation="vertical"
		className="border-none group transition-colors duration-200 hover:text-neutral-950 hover:shadow-none data-[state=open]:text-neutral-950 data-[state=open]:shadow-none"
	>
		<AccordionTrigger
			className="group flex w-full items-center justify-between gap-2.5 text-left [&>svg]:hidden"
			data-radix-collection-item
		>
			<div className="relative z-10 flex items-center">
				<div
					className="relative flex shrink-0 items-center justify-center outline-none transition duration-200 ease-out disabled:pointer-events-none disabled:border-transparent disabled:bg-transparent disabled:text-neutral-300 disabled:shadow-none focus:outline-none border border-neutral-200 dark:border-neutral-600 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:border-transparent dark:group-hover:border-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 hover:shadow-none focus-visible:border-transparent focus-visible:bg-neutral-950 focus-visible:text-neutral-0 focus-visible:shadow-none rounded-full w-5 h-5"
					data-hover="true"
				>
					<div className="group-data-[state=open]:hidden">
						<Plus className="h-4 w-4 group-hover:text-neutral-950 dark:group-hover:text-neutral-50" />
					</div>
					<div className="hidden group-data-[state=open]:block">
						<Minus className="h-4 w-4 group-hover:text-neutral-950 dark:group-hover:text-neutral-50" />
					</div>
				</div>
			</div>
			<div className="flex w-full items-center">
				<span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 group-data-[state=open]:text-neutral-950 dark:group-data-[state=open]:text-neutral-50">
					{title}
				</span>
			</div>
		</AccordionTrigger>
		<AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden pl-8">
			<div className="pt-4">
				<ol className="space-y-3">
					{content.map((step, index) => (
						<li
							key={index}
							className="flex items-center gap-2 break-words text-sm font-medium text-neutral-600 dark:text-neutral-400"
						>
							<div className="relative flex shrink-0 items-center justify-center outline-none transition duration-200 ease-out disabled:pointer-events-none disabled:border-transparent disabled:bg-transparent disabled:text-neutral-300 disabled:shadow-none focus:outline-none hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-950 dark:hover:text-neutral-50 focus-visible:bg-blue-500 focus-visible:text-white rounded-full h-5 w-5 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 select-none">
								{index + 1}
							</div>
							<span>{step}</span>
						</li>
					))}
				</ol>
			</div>
		</AccordionContent>
		<div
			className="relative h-0 w-full text-neutral-200 dark:text-neutral-700"
			role="separator"
		>
			<div
				className="absolute left-0 h-px w-full"
				style={{
					background:
						'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat',
				}}
			></div>
		</div>
	</ShadAccordionItem>
);

// Main Accordion Component
const AccordionComponent2 = () => {
	return (
		<div className="themes-wrapper bg-[#ffffff] dark:bg-zinc-950 py-4 min-h-screen px-4 flex items-center justify-center rounded-lg">
			<div className="w-[448px]">
				<Accordion
					type="multiple"
					className="w-full"
					data-orientation="vertical"
				>
					<div>
						<h2 className="mb-1 text-md font-medium text-neutral-950 dark:text-neutral-50">
							How to sign up for the app?
						</h2>
						<p className="pb-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
							Follow the steps for your preferred device below.
						</p>
						<div className="w-full pl-1">
							{accordionItems.map((item) => (
								<AccordionItem
									key={item.id}
									id={item.id}
									title={item.title}
									content={item.content}
								/>
							))}
						</div>
					</div>
				</Accordion>
			</div>
		</div>
	);
};

export default AccordionComponent2;

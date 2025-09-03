'use client';

import * as React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus, Minus } from 'lucide-react';

const accordionData = [
	{
		id: 'item-1',
		question: 'What payment methods do you accept?',
		answer:
			'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All transactions are securely processed through our payment gateway.',
	},
	{
		id: 'item-2',
		question: 'How can I track my order?',
		answer:
			"Once your order ships, you'll receive a tracking number via email. You can use this number on our website or the carrier's website to track your package in real-time.",
	},
	{
		id: 'item-3',
		question: 'What is your return policy?',
		answer:
			'We offer a 30-day money-back guarantee on all products. Items must be unused and in their original packaging. Please contact our support team to initiate a return.',
	},
	{
		id: 'item-4',
		question: 'Do you offer international shipping?',
		answer:
			"Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. You'll see the exact costs during checkout before completing your purchase.",
	},
	{
		id: 'item-5',
		question: 'How do I contact customer support?',
		answer:
			'Our support team is available 24/7 via email at support@mintlify.com or through the live chat feature on our website. Average response time is under 2 hours during business days.',
	},
];

export default function AccordionComponent6() {
	return (
		<main className="min-h-screen max-w-3xl w-full p-4 flex flex-col items-center justify-center md:p-8">
			<div className="max-w-md w-full mx-auto">
				<div className="shadow-md backdrop-blur-lg bg-[#ffff] dark:bg-zinc-800 border border-dashed border-white/40 dark:border-zinc-400/40 rounded-lg p-4">
					<h4 className="text-xl text-center font-semibold mb-6 text-zinc-800 dark:text-zinc-100">
						Frequently Asked Questions
					</h4>
					<Accordion
						type="single"
						collapsible
						className="w-full"
					>
						{accordionData.map((item) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								className="group border-none"
							>
								<AccordionTrigger className="flex items-center justify-between py-5 px-6 text-md text-black dark:text-zinc-100 transition-all [&>svg]:hidden">
									{item.question}
									<div className="transition-transform duration-300 ease-in-out">
										<Plus className="h-6 w-6 text-black dark:text-zinc-100 group-data-[state=open]:hidden transition-transform duration-200" />
										<Minus className="h-6 w-6 text-black dark:text-zinc-100 hidden group-data-[state=open]:block transition-transform duration-200" />
									</div>
								</AccordionTrigger>
								{item.answer && (
									<AccordionContent className="overflow-hidden text-black dark:text-zinc-200 px-6">
										<p className="text-black dark:text-zinc-200 text-sm">
											{item.answer}
										</p>
									</AccordionContent>
								)}
								<div className="h-px bg-gray-900/30 dark:bg-zinc-600/30 mx-6"></div>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</main>
	);
}

'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function RadioButton09() {
	const [selected, setSelected] = useState('performance');

	const featureOptions = [
		{
			id: 'performance',
			title: 'Performance Boost',
			description: 'Optimize your system for maximum speed',
		},
		{
			id: 'security',
			title: 'Security Package',
			description: 'Advanced protection for your data',
		},
		{
			id: 'global',
			title: 'Global Network',
			description: 'Connect to servers worldwide',
		},
	];

	const handleSelection = (value: string) => {
		setSelected(value);
	};

	return (
		<Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg dark:bg-zinc-950 border-0">
			<div className="text-center space-y-2">
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
					System Enhancements
				</h3>
				<p className="text-gray-500 dark:text-gray-400">
					Select your preferred feature package
				</p>
			</div>

			<RadioGroup
				value={selected}
				onValueChange={handleSelection}
				className="space-y-3"
			>
				{featureOptions.map((option) => (
					<Label
						key={option.id}
						htmlFor={option.id}
						className={cn(
							'relative flex items-center gap-4 rounded-xl p-4 cursor-pointer transition-all',
							'hover:bg-gray-100 dark:hover:bg-zinc-800',
							selected === option.id
								? 'bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600'
								: 'border border-gray-200 dark:border-zinc-700'
						)}
					>
						<div className="flex-1 flex flex-col">
							<span className="font-medium text-gray-900 dark:text-white">
								{option.title}
							</span>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								{option.description}
							</span>
						</div>

						{/* Actual radio input (visually hidden but still clickable) */}
						<RadioGroupItem
							id={option.id}
							value={option.id}
							className="hidden"
						/>

						{/* Custom Circle */}
						<div className="w-5 h-5 flex items-center justify-center">
							<div
								className={cn(
									'w-4 h-4 rounded-full border-2',
									selected === option.id
										? 'bg-zinc-900 border-zinc-900  dark:bg-zinc-200 dark:border-zinc-200'
										: 'border-gray-400 dark:border-gray-600'
								)}
							></div>
						</div>
					</Label>
				))}
			</RadioGroup>

			<div className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
				<p>Processing may take a few seconds...</p>
			</div>
		</Card>
	);
}

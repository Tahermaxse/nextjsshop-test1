'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Sun } from 'lucide-react';

export default function RadioButton04() {
	const [value, setValue] = useState('light');

	const themeOptions = [
		{
			id: 'light',
			label: 'Light Mode',
			description: 'Bright interface for daylight use',
			preview: (
				<div className="w-full h-24 bg-white rounded shadow-sm mb-2 overflow-hidden">
					<div className="h-5 bg-gray-100 flex items-center px-2">
						<div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
						<div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
						<div className="w-2 h-2 rounded-full bg-gray-300"></div>
					</div>
					<div className="p-2">
						<div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
						<div className="w-2/3 h-3 bg-gray-200 rounded"></div>
					</div>
				</div>
			),
		},
		{
			id: 'dark',
			label: 'Dark Mode',
			description: 'Reduced eye strain in low light',
			preview: (
				<div className="w-full h-24 bg-zinc-900 rounded shadow-sm mb-2 overflow-hidden">
					<div className="h-5 bg-zinc-800 flex items-center px-2">
						<div className="w-2 h-2 rounded-full bg-zinc-600 mr-1"></div>
						<div className="w-2 h-2 rounded-full bg-zinc-600 mr-1"></div>
						<div className="w-2 h-2 rounded-full bg-zinc-600"></div>
					</div>
					<div className="p-2">
						<div className="w-full h-3 bg-zinc-700 rounded mb-1"></div>
						<div className="w-2/3 h-3 bg-zinc-700 rounded"></div>
					</div>
				</div>
			),
		},
		{
			id: 'system',
			label: 'System Preference',
			description: 'Follows your system settings',
			preview: (
				<div className="w-full h-24 flex rounded shadow-sm mb-2 overflow-hidden">
					<div className="w-1/2 h-full bg-white">
						<div className="h-5 bg-gray-100"></div>
						<div className="p-1">
							<div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
							<div className="w-1/2 h-2 bg-gray-200 rounded"></div>
						</div>
					</div>
					<div className="w-1/2 h-full bg-zinc-900">
						<div className="h-5 bg-zinc-800"></div>
						<div className="p-1">
							<div className="w-full h-2 bg-zinc-700 rounded mb-1"></div>
							<div className="w-1/2 h-2 bg-zinc-700 rounded"></div>
						</div>
					</div>
				</div>
			),
		},
	];

	return (
		<div className="max-w-lg w-full rounded-lg border shadow-sm overflow-hidden bg-white dark:bg-zinc-900 dark:border-zinc-800">
			<div className="p-5 flex items-center gap-4">
				<div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
					<Sun className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
				</div>
				<div>
					<h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
						Theme Preferences
					</h3>
					<p className="text-gray-500 dark:text-zinc-400">
						Customize your app's appearance
					</p>
				</div>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-5">
				<RadioGroup
					value={value}
					onValueChange={setValue}
					className="grid grid-cols-1 gap-3"
				>
					{themeOptions.map((option) => (
						<label
							key={option.id}
							htmlFor={option.id}
							className={cn(
								'relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all overflow-hidden h-48 cursor-pointer',
								value === option.id
									? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
									: 'border-gray-200 hover:border-gray-300 dark:border-zinc-700 dark:hover:border-zinc-600'
							)}
						>
							<div className="absolute top-3 left-3">
								<RadioGroupItem
									value={option.id}
									id={option.id}
									className="h-4 w-4 text-blue-600 border-2 dark:text-blue-400 dark:border-zinc-600"
								/>
							</div>
							<div className="w-full px-3 pt-6 flex flex-col items-center">
								{option.preview}
							</div>
							<span className="font-medium text-center text-zinc-900 dark:text-zinc-100">
								{option.label}
							</span>
							<p className="text-xs text-gray-500 dark:text-zinc-400 text-center">
								{option.description}
							</p>
						</label>
					))}
				</RadioGroup>
			</div>
		</div>
	);
}

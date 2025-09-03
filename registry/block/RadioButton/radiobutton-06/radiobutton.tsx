'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Globe, Search } from 'lucide-react';

const languages = [
	{
		value: 'en',
		label: 'English',
		flag: '🇺🇸',
		native: 'English',
		isNew: false,
	},
	{
		value: 'es',
		label: 'Spanish',
		flag: '🇪🇸',
		native: 'Español',
		isNew: false,
	},
	{
		value: 'fr',
		label: 'French',
		flag: '🇫🇷',
		native: 'Français',
		isNew: false,
	},
	{
		value: 'de',
		label: 'German',
		flag: '🇩🇪',
		native: 'Deutsch',
		isNew: false,
	},
	{
		value: 'ja',
		label: 'Japanese',
		flag: '🇯🇵',
		native: '日本語',
		isNew: true,
	},
	{
		value: 'zh',
		label: 'Chinese',
		flag: '🇨🇳',
		native: '中文',
		isNew: true,
	},
];

export default function RadioButton06() {
	const [value, setValue] = useState('en');
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredLanguages, setFilteredLanguages] = useState(languages);

	useEffect(() => {
		if (searchTerm === '') {
			setFilteredLanguages(languages);
		} else {
			setFilteredLanguages(
				languages.filter(
					(lang) =>
						lang.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
						lang.native.toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}
	}, [searchTerm]);

	return (
		<div className="rounded-lg max-w-md w-full border shadow-sm overflow-hidden bg-white dark:bg-zinc-950 dark:border-zinc-800">
			<div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
				<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
					<Globe className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-600 dark:text-zinc-400" />
				</div>
				<div>
					<h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100">
						Language Selection
					</h3>
					<p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400">
						Choose your preferred language
					</p>
				</div>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-4 sm:p-5">
				<div className="relative mb-3 sm:mb-4">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-zinc-500" />
					<input
						type="text"
						placeholder="Search languages..."
						className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:ring-blue-600 dark:focus:border-blue-600"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<RadioGroup
					value={value}
					onValueChange={setValue}
					className="space-y-2 sm:space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-none"
				>
					{filteredLanguages.map((language) => (
						<label
							key={language.value}
							htmlFor={language.value}
							className={cn(
								'flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer',
								'hover:border-gray-300 dark:hover:border-zinc-600',
								value === language.value
									? 'border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20'
									: 'border-gray-200 dark:border-zinc-700'
							)}
						>
							<RadioGroupItem
								value={language.value}
								id={language.value}
								className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 border-2 dark:text-blue-400 dark:border-zinc-600"
							/>
							<div className="text-xl mr-1">{language.flag}</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 flex-wrap">
									<span
										className={cn(
											'text-sm sm:text-base font-medium truncate',
											value === language.value
												? 'text-blue-600 dark:text-blue-400'
												: 'text-zinc-900 dark:text-zinc-100'
										)}
									>
										{language.label}
									</span>
									<span className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 whitespace-nowrap">
										({language.native})
									</span>
									{language.isNew && (
										<span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
											NEW
										</span>
									)}
								</div>
							</div>
						</label>
					))}
				</RadioGroup>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-4 sm:p-5">
				<Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700">
					Apply Language
				</Button>
			</div>
		</div>
	);
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Flag } from 'lucide-react';

export default function RadioButton07() {
	const [value, setValue] = useState('spam');

	const reportOptions = [
		{
			id: 'spam',
			label: 'Spam',
			description: 'Unsolicited or irrelevant content',
		},
		{
			id: 'harassment',
			label: 'Harassment',
			description: 'Persistent, unwanted, or offensive behavior',
		},
		{
			id: 'violation',
			label: 'Violation of Rules',
			description: 'Infringement of community guidelines or terms',
		},
	];

	return (
		<div className="rounded-lg border shadow-md overflow-hidden bg-white dark:bg-zinc-950 dark:border-zinc-800">
			<div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
				<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
					<Flag className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-600 dark:text-zinc-400" />
				</div>
				<div>
					<h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100">
						Report Message
					</h3>
					<p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400">
						Select the reason for reporting the message.
					</p>
				</div>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-4 sm:p-5">
				<RadioGroup
					value={value}
					onValueChange={setValue}
					className="space-y-3 sm:space-y-4"
				>
					{reportOptions.map((option) => (
						<label
							key={option.id}
							htmlFor={option.id}
							className={cn(
								'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
								'hover:bg-gray-50 dark:hover:bg-zinc-800',
								value === option.id && 'bg-blue-50 dark:bg-blue-900/20'
							)}
						>
							<RadioGroupItem
								value={option.id}
								id={option.id}
								className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 border-2 dark:text-blue-400 dark:border-zinc-600"
							/>
							<div className="flex-1">
								<span
									className={cn(
										'text-sm sm:text-base font-medium block',
										value === option.id
											? 'text-blue-600 dark:text-blue-400'
											: 'text-zinc-900 dark:text-zinc-100'
									)}
								>
									{option.label}
								</span>
								<p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
									{option.description}
								</p>
							</div>
						</label>
					))}
				</RadioGroup>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4">
				<Button
					variant="outline"
					className="flex-1 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
				>
					Cancel
				</Button>
				<Button className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700">
					Submit
				</Button>
			</div>
		</div>
	);
}

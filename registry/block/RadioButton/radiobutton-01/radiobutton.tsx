'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';

export default function RadioButton01() {
	const [value, setValue] = useState('important');

	const notificationOptions = [
		{
			id: 'all',
			title: 'All Notifications',
			description: 'Receive notifications for all activity',
		},
		{
			id: 'important',
			title: 'Important Only',
			description: 'Only receive important notifications',
		},
		{
			id: 'none',
			title: 'Disabled',
			description: 'Turn off all notifications',
		},
	];

	return (
		<div className="rounded-lg border shadow-sm overflow-hidden bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800">
			<div className="p-5 flex items-center gap-4">
				<div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
					<Bell className="h-6 w-6 text-zinc-700 dark:text-gray-400" />
				</div>
				<div>
					<h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
						Notification Preferences
					</h3>
					<p className="text-gray-500 dark:text-zinc-400">
						Control how and when you receive notifications
					</p>
				</div>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-5">
				<RadioGroup
					value={value}
					onValueChange={setValue}
					className="space-y-5"
				>
					{notificationOptions.map((option) => (
						<label
							key={option.id}
							htmlFor={option.id}
							className={cn(
								'flex flex-col rounded-lg border p-4 transition-all cursor-pointer',
								value === option.id
									? 'border-zinc-500 bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800/70'
									: 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
							)}
						>
							<div className="flex items-start gap-3">
								<RadioGroupItem
									value={option.id}
									id={option.id}
									className="mt-0.5 h-5 w-5 text-blue-600 border-2 dark:text-blue-400 dark:border-zinc-600"
								/>
								<div className="flex-1">
									<div
										className={cn(
											'text-base font-medium block',
											value === option.id
												? 'text-blue-600 dark:text-blue-400'
												: 'text-zinc-900 dark:text-zinc-100'
										)}
									>
										{option.title}
									</div>
									<p className="text-gray-500 text-sm mb-3 dark:text-zinc-400">
										{option.description}
									</p>
								</div>
							</div>
						</label>
					))}
				</RadioGroup>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-5">
				<Button className="w-full text-zinc-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700">
					Save Preferences
				</Button>
			</div>
		</div>
	);
}

'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell, Mail, MessageSquare, Smartphone, Calendar } from 'lucide-react';

const notificationOptions = [
	{
		id: 'work',
		label: 'Work Alerts',
		icon: <Mail className="h-5 w-5" />,
		description: 'Only work-related notifications',
		available: true,
		badge: 'Popular',
	},
	{
		id: 'personal',
		label: 'Personal Messages',
		icon: <MessageSquare className="h-5 w-5" />,
		description: 'Direct messages from contacts',
		available: true,
		badge: null,
	},
	{
		id: 'mobile',
		label: 'Mobile Push',
		icon: <Smartphone className="h-5 w-5" />,
		description: 'App notifications on your device',
		available: false,
		badge: 'Beta',
	},
	{
		id: 'events',
		label: 'Event Reminders',
		icon: <Calendar className="h-5 w-5" />,
		description: 'Calendar and meeting alerts',
		available: true,
		badge: 'New',
	},
];

const NotificationSettingsCard = () => {
	const [selected, setSelected] = useState('all');
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [enableSounds, setEnableSounds] = useState(true);

	const handleValueChange = (value: string) => {
		// Only allow selection of available options
		const selectedOption = notificationOptions.find((opt) => opt.id === value);
		if (selectedOption?.available) {
			setSelected(value);
		}
	};

	return (
		<Card className="w-full max-w-md rounded-2xl shadow-md border dark:border-zinc-700 dark:bg-zinc-900">
			<CardHeader className="flex flex-row items-center gap-3 pb-4 border-b dark:border-zinc-700">
				<div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
					<Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
				</div>
				<div>
					<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
						Notification Preferences
					</h3>
					<p className="text-sm text-zinc-500 dark:text-zinc-400">
						Customize your notification experience
					</p>
				</div>
			</CardHeader>

			<CardContent className="pt-4 space-y-3">
				<RadioGroup
					value={selected}
					onValueChange={handleValueChange}
					className="space-y-2"
				>
					{notificationOptions.map((option) => (
						<label
							key={option.id}
							htmlFor={option.id}
							className={cn(
								'flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer',
								selected === option.id
									? 'bg-blue-50 dark:bg-blue-900/20'
									: 'hover:bg-gray-50 dark:hover:bg-zinc-800',
								!option.available && 'opacity-70 cursor-not-allowed'
							)}
						>
							<div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
								{option.icon}
							</div>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<span
										className={cn(
											'font-medium',
											selected === option.id
												? 'text-blue-600 dark:text-blue-400'
												: 'text-zinc-900 dark:text-zinc-100',
											!option.available && 'text-gray-400 dark:text-zinc-500'
										)}
									>
										{option.label}
									</span>
									{option.badge && (
										<span
											className={cn(
												'text-xs px-2 py-0.5 rounded-full',
												option.badge === 'Popular'
													? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
													: option.badge === 'New'
														? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
														: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
											)}
										>
											{option.badge}
										</span>
									)}
								</div>
								<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
									{option.description}
								</p>
							</div>
							<RadioGroupItem
								value={option.id}
								id={option.id}
								disabled={!option.available}
								className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-400"
							/>
						</label>
					))}
				</RadioGroup>

				<div className="pt-4 space-y-3">
					<div className="flex items-center justify-between p-3">
						<Label
							htmlFor="sounds"
							className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
						>
							Enable notification sounds
						</Label>
						<Checkbox
							id="sounds"
							checked={enableSounds}
							onCheckedChange={(checked) => setEnableSounds(!!checked)}
							className="text-blue-600 dark:text-blue-400"
						/>
					</div>
					<div className="flex items-center justify-between p-3">
						<Label
							htmlFor="subscribe"
							className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
						>
							Subscribe to weekly digest
						</Label>
						<Checkbox
							id="subscribe"
							checked={isSubscribed}
							onCheckedChange={(checked) => setIsSubscribed(!!checked)}
							className="text-blue-600 dark:text-blue-400"
						/>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t dark:border-zinc-700">
				<Button
					variant="outline"
					className="w-full dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
				>
					Reset Defaults
				</Button>
				<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md dark:bg-blue-700 dark:hover:bg-blue-800">
					Save Preferences
				</Button>
			</CardFooter>
		</Card>
	);
};

export default NotificationSettingsCard;

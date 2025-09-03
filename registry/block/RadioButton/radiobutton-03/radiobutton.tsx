'use client';

import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Mail, CreditCard, MessageSquare, Bell } from 'lucide-react';

export default function RadioButton03() {
	const [value, setValue] = useState('email');

	const options = [
		{
			id: 'email',
			label: 'Email Notifications',
			sublabel: '(Recommended)',
			description: 'Get important updates delivered to your inbox',
			hasBadge: true,
			badgeVariant: 'blue',
			icon: <Mail className="h-5 w-5 text-blue-500" />,
			image: null,
		},
		{
			id: 'sms',
			label: 'SMS Alerts',
			sublabel: '(Instant)',
			description: 'Receive time-sensitive alerts via text message',
			hasBadge: false,
			badgeVariant: 'blue',
			icon: <MessageSquare className="h-5 w-5 text-green-500" />,
			image: null,
		},
		{
			id: 'push',
			label: 'Push Notifications',
			sublabel: '(Mobile)',
			description: 'Get real-time updates on your mobile device',
			hasBadge: true,
			badgeVariant: 'blue',
			icon: <Bell className="h-5 w-5 text-purple-500" />,
			image: null,
		},
		{
			id: 'billing',
			label: 'Billing Updates',
			sublabel: '(Important)',
			description: 'Receive invoices and payment confirmations',
			hasBadge: false,
			badgeVariant: 'gray',
			icon: <CreditCard className="h-5 w-5 text-orange-500" />,
			image: null,
		},
	];

	return (
		<div className="bg-zinc-100 dark:bg-zinc-800 p-4 sm:p-6 shadow-md rounded-md">
			<RadioGroup
				value={value}
				onValueChange={setValue}
				className="space-y-3 sm:space-y-4"
			>
				{options.map((option) => (
					<label
						key={option.id}
						htmlFor={option.id}
						className={cn(
							'flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border shadow-sm transition-all cursor-pointer',
							'hover:shadow-md hover:border-gray-300',
							'dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:shadow-zinc-900',
							value === option.id
								? 'bg-zinc-300/90 border-zinc-300 shadow-md dark:bg-zinc-800/80 dark:border-zinc-500'
								: 'bg-white dark:bg-zinc-950'
						)}
					>
						{/* Avatar/Icon/Image */}
						{option.icon && (
							<Avatar className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center">
								{option.icon}
							</Avatar>
						)}
						{option.image && (
							<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-gray-200">
								<img
									src={option.image}
									alt="Profile"
									className="h-full w-full object-cover"
								/>
							</div>
						)}

						{/* Content */}
						<div className="flex-1 min-w-0">
							<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
								<span className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 truncate">
									{option.label}
								</span>
								<div className="flex items-center gap-1 sm:gap-2">
									<span className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 whitespace-nowrap">
										{option.sublabel}
									</span>
									{option.hasBadge && (
										<span
											className={cn(
												'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap',
												option.badgeVariant === 'blue'
													? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'
													: 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-300'
											)}
										>
											NEW
										</span>
									)}
								</div>
							</div>
							<p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 line-clamp-2">
								{option.description}
							</p>
						</div>

						{/* Radio Button */}
						<RadioGroupItem
							value={option.id}
							id={option.id}
							className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 border-2 dark:text-blue-600 dark:border-zinc-600 flex-shrink-0"
						/>
					</label>
				))}
			</RadioGroup>
		</div>
	);
}

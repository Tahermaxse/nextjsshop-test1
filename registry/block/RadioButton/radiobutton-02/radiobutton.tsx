'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Check, Bell } from 'lucide-react';

export default function RadioButton02() {
	const [value, setValue] = useState('premium');

	const plans = [
		{
			id: 'free',
			title: 'Free',
			price: '$0/month',
			features: ['Limited storage (5GB)'],
			badge: null,
		},
		{
			id: 'premium',
			title: 'Premium',
			price: '$9.99/month',
			features: ['Everything in Free', 'Advanced features'],
			badge: 'NEW',
		},
		{
			id: 'enterprise',
			title: 'Enterprise',
			price: '$49.99/month',
			features: ['Unlimited storage', '24/7 priority support'],
			badge: null,
		},
	];

	return (
		<div className="rounded-lg border shadow-sm overflow-hidden bg-white dark:bg-zinc-950 dark:border-zinc-800">
			<div className="p-4 sm:p-5 flex items-center justify-between gap-2">
				<div>
					<h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
						Choose Your Plan
					</h3>
					<p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400">
						Select the subscription that fits your needs
					</p>
				</div>
				<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
					<Bell className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-600 dark:text-zinc-400" />
				</div>
			</div>

			<div className="p-4 sm:p-5">
				<RadioGroup
					value={value}
					onValueChange={setValue}
					className="space-y-3 sm:space-y-4"
				>
					{plans.map((plan) => (
						<label
							key={plan.id}
							htmlFor={plan.id}
							className={cn(
								'relative block p-4 sm:p-5 rounded-lg border-2 transition-all cursor-pointer',
								'hover:shadow-sm dark:hover:shadow-zinc-900',
								value === plan.id
									? 'border-blue-500 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20'
									: 'border-gray-200 hover:border-gray-300 dark:border-zinc-700 dark:hover:border-zinc-600'
							)}
						>
							<div className="absolute top-3 right-3 sm:top-4 sm:right-4">
								<RadioGroupItem
									value={plan.id}
									id={plan.id}
									className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 border-2 dark:text-blue-400 dark:border-zinc-600"
								/>
							</div>
							<div className="pr-6 sm:pr-8">
								<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
									<span className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">
										{plan.title}
									</span>
									<div className="flex items-center gap-1 sm:gap-2">
										<p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-zinc-400">
											{plan.price}
										</p>
										{plan.badge && (
											<span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
												{plan.badge}
											</span>
										)}
									</div>
								</div>
								<div className="mt-2 space-y-1 sm:space-y-2">
									{plan.features.map((feature, index) => (
										<div
											key={index}
											className="flex items-start gap-2"
										>
											<Check className="h-4 w-4 sm:h-[18px] sm:w-[18px] mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
											<p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400">
												{feature}
											</p>
										</div>
									))}
								</div>
							</div>
						</label>
					))}
				</RadioGroup>
			</div>

			<div className="p-4 sm:p-5">
				<Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700">
					Select Plan
				</Button>
			</div>
		</div>
	);
}

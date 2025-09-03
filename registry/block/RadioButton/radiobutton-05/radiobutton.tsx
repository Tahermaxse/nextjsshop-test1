'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Shield, Lock, Database, DatabaseBackup } from 'lucide-react';

export default function RadioButton05() {
	const [securityValue, setSecurityValue] = useState('two-factor');
	const [privacyValue, setPrivacyValue] = useState('disable-collection');

	const securityOptions = [
		{
			id: 'two-factor',
			label: 'Enable Two-Factor Authentication',
			description: 'Add an extra layer of security to your account',
			icon: <Lock className="h-5 w-5" />,
		},
		{
			id: 'single-auth',
			label: 'Use Single Authentication',
			description: 'Remove the extra layer of security',
			icon: <Lock className="h-5 w-5" />,
		},
	];

	const privacyOptions = [
		{
			id: 'allow-collection',
			label: 'Allow Data Collection',
			description:
				'Help us improve your experience by allowing data collection',
			icon: <Database className="h-5 w-5" />,
		},
		{
			id: 'disable-collection',
			label: 'Disable Data Collection',
			description: 'Opt-out of data collection',
			icon: <DatabaseBackup className="h-5 w-5" />,
		},
	];

	return (
		<div className="rounded-lg border shadow-sm overflow-hidden bg-white dark:bg-zinc-950 dark:border-zinc-800">
			<div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
				<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
					<Shield className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-600 dark:text-zinc-400" />
				</div>
				<div>
					<h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100">
						Manage Your Security and Privacy
					</h3>
					<p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400">
						Customize your security and privacy settings
					</p>
				</div>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-4 sm:p-5">
				<h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-3 sm:mb-4">
					SECURITY
				</h4>
				<RadioGroup
					value={securityValue}
					onValueChange={setSecurityValue}
					className="space-y-3 sm:space-y-4"
				>
					{securityOptions.map((option) => (
						<label
							key={option.id}
							htmlFor={option.id}
							className={cn(
								'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
								'hover:bg-gray-50 dark:hover:bg-zinc-800',
								securityValue === option.id && 'bg-blue-50 dark:bg-blue-900/20'
							)}
						>
							<RadioGroupItem
								value={option.id}
								id={option.id}
								className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 border-2 dark:text-blue-400 dark:border-zinc-600"
							/>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									{option.icon}
									<span
										className={cn(
											'text-sm sm:text-base font-medium',
											securityValue === option.id
												? 'text-blue-600 dark:text-blue-400'
												: 'text-zinc-900 dark:text-zinc-100'
										)}
									>
										{option.label}
									</span>
								</div>
								<p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 ml-7">
									{option.description}
								</p>
							</div>
						</label>
					))}
				</RadioGroup>
			</div>

			<div className="p-4 sm:p-5">
				<h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-3 sm:mb-4">
					PRIVACY
				</h4>
				<RadioGroup
					value={privacyValue}
					onValueChange={setPrivacyValue}
					className="space-y-3 sm:space-y-4"
				>
					{privacyOptions.map((option) => (
						<label
							key={option.id}
							htmlFor={option.id}
							className={cn(
								'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
								'hover:bg-gray-50 dark:hover:bg-zinc-800',
								privacyValue === option.id && 'bg-blue-50 dark:bg-blue-900/20'
							)}
						>
							<RadioGroupItem
								value={option.id}
								id={option.id}
								className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 border-2 dark:text-blue-400 dark:border-zinc-600"
							/>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									{option.icon}
									<span
										className={cn(
											'text-sm sm:text-base font-medium',
											privacyValue === option.id
												? 'text-blue-600 dark:text-blue-400'
												: 'text-zinc-900 dark:text-zinc-100'
										)}
									>
										{option.label}
									</span>
								</div>
								<p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 ml-7">
									{option.description}
								</p>
							</div>
						</label>
					))}
				</RadioGroup>
			</div>

			<Separator className="dark:bg-zinc-800" />

			<div className="p-4 sm:p-5">
				<Button
					variant="outline"
					className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30 dark:hover:text-red-300"
				>
					Reset all Preferences
				</Button>
			</div>
		</div>
	);
}

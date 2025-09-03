'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxItem {
	id: string;
	label: string;
	checked: boolean;
}

const Dropdown09 = () => {
	const [socialMedia, setSocialMedia] = useState<CheckboxItem[]>([
		{ id: 'google', label: 'Google', checked: false },
		{ id: 'youtube', label: 'Youtube', checked: false },
		{ id: 'instagram', label: 'Instagram', checked: false },
		{ id: 'linkedin', label: 'Linkedin', checked: false },
	]);

	const [companies, setCompanies] = useState<CheckboxItem[]>([
		{ id: 'apex', label: 'Apex Tech', checked: false },
		{ id: 'synergy', label: 'Synergy HR', checked: false },
	]);

	const toggleAllSocialMedia = (checked: boolean) => {
		setSocialMedia((prev) => prev.map((item) => ({ ...item, checked })));
	};

	const handleCheckboxChange = (type: 'social' | 'company', id: string) => {
		if (type === 'social') {
			setSocialMedia((prev) =>
				prev.map((item) =>
					item.id === id ? { ...item, checked: !item.checked } : item
				)
			);
		} else {
			setCompanies((prev) =>
				prev.map((item) =>
					item.id === id ? { ...item, checked: !item.checked } : item
				)
			);
		}
	};

	const allSocialMediaChecked = socialMedia.every((item) => item.checked);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						'w-24 flex items-center justify-between',
						'border-zinc-300 bg-white hover:bg-zinc-50',
						'dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700/50'
					)}
				>
					Open
					<ChevronDown className="h-4 w-4 ml-2 text-zinc-600 dark:text-zinc-400" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn(
					'w-56 rounded-md',
					'border-zinc-200 bg-white shadow-lg',
					'dark:border-zinc-700 dark:bg-zinc-800'
				)}
				// Removed the onPointerDownOutside handler to allow default closing behavior
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel
						className={cn(
							'flex items-center justify-between',
							'text-zinc-800 dark:text-zinc-200',
							'cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700/50 p-2 rounded'
						)}
						onClick={() => toggleAllSocialMedia(!allSocialMediaChecked)}
					>
						<div className="flex items-center gap-2">
							<Checkbox
								checked={allSocialMediaChecked}
								onCheckedChange={(checked) => toggleAllSocialMedia(!!checked)}
								className={cn(
									'border-zinc-300 data-[state=checked]:border-blue-500',
									'dark:border-zinc-600 dark:data-[state=checked]:border-blue-600'
								)}
							/>
							<span>Social Media</span>
						</div>
					</DropdownMenuLabel>
					{socialMedia.map((item) => (
						<DropdownMenuItem
							key={item.id}
							className={cn(
								'flex items-center gap-2',
								'hover:bg-zinc-100 dark:hover:bg-zinc-700/50'
							)}
							onSelect={(e) => e.preventDefault()}
						>
							<Checkbox
								id={item.id}
								checked={item.checked}
								onCheckedChange={() => handleCheckboxChange('social', item.id)}
								className={cn(
									'border-zinc-300 data-[state=checked]:border-blue-500',
									'dark:border-zinc-600 dark:data-[state=checked]:border-blue-600'
								)}
							/>
							<label
								htmlFor={item.id}
								className={cn(
									'text-sm font-normal cursor-pointer',
									'text-zinc-800 dark:text-zinc-200'
								)}
							>
								{item.label}
							</label>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>

				<DropdownMenuSeparator className={cn('bg-zinc-200 dark:bg-zinc-700')} />

				<DropdownMenuGroup>
					<DropdownMenuLabel className={cn('text-zinc-800 dark:text-zinc-200')}>
						Companies
					</DropdownMenuLabel>
					{companies.map((item) => (
						<DropdownMenuItem
							key={item.id}
							className={cn(
								'flex items-center gap-2',
								'hover:bg-zinc-100 dark:hover:bg-zinc-700/50'
							)}
							onSelect={(e) => e.preventDefault()}
						>
							<Checkbox
								id={item.id}
								checked={item.checked}
								onCheckedChange={() => handleCheckboxChange('company', item.id)}
								className={cn(
									'border-zinc-300 data-[state=checked]:border-blue-500',
									'dark:border-zinc-600 dark:data-[state=checked]:border-blue-600'
								)}
							/>
							<label
								htmlFor={item.id}
								className={cn(
									'text-sm font-normal cursor-pointer',
									'text-zinc-800 dark:text-zinc-200'
								)}
							>
								{item.label}
							</label>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Dropdown09;

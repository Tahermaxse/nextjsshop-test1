'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const users = [
	{
		id: 1,
		name: 'Jane Brown',
	},
	{
		id: 2,
		name: 'Amelia Reed',
	},
	{
		id: 3,
		name: 'James Parker',
	},
	{
		id: 4,
		name: 'Mia Mitchell',
	},
	{
		id: 5,
		name: 'Aiden Cooper',
	},
];

export default function Dropdown02() {
	const [selectedUser, setSelectedUser] = React.useState(users[0]);
	const [open, setOpen] = React.useState(false);

	return (
		<div className="w-full max-w-md bg-card p-6 rounded-md shadow-md">
			<h2 className="mb-3 text-lg font-medium text-zinc-800 dark:text-zinc-200">
				Select User
			</h2>
			<DropdownMenu
				open={open}
				onOpenChange={setOpen}
			>
				<DropdownMenuTrigger asChild>
					<button
						className={cn(
							'flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm transition-all',
							'border-zinc-200 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2',
							'dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 dark:focus:ring-zinc-600 dark:focus:ring-offset-zinc-900'
						)}
					>
						<div className="flex items-center gap-3">
							<div className="h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
								<span className="text-zinc-800 dark:text-zinc-100 text-sm font-medium">
									{selectedUser.name.charAt(0)}
								</span>
							</div>
							<span className="font-medium text-zinc-800 dark:text-zinc-100">
								{selectedUser.name}
							</span>
						</div>
						{open ? (
							<ChevronUp className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
						) : (
							<ChevronDown className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
						)}
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className={cn(
						'w-[var(--radix-dropdown-menu-trigger-width)] rounded-lg border p-2 shadow-lg',
						'border-zinc-200 bg-white',
						'dark:border-zinc-700 dark:bg-zinc-900'
					)}
				>
					{users
						.filter((user) => user.id !== selectedUser.id)
						.map((user) => (
							<DropdownMenuItem
								key={user.id}
								className={cn(
									'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors',
									'focus:bg-zinc-100 focus:text-zinc-900',
									'dark:focus:bg-zinc-700 dark:focus:text-zinc-100'
								)}
								onClick={() => {
									setSelectedUser(user);
									setOpen(false);
								}}
							>
								<div className="h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
									<span className="text-zinc-800 dark:text-zinc-100 text-sm font-medium">
										{user.name.charAt(0)}
									</span>
								</div>
								<span className="font-medium text-zinc-800 dark:text-zinc-100">
									{user.name}
								</span>
							</DropdownMenuItem>
						))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

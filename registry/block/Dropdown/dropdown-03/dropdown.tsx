'use client';

import { useState } from 'react';
import { User, Settings, Smartphone, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type UserProfile = {
	id: string;
	name: string;
	username: string;
	email: string;
};

export default function Dropdown03() {
	const [currentUserId, setCurrentUserId] = useState('1');
	const [open, setOpen] = useState(false);

	const users: UserProfile[] = [
		{
			id: '1',
			name: 'Mia de Silva',
			username: 'mia',
			email: 'mia@miadesign.io',
		},
		{
			id: '2',
			name: 'Caitlyn King',
			username: 'caitlyn',
			email: 'caitlyn@artisan.com',
		},
	];

	const currentUser = users.find((user) => user.id === currentUserId)!;
	const alternateAccounts = users.filter((user) => user.id !== currentUserId);

	const handleLogout = () => {
		console.log('Logging out...');
		// Add your logout logic here
	};

	const handleSwitchAccount = (userId: string) => {
		console.log(`Switching to account: ${userId}`);
		setCurrentUserId(userId);
	};

	return (
		<div className="relative flex flex-col justify-start items-center h-full bg-card w-full max-w-md shadow-md rounded-md p-6 gap-4">
			<DropdownMenu
				open={open}
				onOpenChange={setOpen}
			>
				<div className="flex flex-col items-center gap-2">
					<DropdownMenuTrigger asChild>
						<button
							className={cn(
								'flex items-center justify-center rounded-full overflow-hidden',
								'focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2',
								'transition-transform duration-200 hover:scale-105',
								'dark:focus:ring-zinc-600 dark:focus:ring-offset-zinc-900'
							)}
						>
							<div className="h-10 w-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-600 flex items-center justify-center">
								<span className="text-zinc-800 dark:text-zinc-200 text-sm font-medium">
									{currentUser.name.charAt(0)}
								</span>
							</div>
						</button>
					</DropdownMenuTrigger>
					<span className="text-xs text-zinc-500 dark:text-zinc-400">
						Click avatar to {open ? 'close' : 'open'} menu
					</span>
				</div>

				<DropdownMenuContent
					className={cn(
						'w-64 rounded-lg p-1.5',
						'bg-white border border-zinc-200 text-zinc-800',
						'dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200',
						'shadow-lg'
					)}
					align="center"
					side="top"
					sideOffset={10}
				>
					<DropdownMenuLabel className="flex items-center gap-2 px-3 py-2.5">
						<div className="flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 p-2">
							<User className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
						</div>
						<div className="flex flex-col">
							<span className="font-medium">{currentUser.name}</span>
							<span className="text-xs text-zinc-500 dark:text-zinc-400">
								@{currentUser.username}
							</span>
						</div>
					</DropdownMenuLabel>

					<DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />

					<DropdownMenuGroup>
						<DropdownMenuItem className={menuItemClasses}>
							<Settings className="mr-2 h-4 w-4" />
							<span>Account settings</span>
						</DropdownMenuItem>
						<DropdownMenuItem className={menuItemClasses}>
							<Smartphone className="mr-2 h-4 w-4" />
							<span>Device management</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							className={cn(
								menuItemClasses,
								'text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400'
							)}
							onClick={handleLogout}
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Sign out</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>

					{alternateAccounts.length > 0 && (
						<>
							<DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
							<DropdownMenuLabel className="text-xs text-zinc-500 dark:text-zinc-400 font-medium px-3 py-1.5">
								SWITCH ACCOUNT
							</DropdownMenuLabel>
							{alternateAccounts.map((account) => (
								<DropdownMenuItem
									key={account.id}
									className={menuItemClasses}
									onClick={() => handleSwitchAccount(account.id)}
								>
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-2">
											<Avatar className="h-8 w-8">
												<AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium">
													{account.name.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<span className="text-sm">{account.name}</span>
												<span className="text-xs text-zinc-500 dark:text-zinc-400">
													{account.email}
												</span>
											</div>
										</div>
									</div>
								</DropdownMenuItem>
							))}
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

const menuItemClasses = cn(
	'px-3 py-2.5 text-sm rounded-md cursor-pointer',
	'focus:bg-zinc-100 focus:text-zinc-900',
	'dark:focus:bg-zinc-800 dark:focus:text-zinc-100',
	'transition-colors duration-200'
);

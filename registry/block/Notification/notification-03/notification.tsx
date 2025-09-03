'use client';

import { Bell } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Notification {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
}

export function Notification03() {
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: '1',
			title: 'Performance Review Due',
			description: '5 team members need Q4 evaluation',
			time: '15 minutes ago',
			read: false,
		},
		{
			id: '2',
			title: 'Onboarding Status',
			description: 'New hire documentation pending for James',
			time: '1 hour ago',
			read: false,
		},
	]);

	const [filter, setFilter] = useState<'all' | 'unread'>('all');
	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAllAsRead = () => {
		setNotifications(notifications.map((n) => ({ ...n, read: true })));
	};

	const filteredNotifications = notifications.filter((n) =>
		filter === 'all' ? true : !n.read
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
				>
					<Bell className="h-5 w-5" />
					{unreadCount > 0 && (
						<span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-600" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[380px] p-4"
				align="end"
			>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold">Notifications</h2>
					<Button
						variant="ghost"
						size="sm"
						onClick={markAllAsRead}
						className="text-sm text-muted-foreground hover:text-foreground"
					>
						Mark all as read
					</Button>
				</div>
				<div className="flex items-center gap-4 mb-4">
					<Button
						variant={filter === 'all' ? 'secondary' : 'ghost'}
						size="sm"
						onClick={() => setFilter('all')}
						className="text-sm"
					>
						All
					</Button>
					<Button
						variant={filter === 'unread' ? 'secondary' : 'ghost'}
						size="sm"
						onClick={() => setFilter('unread')}
						className="text-sm"
					>
						Unread
					</Button>
				</div>
				<div className="space-y-4 max-h-[300px] overflow-y-auto">
					{filteredNotifications.map((notification) => (
						<div
							key={notification.id}
							className={cn(
								'flex items-start gap-4 p-2 rounded-lg transition-colors',
								!notification.read && 'bg-muted/50'
							)}
						>
							<div className="flex-1 space-y-1">
								<p className="font-medium leading-none">{notification.title}</p>
								<p className="text-sm text-muted-foreground">
									{notification.description}
								</p>
								<p className="text-xs text-muted-foreground">
									{notification.time}
								</p>
							</div>
							{!notification.read && (
								<div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
							)}
						</div>
					))}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

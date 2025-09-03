'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
	category: string;
}

export default function Notification04() {
	const [notifications, setNotifications] = useState<NotificationItem[]>([
		{
			id: '1',
			title: 'New message received',
			description:
				'You have a new message from Sarah about the project deadline',
			time: 'Just now',
			read: false,
			category: 'Messages',
		},
		{
			id: '2',
			title: 'Meeting reminder',
			description: 'Your meeting with the design team starts in 30 minutes',
			time: '30 min ago',
			read: false,
			category: 'Calendar',
		},
		{
			id: '3',
			title: 'Task completed',
			description: 'Website redesign task has been marked as completed',
			time: '2 hours ago',
			read: true,
			category: 'Tasks',
		},
	]);

	const [open, setOpen] = useState(false);
	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAllAsRead = () => {
		setNotifications(notifications.map((n) => ({ ...n, read: true })));
	};

	const handleNotificationClick = (id: string) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	};

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative rounded-full w-10 h-10 border-none bg-secondary hover:bg-secondary/80 transition-all duration-200"
				>
					<Bell className="h-[1.2rem] w-[1.2rem] text-foreground" />
					{unreadCount > 0 && (
						<span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in-50 duration-300">
							{unreadCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-80 p-0 rounded-xl shadow-lg border-border"
				align="end"
				sideOffset={8}
			>
				<div className="flex items-center justify-between px-4 py-3 border-b">
					<h3 className="font-semibold">Notifications</h3>
					{unreadCount > 0 && (
						<Button
							variant="ghost"
							size="sm"
							onClick={markAllAsRead}
							className="text-xs h-8 hover:text-primary"
						>
							Mark all as read
						</Button>
					)}
				</div>
				<ScrollArea className="h-[300px]">
					{notifications.length > 0 ? (
						<div>
							{notifications.map((notification) => (
								<div
									key={notification.id}
									className={cn(
										'px-4 py-3 hover:bg-secondary/50 cursor-pointer transition-colors',
										!notification.read && 'bg-secondary/30'
									)}
									onClick={() => handleNotificationClick(notification.id)}
								>
									<div className="flex justify-between items-start mb-1">
										<h4 className="font-medium text-sm">
											{notification.title}
										</h4>
										<span className="text-xs text-muted-foreground">
											{notification.time}
										</span>
									</div>
									<p className="text-xs text-muted-foreground mb-1">
										{notification.description}
									</p>
									<div className="flex items-center">
										<span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full">
											{notification.category}
										</span>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center h-full py-8 text-center">
							<p className="text-muted-foreground text-sm">No notifications</p>
						</div>
					)}
				</ScrollArea>
				<Separator />
				<div className="p-2 text-center">
					<Button
						variant="ghost"
						size="sm"
						className="text-xs w-full"
					>
						View all notifications
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

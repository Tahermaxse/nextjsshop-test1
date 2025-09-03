'use client';

import { Bell, Check, Clock, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
	category: 'updates' | 'messages' | 'alerts' | 'tasks';
}

export default function Notification09() {
	const [notifications, setNotifications] = useState<NotificationItem[]>([
		{
			id: '1',
			title: 'System maintenance scheduled',
			description: 'System will be down for maintenance on Friday at 2 AM',
			time: 'Just now',
			read: false,
			category: 'alerts',
		},
		{
			id: '2',
			title: 'New feature available',
			description: 'Check out our new analytics dashboard',
			time: '2 hours ago',
			read: false,
			category: 'updates',
		},
		{
			id: '3',
			title: 'Task deadline approaching',
			description: 'Project presentation due in 24 hours',
			time: '5 hours ago',
			read: false,
			category: 'tasks',
		},
	]);

	const [open, setOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const unreadCount = notifications.filter((n) => !n.read).length;

	const filteredNotifications = selectedCategory
		? notifications.filter((n) => n.category === selectedCategory)
		: notifications;

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	};

	const markAllAsRead = () => {
		setNotifications(notifications.map((n) => ({ ...n, read: true })));
	};

	const deleteNotification = (id: string) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case 'updates':
				return 'bg-blue-500';
			case 'messages':
				return 'bg-green-500';
			case 'alerts':
				return 'bg-red-500';
			case 'tasks':
				return 'bg-purple-500';
			default:
				return 'bg-zinc-500';
		}
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
					className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
				>
					<Bell className="h-4 w-4" />
					{unreadCount > 0 && (
						<span className="absolute -top-2 -right-2 flex h-5 w-5">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
								{unreadCount}
							</span>
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-[380px] p-0"
				align="end"
				sideOffset={8}
			>
				<Command>
					<div className="flex items-center justify-between p-2 border-b">
						<div className="flex items-center gap-2">
							<CommandInput placeholder="Search notifications..." />
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8"
							onClick={() => setSelectedCategory(null)}
						>
							<Filter className="h-4 w-4" />
						</Button>
					</div>
					<div className="flex gap-2 p-2 border-b overflow-x-auto">
						{['updates', 'messages', 'alerts', 'tasks'].map((category) => (
							<Badge
								key={category}
								variant="outline"
								className={cn(
									'cursor-pointer capitalize',
									selectedCategory === category && 'bg-secondary'
								)}
								onClick={() =>
									setSelectedCategory(
										category === selectedCategory ? null : category
									)
								}
							>
								{category}
							</Badge>
						))}
					</div>
					<CommandList>
						<CommandEmpty>No notifications found.</CommandEmpty>
						<CommandGroup>
							<ScrollArea className="h-[300px]">
								{filteredNotifications.length > 0 ? (
									filteredNotifications.map((notification) => (
										<CommandItem
											key={notification.id}
											className={cn(
												'px-4 py-3 cursor-pointer',
												!notification.read && 'bg-muted/50'
											)}
											onSelect={() => markAsRead(notification.id)}
										>
											<div className="flex items-start gap-3 w-full">
												<div
													className={cn(
														'w-2 h-2 mt-2 rounded-full',
														getCategoryColor(notification.category)
													)}
												/>
												<div className="flex-1">
													<div className="flex justify-between items-start">
														<p
															className={cn(
																'text-sm',
																!notification.read && 'font-medium'
															)}
														>
															{notification.title}
														</p>
														<Button
															variant="ghost"
															size="icon"
															className="h-6 w-6 -mr-2 opacity-0 group-hover:opacity-100"
															onClick={(e) => {
																e.stopPropagation();
																deleteNotification(notification.id);
															}}
														>
															<X className="h-3 w-3" />
														</Button>
													</div>
													<p className="text-xs text-muted-foreground mt-1">
														{notification.description}
													</p>
													<div className="flex items-center gap-2 mt-2">
														<Clock className="h-3 w-3 text-muted-foreground" />
														<span className="text-xs text-muted-foreground">
															{notification.time}
														</span>
													</div>
												</div>
											</div>
										</CommandItem>
									))
								) : (
									<div className="flex flex-col items-center justify-center py-12 text-center">
										<Check className="h-8 w-8 text-muted-foreground mb-2" />
										<p className="text-sm text-muted-foreground">
											All caught up!
										</p>
									</div>
								)}
							</ScrollArea>
						</CommandGroup>
					</CommandList>
				</Command>
				<Separator />
				<div className="p-2 flex justify-between">
					{unreadCount > 0 && (
						<Button
							variant="ghost"
							size="sm"
							className="text-xs"
							onClick={markAllAsRead}
						>
							Mark all as read
						</Button>
					)}
					<Button
						variant="ghost"
						size="sm"
						className="text-xs ml-auto"
					>
						View all
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

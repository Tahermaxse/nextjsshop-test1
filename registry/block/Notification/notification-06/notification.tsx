'use client';

import { BellRing, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
	priority: 'high' | 'medium' | 'low';
}

export default function Notification06() {
	const [notifications, setNotifications] = useState<NotificationItem[]>([
		{
			id: '1',
			title: 'Critical system alert',
			description: 'Database server reaching capacity limits',
			time: 'Just now',
			read: false,
			priority: 'high',
		},
		{
			id: '2',
			title: 'New user registration',
			description: '10 new users signed up today',
			time: '2 hours ago',
			read: false,
			priority: 'medium',
		},
		{
			id: '3',
			title: 'Weekly summary report',
			description: 'Your weekly analytics report is available',
			time: 'Yesterday',
			read: true,
			priority: 'low',
		},
		{
			id: '4',
			title: 'Feature request approved',
			description: 'The dark mode feature has been approved for development',
			time: '2 days ago',
			read: true,
			priority: 'medium',
		},
	]);

	const [open, setOpen] = useState(false);
	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	};

	const removeNotification = (id: string) => {
		setNotifications(notifications.filter((n) => n.id !== id));
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'high':
				return 'bg-red-500';
			case 'medium':
				return 'bg-amber-500';
			case 'low':
				return 'bg-green-500';
			default:
				return 'bg-slate-500';
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="relative rounded-full w-10 h-10 bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm"
							>
								<BellRing className="h-[1.2rem] w-[1.2rem] text-zinc-700 dark:text-zinc-400" />
								{unreadCount > 0 && (
									<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in-50 duration-300">
										{unreadCount}
									</span>
								)}
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<p>
							Notifications{unreadCount > 0 ? ` (${unreadCount} unread)` : ''}
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-xl overflow-hidden">
				<DialogHeader className="px-6 pt-6 pb-4">
					<div className="flex items-center justify-between">
						<DialogTitle className="text-lg">Notifications</DialogTitle>
						<Badge
							variant="outline"
							className="rounded-full px-2 py-0 h-6 bg-secondary"
						>
							{unreadCount} new
						</Badge>
					</div>
				</DialogHeader>

				<ScrollArea className="max-h-[60vh] overflow-auto">
					<div className="px-6 pb-6">
						{notifications.length > 0 ? (
							<div className="space-y-1">
								{notifications.map((notification) => (
									<div
										key={notification.id}
										className={cn(
											'group relative p-4 rounded-lg transition-all duration-200',
											!notification.read
												? 'bg-secondary/60 hover:bg-secondary/80'
												: 'bg-background hover:bg-secondary/40',
											'border border-border'
										)}
									>
										<div className="flex items-start">
											<div className="mr-3">
												<div
													className={cn(
														'w-3 h-3 rounded-full',
														getPriorityColor(notification.priority)
													)}
												/>
											</div>
											<div
												className="flex-1 cursor-pointer"
												onClick={() => markAsRead(notification.id)}
											>
												<div className="flex justify-between items-start mb-1">
													<h4
														className={cn(
															'font-medium text-sm',
															!notification.read && 'font-semibold'
														)}
													>
														{notification.title}
													</h4>
													<Button
														variant="ghost"
														size="icon"
														className="h-6 w-6 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
														onClick={(e) => {
															e.stopPropagation();
															removeNotification(notification.id);
														}}
													>
														<X className="h-4 w-4" />
													</Button>
												</div>
												<p className="text-xs text-muted-foreground mb-2">
													{notification.description}
												</p>
												<div className="flex items-center justify-between">
													<span className="text-[10px] text-muted-foreground">
														{notification.time}
													</span>
													<ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<BellRing className="h-10 w-10 text-muted-foreground mb-3 opacity-20" />
								<p className="text-muted-foreground font-medium">
									All caught up!
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									You don't have any notifications
								</p>
							</div>
						)}
					</div>
				</ScrollArea>

				<Separator />
				<div className="p-3">
					<Button
						variant="outline"
						size="sm"
						className="w-full"
					>
						Manage notification settings
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

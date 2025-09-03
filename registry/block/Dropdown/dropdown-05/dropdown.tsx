'use client';

import * as React from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Bell,
	Check,
	ChevronRight,
	Settings,
	MessageSquare,
	AlertTriangle,
	RefreshCcw,
	MoreHorizontal,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {
	format,
	formatDistanceToNow,
	isToday,
	isYesterday,
	parseISO,
} from 'date-fns';

export type Notification = {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	read: boolean;
	category: 'system' | 'message' | 'alert' | 'update';
	action?: {
		text: string;
		url: string;
	};
};

export const notifications: Notification[] = [
	{
		id: '1',
		title: 'New message from Sarah',
		description: 'Hey there! Just checking in on the project progress.',
		createdAt: '2023-04-01T10:30:00Z',
		read: false,
		category: 'message',
		action: {
			text: 'Reply',
			url: '',
		},
	},
	{
		id: '2',
		title: 'System maintenance',
		description:
			'Scheduled maintenance in 2 hours. Expected downtime: 30 minutes.',
		createdAt: '2023-04-01T09:15:00Z',
		read: true,
		category: 'system',
	},
	{
		id: '3',
		title: 'Payment successful',
		description: 'Your subscription has been renewed for another month.',
		createdAt: '2023-03-31T15:45:00Z',
		read: false,
		category: 'alert',
		action: {
			text: 'View receipt',
			url: '',
		},
	},
	{
		id: '4',
		title: 'New feature: Dark mode',
		description: "We've added dark mode to the app! Try it out now.",
		createdAt: '2023-03-30T11:20:00Z',
		read: false,
		category: 'update',
		action: {
			text: 'Enable now',
			url: '',
		},
	},
	{
		id: '5',
		title: 'Team invitation',
		description: 'Michael invited you to join the Design team.',
		createdAt: '2023-03-29T16:10:00Z',
		read: true,
		category: 'alert',
		action: {
			text: 'Accept',
			url: '',
		},
	},
];

export default function Dropdown05() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState('all');
	const [localNotifications, setLocalNotifications] =
		React.useState<Notification[]>(notifications);

	const unreadCount = localNotifications.filter((n) => !n.read).length;

	const handleMarkAllAsRead = () => {
		setLocalNotifications((prev) =>
			prev.map((notification) => ({
				...notification,
				read: true,
			}))
		);
	};

	const handleMarkAsRead = (id: string) => {
		setLocalNotifications((prev) =>
			prev.map((notification) =>
				notification.id === id ? { ...notification, read: true } : notification
			)
		);
	};

	const filteredNotifications = React.useMemo(() => {
		if (activeTab === 'all') return localNotifications;
		return localNotifications.filter((n) => n.category === activeTab);
	}, [activeTab, localNotifications]);

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case 'message':
				return <MessageSquare className="h-4 w-4 text-blue-500" />;
			case 'alert':
				return <AlertTriangle className="h-4 w-4 text-amber-500" />;
			case 'update':
				return <RefreshCcw className="h-4 w-4 text-green-500" />;
			case 'system':
				return <Bell className="h-4 w-4 text-slate-500" />;
			default:
				return <Bell className="h-4 w-4 text-slate-500" />;
		}
	};

	const formatNotificationDate = (dateString: string) => {
		const date = parseISO(dateString);
		if (isToday(date)) return `Today at ${format(date, 'h:mm a')}`;
		if (isYesterday(date)) return `Yesterday at ${format(date, 'h:mm a')}`;
		return formatDistanceToNow(date, { addSuffix: true });
	};

	return (
		<div className="w-full max-w-md rounded-lg bg-card p-6 shadow-md flex flex-col items-center">
			<h3 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
				Click the bell icon to view notifications
			</h3>
			<Popover
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="relative transition-all hover:bg-accent hover:text-accent-foreground"
						aria-label="Notifications"
					>
						<Bell className="h-5 w-5" />
						{unreadCount > 0 && (
							<Badge
								className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs font-bold"
								variant="destructive"
							>
								{unreadCount}
							</Badge>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-[380px] p-0"
					align="end"
					sideOffset={8}
				>
					<div className="flex items-center justify-between border-b p-3">
						<div className="font-semibold">Notifications</div>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
								onClick={handleMarkAllAsRead}
								disabled={unreadCount === 0}
							>
								<Check className="h-4 w-4" />
								<span className="sr-only">Mark all as read</span>
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
							>
								<Settings className="h-4 w-4" />
								<span className="sr-only">Notification settings</span>
							</Button>
						</div>
					</div>
					<Tabs
						defaultValue="all"
						className="w-full"
						value={activeTab}
						onValueChange={setActiveTab}
					>
						<div className="border-b p-2">
							<TabsList className="grid w-full grid-cols-4 gap-2 bg-muted/30 p-1">
								<TabsTrigger
									value="all"
									className="text-xs"
								>
									All
								</TabsTrigger>
								<TabsTrigger
									value="message"
									className="text-xs"
								>
									Messages
								</TabsTrigger>
								<TabsTrigger
									value="alert"
									className="text-xs"
								>
									Alerts
								</TabsTrigger>
								<TabsTrigger
									value="update"
									className="text-xs"
								>
									Updates
								</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent
							value={activeTab}
							className="focus-visible:outline-none"
						>
							<ScrollArea className="h-[300px]">
								{filteredNotifications.length === 0 ? (
									<div className="flex h-full flex-col items-center justify-center p-6">
										<Bell className="h-10 w-10 text-muted-foreground/30" />
										<h3 className="mt-3 text-center font-medium">
											No notifications
										</h3>
										<p className="text-center text-sm text-muted-foreground">
											{activeTab === 'all'
												? "You're all caught up!"
												: `You don't have any ${activeTab} notifications.`}
										</p>
									</div>
								) : (
									<div className="divide-y">
										{filteredNotifications.map((notification) => (
											<div
												key={notification.id}
												className={cn(
													'group relative flex gap-3 p-3 transition-colors hover:bg-accent',
													!notification.read && 'bg-muted/50'
												)}
											>
												<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
													{getCategoryIcon(notification.category)}
												</div>
												<div className="flex-1 space-y-1">
													<div className="flex items-center justify-between gap-2">
														<p
															className={cn(
																'text-sm font-medium',
																!notification.read && 'font-semibold'
															)}
														>
															{notification.title}
														</p>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">More options</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent
																align="end"
																className="w-40"
															>
																<DropdownMenuItem
																	onClick={() =>
																		handleMarkAsRead(notification.id)
																	}
																>
																	Mark as read
																</DropdownMenuItem>
																<DropdownMenuItem>Delete</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
													<p className="line-clamp-2 text-xs text-muted-foreground">
														{notification.description}
													</p>
													<div className="flex items-center justify-between">
														<p className="text-xs text-muted-foreground">
															{formatNotificationDate(notification.createdAt)}
														</p>
														{notification.action && (
															<Link
																href={notification.action.url}
																className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
															>
																{notification.action.text}
																<ChevronRight className="h-3 w-3" />
															</Link>
														)}
													</div>
												</div>
												{!notification.read && (
													<Button
														variant="ghost"
														size="icon"
														className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
														onClick={() => handleMarkAsRead(notification.id)}
													>
														<Check className="h-3 w-3" />
														<span className="sr-only">Mark as read</span>
													</Button>
												)}
											</div>
										))}
									</div>
								)}
							</ScrollArea>
							<div className="border-t p-2">
								<Button
									variant="outline"
									size="sm"
									className="w-full justify-center"
								>
									View all notifications
								</Button>
							</div>
						</TabsContent>
					</Tabs>
				</PopoverContent>
			</Popover>
		</div>
	);
}

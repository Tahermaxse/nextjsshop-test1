'use client';

import {
	Bell,
	Calendar,
	MessageSquare,
	Settings,
	SquareStack,
	Users,
} from 'lucide-react';

import { useState } from 'react';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
	type: 'message' | 'task' | 'meeting' | 'team' | 'system';
	user?: {
		name: string;
		avatar: string;
	};
}

export default function Notification08() {
	const [notifications, setNotifications] = useState<NotificationItem[]>([
		{
			id: '1',
			title: 'New message',
			description: 'Sarah mentioned you in a comment',
			time: 'Just now',
			read: false,
			type: 'message',
			user: {
				name: 'Sarah Chen',
				avatar:
					'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
			},
		},
		{
			id: '2',
			title: 'Task assigned',
			description: "You've been assigned to 'Update documentation'",
			time: '30 min ago',
			read: false,
			type: 'task',
		},
		{
			id: '3',
			title: 'Meeting reminder',
			description: 'Product team stand-up in 15 minutes',
			time: '45 min ago',
			read: false,
			type: 'meeting',
		},
		{
			id: '4',
			title: 'New team member',
			description: 'Alex Kim joined the design team',
			time: '2 hours ago',
			read: true,
			type: 'team',
			user: {
				name: 'Alex Kim',
				avatar:
					'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
			},
		},
		{
			id: '5',
			title: 'System update',
			description: 'The system will be updated at 2:00 AM',
			time: 'Yesterday',
			read: true,
			type: 'system',
		},
	]);

	const [open, setOpen] = useState(false);
	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	};

	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'message':
				return <MessageSquare className="h-4 w-4" />;
			case 'task':
				return <SquareStack className="h-4 w-4" />;
			case 'meeting':
				return <Calendar className="h-4 w-4" />;
			case 'team':
				return <Users className="h-4 w-4" />;
			default:
				return <Settings className="h-4 w-4" />;
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case 'message':
				return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
			case 'task':
				return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
			case 'meeting':
				return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
			case 'team':
				return 'text-green-500 bg-green-100 dark:bg-green-900/30';
			default:
				return 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800';
		}
	};

	return (
		<HoverCard
			open={open}
			onOpenChange={setOpen}
		>
			<HoverCardTrigger asChild>
				<div>
					<Button
						variant="default"
						size="default"
						className="relative group h-10  dark:bg-zinc-200 bg-zinc-800 hover:bg-zinc-800/90 shadow-md rounded-full pr-3 pl-10"
					>
						<span className="absolute left-0 top-0 h-full aspect-square border border-zinc-700 flex items-center justify-center rounded-full bg-white dark:bg-black text-indigo-600 dark:text-indigo-400">
							<Bell className="h-4 w-4" />
						</span>
						<span className="ml-2 font-medium">
							{unreadCount > 0 ? `${unreadCount} new` : 'Notifications'}
						</span>
					</Button>

					{unreadCount > 0 && (
						<span className="absolute -top-1 -right-1 animate-ping h-3 w-3 rounded-full bg-indigo-400 opacity-75" />
					)}
				</div>
			</HoverCardTrigger>
			<HoverCardContent
				align="end"
				sideOffset={8}
				className="w-96 p-0 rounded-xl shadow-lg border-border"
			>
				<Tabs
					defaultValue="all"
					className="w-full"
				>
					<div className="flex items-center justify-between px-4 py-2 border-b">
						<h3 className="font-semibold">Notifications</h3>
						<TabsList className="grid grid-cols-2 h-8 w-36 rounded-md bg-muted p-1">
							<TabsTrigger
								value="all"
								className="rounded-sm text-xs h-6"
							>
								All
							</TabsTrigger>
							<TabsTrigger
								value="unread"
								className="rounded-sm text-xs h-6"
							>
								Unread
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent
						value="all"
						className="mt-0 focus-visible:outline-none focus-visible:ring-0"
					>
						<ScrollArea className="h-[300px]">
							{notifications.map((notification) => (
								<div
									key={notification.id}
									className={cn(
										'px-4 py-3 hover:bg-muted/60 cursor-pointer transition-colors',
										!notification.read && 'bg-muted/30'
									)}
									onClick={() => markAsRead(notification.id)}
								>
									<div className="flex gap-3">
										{notification.user ? (
											<Avatar className="h-8 w-8 border">
												<img
													src={notification.user.avatar}
													alt={notification.user.name}
												/>
											</Avatar>
										) : (
											<div
												className={cn(
													'h-8 w-8 rounded-full flex items-center justify-center',
													getTypeColor(notification.type)
												)}
											>
												{getTypeIcon(notification.type)}
											</div>
										)}
										<div className="flex-1">
											<div className="flex justify-between items-start mb-1">
												<h4
													className={cn(
														'font-medium text-sm',
														!notification.read && 'font-semibold'
													)}
												>
													{notification.title}
												</h4>
												<span className="text-xs text-muted-foreground">
													{notification.time}
												</span>
											</div>
											<p className="text-xs text-muted-foreground mb-1">
												{notification.description}
											</p>
											{!notification.read && (
												<Badge
													variant="outline"
													className="text-[10px] h-5 bg-muted/50 hover:bg-muted/50"
												>
													New
												</Badge>
											)}
										</div>
									</div>
								</div>
							))}
						</ScrollArea>
					</TabsContent>

					<TabsContent
						value="unread"
						className="mt-0 focus-visible:outline-none focus-visible:ring-0"
					>
						<ScrollArea className="h-[300px]">
							{notifications.filter((n) => !n.read).length > 0 ? (
								<div>
									{notifications
										.filter((n) => !n.read)
										.map((notification) => (
											<div
												key={notification.id}
												className="px-4 py-3 hover:bg-muted/60 cursor-pointer transition-colors bg-muted/30"
												onClick={() => markAsRead(notification.id)}
											>
												<div className="flex gap-3">
													{notification.user ? (
														<Avatar className="h-8 w-8 border">
															<img
																src={notification.user.avatar}
																alt={notification.user.name}
															/>
														</Avatar>
													) : (
														<div
															className={cn(
																'h-8 w-8 rounded-full flex items-center justify-center',
																getTypeColor(notification.type)
															)}
														>
															{getTypeIcon(notification.type)}
														</div>
													)}
													<div className="flex-1">
														<div className="flex justify-between items-start mb-1">
															<h4 className="font-semibold text-sm">
																{notification.title}
															</h4>
															<span className="text-xs text-muted-foreground">
																{notification.time}
															</span>
														</div>
														<p className="text-xs text-muted-foreground mb-1">
															{notification.description}
														</p>
														<Badge
															variant="outline"
															className="text-[10px] h-5 bg-muted/50 hover:bg-muted/50"
														>
															New
														</Badge>
													</div>
												</div>
											</div>
										))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center h-full py-12 text-center">
									<p className="text-muted-foreground">
										No unread notifications
									</p>
								</div>
							)}
						</ScrollArea>
					</TabsContent>
				</Tabs>

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
			</HoverCardContent>
		</HoverCard>
	);
}

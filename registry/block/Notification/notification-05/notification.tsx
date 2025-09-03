'use client';

import { Bell, CheckCheck, Filter, MailOpen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuGroup,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
	category: 'message' | 'alert' | 'update';
	avatar?: string;
}

export default function Notification05() {
	const [notifications, setNotifications] = useState<NotificationItem[]>([
		{
			id: '1',
			title: 'New design feedback',
			description: 'Alex left comments on your design file',
			time: 'Just now',
			read: false,
			category: 'message',
			avatar:
				'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
		},
		{
			id: '2',
			title: 'System update',
			description: 'The system will undergo maintenance in 2 hours',
			time: '30 min ago',
			read: false,
			category: 'alert',
		},
		{
			id: '3',
			title: 'New version available',
			description: 'Version 2.1.0 has been released with new features',
			time: '2 hours ago',
			read: true,
			category: 'update',
		},
		{
			id: '4',
			title: 'Payment processed',
			description: 'Your subscription payment was successful',
			time: 'Yesterday',
			read: true,
			category: 'alert',
		},
	]);

	const [open, setOpen] = useState(false);
	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAllAsRead = () => {
		setNotifications(notifications.map((n) => ({ ...n, read: true })));
	};

	const clearAllNotifications = () => {
		setNotifications([]);
		setOpen(false);
	};

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case 'message':
				return <div className="w-2 h-2 rounded-full bg-blue-500" />;
			case 'alert':
				return <div className="w-2 h-2 rounded-full bg-amber-500" />;
			case 'update':
				return <div className="w-2 h-2 rounded-full bg-green-500" />;
			default:
				return <div className="w-2 h-2 rounded-full bg-zinc-500" />;
		}
	};

	return (
		<DropdownMenu
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 shadow-sm border-slate-200 dark:border-zinc-700 rounded-lg"
				>
					<Bell className="h-[1.2rem] w-[1.2rem]" />
					{unreadCount > 0 && (
						<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
							{unreadCount}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				sideOffset={5}
				className="w-[340px] p-0 rounded-xl"
			>
				<div className="flex items-center justify-between p-3 border-b">
					<DropdownMenuLabel className="font-semibold text-base">
						Notifications
					</DropdownMenuLabel>
					<div className="flex space-x-1">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground"
						>
							<Filter className="h-4 w-4" />
						</Button>
						<Button
							onClick={markAllAsRead}
							disabled={unreadCount === 0}
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground"
						>
							<MailOpen className="h-4 w-4" />
						</Button>
						<Button
							onClick={clearAllNotifications}
							disabled={notifications.length === 0}
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<Tabs
					defaultValue="all"
					className="w-full"
				>
					<TabsList className="w-full grid grid-cols-3 rounded-none border-b h-auto p-0">
						<TabsTrigger
							value="all"
							className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-2"
						>
							All
						</TabsTrigger>
						<TabsTrigger
							value="unread"
							className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-2"
						>
							Unread
						</TabsTrigger>
						<TabsTrigger
							value="read"
							className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-2"
						>
							Read
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="all"
						className="m-0"
					>
						<ScrollArea className="h-[280px]">
							{notifications.length > 0 ? (
								<div>
									{notifications.map((notification) => (
										<DropdownMenuItem
											key={notification.id}
											className={cn(
												'p-3 focus:bg-secondary cursor-default flex items-start gap-3',
												!notification.read && 'bg-blue-50 dark:bg-blue-950/20'
											)}
										>
											{notification.avatar ? (
												<Avatar className="h-8 w-8">
													<img
														src={notification.avatar}
														alt="User"
													/>
												</Avatar>
											) : (
												<div className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary">
													{getCategoryIcon(notification.category)}
												</div>
											)}
											<div className="flex-1 space-y-1">
												<div className="flex justify-between items-start">
													<h4 className="font-medium text-sm">
														{notification.title}
													</h4>
													<span className="text-xs text-muted-foreground ml-2">
														{notification.time}
													</span>
												</div>
												<p className="text-xs text-muted-foreground">
													{notification.description}
												</p>
											</div>
										</DropdownMenuItem>
									))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center h-full py-8 text-center">
									<CheckCheck className="h-8 w-8 text-muted-foreground mb-2" />
									<p className="text-muted-foreground">All caught up!</p>
									<p className="text-xs text-muted-foreground">
										You have no notifications
									</p>
								</div>
							)}
						</ScrollArea>
					</TabsContent>

					<TabsContent
						value="unread"
						className="m-0"
					>
						<ScrollArea className="h-[280px]">
							{notifications.filter((n) => !n.read).length > 0 ? (
								<div>
									{notifications
										.filter((n) => !n.read)
										.map((notification) => (
											<DropdownMenuItem
												key={notification.id}
												className="p-3 focus:bg-secondary cursor-default flex items-start gap-3 bg-blue-50 dark:bg-blue-950/20"
											>
												{notification.avatar ? (
													<Avatar className="h-8 w-8">
														<img
															src={notification.avatar}
															alt="User"
														/>
													</Avatar>
												) : (
													<div className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary">
														{getCategoryIcon(notification.category)}
													</div>
												)}
												<div className="flex-1 space-y-1">
													<div className="flex justify-between items-start">
														<h4 className="font-medium text-sm">
															{notification.title}
														</h4>
														<span className="text-xs text-muted-foreground ml-2">
															{notification.time}
														</span>
													</div>
													<p className="text-xs text-muted-foreground">
														{notification.description}
													</p>
												</div>
											</DropdownMenuItem>
										))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center h-full py-8 text-center">
									<CheckCheck className="h-8 w-8 text-muted-foreground mb-2" />
									<p className="text-muted-foreground">All caught up!</p>
									<p className="text-xs text-muted-foreground">
										You have no unread notifications
									</p>
								</div>
							)}
						</ScrollArea>
					</TabsContent>

					<TabsContent
						value="read"
						className="m-0"
					>
						<ScrollArea className="h-[280px]">
							{notifications.filter((n) => n.read).length > 0 ? (
								<div>
									{notifications
										.filter((n) => n.read)
										.map((notification) => (
											<DropdownMenuItem
												key={notification.id}
												className="p-3 focus:bg-secondary cursor-default flex items-start gap-3"
											>
												{notification.avatar ? (
													<Avatar className="h-8 w-8">
														<img
															src={notification.avatar}
															alt="User"
														/>
													</Avatar>
												) : (
													<div className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary">
														{getCategoryIcon(notification.category)}
													</div>
												)}
												<div className="flex-1 space-y-1">
													<div className="flex justify-between items-start">
														<h4 className="font-medium text-sm">
															{notification.title}
														</h4>
														<span className="text-xs text-muted-foreground ml-2">
															{notification.time}
														</span>
													</div>
													<p className="text-xs text-muted-foreground">
														{notification.description}
													</p>
												</div>
											</DropdownMenuItem>
										))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center h-full py-8 text-center">
									<p className="text-muted-foreground">No read notifications</p>
								</div>
							)}
						</ScrollArea>
					</TabsContent>
				</Tabs>

				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="p-2 text-center justify-center">
						<Button
							variant="ghost"
							size="sm"
							className="w-full text-sm font-normal"
						>
							View all notifications
						</Button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

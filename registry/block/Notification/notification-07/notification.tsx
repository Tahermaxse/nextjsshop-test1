'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Check, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	type: 'info' | 'success' | 'warning' | 'error';
	read: boolean;
}

const framerVariants = {
	hidden: { opacity: 0, x: 20 },
	visible: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20 },
};

export default function Notification07() {
	const [notifications, setNotifications] = useState<NotificationItem[]>([
		{
			id: '1',
			title: 'Project Launched',
			description:
				"Your project 'Design System' has been successfully deployed",
			time: '10 minutes ago',
			type: 'success',
			read: false,
		},
		{
			id: '2',
			title: 'Storage Warning',
			description: "You're using 80% of your storage quota",
			time: '1 hour ago',
			type: 'warning',
			read: false,
		},
		{
			id: '3',
			title: 'New Feature Available',
			description: 'Try out our new analytics dashboard',
			time: '3 hours ago',
			type: 'info',
			read: true,
		},
		{
			id: '4',
			title: 'Payment Failed',
			description: 'There was an issue processing your payment',
			time: 'Yesterday',
			type: 'error',
			read: true,
		},
	]);

	const [open, setOpen] = useState(false);

	const unreadCount = notifications.filter((n) => !n.read).length;
	const todayNotifications = notifications.filter(
		(n) => n.time.includes('minute') || n.time.includes('hour')
	);
	const earlierNotifications = notifications.filter(
		(n) => !n.time.includes('minute') && !n.time.includes('hour')
	);

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

	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'success':
				return <Check className="h-4 w-4 text-green-500" />;
			case 'warning':
				return <Clock className="h-4 w-4 text-amber-500" />;
			case 'error':
				return <X className="h-4 w-4 text-red-500" />;
			default:
				return <Bell className="h-4 w-4 text-blue-500" />;
		}
	};

	const getTypeBg = (type: string) => {
		switch (type) {
			case 'success':
				return 'bg-green-50 dark:bg-green-900/20';
			case 'warning':
				return 'bg-amber-50 dark:bg-amber-900/20';
			case 'error':
				return 'bg-red-50 dark:bg-red-900/20';
			default:
				return 'bg-blue-50 dark:bg-blue-900/20';
		}
	};

	return (
		<Sheet
			open={open}
			onOpenChange={setOpen}
		>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative h-10 w-10 rounded-full"
				>
					<div className="absolute inset-0 rounded-full bg-zinc-700 dark:bg-zinc-200/90 animate-pulse opacity-20 group-hover:opacity-30 transition-opacity" />
					<Bell className="h-[1.2rem] w-[1.2rem] text-foreground" />
					{unreadCount > 0 && (
						<Badge className="absolute -top-1 -right-1 px-1 min-w-[20px] h-5 flex items-center justify-center bg-indigo-600 hover:bg-indigo-600">
							{unreadCount}
						</Badge>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent className="overflow-y-auto p-0 sm:max-w-md">
				<SheetHeader className="p-6 border-b sticky top-0 bg-background z-10">
					<div className="flex items-center justify-between">
						<SheetTitle>Notifications</SheetTitle>
						{unreadCount > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={markAllAsRead}
								className="h-8 px-3 text-xs"
							>
								Mark all as read
							</Button>
						)}
					</div>
				</SheetHeader>

				<Tabs
					defaultValue="all"
					className="w-full"
				>
					<TabsList className="w-full grid grid-cols-2 rounded-none border-b h-auto bg-transparent p-0">
						<TabsTrigger
							value="all"
							className="rounded-none border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none h-12"
						>
							All
						</TabsTrigger>
						<TabsTrigger
							value="unread"
							className="rounded-none border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none h-12"
						>
							Unread ({unreadCount})
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="all"
						className="m-0 p-4"
					>
						{todayNotifications.length > 0 ||
						earlierNotifications.length > 0 ? (
							<div>
								{todayNotifications.length > 0 && (
									<div>
										<h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
											Today
										</h3>
										<AnimatePresence initial={false}>
											{todayNotifications.map((notification) => (
												<motion.div
													key={notification.id}
													layout
													initial="hidden"
													animate="visible"
													exit="exit"
													variants={framerVariants}
													transition={{ duration: 0.2 }}
												>
													<div
														className={cn(
															'group relative p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200',
															!notification.read
																? 'bg-secondary dark:bg-secondary/80'
																: 'hover:bg-muted'
														)}
														onClick={() => markAsRead(notification.id)}
													>
														<div className="flex items-start gap-3">
															<div
																className={cn(
																	'w-8 h-8 flex items-center justify-center rounded-full',
																	getTypeBg(notification.type)
																)}
															>
																{getTypeIcon(notification.type)}
															</div>
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
																	<div className="flex items-center space-x-1">
																		<span className="text-xs text-muted-foreground">
																			{notification.time}
																		</span>
																		<Button
																			variant="ghost"
																			size="icon"
																			className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
																			onClick={(e) => {
																				e.stopPropagation();
																				deleteNotification(notification.id);
																			}}
																		>
																			<X className="h-3 w-3" />
																		</Button>
																	</div>
																</div>
																<p className="text-xs text-muted-foreground">
																	{notification.description}
																</p>
															</div>
														</div>
													</div>
												</motion.div>
											))}
										</AnimatePresence>
									</div>
								)}

								{earlierNotifications.length > 0 && (
									<div className="mt-4">
										<h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
											Earlier
										</h3>
										<AnimatePresence initial={false}>
											{earlierNotifications.map((notification) => (
												<motion.div
													key={notification.id}
													layout
													initial="hidden"
													animate="visible"
													exit="exit"
													variants={framerVariants}
													transition={{ duration: 0.2 }}
												>
													<div
														className={cn(
															'group relative p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200',
															!notification.read
																? 'bg-secondary dark:bg-secondary/80'
																: 'hover:bg-muted'
														)}
														onClick={() => markAsRead(notification.id)}
													>
														<div className="flex items-start gap-3">
															<div
																className={cn(
																	'w-8 h-8 flex items-center justify-center rounded-full',
																	getTypeBg(notification.type)
																)}
															>
																{getTypeIcon(notification.type)}
															</div>
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
																	<div className="flex items-center space-x-1">
																		<span className="text-xs text-muted-foreground">
																			{notification.time}
																		</span>
																		<Button
																			variant="ghost"
																			size="icon"
																			className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
																			onClick={(e) => {
																				e.stopPropagation();
																				deleteNotification(notification.id);
																			}}
																		>
																			<X className="h-3 w-3" />
																		</Button>
																	</div>
																</div>
																<p className="text-xs text-muted-foreground">
																	{notification.description}
																</p>
															</div>
														</div>
													</div>
												</motion.div>
											))}
										</AnimatePresence>
									</div>
								)}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<Bell className="h-12 w-12 text-muted-foreground mb-3 opacity-20" />
								<p className="text-muted-foreground font-medium">
									All caught up!
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									You have no notifications
								</p>
							</div>
						)}
					</TabsContent>

					<TabsContent
						value="unread"
						className="m-0 p-4"
					>
						{notifications.filter((n) => !n.read).length > 0 ? (
							<div>
								<AnimatePresence initial={false}>
									{notifications
										.filter((n) => !n.read)
										.map((notification) => (
											<motion.div
												key={notification.id}
												layout
												initial="hidden"
												animate="visible"
												exit="exit"
												variants={framerVariants}
												transition={{ duration: 0.2 }}
											>
												<div
													className="group relative p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200 bg-secondary dark:bg-secondary/80"
													onClick={() => markAsRead(notification.id)}
												>
													<div className="flex items-start gap-3">
														<div
															className={cn(
																'w-8 h-8 flex items-center justify-center rounded-full',
																getTypeBg(notification.type)
															)}
														>
															{getTypeIcon(notification.type)}
														</div>
														<div className="flex-1">
															<div className="flex justify-between items-start mb-1">
																<h4 className="font-semibold text-sm">
																	{notification.title}
																</h4>
																<div className="flex items-center space-x-1">
																	<span className="text-xs text-muted-foreground">
																		{notification.time}
																	</span>
																	<Button
																		variant="ghost"
																		size="icon"
																		className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
																		onClick={(e) => {
																			e.stopPropagation();
																			deleteNotification(notification.id);
																		}}
																	>
																		<X className="h-3 w-3" />
																	</Button>
																</div>
															</div>
															<p className="text-xs text-muted-foreground">
																{notification.description}
															</p>
														</div>
													</div>
												</div>
											</motion.div>
										))}
								</AnimatePresence>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<Check className="h-12 w-12 text-muted-foreground mb-3 opacity-20" />
								<p className="text-muted-foreground font-medium">
									All caught up!
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									You have no unread notifications
								</p>
							</div>
						)}
					</TabsContent>
				</Tabs>

				<div className="p-4 pt-0 mt-4">
					<SheetClose asChild>
						<Button
							className="w-full"
							variant="outline"
						>
							View all in notifications center
						</Button>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}

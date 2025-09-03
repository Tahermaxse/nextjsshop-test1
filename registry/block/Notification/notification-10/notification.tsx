'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Check, ChevronRight, Clock, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
	type: 'primary' | 'success' | 'warning' | 'danger';
}

const notificationVariants = {
	initial: { opacity: 0, x: 50 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -50 },
};

export default function Notification10() {
	const [notifications, setNotifications] = useState<NotificationItem[]>([
		{
			id: '1',
			title: 'Payment successful',
			description: 'Your subscription has been renewed',
			time: 'Just now',
			read: false,
			type: 'success',
		},
		{
			id: '2',
			title: 'Storage limit reached',
			description: 'Please upgrade your plan to continue',
			time: '30 minutes ago',
			read: false,
			type: 'warning',
		},
		{
			id: '3',
			title: 'Security alert',
			description: 'Unusual login attempt detected',
			time: '1 hour ago',
			read: false,
			type: 'danger',
		},
		{
			id: '4',
			title: 'New feature available',
			description: 'Check out our latest updates',
			time: '2 hours ago',
			read: true,
			type: 'primary',
		},
	]);

	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const unreadCount = notifications.filter((n) => !n.read).length;

	const filteredNotifications = notifications.filter(
		(n) =>
			n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			n.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	};

	const deleteNotification = (id: string) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	const getTypeStyles = (type: string) => {
		switch (type) {
			case 'success':
				return 'bg-green-500 text-white';
			case 'warning':
				return 'bg-amber-500 text-white';
			case 'danger':
				return 'bg-red-500 text-white';
			default:
				return 'bg-blue-500 text-white';
		}
	};

	return (
		<Sheet
			open={open}
			onOpenChange={setOpen}
		>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative w-10 h-10 rounded-2xl bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-all duration-200"
				>
					<Bell className="h-5 w-5" />
					{unreadCount > 0 && (
						<span className="absolute -top-1 -right-1 flex">
							<span className="relative flex h-5 w-5 items-center justify-center">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
								<span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
									{unreadCount}
								</span>
							</span>
						</span>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-md p-0">
				<SheetHeader className="p-6 border-b sticky top-0 bg-background z-10">
					<div className="flex items-center justify-between">
						<SheetTitle>Notifications</SheetTitle>
						{unreadCount > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() =>
									setNotifications(
										notifications.map((n) => ({ ...n, read: true }))
									)
								}
							>
								Mark all as read
							</Button>
						)}
					</div>
					<div className="relative mt-4">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search notifications..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-9"
						/>
					</div>
				</SheetHeader>
				<ScrollArea className="h-[calc(100vh-12rem)]">
					<AnimatePresence initial={false}>
						{filteredNotifications.length > 0 ? (
							<div className="divide-y">
								{filteredNotifications.map((notification) => (
									<motion.div
										key={notification.id}
										layout
										initial="initial"
										animate="animate"
										exit="exit"
										variants={notificationVariants}
										transition={{ duration: 0.2 }}
										className={cn(
											'group relative p-6 cursor-pointer transition-colors',
											!notification.read && 'bg-muted/50'
										)}
										onClick={() => markAsRead(notification.id)}
									>
										<div className="flex items-start gap-4">
											<div
												className={cn(
													'w-2 h-2 mt-2 rounded-full',
													getTypeStyles(notification.type)
												)}
											/>
											<div className="flex-1 space-y-1">
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
														className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
														onClick={(e) => {
															e.stopPropagation();
															deleteNotification(notification.id);
														}}
													>
														<X className="h-3 w-3" />
													</Button>
												</div>
												<p className="text-sm text-muted-foreground">
													{notification.description}
												</p>
												<div className="flex items-center gap-2">
													<Clock className="h-3 w-3 text-muted-foreground" />
													<span className="text-xs text-muted-foreground">
														{notification.time}
													</span>
												</div>
											</div>
											<ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
										</div>
									</motion.div>
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<Check className="h-12 w-12 text-muted-foreground mb-4" />
								<p className="text-lg font-medium">All caught up!</p>
								<p className="text-sm text-muted-foreground mt-1">
									{searchQuery
										? 'No notifications found'
										: 'You have no notifications'}
								</p>
							</div>
						)}
					</AnimatePresence>
				</ScrollArea>
				<SheetFooter className="p-4 border-t">
					<Button
						variant="outline"
						className="w-full"
					>
						View all notifications
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

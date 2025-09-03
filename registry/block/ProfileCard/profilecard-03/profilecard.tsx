import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { StatusBadge } from '../status-badge';
import { cn } from '@/lib/utils';
import { LucidePhone, LucideMail, LucideMessageSquare } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface TeamMemberCardProps {
	name: string;
	role: string;
	avatar: string;
	status?: 'online' | 'away' | 'busy' | 'offline';
	department?: string;
	email?: string;
	phone?: string;
	className?: string;
}

export function Profile03({
	name,
	role,
	avatar,
	status = 'online',
	department,
	email,
	phone,
	className,
}: TeamMemberCardProps) {
	const statusColorMap = {
		online: 'green',
		away: 'yellow',
		busy: 'purple',
		offline: 'gray',
	} as const;

	return (
		<Card
			className={cn(
				'w-full max-w-xs group overflow-hidden transition-all duration-300',
				'hover:shadow-md hover:translate-y-[-4px]',
				className
			)}
		>
			<div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400" />
			<CardContent className="p-5 pt-6">
				<div className="flex flex-col items-center text-center gap-3">
					<ProfileAvatar
						src={avatar}
						alt={name}
						size="lg"
						statusColor={statusColorMap[status]}
					/>

					<div>
						<h3 className="font-semibold text-lg">{name}</h3>
						<p className="text-muted-foreground text-sm">{role}</p>
						{department && (
							<p className="text-xs text-muted-foreground mt-1">{department}</p>
						)}
					</div>

					<StatusBadge variant={status}>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</StatusBadge>

					<div className="w-full border-t border-border pt-4 mt-2">
						<div className="flex justify-around">
							<TooltipProvider>
								{email && (
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href={`mailto:${email}`}
												className="p-2 rounded-full hover:bg-secondary transition-colors"
											>
												<LucideMail className="h-5 w-5" />
											</a>
										</TooltipTrigger>
										<TooltipContent>
											<p>{email}</p>
										</TooltipContent>
									</Tooltip>
								)}

								{phone && (
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href={`tel:${phone}`}
												className="p-2 rounded-full hover:bg-secondary transition-colors"
											>
												<LucidePhone className="h-5 w-5" />
											</a>
										</TooltipTrigger>
										<TooltipContent>
											<p>{phone}</p>
										</TooltipContent>
									</Tooltip>
								)}

								<Tooltip>
									<TooltipTrigger asChild>
										<button className="p-2 rounded-full hover:bg-secondary transition-colors">
											<LucideMessageSquare className="h-5 w-5" />
										</button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Send message</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

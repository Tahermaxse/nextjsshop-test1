import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { cn } from '@/lib/utils';
import { ActionButton } from '../action-button';
import { Separator } from '@/components/ui/separator';
import {
	LucideCalendar,
	LucideUsers,
	LucideExternalLink,
	LucideLink,
} from 'lucide-react';

interface ProjectMember {
	name: string;
	avatar: string;
}

interface ProjectCardProps {
	name: string;
	role: string;
	avatar: string;
	projectName: string;
	projectStatus?: 'In Progress' | 'Completed' | 'On Hold';
	dueDate?: string;
	teamSize?: number;
	members?: ProjectMember[];
	projectUrl?: string;
	className?: string;
}

export function Profile01({
	name,
	role,
	avatar,
	projectName,
	projectStatus = 'In Progress',
	dueDate,
	teamSize = 0,
	members = [],
	projectUrl,
	className,
}: ProjectCardProps) {
	const statusColor =
		projectStatus === 'In Progress'
			? 'bg-blue-500/10 text-blue-500'
			: projectStatus === 'Completed'
				? 'bg-green-500/10 text-green-500'
				: 'bg-yellow-500/10 text-yellow-500';

	return (
		<Card
			className={cn(
				'w-full max-w-sm overflow-hidden transition-all duration-300',
				'hover:shadow-md',
				className
			)}
		>
			<CardContent className="p-5">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						<ProfileAvatar
							src={avatar}
							alt={name}
							size="sm"
						/>

						<div>
							<h3 className="font-medium text-base">{name}</h3>
							<p className="text-muted-foreground text-xs">{role}</p>
						</div>
					</div>

					<div
						className={cn(
							'text-xs px-2 py-1 rounded-full font-medium',
							statusColor
						)}
					>
						{projectStatus}
					</div>
				</div>

				<div className="bg-muted rounded-md p-3 mt-3">
					<h4 className="font-semibold text-base flex items-center">
						<LucideLink className="mr-2 h-4 w-4 text-primary" />
						{projectName}
					</h4>

					<div className="grid grid-cols-2 gap-3 mt-3 text-sm">
						{dueDate && (
							<div className="flex items-center">
								<LucideCalendar className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>{dueDate}</span>
							</div>
						)}

						{teamSize > 0 && (
							<div className="flex items-center">
								<LucideUsers className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>{teamSize} members</span>
							</div>
						)}
					</div>
				</div>

				{members.length > 0 && (
					<>
						<Separator className="my-4" />

						<div className="space-y-3">
							<h4 className="text-sm font-medium">Team Members</h4>
							<div className="flex -space-x-3">
								{members.map((member, index) => (
									<ProfileAvatar
										key={index}
										src={member.avatar}
										alt={member.name}
										size="sm"
										className="border-2 border-background"
									/>
								))}

								{teamSize > members.length && (
									<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
										+{teamSize - members.length}
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</CardContent>

			{projectUrl && (
				<CardFooter className="bg-muted/30 px-5 py-3 ">
					<ActionButton
						variant="view"
						className="w-full bg-muted/80 text-muted-foreground"
						icon={LucideExternalLink}
					>
						View Project Details
					</ActionButton>
				</CardFooter>
			)}
		</Card>
	);
}

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { ActionButton } from '../action-button';
import { cn } from '@/lib/utils';

// Based on Wei Chen example from reference image
interface SimpleContactCardProps {
	name: string;
	title: string;
	company: string;
	avatar: string;
	statusColor?: 'green' | 'yellow' | 'gray' | 'blue' | 'purple' | 'none';
	className?: string;
}

export function Profile06({
	name,
	title,
	company,
	avatar,
	statusColor = 'green',
	className,
}: SimpleContactCardProps) {
	return (
		<Card
			className={cn(
				'w-full max-w-xs transition-all duration-300 hover:shadow-md',
				className
			)}
		>
			<CardContent className="p-6 flex flex-col items-center space-y-4">
				<ProfileAvatar
					src={avatar}
					alt={name}
					size="md"
					statusColor={statusColor}
				/>

				<div className="text-center">
					<h3 className="text-xl font-semibold">{name}</h3>
					<p className="text-muted-foreground">
						{title} {company && `@${company}`}
					</p>
				</div>

				<ActionButton
					variant="add"
					className="w-40"
				>
					Add Contact
				</ActionButton>
			</CardContent>
		</Card>
	);
}

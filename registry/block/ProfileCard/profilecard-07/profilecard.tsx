import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { ActionButton } from '../action-button';
import { cn } from '@/lib/utils';
import { LucideUserPlus, LucideMessageSquare, LucideUserX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NetworkingCardProps {
	name: string;
	title: string;
	avatar: string;
	mutualConnections?: number;
	company?: string;
	className?: string;
}

export function Profile07({
	name,
	title,
	avatar,
	mutualConnections = 0,
	company,
	className,
}: NetworkingCardProps) {
	return (
		<Card
			className={cn(
				'w-full max-w-xs overflow-hidden transition-all duration-300',
				'hover:shadow-md',
				className
			)}
		>
			<div className="h-20 bg-gradient-to-r from-indigo-500 to-purple-600" />
			<CardContent className="pt-0 relative">
				<div className="flex flex-col items-center text-center">
					<ProfileAvatar
						src={avatar}
						alt={name}
						size="lg"
						className="mt-[-24px] border-4 border-background"
					/>

					<div className="mt-3">
						<h3 className="font-semibold text-lg">{name}</h3>
						<p className="text-muted-foreground text-sm">{title}</p>
						{company && <p className="text-sm">{company}</p>}
					</div>

					{mutualConnections > 0 && (
						<div className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full mt-2">
							{mutualConnections} mutual connection
							{mutualConnections > 1 ? 's' : ''}
						</div>
					)}
				</div>
			</CardContent>

			<CardFooter className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					className="flex-1 border-border text-muted-foreground hover:text-foreground"
				>
					<LucideUserX className="mr-1 h-4 w-4" />
					Ignore
				</Button>
				<ActionButton
					variant="connect"
					size="sm"
					className="flex-1"
					icon={LucideUserPlus}
				>
					Connect
				</ActionButton>
			</CardFooter>
		</Card>
	);
}

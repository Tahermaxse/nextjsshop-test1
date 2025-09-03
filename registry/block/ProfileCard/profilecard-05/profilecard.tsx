import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { cn } from '@/lib/utils';
import { StatusBadge } from '../status-badge';
import {
	LucideTrophy,
	LucideStar,
	LucideAward,
	LucideShare2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Achievement {
	icon: 'trophy' | 'star' | 'award';
	label: string;
}

interface AchievementCardProps {
	name: string;
	title: string;
	avatar: string;
	achievements: Achievement[];
	level?: string;
	score?: number;
	className?: string;
}

export function Profile05({
	name,
	title,
	avatar,
	achievements,
	level = 'Expert',
	score = 650,
	className,
}: AchievementCardProps) {
	const iconMap = {
		trophy: LucideTrophy,
		star: LucideStar,
		award: LucideAward,
	};

	return (
		<Card
			className={cn(
				'w-full max-w-xs overflow-hidden transition-all duration-300',
				'hover:shadow-md relative',
				className
			)}
		>
			<div className="absolute top-3 right-3">
				<StatusBadge variant="premium">Premium</StatusBadge>
			</div>

			<CardContent className="pt-6">
				<div className="flex flex-col items-center text-center">
					<div className="relative">
						<ProfileAvatar
							src={avatar}
							alt={name}
							size="lg"
						/>
						<div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-yellow-500 text-white h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs border-2 border-background">
							{level.charAt(0).toUpperCase()}
						</div>
					</div>

					<div className="mt-4 space-y-1">
						<h3 className="font-semibold text-lg">{name}</h3>
						<p className="text-muted-foreground text-sm">{title}</p>

						<div className="flex items-center justify-center gap-1 text-yellow-500">
							<LucideStar className="fill-yellow-500 h-4 w-4" />
							<LucideStar className="fill-yellow-500 h-4 w-4" />
							<LucideStar className="fill-yellow-500 h-4 w-4" />
							<LucideStar className="fill-yellow-500 h-4 w-4" />
							<LucideStar className="h-4 w-4" />
							<span className="text-sm ml-1 text-muted-foreground">
								{score}
							</span>
						</div>
					</div>

					<div className="w-full mt-4 grid grid-cols-3 gap-2">
						{achievements.map((achievement, index) => {
							const Icon = iconMap[achievement.icon];
							return (
								<div
									key={index}
									className="flex flex-col items-center p-2 rounded-md hover:bg-muted/50 transition-colors text-center"
								>
									<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
										<Icon className="h-4 w-4 text-primary" />
									</div>
									<span className="text-xs">{achievement.label}</span>
								</div>
							);
						})}
					</div>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					variant="ghost"
					className="w-full border-t border-border rounded-none text-muted-foreground"
				>
					<LucideShare2 className="mr-2 h-4 w-4" />
					Share Profile
				</Button>
			</CardFooter>
		</Card>
	);
}

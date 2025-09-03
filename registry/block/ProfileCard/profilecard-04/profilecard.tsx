import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ActionButton } from '../action-button';
import { Separator } from '@/components/ui/separator';
import { LucideMessageCircle } from 'lucide-react';

interface Skill {
	name: string;
	level: number; // 0-100
}

interface SkillsCardProps {
	name: string;
	title: string;
	avatar: string;
	skills: Skill[];
	available?: boolean;
	className?: string;
}

export function Profile04({
	name,
	title,
	avatar,
	skills,
	available = true,
	className,
}: SkillsCardProps) {
	return (
		<Card
			className={cn(
				'w-full max-w-xs overflow-hidden transition-all duration-300',
				'hover:shadow-md',
				className
			)}
		>
			<CardContent className="p-5">
				<div className="flex items-center gap-4 mb-4">
					<ProfileAvatar
						src={avatar}
						alt={name}
						size="md"
						statusColor={available ? 'green' : 'gray'}
					/>

					<div>
						<h3 className="font-semibold text-lg leading-tight">{name}</h3>
						<p className="text-muted-foreground text-sm">{title}</p>
					</div>
				</div>

				<Separator className="my-4" />

				<div className="space-y-4">
					<h4 className="font-medium text-sm">Core Skills</h4>

					{skills.map((skill, index) => (
						<div
							key={index}
							className="space-y-1"
						>
							<div className="flex justify-between text-sm">
								<span>{skill.name}</span>
								<span className="text-muted-foreground">{skill.level}%</span>
							</div>
							<Progress
								value={skill.level}
								className={cn(
									'h-2',
									skill.level > 80
										? 'bg-blue-100 [&>div]:bg-blue-600'
										: skill.level > 60
											? 'bg-green-100 [&>div]:bg-green-600'
											: skill.level > 40
												? 'bg-yellow-100 [&>div]:bg-yellow-600'
												: 'bg-red-100 [&>div]:bg-red-600'
								)}
							/>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter className="bg-muted/30 px-5 py-3">
				<ActionButton
					variant="message"
					className="w-full"
					icon={LucideMessageCircle}
				>
					Request Collaboration
				</ActionButton>
			</CardFooter>
		</Card>
	);
}

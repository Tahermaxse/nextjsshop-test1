import { AvatarProps } from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cva, type VariantProps } from 'class-variance-authority';

export const avatarSizes = cva('', {
	variants: {
		size: {
			sm: 'h-10 w-10',
			md: 'h-16 w-16',
			lg: 'h-24 w-24',
			xl: 'h-32 w-32',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

export interface ProfileAvatarProps
	extends AvatarProps,
		VariantProps<typeof avatarSizes> {
	src: string;
	alt: string;
	fallback?: string;
	statusColor?: 'green' | 'yellow' | 'gray' | 'blue' | 'purple' | 'none';
}

export function ProfileAvatar({
	src,
	alt,
	fallback,
	size,
	statusColor = 'none',
	className,
	...props
}: ProfileAvatarProps) {
	const initials =
		fallback ||
		alt
			.split(' ')
			.map((n) => n[0])
			.join('');

	return (
		<div className="relative">
			<Avatar
				className={cn(avatarSizes({ size }), className)}
				{...props}
			>
				<AvatarImage
					src={src}
					alt={alt}
					className="object-cover"
				/>
				<AvatarFallback className="text-primary bg-secondary font-medium">
					{initials}
				</AvatarFallback>
			</Avatar>
			{statusColor !== 'none' && (
				<span
					className={cn(
						'absolute bottom-0 right-0 rounded-full border-2 border-background',
						{
							'bg-green-500': statusColor === 'green',
							'bg-yellow-500': statusColor === 'yellow',
							'bg-gray-500': statusColor === 'gray',
							'bg-blue-500': statusColor === 'blue',
							'bg-purple-500': statusColor === 'purple',
						},
						size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
					)}
				/>
			)}
		</div>
	);
}

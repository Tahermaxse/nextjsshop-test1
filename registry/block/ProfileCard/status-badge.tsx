import { cva, type VariantProps } from 'class-variance-authority';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const statusVariants = cva(
	'transition-all inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
	{
		variants: {
			variant: {
				default: 'bg-primary/10 text-primary',
				online: 'bg-green-500/10 text-green-500',
				away: 'bg-yellow-500/10 text-yellow-500',
				busy: 'bg-red-500/10 text-red-500',
				offline: 'bg-gray-500/10 text-gray-500',
				verified: 'bg-blue-500/10 text-blue-500',
				premium: 'bg-purple-500/10 text-purple-500',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface StatusBadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof statusVariants> {
	withDot?: boolean;
}

export function StatusBadge({
	variant,
	withDot = true,
	className,
	children,
	...props
}: StatusBadgeProps) {
	return (
		<Badge
			className={cn(statusVariants({ variant }), className)}
			{...props}
		>
			{withDot && (
				<span
					className={cn('mr-1 h-2 w-2 rounded-full', {
						'bg-primary': variant === 'default',
						'bg-green-500': variant === 'online',
						'bg-yellow-500': variant === 'away',
						'bg-red-500': variant === 'busy',
						'bg-gray-500': variant === 'offline',
						'bg-blue-500': variant === 'verified',
						'bg-purple-500': variant === 'premium',
					})}
				/>
			)}
			{children}
		</Badge>
	);
}

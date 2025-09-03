import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { DivideIcon as LucideIcon } from 'lucide-react';

export const actionButtonVariants = cva('', {
	variants: {
		variant: {
			connect: 'bg-primary hover:bg-primary/90',
			add: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
			message: 'bg-blue-600 hover:bg-blue-700 text-white',
			view: 'bg-transparent hover:bg-secondary border-border',
		},
	},
	defaultVariants: {
		variant: 'connect',
	},
});

interface ActionButtonProps
	extends Omit<ButtonProps, 'variant'>,
		VariantProps<typeof actionButtonVariants> {
	icon?: typeof LucideIcon;
}

export function ActionButton({
	variant,
	className,
	icon: Icon,
	children,
	...props
}: ActionButtonProps) {
	return (
		<Button
			className={cn(actionButtonVariants({ variant }), className)}
			{...props}
		>
			{Icon && <Icon className="mr-2 h-4 w-4" />}
			{children}
		</Button>
	);
}

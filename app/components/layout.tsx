import { ReactNode } from 'react';
import { componentSEO,viewport } from '@/config/site';

export const metadata = componentSEO;
export { viewport };

// Layout component
export default function ComponentsLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <div className="min-h-screen">{children}</div>;
}

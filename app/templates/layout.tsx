import { ReactNode } from 'react';
import { templateSEO, viewport } from '@/config/site';

export const metadata = templateSEO;
export { viewport };


// Layout component
export default function TemplatesLayout({ children }: { children: ReactNode }) {
	return <div className="min-h-screen">{children}</div>;
}

import { ReactNode } from 'react';
import { viewport, siteConfig, generatePageSEO } from '@/config/site';
import { Metadata } from 'next';

export { viewport };

export const metadata: Metadata = generatePageSEO(
  'Free UI Components',
  `Explore a collection of copy-and-paste UI components built with Tailwind CSS and React at ${siteConfig.name}. Perfect for quickly building stunning application UIs.`,
  '/components/free'
);

// Layout component
export default function FreeLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

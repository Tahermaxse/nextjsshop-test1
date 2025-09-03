import { getComponents } from '@/lib/api';
import ComponentsPageClient from './components/ComponentsPageClient';

// Enable ISR with a revalidation period of 60 seconds
export const revalidate = 3600;

export default async function ComponentsPage() {
	// Fetch initial components on the server
	const initialComponents = await getComponents();

	return <ComponentsPageClient initialComponents={initialComponents} />;
}

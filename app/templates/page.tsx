import { getTemplates } from '@/lib/api';
import TemplatesPageClient from './components/TemplatesPageClient';

// Enable ISR with a revalidation period of 60 seconds
export const revalidate = 3600;

export default async function TemplatesPage() {
	// Fetch initial templates on the server
	const initialTemplates = await getTemplates();

	return <TemplatesPageClient initialTemplates={initialTemplates} />;
}

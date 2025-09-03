// page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import EditTemplateClient from './EditTemplateForm';

type PageParams = Promise<{ id: string }>;
type SearchParamsType = Promise<{ [key: string]: string | string[] }>;

type Props = {
  params: PageParams;
  searchParams?: SearchParamsType;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Edit Component ${params.id}`,
  };
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : {};
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditTemplateClient params={{ id: params.id }} searchParams={searchParams} />
    </Suspense>
  );
}
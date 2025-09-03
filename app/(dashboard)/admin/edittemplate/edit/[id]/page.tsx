import { Suspense } from 'react';
import { Metadata } from 'next';
import EditTemplateClient from './EditTemplateForm';

type PageParams = Promise<{ id: string }>;
type SearchParamsType = Promise<{ [key: string]: string | string[] | undefined }>;

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
  const searchParams = props.searchParams ? Object.fromEntries(Object.entries(await props.searchParams).filter(([_, v]) => v !== undefined)) as { [key: string]: string | string[] } : undefined;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditTemplateClient params={{ id: params.id }} searchParams={searchParams} />
    </Suspense>
  );
}
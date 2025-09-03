import React from 'react';
import { getBlogPosts } from '@/utils/mdx';
import Blog from '@/components/Blog/Blog';
import { Metadata, ResolvingMetadata } from 'next';

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata(
  { searchParams }: BlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const allPosts = await getBlogPosts();
  
  return {
    title: 'Blog | Nextjsshop',
    description: 'Explore our latest articles, tutorials, and insights about product development, user stories, and community updates.',
    openGraph: {
      title: 'Blog | Nextjsshop',
      description: 'Explore our latest articles, tutorials, and insights about product development, user stories, and community updates.',
      type: 'website',
      url: 'https://nextjsshop.com/resources/blog',
      images: [
        {
          url: allPosts[0]?.coverImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Nextjsshop Blog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | Nextjsshop',
      description: 'Explore our latest articles, tutorials, and insights about product development, user stories, and community updates.',
      images: [allPosts[0]?.coverImage || '/og-image.png'],
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page;
  const currentPage = page ? Number(page) : 1;
  const allPosts = await getBlogPosts();

  const postsPerPage = 9;
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  const pagination = {
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };

  return (
    <div className="max-w-[1200px] mx-auto overflow-x-hidden dark:bg-zinc-900">
      <Blog 
        posts={paginatedPosts}
        pagination={pagination}
      />
    </div>
  );
}
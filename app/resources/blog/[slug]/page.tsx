import React from 'react';
import { getBlogPost, getBlogPosts } from '@/utils/mdx';
import BlogDetails from '@/components/Blog/BlogDetails';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
  
}

export async function generateMetadata(
  { params}: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Nextjsshop',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Nextjsshop Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://nextjsshop.com/resources/blog/${slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="max-w-[1200px] mx-auto overflow-x-hidden dark:bg-zinc-900">
      <BlogDetails 
        post={post}
        relatedPosts={relatedPosts}
      />
    </div>
  );
}
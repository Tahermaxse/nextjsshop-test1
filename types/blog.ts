import type { SerializeResult } from 'next-mdx-remote-client';

export interface Author {
  name: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string[];
  author: Author;
  coverImage: string;
  content?: SerializeResult;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface BlogListProps {
  posts: BlogPost[];
  pagination: PaginationProps;
}

export interface BlogDetailsProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
} 
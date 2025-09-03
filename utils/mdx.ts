import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';
import { serialize } from 'next-mdx-remote-client/serialize';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(POSTS_PATH)) {
      console.warn(`Blog posts directory not found at: ${POSTS_PATH}`);
      return [];
    }

    const files = fs.readdirSync(POSTS_PATH);
    const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(POSTS_PATH, file);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(source);
        const mdxSource = await serialize({
          source: content,
          options: {
            parseFrontmatter: true,
            scope: data
          }
        });

        const slug = file.replace(/\.(mdx|md)$/, '');

        return {
          slug,
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || new Date().toISOString(),
          category: Array.isArray(data.category)
            ? data.category
            : data.category
              ? [data.category]
              : ['General'],
          coverImage: data.coverImage || '/images/default-cover.jpg',
          author: {
            name: data.author?.name || 'Anonymous',
            avatar: data.author?.avatar || '/images/default-avatar.jpg',
          },
          content: mdxSource,
        } as BlogPost;
      })
    );

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    let source: string;

    // Try .mdx first, then .md
    if (fs.existsSync(filePath)) {
      source = fs.readFileSync(filePath, 'utf8');
    } else {
      const mdFilePath = path.join(POSTS_PATH, `${slug}.md`);
      if (fs.existsSync(mdFilePath)) {
        source = fs.readFileSync(mdFilePath, 'utf8');
      } else {
        return null;
      }
    }

    const { data, content } = matter(source);
    const mdxSource = await serialize({
      source: content,
      options: {
        parseFrontmatter: true,
        scope: data
      }
    });

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      category: Array.isArray(data.category)
        ? data.category
        : data.category
          ? [data.category]
          : ['General'],
      coverImage: data.coverImage || '/images/default-cover.jpg',
      author: {
        name: data.author?.name || 'Anonymous',
        avatar: data.author?.avatar || '/images/default-avatar.jpg',
      },
      content: mdxSource,
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

// Helper function to get posts by a single category
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.filter(post =>
    post.category.some(c => c.toLowerCase() === category.toLowerCase())
  );
}

// Helper function to get posts by multiple categories
export async function getBlogPostsByCategories(categories: string[]): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.filter(post =>
    post.category.some(c => categories.map(cat => cat.toLowerCase()).includes(c.toLowerCase()))
  );
}

// Helper function to get recent posts
export async function getRecentBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.slice(0, limit);
}

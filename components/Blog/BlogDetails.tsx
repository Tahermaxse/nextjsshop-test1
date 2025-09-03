'use client';

import React from 'react';
import { BlogPost } from '@/types/blog';
import MDXContent from './MDXContent';
import Link from 'next/link';
import BlogShare from './BlogShare';

// Import your interactive components here
import PressableButton from '@/components/Blog/content/PressableButton';
// Add more components as needed
// import { InteractiveChart } from '@/components/Blog/content/InteractiveChart';
// import { CodePlayground } from '@/components/Blog/content/CodePlayground';

// Define the components that will be available in MDX
const mdxComponents = {
  PressableButton,
  // Add more components here
  // InteractiveChart,
  // CodePlayground,
};

interface BlogDetailsProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ post, relatedPosts }) => {
  return (
    <main id="main" className="flex-grow dark:bg-[#09090B] dark:text-zinc-100">
      <div className="w-full max-w-content px-6 md:px-16 relative mx-auto py-16 xl:py-32 flex flex-col items-center xl:items-start xl:flex-row justify-between gap-6 xl:gap-16">
        <Link
          target="_self"
          rel=""
          className="flex items-center group/link transition-all hover:text-ui-fg-subtle dark:hover:text-zinc-400 text-compact-medium-plus gap-1 max-w-post w-full xl:w-auto xl:mr-[103px]"
          href="/resources/blog/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={15}
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              clipPath="url(#a)"
            >
              <path d="M1.5 5.056h8.667a3.333 3.333 0 0 1 0 6.666H6.833" />
              <path d="M4.611 8.167 1.5 5.056l3.111-3.112" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h15v15H0z" />
              </clipPath>
            </defs>
          </svg>
          Blog
        </Link>
        <div className="max-w-post flex flex-col gap-10 md:gap-14 w-full shrink-0">
          <div>
            <div className="mb-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <p className="flex gap-2 flex-wrap text-compact-medium-plus text-ui-fg-base dark:text-zinc-300">
                    <span>{post.date}</span>·<span>{post.category}</span>
                  </p>
                  <h1 className="text-headers-h3 dark:text-zinc-100">{post.title}</h1>
                  <div className="flex flex-col gap-2 !flex-row items-center text-small-plus">
                    <div className="flex h-7 items-center">
                      <div className="hover:mr-2 transition-all duration-300">
                        <span className="relative">
                          <span className="pointer-events-none z-10 absolute flex left-0 min-w-max md:left-1/2 md:-translate-x-1/2 -translate-y-1 bottom-full bg-ui-bg-component dark:bg-zinc-800 text-compact-xsmall rounded-lg shadow-elevation-tooltip dark:shadow-[#09090B] py-1 px-2 transition-all whitespace-nowrap origin-bottom scale-75 opacity-0 mb-1">
                            <p className="text-ui-fg-base dark:text-zinc-100 text-compact-xsmall-plus">
                              <span>{post.author.name}</span>
                            </p>
                          </span>
                          <span className="cursor-pointer">
                            <img
                              alt={`${post.author.name} avatar`}
                              loading="lazy"
                              width={24}
                              height={24}
                              decoding="async"
                              data-nimg={1}
                              className="w-[18px] h-[18px] ring-1 ring-offset-2 ring-ui-border-strong dark:ring-zinc-700 hover:ring-ui-fg-base dark:hover:ring-zinc-500 rounded-full object-cover"
                              src={post.author.avatar}
                              style={{ color: "transparent" }}
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="text-ui-fg-subtle dark:text-zinc-400">
                      <p>{post.author.name}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xlarge-plus text-ui-fg-base dark:text-zinc-300">{post.description}</p>
                <div aria-owns="rmiz-modal-dda5b45753aa" data-rmiz="">
                  <div data-rmiz-content="found" style={{ visibility: "visible" }}>
                    <img
                      alt="Cover image"
                      loading="lazy"
                      width={3200}
                      height={1672}
                      decoding="async"
                      data-nimg={1}
                      className="bg-white dark:bg-[#09090B] transition-shadow w-full shadow-elevation-card-rest dark:shadow-[#09090B] rounded-xl hover:shadow-elevation-card-hover dark:hover:shadow-zinc-800"
                      src={post.coverImage}
                      style={{ color: "transparent" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {post.content && (
                <MDXContent 
                  content={post.content} 
                  components={mdxComponents}
                />
              )}
            </div>
          </div>
          <BlogShare post={post} />
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="flex flex flex-col gap-6 bg-transparent">
              <h2 className="text-headers-h4 dark:text-zinc-100">You may also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    className="h-full flex flex-col group transition-all hover:-translate-y-1"
                    href={`/resources/blog/${relatedPost.slug}`}
                  >
                    <img
                      alt={`${relatedPost.title} cover image`}
                      loading="lazy"
                      width={3200}
                      height={1672}
                      decoding="async"
                      data-nimg={1}
                      className="w-full rounded-lg mb-6 aspect-post object-cover shadow-elevation-card-rest dark:shadow-[#09090B]"
                      src={relatedPost.coverImage}
                      style={{ color: "transparent" }}
                    />
                    <div className="flex flex-col gap-2 @container">
                      <p className="flex gap-2 flex-wrap text-compact-medium-plus text-ui-fg-base dark:text-zinc-300">
                        <span className="hidden @[18rem]:inline dark:text-zinc-300">{relatedPost.date}</span>
                        <span className="hidden @[18rem]:inline dark:text-zinc-300">·</span>
                        <span className="dark:text-zinc-300">{relatedPost.category}</span>
                      </p>
                      <h3 className="text-xlarge-plus text-ui-fg-base dark:text-zinc-100">{relatedPost.title}</h3>
                      <div className="flex flex-col gap-2 !flex-row items-center text-small-plus">
                        <div className="flex h-7 items-center">
                          <div className="transition-all duration-300">
                            <img
                              alt={`${relatedPost.author.name} avatar`}
                              loading="lazy"
                              width={24}
                              height={24}
                              decoding="async"
                              data-nimg={1}
                              className="w-[18px] h-[18px] ring-1 ring-offset-2 ring-ui-border-strong dark:ring-zinc-700 rounded-full object-cover"
                              src={relatedPost.author.avatar}
                              style={{ color: "transparent" }}
                            />
                          </div>
                        </div>
                        <div className="text-ui-fg-subtle dark:text-zinc-400">
                          <p>{relatedPost.author.name}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-[152px] hidden xl:block" />
      </div>
    </main>
  );
};

export default BlogDetails;
'use client';

import React, { useState } from "react";
import { BlogListProps } from "@/types/blog";
import Pagination from "./Pagination";
import CTA from "@/components/Blog/CTA";
import Link from "next/link";

const Blog: React.FC<BlogListProps> = ({ posts, pagination }) => {
  const [selectedCategory, setSelectedCategory] = useState('All articles');

  // Get unique categories from posts (flatten arrays first)
  const categories = [
    'All articles',
    ...Array.from(
      new Set(posts.flatMap(post => post.category)) // flatten category arrays
    )
  ];

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === 'All articles'
      ? posts
      : posts.filter(post =>
          post.category.some(c => c.toLowerCase() === selectedCategory.toLowerCase())
        );

  return (
    <div>
      <main id="main" className="flex-grow dark:bg-[#09090B] dark:text-zinc-100">
        <h1 className="sr-only dark:text-zinc-100">Blog</h1>
        
        {filteredPosts.length > 0 && (
          <Link
            className="h-full transition-all flex flex-col lg:flex-row gap-x-16 gap-y-6 lg:items-center group mx-auto px-6 py-16 lg:py-24 lg:px-16 espace-pre-wrap hide-breaks md:show-breaks max-w-content hover:bg-ui-bg-subtle-hover dark:hover:bg-zinc-800/50"
            href={`/resources/blog/${filteredPosts[0].slug}`}
          >
            <img
              alt={`${filteredPosts[0].title} cover image`}
              loading="lazy"
              width={3200}
              height={1672}
              decoding="async"
              data-nimg={1}
              className="lg:basis-1/2 rounded-lg min-w-0 aspect-post object-cover transition-shadow shadow-elevation-card-rest group-hover:shadow-elevation-card-hover"
              src={filteredPosts[0].coverImage}
              style={{ color: "transparent" }}
            />
            <div className="lg:basis-1/2 flex flex-col gap-2 @container">
              <p className="flex gap-2 flex-wrap text-compact-medium-plus text-ui-fg-base dark:text-zinc-300">
                <span className="hidden @xs:inline dark:text-zinc-300">{filteredPosts[0].date}</span>
                <span className="hidden @xs:inline dark:text-zinc-300">·</span>
                {/* show multiple categories joined by commas */}
                <span className="dark:text-zinc-300">
                  {filteredPosts[0].category.join(", ")}
                </span>
              </p>
              <h2 className="text-headers-h3 text-ui-fg-base dark:text-white">
                {filteredPosts[0].title}
              </h2>
              <div className="flex flex-col gap-2 !flex-row items-center text-small-plus">
                <div className="flex h-7 items-center">
                  <div className="transition-all duration-300">
                    <img
                      alt={`${filteredPosts[0].author.name} avatar`}
                      loading="lazy"
                      width={24}
                      height={24}
                      decoding="async"
                      data-nimg={1}
                      className="w-[18px] h-[18px] ring-1 ring-offset-2 dark:border-zinc-800 ring-ui-border-strong dark:ring-zinc-700 rounded-full object-cover"
                      src={filteredPosts[0].author.avatar}
                      style={{ color: "transparent" }}
                    />
                  </div>
                </div>
                <div className="text-ui-fg-subtle dark:text-zinc-400">
                  <p>{filteredPosts[0].author.name}</p>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="border-t border-theme-border-base dark:border-zinc-800 w-full h-[2px] bg-white dark:bg-zinc-800" />

        <div>
          {/* Category filter buttons */}
          <div className="mx-auto py-8 px-6 lg:px-16 max-w-content flex justify-between flex-col md:flex-row gap-3">
            <h2 className="text-headers-h4 dark:text-zinc-100">Recent posts</h2>
            <div className="flex flex-col items-center">
              <div className="flex gap-2 items-center overflow-x-auto hide-scrollbars py-[1px] w-screen px-6 md:w-auto md:px-0 md:py-0 md:overflow-visible">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full flex items-center justify-center py-1 border transition-all whitespace-nowrap px-3 !text-compact-small-plus h-[32px] md:hover:bg-ui-bg-base dark:md:hover:bg-zinc-800 ${
                      selectedCategory === category
                        ? 'border-ui-bg-base shadow-elevation-card-rest bg-ui-bg-base text-ui-fg-base dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'
                        : 'border-transparent text-ui-fg-muted dark:text-zinc-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-theme-border-base dark:border-zinc-800 w-full h-[2px] bg-white dark:bg-zinc-800" />

          {/* Posts Grid */}
          <div className="scroll-m-40 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto max-w-content w-full">
            {filteredPosts.slice(1).map((post) => (
              <div
                key={post.slug}
                className="relative md:border-r border-ui-border-base dark:border-zinc-800 even:md:border-r-0 even:lg:border-r xl:[&:nth-child(3n)]:border-r-0"
              >
                <Link
                  className="h-full transition-all flex flex-col group px-6 py-8 lg:px-16 lg:py-16 hover:bg-ui-bg-subtle-hover dark:hover:bg-zinc-800/50 rounded-none"
                  href={`/resources/blog/${post.slug}`}
                >
                  <img
                    alt={`${post.title} cover image`}
                    loading="lazy"
                    width={3200}
                    height={1672}
                    decoding="async"
                    data-nimg={1}
                    className="w-full rounded-lg mb-6 aspect-post object-cover shadow-elevation-card-rest dark:shadow-[#09090B]"
                    src={post.coverImage}
                    style={{ color: "transparent" }}
                  />
                  <div className="flex flex-col gap-2 @container">
                    <p className="flex gap-2 flex-wrap text-compact-medium-plus text-ui-fg-base dark:text-zinc-300">
                      <span className="hidden @[18rem]:inline dark:text-zinc-300">{post.date}</span>
                      <span className="hidden @[18rem]:inline dark:text-zinc-300">·</span>
                      {/* join multiple categories */}
                      <span className="dark:text-zinc-300">
                        {post.category.join(", ")}
                      </span>
                    </p>
                    <h3 className="text-xlarge-plus text-ui-fg-base dark:text-zinc-100">
                      {post.title}
                    </h3>
                    <div className="flex flex-col gap-2 !flex-row items-center text-small-plus">
                      <div className="flex h-7 items-center">
                        <div className="transition-all duration-300">
                          <img
                            alt={`${post.author.name} avatar`}
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            className="w-[18px] h-[18px] ring-1 ring-offset-2 dark:border-zinc-800 ring-ui-border-strong dark:ring-zinc-700 rounded-full object-cover"
                            src={post.author.avatar}
                            style={{ color: "transparent" }}
                          />
                        </div>
                      </div>
                      <div className="text-ui-fg-subtle dark:text-zinc-400">
                        <p>{post.author.name}</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="border-t border-theme-border-base dark:border-zinc-800 w-full h-[2px] bg-white dark:bg-zinc-800 absolute left-0 right-0 bottom-0" />
              </div>
            ))}
          </div>

          <div className="border-t border-theme-border-base dark:border-zinc-800 w-full h-[2px] bg-white dark:bg-zinc-800" />

          <Pagination {...pagination} />
        </div>
        <CTA />
      </main>
    </div>
  );
};

export default Blog;

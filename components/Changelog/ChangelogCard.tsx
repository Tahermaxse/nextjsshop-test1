import Link from "next/link";
import React from "react";

interface Author {
  name: string;
  handle: string;
  avatarUrl: string;
  profileUrl: string;
}

interface ChangelogCardProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageLink: string;
  authors: Author[];
}

const ChangelogCard: React.FC<ChangelogCardProps> = ({
  date,
  title,
  description,
  imageUrl,
  imageAlt,
  imageLink,
  authors,
}) => {
  // Format description to handle line breaks and preserve formatting
  const formatDescription = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <div key={index} className="h-4" />; // Empty line spacing
      }
      
      // Handle bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={index} className="flex items-start gap-2 ml-4">
            <span className="text-ui-fg-subtle dark:text-zinc-400 mt-1">•</span>
            <span>{line.trim().substring(1).trim()}</span>
          </div>
        );
      }
      
      // Handle section headers (lines ending with :)
      if (line.trim().endsWith(':') && line.trim().length > 1) {
        return (
          <div key={index} className="font-semibold text-ui-fg-base dark:text-zinc-200 mt-4 mb-2">
            {line.trim()}
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <div key={index} className="mb-2">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="relative border-b border-theme-border-base dark:border-zinc-800" style={{ zIndex: 11 }}>
      <div className="py-16 flex flex-col lg:flex-row gap-4 lg:gap-0 w-full">
        <div className="lg:sticky lg:top-8 left-0 h-11 flex items-start text-medium-plus text-ui-fg-subtle dark:text-zinc-400 w-auto lg:w-40">
          <span>{date}</span>
        </div>
        <div className="lg:max-w-[560px] lg:mx-auto flex flex-col gap-6 grow">
          <h2 className="text-headers-h3 text-ui-fg-base dark:text-zinc-100 leading-tight">
            {title}
          </h2>
          
          <div className="group cursor-pointer">
            <a href={imageLink} target="_blank" rel="noopener noreferrer">
              <img
                alt={imageAlt}
                src={imageUrl}
                className="w-full rounded-xl shadow-elevation-card-rest dark:shadow-zinc-800 hover:shadow-elevation-card-hover dark:hover:shadow-zinc-700 transition-shadow duration-300"
                style={{ color: "transparent" }}
              />
            </a>
          </div>
          
          <div className="post-markdown text-ui-fg-subtle dark:text-zinc-400 text-medium-plus leading-relaxed">
            <div className="space-y-1">
              {formatDescription(description)}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-theme-border-base/50 dark:border-zinc-800/50">
            <div className="flex gap-3 items-center">
              <div className="flex -space-x-2">
                {authors.map((author, idx) => (
                  <a
                    key={idx}
                    href={author.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative hover:z-10 transform hover:scale-110 transition-transform duration-200"
                    title={author.name}
                  >
                    <img
                      alt={author.name}
                      src={author.avatarUrl}
                      className="w-[24px] h-[24px] rounded-full object-cover border-2 border-white dark:border-zinc-900"
                    />
                  </a>
                ))}
              </div>
              <span className="text-small-plus text-ui-fg-subtle dark:text-zinc-400">
                {authors.map((a) => a.handle).join(", ")}
              </span>
            </div>
            
            <Link
              href={imageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small-plus text-ui-fg-subtle dark:text-zinc-400 hover:text-ui-fg-base dark:hover:text-zinc-200 transition-colors duration-200 underline decoration-dotted underline-offset-4"
            >
              View Release →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangelogCard;
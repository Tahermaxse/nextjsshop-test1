import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BlogPost } from "@/types/blog";

interface BlogShareProps {
  post: BlogPost;
}

const BlogShare: React.FC<BlogShareProps> = ({ post }) => {
  const blogUrl = typeof window !== 'undefined' ? window.location.href : '';
  const blogTitle = post.title;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(blogUrl);
  };

  const xShareUrl = `https://x.com/intent/post?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;

  return (
    <div className="text-ui-fg-muted">
      <p className="mb-3">Share this post</p>
      <div className="flex text-ui-fg-subtle">
        <div className="flex" data-state="closed">
           <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={handleCopyLink}
            className="transition-fg inline-flex items-center justify-center overflow-hidden rounded-md outline-none disabled:bg-ui-bg-disabled disabled:shadow-buttons-neutral disabled:text-ui-fg-disabled text-ui-fg-subtle bg-ui-button-transparent hover:bg-ui-button-transparent-hover active:bg-ui-button-transparent-pressed focus-visible:shadow-buttons-neutral-focus focus-visible:bg-ui-bg-base disabled:!bg-transparent disabled:!shadow-none h-7 w-7 p-1">
            <svg
              width={15}
              height={15}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.93934 4.46447L8.53033 2.87348C9.79959 1.60422 11.8573 1.60422 13.1265 2.87348C14.3958 4.14273 14.3958 6.20041 13.1265 7.46967L11.5355 9.06066"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.46448 6.93933L2.87349 8.53032C1.60423 9.79958 1.60423 11.8573 2.87349 13.1265C4.14274 14.3958 6.20042 14.3958 7.46968 13.1265L9.06067 11.5355"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.40902 9.59098L9.591 6.409"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          Copy
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
        </div>
        <a
          href={xShareUrl}
          target="_blank"
          rel="noreferrer"
          className="transition-fg inline-flex items-center justify-center overflow-hidden rounded-md outline-none disabled:bg-ui-bg-disabled disabled:shadow-buttons-neutral disabled:text-ui-fg-disabled text-ui-fg-subtle bg-ui-button-transparent hover:bg-ui-button-transparent-hover active:bg-ui-button-transparent-pressed focus-visible:shadow-buttons-neutral-focus focus-visible:bg-ui-bg-base disabled:!bg-transparent disabled:!shadow-none h-7 w-7 p-1"
        >
          <span className="">
            <span className="overflow-hidden">
              <svg
                width={15}
                height={15}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 1.5625H6.90625L11.1072 7.42435L16.1875 1.5625H18.4375L12.1257 8.84539L19 18.4375H13.0938L8.89276 12.5757L3.8125 18.4375H1.5625L7.87435 11.1546L1 1.5625ZM13.9605 16.75L4.28548 3.25H6.03952L15.7146 16.75H13.9605Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={linkedInShareUrl}
          className="transition-fg inline-flex items-center justify-center overflow-hidden rounded-md outline-none disabled:bg-ui-bg-disabled disabled:shadow-buttons-neutral disabled:text-ui-fg-disabled text-ui-fg-subtle bg-ui-button-transparent hover:bg-ui-button-transparent-hover active:bg-ui-button-transparent-pressed focus-visible:shadow-buttons-neutral-focus focus-visible:bg-ui-bg-base disabled:!bg-transparent disabled:!shadow-none h-7 w-7 p-1"
        >
          <span className="">
            <span className="overflow-hidden">
              <svg
                width={15}
                height={15}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 1H5C2.92925 1 1 2.92925 1 5V15C1 17.0707 2.92925 19 5 19H15C17.0715 19 19 17.0707 19 15V5C19 2.92925 17.0715 1 15 1ZM7 15.25H4.75V7H7V15.25ZM5.875 6.049C5.1505 6.049 4.5625 5.4565 4.5625 4.726C4.5625 3.9955 5.1505 3.403 5.875 3.403C6.5995 3.403 7.1875 3.9955 7.1875 4.726C7.1875 5.4565 6.60025 6.049 5.875 6.049ZM16 15.25H13.75V11.047C13.75 8.521 10.75 8.71225 10.75 11.047V15.25H8.5V7H10.75V8.32375C11.797 6.38425 16 6.241 16 10.1808V15.25Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default BlogShare;

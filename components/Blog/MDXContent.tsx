'use client';

import React, { useState } from 'react';
import { MDXClient } from 'next-mdx-remote-client';
import type { SerializeResult } from 'next-mdx-remote-client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MDXContentProps {
  content: SerializeResult;
  components?: Record<string, React.ComponentType<any>>;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

interface CodeBlockProps {
  children: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const codeString = String(children).replace(/\n$/, '');
  const lines = codeString.split('\n');
  const shouldShowToggle = lines.length > 10;
  const displayCode = shouldShowToggle && !isExpanded 
    ? lines.slice(0, 10).join('\n') 
    : codeString;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 p-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>

      <SyntaxHighlighter
        language={language}
        style={atomDark}
        showLineNumbers
        customStyle={{
          borderRadius: '8px',
          padding: '1.25rem',
          fontSize: '14px',
          backgroundColor: '#27272A',
          borderColor: '#FFFFFF1A',
          borderWidth: '2px',
          borderStyle: 'solid',
          paddingBottom: shouldShowToggle ? '3rem' : '1.25rem',
        }}
      >
        {displayCode}
      </SyntaxHighlighter>

      {/* Expand/Collapse button */}
      {shouldShowToggle && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#27272A] to-transparent flex items-end justify-center pb-2">
          <button
            onClick={toggleExpanded}
            className="z-10 text-compact-xsmall-plus absolute p-2 bottom-[5px] left-[5px] right-[5px] bg-[#3d3d3f] hover:bg-[#454547] transition-colors border border-[#ffffff10] text-white rounded-b-lg"
          >
            {isExpanded ? (
              <>
                <span>Collapse</span>
              </>
            ) : (
              <>
                <span>Expand</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const MDXContent: React.FC<MDXContentProps> = ({ content, components = {} }) => {
  if ('error' in content) {
    return <div>Error loading content</div>;
  }

  // Default MDX components with your existing styling
  const defaultComponents = {
    h1: (props: ComponentProps) => <h1 className="dark:text-white text-3xl md:text-4xl lg:text-5xl" {...props} />,
    h2: (props: ComponentProps) => <h2 className="dark:text-white text-2xl md:text-3xl lg:text-4xl" {...props} />,
    h3: (props: ComponentProps) => <h3 className="dark:text-white text-xl md:text-2xl lg:text-3xl" {...props} />,
    p: (props: ComponentProps) => <p className="dark:text-zinc-300 text-base md:text-lg" {...props} />,
    img: (props: ComponentProps) => (
      <img 
        className='bg-white transition-shadow mx-auto rounded-xl box-border border-[0.5px] border-[#18181B10] dark:border-zinc-800 hover:shadow-elevation-card-hover w-full md:max-w-md lg:max-w-lg xl:max-w-xl !max-h-[700px] h-auto' 
        src={props.src} 
        alt={props.alt || ''} 
        {...props}
      />
    ),
    a: (props: ComponentProps) => <a className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" {...props} />,
    code: (props: ComponentProps) => {
      const { children, className } = props;
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <CodeBlock language={match[1]}>{String(children)}</CodeBlock>
      ) : (
        <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm" {...props} />
      );
    },
    pre: (props: ComponentProps) => {
      const { children } = props;
      if (React.isValidElement(children) && children.props?.className?.includes('language-')) {
        return <div className="my-4">{children}</div>;
      }
      return <pre className="bg-[#18181B] dark:bg-zinc-800 p-4 rounded-[12px] overflow-x-auto" {...props} />;
    },
  };

  // Merge default components with custom components
  // Custom components take precedence over default ones
  const allComponents = {
    ...defaultComponents,
    ...components,
  };

  return (
    <div className="prose prose-lg max-w-post w-full px-4 prose prose-lg max-w-none dark:prose-invert">
      <MDXClient 
        compiledSource={content.compiledSource}
        frontmatter={content.frontmatter}
        scope={content.scope}
        components={allComponents}
      />
    </div>
  );
};

export default MDXContent;
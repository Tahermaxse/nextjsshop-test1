import React from 'react';
import { Link } from 'lucide-react';
import {Footer, Main, Section} from '@/types/sections'

interface ContentProps {
  sections: Section[];
  mainparagraph?: Main['mainparagraph'];
  footer?: Footer['footer'];
}

const Content: React.FC<ContentProps> = ({ sections,mainparagraph,footer }) => {
  return (
    <div className="col-span-4 md:col-span-3 bg-white dark:bg-[#09090B] transition-colors duration-300 ease-in-out">
      <article className="prose prose-neutral max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-a:font-medium prose-a:text-neutral-500 prose-a:underline-offset-4 hover:prose-a:text-black dark:prose-a:text-zinc-400 dark:hover:prose-a:text-zinc-100 prose-thead:text-lg w-full">
        {mainparagraph}
        <div className="relative -mb-4 pt-4">
          {sections.map((section, index) => (
            <div key={section.id} className="relative" id={section.id}>
              <div className="absolute bottom-0 left-4 top-0 w-px bg-gray-300 dark:bg-zinc-700 transition-colors duration-300 ease-in-out" />
              <div className="not-prose">
                <a href={`#${section.id}`} className="group relative flex items-center gap-4 py-0">
                  <div className="flex size-8 flex-none items-center justify-center rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 transition-colors duration-300 ease-in-out">
                    <p className="font-display font-bold text-gray-700 dark:text-zinc-200 group-hover:hidden">{index + 1}</p>
                    <Link className="hidden w-4 h-4 text-gray-500 group-hover:inline-block" />
                  </div>
                  <h2 className="!m-0 scroll-mt-20 font-display text-xl font-medium text-neutral-800 dark:text-zinc-100" id={section.id}>
                    {section.title}
                  </h2>
                </a>
              </div>
              <div className="ml-12 pb-4 text-gray-700 dark:text-zinc-200">{section.content}</div>
            </div>
          ))}
        </div>
        <hr className="border-gray-200 dark:border-zinc-700 transition-colors duration-300 ease-in-out" />
        {footer}
      </article>
    </div>
  );
};

export default Content;
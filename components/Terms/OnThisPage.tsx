import React, { useEffect, useState } from 'react';
import {Section} from '@/types/sections'

interface OnThisPageProps {
  sections: Section[];
}

const OnThisPage: React.FC<OnThisPageProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  return (
    <div className="sticky top-20 flex-col bg-white dark:bg-[#09090B] transition-colors duration-300 ease-in-out">
      <div>
        <p className="-ml-0.5 flex items-center gap-1.5 text-sm text-gray-500 dark:text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-align-left h-4 w-4 text-gray-600 dark:text-zinc-400"
          >
            <line x1={21} x2={3} y1={6} y2={6} />
            <line x1={15} x2={3} y1={12} y2={12} />
            <line x1={17} x2={3} y1={18} y2={18} />
          </svg>
          On this page
        </p>
        <div className="mt-4 grid gap-4 border-l-2 border-gray-200 dark:border-zinc-700 transitionzglcolors duration-300 ease-in-out">
          {sections.map((section) => (
            <a
              key={section.id}
              data-active={activeSection === section.id}
              href={`#${section.id}`}
              className="relative -ml-0.5"
              style={{ paddingLeft: 16 }}
            >
              <p
                className={`text-sm transition-colors duration-300 ease-in-out ${
                  activeSection === section.id ? 'text-black dark:text-zinc-100' : 'text-gray-500 dark:text-zinc-400'
                }`}
              >
                {section.title}
              </p>
              <div
                className={`absolute left-0 top-0 h-full w-0.5 transition-colors duration-300 ease-in-out ${
                  activeSection === section.id ? 'bg-black dark:bg-zinc-100' : 'bg-transparent'
                }`}
                style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnThisPage;
import React from "react";
import {
  FolderKanban,
  LayoutDashboard,
  Lock,
  FileCode2,
  Paintbrush,
  Settings2,
  Info,
} from "lucide-react";

const FolderStructure = () => {
  return (
    <div
      id="folder-structure"
      className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left"
    >
      <div className="p-8 sm:p-12 space-y-12">
        {/* Section Header */}
        <div>
          <div className="flex items-center space-x-2 text-neutral-900 dark:text-zinc-100">
            <FolderKanban className="h-5 w-5" />
            <h2 className="font-display text-2xl font-semibold">
              Folder Structure
            </h2>
          </div>
          <p className="mt-2 text-base text-neutral-500 dark:text-zinc-400">
            A clean and scalable folder structure built on{" "}
            <strong className="text-neutral-800 dark:text-zinc-100">
              Next.js App Router
            </strong>{" "}
            and{" "}
            <strong className="text-neutral-800 dark:text-zinc-100">
              TailwindCSS
            </strong>
            .
          </p>
        </div>

        {/* Project Layout */}
        <div>
          <div className="flex items-center space-x-2 text-neutral-900 dark:text-zinc-100">
            <LayoutDashboard className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Project Layout Overview</h3>
          </div>
          <pre className="mt-4 bg-zinc-900 text-white text-sm rounded-lg p-4 overflow-x-auto">
            {`/
├── app/                  → All route files (App Router based)
│   ├── login/            → Auth route (Login form)
│   ├── signup/           → Auth route (Signup form)
│   └── page.tsx          → Homepage
│
├── components/           → Core UI components (Header, Hero, Footer, etc.)
├── components/ui/        → ShadCN UI components (if used)
├── lib/                  → Utility functions (e.g., form validation)
├── hooks/                → Custom React hooks
├── public/               → Static assets (images, icons, etc.)
├── styles/               → TailwindCSS global styles
├── types/                → Shared TypeScript definitions
├── figma/                → Figma design file(s)
├── tailwind.config.ts    → Tailwind configuration
└── package.json`}
          </pre>
        </div>

        {/* Highlights */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-neutral-900 dark:text-zinc-100">
            <FileCode2 className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Highlights</h3>
          </div>
          <ul className="list-disc list-inside text-neutral-500 dark:text-zinc-400 space-y-1">
            <li>
              <strong className="text-neutral-800 dark:text-zinc-100">
                App Router Ready:
              </strong>{" "}
              Built using the latest Next.js routing system.
            </li>
            <li>
              <strong className="text-neutral-800 dark:text-zinc-100">
                Modular Components:
              </strong>{" "}
              Organized for reusability and clean structure.
            </li>
            <li>
              <strong className="text-neutral-800 dark:text-zinc-100">
                ShadCN Integration:
              </strong>{" "}
              UI components live in <code>components/ui</code> when used.
            </li>
            <li>
              <strong className="text-neutral-800 dark:text-zinc-100">
                Typed & Scalable:
              </strong>{" "}
              Includes TypeScript, hooks, and utility separation.
            </li>
          </ul>
        </div>

        {/* Auth Boilerplate */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-neutral-900 dark:text-zinc-100">
            <Lock className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Auth Pages Boilerplate</h3>
          </div>
          <p className="text-neutral-500 dark:text-zinc-400">
            Both <code>/login</code> and <code>/signup</code> routes come
            pre-configured with:
          </p>
          <ul className="list-disc list-inside text-neutral-500 dark:text-zinc-400 space-y-1">
            <li>
              <strong>React Hook Form</strong> – Clean, performant form logic
            </li>
            <li>
              <strong>Zod</strong> – Schema-based validation
            </li>
            <li>
              <strong>TanStack Query</strong> – Async form handling
            </li>
            <li>
              <strong>React Hot Toast</strong> – Feedback notifications
            </li>
          </ul>
        </div>

        {/* Figma */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-neutral-900 dark:text-zinc-100">
            <Paintbrush className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Figma Included</h3>
          </div>
          <p className="text-neutral-500 dark:text-zinc-400">
            The <code>figma/</code> folder includes:
          </p>
          <ul className="list-disc list-inside text-neutral-500 dark:text-zinc-400 space-y-1">
            <li>Desktop & mobile screens</li>
            <li>Color, type, and spacing tokens</li>
            <li>Reusable components and UI kit</li>
          </ul>
        </div>

        {/* Deployment & Customization */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-neutral-900 dark:text-zinc-100">
            <Settings2 className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Ready for Production</h3>
          </div>
          <p className="text-neutral-500 dark:text-zinc-400">
            Structured for scalable development and easy deployment:
          </p>
          <ul className="list-disc list-inside text-neutral-500 dark:text-zinc-400 space-y-1">
            <li>Clean file organization & naming</li>
            <li>Tailwind + PostCSS configured out-of-the-box</li>
            <li>Deploy instantly with Vercel or Netlify</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FolderStructure;

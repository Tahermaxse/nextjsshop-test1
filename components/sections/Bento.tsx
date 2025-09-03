import React from "react";
import {
  tailwindcssnextjs,
  tick,
  premium,
  key,
  download,
  zip,
  docker,
  dashboard,
  bigdocker,
  figma,
  smallfigma,
} from "./bentosvgs";
import { ScriptCopyBtn } from "@/components/script-copy-btn";

const Bento = () => {
  return (
    <section className="container mx-auto max-w-[1200px] px-4 py-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="flex flex-col gap-y-6 md:col-span-2"
          style={{ opacity: 1 }}
        >
          <div className="dark:border-zinc-700 dark:bg-zinc-900 flex flex-col justify-between gap-y-8 rounded-2xl border border-gray-200 bg-white p-8 transition-transform hover:translate-y-[-4px] md:h-96">
            <div className="flex flex-col gap-y-6">
              {/* svg */}
              {tailwindcssnextjs()}
              <div className="flex flex-col gap-y-2">
                <h3 className="text-xl text-black dark:text-white">
                  Tailwind + Next.js Components & Templates
                </h3>
                <p className="dark:text-zinc-500 w-full flex-grow text-gray-500 md:max-w-96">
                  Production-ready components and templates built with:
                  TailwindCSS, Next.js, ShadCN, TanStack, Zod
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-y-1">
              <li className="flex flex-row items-center gap-x-2">
                {/* svg */}
                {tick()}
                <p className="text-pretty leading-relaxed">Copy-paste ready</p>
              </li>
              <li className="flex flex-row items-center gap-x-2">
                {/* svg */}
                {tick()}

                <p className="text-pretty leading-relaxed">
                  Type-safe + accessible
                </p>
              </li>
              <li className="flex flex-row items-center gap-x-2">
                {/* svg */}
                {tick()}

                <p className="text-pretty leading-relaxed">Clean, minimal UI</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-6" style={{ opacity: 1 }}>
          <div className="dark:border-zinc-700 dark:bg-zinc-900 flex flex-col justify-between gap-y-8 rounded-2xl border border-gray-200 bg-white p-8 transition-transform hover:translate-y-[-4px] md:h-96">
            <div className="flex flex-col gap-y-6">
              {/* svg */}
              {premium()}
              <div className="flex flex-col gap-y-2">
                <h3 className="text-xl text-black dark:text-white">
                  Free & Premium Access
                </h3>
                <p className="dark:text-zinc-500 w-full flex-grow text-gray-500 md:max-w-96">
                  Access free components instantly, or upgrade to unlock
                  advanced kits.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-x-2 rounded-lg border border-gray-200 bg-gray-100 p-3">
                {/* svg */}
                {key()}
                <span className="dark:text-zinc-50 text-sm text-gray-950">
                  License Keys
                </span>
              </div>
              <div className="dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-x-2 rounded-lg border border-gray-200 bg-gray-100 p-3">
                {/* svg */}
                {download()}
                <span className="dark:text-zinc-50 text-sm text-gray-950">
                  Downloadables
                </span>
              </div>
              <div className="dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-x-2 rounded-lg border border-gray-200 bg-gray-100 p-3">
                {/* svg */}
                {smallfigma()}
                <span className="dark:text-zinc-50 text-sm text-gray-950">
                  Figma Files
                </span>
              </div>
              <div className="dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-x-2 rounded-lg border border-gray-200 bg-gray-100 p-3">
                {/* svg */}
                {zip()}
                <span className="dark:text-zinc-50 text-sm text-gray-950">
                  Zip Files
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* ScriptCopyBtn full-width row */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 transition-transform hover:translate-y-[-4px]">
          <div className="dark:border-zinc-700 dark:bg-zinc-900 rounded-2xl border border-gray-200 bg-white p-8 flex flex-col gap-y-4">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Installation</h3>
            <ScriptCopyBtn 
              showMultiplePackageOptions={true}
              codeLanguage="bash"
              lightTheme="github-light"
              darkTheme="dracula"
              commandMap={{
                npm: "npx shadcn@latest add https://nextjsshop.com/r/authcard-01.json",
                yarn: "yarn dlx shadcn@latest add https://nextjsshop.com/r/authcard-01.json",
                pnpm: "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-01.json",
                bun: "bunx shadcn@latest add https://nextjsshop.com/r/authcard-01.json",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-6" style={{ opacity: 1 }}>
          <div className="dark:border-zinc-700 dark:bg-zinc-900 flex flex-col justify-between gap-y-8 rounded-2xl border border-gray-200 bg-white p-8 transition-transform hover:translate-y-[-4px] md:h-96">
            <div className="flex flex-col gap-y-6">
              {/* svg */}
              {dashboard()}
              <div className="flex flex-col gap-y-2">
                <h3 className="text-xl text-black dark:text-white">
                  User Profile
                </h3>
                <p className="dark:text-zinc-500 w-full flex-grow text-gray-500 md:max-w-96">
                  All your purchase info in one place clear, organized, and always accessible.
                </p>
              </div>
            </div>
            <div className="relative h-[120px] md:h-[200px]">
              <div className="absolute left-0 right-0 top-0 scale-90 transition-transform hover:-translate-y-1">
                <div className="dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-x-4 rounded-lg border border-gray-200 bg-gray-100 p-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      alt="Customer avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      src="https://ik.imagekit.io/mintlifyui/avatars/avatar1.png?updatedAt=1745649103756"
                      style={{ color: "transparent" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-black dark:text-white">
                      John Doe
                    </span>
                    <span className="dark:text-zinc-500 flex flex-row gap-x-2 text-sm text-gray-500">
                      <span>Premium Plan</span>
                      <span>•</span>
                      <span>Monthly</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute left-0 right-0 top-4 scale-95 transition-transform hover:-translate-y-1">
                <div className="dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-x-4 rounded-lg border border-gray-200 bg-gray-100 p-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      alt="Customer avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      src="https://ik.imagekit.io/mintlifyui/avatars/avatar1.png?updatedAt=1745649103756"
                      style={{ color: "transparent" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-black dark:text-white">
                      John Doe
                    </span>
                    <span className="dark:text-zinc-500 flex flex-row gap-x-2 text-sm text-gray-500">
                      <span>Premium Plan</span>
                      <span>•</span>
                      <span>Monthly</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute left-0 right-0 top-8 transition-transform hover:-translate-y-1">
                <div className="dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-x-4 rounded-lg border border-gray-200 bg-gray-100 p-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      alt="Customer avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      src="https://ik.imagekit.io/mintlifyui/avatars/avatar3.png?updatedAt=1745649103756"
                      style={{ color: "transparent" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-black dark:text-white">
                      John Doe
                    </span>
                    <span className="dark:text-zinc-500 flex flex-row gap-x-2 text-sm text-gray-500">
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-6" style={{ opacity: 1 }}>
          <div className="dark:border-zinc-700 dark:bg-zinc-900 flex flex-col justify-between gap-y-8 rounded-2xl border border-gray-200 bg-white p-8 transition-transform hover:translate-y-[-4px] md:h-96">
            <div className="flex flex-col gap-y-6">
              {/* svg */}
              {figma()}
              <div className="flex flex-col gap-y-2">
                <h3 className="text-xl text-black dark:text-white">
                  Ready-to-Use Figma Files
                </h3>
                <p className="dark:text-zinc-500 w-full flex-grow text-gray-500 md:max-w-96">
                  Start designing instantly with well-structured, editable Figma
                  files included in every premium template.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-6" style={{ opacity: 1 }}>
          <div className="dark:border-zinc-700 dark:bg-zinc-900 flex flex-col justify-between gap-y-8 rounded-2xl border border-gray-200 bg-white p-8 transition-transform hover:translate-y-[-4px] md:h-96">
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <h3 className="text-xl text-black dark:text-white">
                  Instant Invoice Delivery
                </h3>
                <p className="dark:text-zinc-500 w-full flex-grow text-gray-500 md:max-w-96">
                  Get an immediate invoice for every template or component you
                  purchase hassle-free and ready for your records.
                </p>
              </div>
            </div>

            {/* New Invoice Info Block */}
            <div className="dark:bg-zinc-800 dark:border-zinc-700 flex flex-col gap-y-3 rounded-lg border border-gray-200 bg-gray-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black dark:text-white">
                  Invoice Status
                </span>
                <span className="text-sm text-green-500">
                  Generated Automatically
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="dark:text-zinc-500 text-sm text-gray-500">
                  Item
                </span>
                <span className="dark:text-zinc-500 text-sm text-gray-500">
                  Nextjs Template
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="dark:text-zinc-500 text-sm text-gray-500">
                  Total
                </span>
                <span className="dark:text-zinc-500 text-sm text-gray-500">
                  $49.00
                </span>
              </div>

              {/* Download Button */}
              <button className="mt-2 w-fit rounded-md bg-black px-3 py-1.5 text-sm text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-300">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bento;

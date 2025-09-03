import React from 'react'

const Naming = () => {
  return (
    <div id="naming" className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left">
      <div className="p-8 sm:p-12">
        <div className="flex items-center space-x-2">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-zinc-100">Naming</h2>
        </div>
        <div className="mt-3 text-base text-neutral-500 dark:text-zinc-400">
          <p>
          Nextjsshop should always be written as a single word with a capital "N" and "S" (i.e., "Nextjsshop"). Avoid using all lowercase ("nextjsshop") or uppercase ("NEXTJSSHOP") unless in a logo or wordmark specifically designed that way.
          </p>
          <div className="mt-4 flex items-start space-x-3 rounded-2xl border p-4 pr-8 text-[0.95rem] border-blue-200 bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800 py-4">
            <div className="mt-1 flex-shrink-0">
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
                className="lucide lucide-info h-5 w-5 text-blue-500 dark:text-zinc-400"
              >
                <circle cx={12} cy={12} r={10} />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <div className="[&>p]:my-0">
              The name <strong className="font-medium text-neutral-800 dark:text-zinc-100">Nextjsshop</strong>{" "}
              comes from combining{" "}
              <strong className="font-medium text-neutral-800 dark:text-zinc-100">"Nextjs"</strong> and{" "}
              <strong className="font-medium text-neutral-800 dark:text-zinc-100">"Shop"</strong>.
              – a place where developers can find and buy production-ready templates and components tailored for Next.js projects.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Naming
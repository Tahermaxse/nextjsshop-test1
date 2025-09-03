import React from 'react'

interface WordMarkItem {
  href: string
  alt: string
  src: string
  textColor: string
  background: string
}

const WordMark = () => {
  const wordmarks: WordMarkItem[] = [
    {
      href: "/brand/wordmark2.svg",
      alt: "Nextjsshop wordmark",
      src: "/brand/wordmark2.svg",
      textColor: "text-gray-900 dark:text-zinc-100",
      background:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.933), rgba(255, 255, 255, 0.933)), radial-gradient(70.06% 107.19% at 42.32% 69.3%, rgb(238, 165, 186) 0%, rgba(238, 165, 186, 0) 50%), radial-gradient(50.94% 77.94% at 39.97% 59.47%, rgb(58, 139, 253) 0%, rgba(58, 139, 253, 0) 50%), radial-gradient(76.65% 117.27% at 100% 100%, rgb(228, 199, 149) 0%, rgba(228, 199, 149, 0) 50%), radial-gradient(74.49% 113.01% at 10.94% 34.6%, rgb(133, 90, 252) 0%, rgba(133, 90, 252, 0) 50%), radial-gradient(81.84% 125.6% at 56.41% 100%, rgb(253, 58, 78) 0%, rgba(253, 58, 78, 0) 50%), radial-gradient(93.13% 132.13% at 93.12% 13.91%, rgb(114, 254, 125) 0%, rgba(114, 254, 125, 0) 50%)",
    },
    {
      href: "/brand/wordmark1.svg",
      alt: "Nextjsshop wordmark",
      src: "/brand/wordmark1.svg",
      textColor: "text-white dark:text-zinc-100",
      background:
        "radial-gradient(70.06% 107.19% at 42.32% 69.3%, rgba(238, 165, 186, 0.1) 0%, rgba(238, 165, 186, 0) 50%), radial-gradient(50.94% 77.94% at 39.97% 59.47%, rgba(58, 139, 253, 0.1) 0%, rgba(58, 139, 253, 0) 50%), radial-gradient(76.65% 117.27% at 100% 100%, rgba(228, 199, 149, 0.1) 0%, rgba(228, 199, 149, 0) 50%), radial-gradient(74.49% 113.01% at 10.94% 34.6%, rgba(133, 90, 252, 0.1) 0%, rgba(133, 90, 252, 0) 50%), radial-gradient(81.84% 125.6% at 56.41% 100%, rgba(253, 58, 78, 0.1) 0%, rgba(253, 58, 78, 0) 50%), radial-gradient(93.13% 132.13% at 93.12% 13.91%, rgba(114, 254, 125, 0.1) 0%, rgba(114, 254, 125, 0) 50%), linear-gradient(0deg, rgb(0, 0, 0), rgb(0, 0, 0))",
    },
  ]

  return (
    <div id="wordmark" className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left">
      <div className="p-8 sm:p-12">
        <div className="flex items-center space-x-2">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-zinc-100">Wordmark</h2>
          <span className="max-w-fit rounded-full border px-2 py-px text-xs font-medium whitespace-nowrap border-neutral-400 dark:border-zinc-600 text-neutral-500 dark:text-zinc-400">
            Recommended
          </span>
        </div>
        <div className="mt-3 text-base text-neutral-500 dark:text-zinc-400">
        The Nextjsshop wordmark is the primary, streamlined representation of our brand, crafted for clarity across digital and print platforms. It reflects our identity in its most recognizable textual form. Always use the wordmark in its original design and proportions to maintain consistency and brand recognition.{" "}
          <strong className="font-medium text-neutral-800 dark:text-zinc-100">
          We recommend using the Nextjsshop wordmark for most use cases unless a specific variation is required.
          </strong>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {wordmarks.map((wordmark) => (
              <div
                key={wordmark.href}
                className="group relative rounded-xl border border-neutral-200 dark:border-zinc-700"
                style={{ background: wordmark.background }}
              >
                <a
                  href={wordmark.href}
                  download={wordmark.href}
                  className={`relative outline-none ring-inset ring-blue-500 focus-visible:ring flex h-60 items-center justify-center ${wordmark.textColor}`}
                >
                  <div className="relative size-full h-12">
                    <img
                      alt={wordmark.alt}
                      className="relative"
                      src={wordmark.src}
                      
                    />
                  </div>
                  <div className="group/inner dark:bg-zinc-800 dark:text-white absolute bottom-4 right-4 z-20 rounded-lg p-3 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:translate-y-2 sm:py-1 sm:opacity-0">
                    <div className="absolute inset-0 rounded-lg bg-current opacity-0 group-hover/inner:opacity-[.05]" />
                    <div className="absolute inset-0 rounded-lg border border-current opacity-[.15]" />
                    <div className="flex items-center gap-2 text-sm">
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
                        className="lucide lucide-download w-4 h-4"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1={12} x2={12} y1={15} y2={3} />
                      </svg>
                      <span className="hidden sm:block">Download</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordMark
import React from 'react'

interface LogoItem {
  href: string
  alt: string
  src: string
  textColor: string
  background: string
}

const Logo = () => {
  const logos: LogoItem[] = [
    {
      href: "/brand/logo-light.svg",
      alt: "Nextjsshop symbol",
      src: "/brand/logo-light.svg",
      textColor: "text-gray-900 dark:text-zinc-100",
      background:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.933), rgba(255, 255, 255, 0.933)), radial-gradient(70.06% 107.19% at 42.32% 69.3%, rgb(238, 165, 186) 0%, rgba(238, 165, 186, 0) 50%), radial-gradient(50.94% 77.94% at 39.97% 59.47%, rgb(58, 139, 253) 0%, rgba(58, 139, 253, 0) 50%), radial-gradient(76.65% 117.27% at 100% 100%, rgb(228, 199, 149) 0%, rgba(228, 199, 149, 0) 50%), radial-gradient(74.49% 113.01% at 10.94% 34.6%, rgb(133, 90, 252) 0%, rgba(133, 90, 252, 0) 50%), radial-gradient(81.84% 125.6% at 56.41% 100%, rgb(253, 58, 78) 0%, rgba(253, 58, 78, 0) 50%), radial-gradient(93.13% 132.13% at 93.12% 13.91%, rgb(114, 254, 125) 0%, rgba(114, 254, 125, 0) 50%)",
    },
    {
      href: "/brand/logo-dark.svg",
      alt: "Nextjsshop symbol (dark mode)",
      src: "/brand/logo-dark.svg",
      textColor: "text-white dark:text-zinc-100",
      background:
        "radial-gradient(70.06% 107.19% at 42.32% 69.3%, rgba(238, 165, 186, 0.1) 0%, rgba(238, 165, 186, 0) 50%), radial-gradient(50.94% 77.94% at 39.97% 59.47%, rgba(58, 139, 253, 0.1) 0%, rgba(58, 139, 253, 0) 50%), radial-gradient(76.65% 117.27% at 100% 100%, rgba(228, 199, 149, 0.1) 0%, rgba(228, 199, 149, 0) 50%), radial-gradient(74.49% 113.01% at 10.94% 34.6%, rgba(133, 90, 252, 0.1) 0%, rgba(133, 90, 252, 0) 50%), radial-gradient(81.84% 125.6% at 56.41% 100%, rgba(253, 58, 78, 0.1) 0%, rgba(253, 58, 78, 0) 50%), radial-gradient(93.13% 132.13% at 93.12% 13.91%, rgba(114, 254, 125, 0.1) 0%, rgba(114, 254, 125, 0) 50%), linear-gradient(0deg, rgb(0, 0, 0), rgb(0, 0, 0))",
    },
  ]

  return (
    <div id="logo" className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left">
      <div className="p-8 sm:p-12">
        <div className="flex items-center space-x-2">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-zinc-100">Logo</h2>
        </div>
        <div className="mt-3 text-base text-neutral-500 dark:text-zinc-400">
        The Nextjsshop symbol is a unique element of our brand identity, designed for strong visual impact and instant recognition across platforms. It captures the essence of Nextjsshop in a compact, iconic form. To ensure brand consistency, the symbol must always be used in its original design and proportions. It's especially useful in spaces where text isn't ideal, or where a bold, graphic representation is preferred.
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {logos.map((logo) => (
              <div
                key={logo.href}
                className="group relative rounded-xl border border-neutral-200 dark:border-zinc-700"
                style={{ background: logo.background }}
              >
                <a
                  href={logo.href}
                  download={logo.href}
                  className={`relative outline-none ring-inset ring-blue-500 focus-visible:ring flex h-60 items-center justify-center ${logo.textColor}`}
                >
                  <div className="relative size-full h-44 mr-8">
                    <img
                      alt={logo.alt}
                   
                      className="relative h-full w-full object-contain"
                      src={logo.src}
                      
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
                      <span className="hidden sm:block ">Download</span>
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

export default Logo
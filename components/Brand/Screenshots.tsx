'use client'
import React, { useState } from "react"

interface ScreenshotItem {
  href: string
  src: string
  alt: string
}

const Screenshots = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const screenshots: ScreenshotItem[] = [
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Hero-Section.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Hero-Section.png",
      alt: "Nextjsshop-Hero-Section-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Templates-Page.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Templates-Page.png",
      alt: "Nextjsshop-Templates-Page-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Components-Page.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Components-Page.png",
      alt: "Nextjsshop-Components-Page-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Templates-Details-Page1.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Templates-Details-Page1.png",
      alt: "Nextjsshop-Templates-Details-Page1-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Templates-Details-Page2.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Templates-Details-Page2.png",
      alt: "Nextjsshop-Templates-Details-Page2-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Templates-Details-Report-Modal.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-Templates-Details-Report-Modal.png",
      alt: "Nextjsshop-Templates-Details-Report-Modal-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-Notification.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-Notification.png",
      alt: "Nextjsshop-user-profile-Notification-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-Purchases.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-Purchases.png",
      alt: "Nextjsshop-user-profile-Purchases-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-Reports.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-Reports.png",
      alt: "Nextjsshop-user-profile-Reports-Screenshot",
    },
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-QuotaRequest.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-QuotaRequest.png",
      alt: "Nextjsshop-user-profile-QuotaRequest-Screenshot",
    },
    
    {
      href: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-settings.png",
      src: "https://ik.imagekit.io/nextjsshop/brand-page-ss/Nextjsshop-user-profile-settings.png",
      alt: "Nextjsshop-user-profile-settings-Screenshot",
    },
  ]

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
  }

  return (
    <div id="screenshots" className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left">
      <div className="p-8 sm:p-12">
        <div className="flex items-center space-x-2">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-zinc-100">Screenshots</h2>
        </div>
        <div className="mt-3 text-base text-neutral-500 dark:text-zinc-400">
        Nextjsshop product screenshots are key to representing our offerings accurately and are available for use in press and media. These visuals must not be modified in ways that misrepresent the design, functionality, or user experience of our templates and components. It’s important to preserve the context and integrity of each screenshot to ensure an honest portrayal of the product and to avoid implying any unauthorized endorsements or partnerships. Always use high-resolution images to maintain visual quality and brand standards.
        </div>
        <div className="mt-10">
          <div className="relative" role="region" aria-roledescription="carousel">
            <div className="overflow-hidden">
              <div
                className="flex -ml-4 transition-transform duration-500"
                style={{ transform: `translate3d(${-currentSlide * 100}%, 0px, 0px)` }}
              >
                {screenshots.map((screenshot, index) => (
                  <div
                    key={screenshot.href}
                    role="group"
                    aria-roledescription="slide"
                    className="min-w-0 shrink-0 grow-0 basis-full pl-4"
                  >
                    <div className="group relative">
                      <a
                        href={screenshot.href}
                        download={screenshot.href}
                        className="block outline-none ring-inset ring-blue-500 focus-visible:ring static h-full w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-zinc-700"
                      >
                        <div className="relative size-full">
                          <img
                            alt={screenshot.alt}
                            className="relative"
                            src={screenshot.src}
                          />
                        </div>
                        <div className="group/inner dark:bg-zinc-800 dark:text-white absolute bottom-4 right-4 z-20 rounded-lg p-3 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:translate-y-2 sm:py-1 sm:opacity-0">
                          <div className="absolute inset-0 rounded-lg bg-current opacity-0 group-hover/inner:opacity-[.05]" />
                          <div className="absolute inset-0 rounded-lg border border-current opacity-[.15]" />
                          <div className="flex items-center gap-2 text-sm text-neutral-900 dark:text-zinc-100">
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
                      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-white via-white/75 to-transparent dark:from-zinc-900 dark:via-zinc-900/75" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-6 absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-neutral-800/10 dark:border-zinc-700 bg-white dark:bg-zinc-800 sm:bottom-6">
              <button
                className="cursor-pointer rounded-full p-2 hover:bg-neutral-50 dark:hover:bg-zinc-700 active:bg-neutral-100 dark:active:bg-zinc-600"
                onClick={handlePrev}
              >
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
                  className="lucide lucide-chevron-left h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Previous slide</span>
              </button>
              <div className="flex items-center gap-1">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    className="rounded-full p-0.5 hover:bg-neutral-100 dark:hover:bg-zinc-700 active:bg-neutral-200 dark:active:bg-zinc-600 sm:p-1.5"
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div
                      className={`relative isolate h-1.5 overflow-hidden rounded-full transition-all ${
                        currentSlide === index ? 'w-6 bg-black dark:bg-zinc-100' : 'w-1.5 bg-black/20 dark:bg-zinc-600'
                      }`}
                    />
                    <span className="sr-only">Slide {index + 1}</span>
                  </button>
                ))}
              </div>
              <button
                className="cursor-pointer rounded-full p-2 hover:bg-neutral-50 dark:hover:bg-zinc-700 active:bg-neutral-100 dark:active:bg-zinc-600"
                onClick={handleNext}
              >
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
                  className="lucide lucide-chevron-right h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="sr-only">Next slide</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screenshots
'use client'
import React, { useState } from "react"

interface MockupItem {
  href: string
  src: string
  alt: string
}

const Mockups = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const mockups: MockupItem[] = [
    {
      href: "https://assets.dub.co/brand/mockup-00.jpg",
      src: "https://assets.dub.co//image?url=https%3A%2F%2Fassets.dub.co%2Fbrand%2Fmockup-00.jpg&w=3840&q=75",
      alt: "Mockup",
    },
    {
      href: "https://assets.dub.co/brand/mockup-01.jpg",
      src: "https://assets.dub.co//image?url=https%3A%2F%2Fassets.dub.co%2Fbrand%2Fmockup-01.jpg&w=3840&q=75",
      alt: "Mockup",
    },
    {
      href: "https://assets.dub.co/brand/mockup-02.jpg",
      src: "https://assets.dub.co//image?url=https%3A%2F%2Fassets.dub.co%2Fbrand%2Fmockup-02.jpg&w=3840&q=75",
      alt: "Mockup",
    },
    {
      href: "https://assets.dub.co/brand/mockup-03.jpg",
      src: "https://assets.dub.co//image?url=https%3A%2F%2Fassets.dub.co%2Fbrand%2Fmockup-03.jpg&w=3840&q=75",
      alt: "Mockup",
    },
    {
      href: "https://assets.dub.co/brand/mockup-04.jpg",
      src: "https://assets.dub.co//image?url=https%3A%2F%2Fassets.dub.co%2Fbrand%2Fmockup-04.jpg&w=3840&q=75",
      alt: "Mockup",
    },
    {
      href: "https://assets.dub.co/brand/mockup-05.jpg",
      src: "https://assets.dub.co//image?url=https%3A%2F%2Fassets.dub.co%2Fbrand%2Fmockup-05.jpg&w=3840&q=75",
      alt: "Mockup",
    },
  ]

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? mockups.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === mockups.length - 1 ? 0 : prev + 1))
  }

  const handleDownload = async (href: string) => {
    try {
      const response = await fetch(href)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = href.split('/').pop() || 'mockup.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div id="mockups" className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left">
      <div className="p-8 sm:p-12">
        <div className="flex items-center space-x-2">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-zinc-100">Mockups</h2>
        </div>
        <div className="mt-3 text-base text-neutral-500 dark:text-zinc-400">
        Nextjsshop brand mockups are provided to ensure consistent and professional presentation of our brand across various media. These mockups showcase how Nextjsshop templates, components, and branding elements should appear in real-world contexts. Usage must strictly follow our brand guidelines—no changes should be made to the designs, colors, or proportions. These mockups are intended solely for promotional use and must not be used to imply endorsement or partnership without explicit permission from Nextjsshop.
        </div>
        <div className="mt-10">
          <div className="relative" role="region" aria-roledescription="carousel">
            <div className="overflow-hidden">
              <div
                className="flex -ml-4 transition-transform duration-500"
                style={{ transform: `translate3d(${-currentSlide * 100}%, 0px, 0px)` }}
              >
                {mockups.map((mockup, index) => (
                  <div
                    key={mockup.href}
                    role="group"
                    aria-roledescription="slide"
                    className="min-w-0 shrink-0 grow-0 basis-full pl-4"
                  >
                    <div className="group relative aspect-[3600/1890] w-full overflow-hidden rounded-2xl">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handleDownload(mockup.href)
                        }}
                        className="relative block outline-none ring-inset ring-blue-500 focus-visible:ring size-full text-neutral-900 dark:text-zinc-100"
                      >
                        <div className="relative size-full">
                          <img
                            alt={mockup.alt}
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="relative"
                            sizes="100vw"
                            src={mockup.src}
                            style={{
                              position: "absolute",
                              height: "100%",
                              width: "100%",
                              inset: 0,
                              objectFit: "fill",
                              color: "transparent",
                            }}
                          />
                        </div>
                        <div className="group/inner dark:bg-zinc-900 dark:text-white absolute bottom-4 right-4 z-20 rounded-lg p-3 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:translate-y-2 sm:py-1 sm:opacity-0">
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
                {mockups.map((_, index) => (
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

export default Mockups
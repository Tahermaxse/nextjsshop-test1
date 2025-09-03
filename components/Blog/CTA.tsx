import React from 'react'
import Link from 'next/link'

const CTA = () => {
  return (
   <div>
  <div className="border-t border-theme-border-base dark:border-zinc-800 w-full h-[2px]" />
  <section className="!pt-16 md:!pt-16 !pb-16 md:!pb-16 grow relative">
    <div className="px-6 lg:px-16 [&:has(.full-content-width)]:px-0 md:whitespace-pre-wrap hide-breaks md:show-breaks max-w-content mx-auto relative z-[1]">
      <div className="flex flex-col gap-y-6 lg:justify-between gap-x-16 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3 lg:w-3/5 shrink-0">
          <h2 className="text-ui-fg-base text-headers-h3 dark:text-white">
          Design better and build faster with ready-made Next.js UI kits and page blocks.
          </h2>
        </div>
        <div className="flex gap-3">
          <Link
            className="transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md outline-none disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled disabled:shadow-buttons-neutral  disabled:after:hidden after:transition-fg after:absolute after:inset-0 after:content-[''] shadow-buttons-neutral text-ui-fg-base bg-ui-button-neutral after:button-neutral-gradient hover:bg-ui-button-neutral-hover hover:after:button-neutral-hover-gradient active:bg-ui-button-neutral-pressed active:after:button-neutral-pressed-gradient focus-visible:shadow-buttons-neutral-focus txt-compact-small-plus gap-x-1.5 px-3 py-1.5"
            href="/components"
          >
           Explore Components
          </Link>
          <Link
            href="/templates"
            className="transition-fg text-white relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md outline-none disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled disabled:shadow-buttons-neutral disabled:after:hidden after:transition-fg after:absolute after:inset-0 after:content-[''] shadow-buttons-inverted dark:text-ui-contrast-fg-primary bg-ui-button-inverted after:button-inverted-gradient hover:bg-ui-button-inverted-hover hover:after:button-inverted-hover-gradient active:bg-ui-button-inverted-pressed active:after:button-inverted-pressed-gradient focus-visible:!shadow-buttons-inverted-focus txt-compact-small-plus gap-x-1.5 px-3 py-1.5"
          >
            Browse Templates
          </Link>
        </div>
      </div>
    </div>
    <div className="pointer-events-none bg-stripes dark:bg-stripesdark  dark:opacity-40 opacity-[0.04] absolute object-none inset-0 z-0 w-full h-full max-w-screen-minus-scrollbar overflow-hidden !max-w-content mx-auto" />
  </section>
</div>

  )
}

export default CTA

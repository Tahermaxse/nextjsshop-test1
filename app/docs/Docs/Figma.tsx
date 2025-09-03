import React from 'react'

const Figma = () => {
  return (
    <div id="design-file" className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left">
      <div className="p-8 sm:p-12">
        <div className="flex items-center space-x-2">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-zinc-100">Design Files</h2>
        </div>
        <div className="mt-3 text-base text-neutral-500 dark:text-zinc-400">
          <p>
           A Figma file is available for each template. However, since our primary focus is on providing quality code for developers, the design files serve solely as a visual reference and are not organized into complex auto layouts or dynamic components. You can download a free Figma file from our public page to see how our design files are structured.
          </p>
         
        </div>
      </div>
    </div>
  )
}

export default Figma

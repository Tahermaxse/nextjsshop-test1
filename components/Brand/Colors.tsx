'use client'
import React, { useState } from "react"

interface ColorItem {
  name: string
  rgb: string
  hex: string
  bgColor: string
  textColor: string
}

const Colors = () => {
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({})

  const colors: ColorItem[] = [
    {
      name: "Nextjsshop Light",
      rgb: "RGB 34, 197, 94",
      hex: "#22C55E",
      bgColor: "rgb(255, 255, 255)",
      textColor: "text-black dark:text-zinc-100",
    },
    {
      name: "Nextjsshop Dark",
      rgb: "RGB 34, 197, 94",
      hex: "#22C55E",
      bgColor: "rgb(0, 0, 0)",
      textColor: "text-white dark:text-zinc-100",
    },
  ]

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied((prev) => ({ ...prev, [hex]: true }))
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [hex]: false }))
      }, 2000)
    }).catch((error) => {
      console.error('Copy failed:', error)
    })
  }

  return (
    <div id="colors" className="isolate scroll-mt-12 bg-white dark:bg-[#09090B] text-left">
      <div className="p-8 sm:p-12">
        <div className="flex items-center space-x-2">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-zinc-100">Colors</h2>
        </div>
        <div className="mt-3 text-base text-neutral-500 dark:text-zinc-400">
          Nextjsshop’s visual identity primarily uses light and dark themes for all external materials, representing clarity, professionalism, and modernity. The accent color green green is used to highlight important elements, bringing energy and freshness to the design. These colors should be applied consistently across all marketing and branding efforts to ensure visual coherence and strong brand recognition. While a broader color palette exists, it is reserved strictly for internal use and should not be applied in external-facing assets.
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:min-h-60">
            {colors.map((color) => (
              <div
                key={color.name}
                className={`group relative flex items-center rounded-xl px-6 py-4 text-left text-sm sm:justify-center border border-neutral-900/10 dark:border-zinc-700 ${color.textColor}`}
                style={{ backgroundColor: color.bgColor }}
              >
                <div>
                  {color.name === "Nextjsshop Light" ? <p className="font-medium dark:text-black">{color.name}</p> :
                  <p className="font-medium ">{color.name}</p>}
                  <div className="mt-1 opacity-60">
                    {color.name === "Nextjsshop Light" ? <p className="dark:text-black">{color.rgb}</p> :
                    <p>{color.rgb}</p>}
                    {color.name === "Nextjsshop Light" ? <p className="dark:text-black">{color.hex}</p> :
                    <p>{color.hex}</p>}
                  </div>
                  <button
                    onClick={() => handleCopy(color.hex)}
                    className="group/inner dark:bg-zinc-800 dark:text-white absolute bottom-4 right-4 rounded-lg px-3 py-1 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-2 sm:opacity-0"
                  >
                    <div className="absolute  inset-0 rounded-lg bg-current opacity-0 group-hover/inner:opacity-[.05]" />
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
                        className="lucide lucide-copy w-4 h-4"
                      >
                        <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0- FDA-1.1.8 0 2 .9 0 2 1" />
                      </svg>
                      {copied[color.hex] ? 'Copied!' : 'Copy'}
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Colors
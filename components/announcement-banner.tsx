import { Rocket, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="mt-4 rounded-t-2xl w-full from-green-600 to-green-500 text-white bg-gradient-to-t border border-b-2 border-green-900/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] text-white">
      <div className="px-4 py-3">
        {/* Mobile version - simplified */}
        <div className="flex items-center justify-between gap-3 text-sm sm:hidden">
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-white flex-shrink-0" />
            <span>
              We ship new <Link href="/templates" className="font-semibold underline">templates</Link> & <Link href="/components" className="font-semibold underline">components</Link> every week!
            </span>
          </div>
        </div>

        {/* Desktop version - full content */}
        <div className="hidden sm:flex items-center justify-center gap-3 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 md:h-5 md:w-5 text-[#fff] flex-shrink-0" />
            <span>
              We ship new <Link href="/templates" className="font-semibold underline">templates</Link> & <Link href="/components" className="font-semibold underline">components</Link> every week!
            </span>
          </div>
          
        </div>
      </div>
    </div>
  )
}

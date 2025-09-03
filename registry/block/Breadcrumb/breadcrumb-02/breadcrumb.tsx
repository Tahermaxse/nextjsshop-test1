import { ChevronDown, ChevronRight, FolderIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileBreadcrumbProps {
  className?: string
}

export function Breadcrumb02({ className }: FileBreadcrumbProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap sm:flex-nowrap items-center justify-between p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 overflow-x-auto scrollbar-hide min-w-0 w-full sm:w-auto pb-2 sm:pb-0">
        <div className="bg-blue-600 p-1 rounded flex-shrink-0">
          <FolderIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
        <span className="text-xs sm:text-sm whitespace-nowrap">Assets</span>
        <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3 text-gray-500 dark:text-zinc-500 flex-shrink-0" />
        <span className="text-xs sm:text-sm whitespace-nowrap">Web</span>
        <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3 text-gray-500 dark:text-zinc-500 flex-shrink-0" />
        <button className="flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap">
          <span className="truncate">Source</span>
          <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
        </button>
      </div>
      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 text-xs h-7 sm:h-8 ml-auto">
        Share
      </Button>
    </div>
  )
}

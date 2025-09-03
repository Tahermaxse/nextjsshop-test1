import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface NavigationBreadcrumbProps {
  className?: string
}

export function Breadcrumb01({ className }: NavigationBreadcrumbProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap sm:flex-nowrap items-center justify-between p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 overflow-x-auto scrollbar-hide",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 min-w-0 w-full sm:w-auto">
        <div className="flex-shrink-0 flex items-center">
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide min-w-0">
          <div className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white text-[10px] sm:text-xs">S</span>
          </div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 whitespace-nowrap">Source R1</span>
          <span className="text-gray-500 dark:text-zinc-500">/</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 whitespace-nowrap truncate">
            Primitives
          </span>
          <span className="text-gray-500 dark:text-zinc-500">/</span>
          <button className="flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap">
            <span className="truncate">Avatar Group</span>
            <ChevronDown className="h-3 w-3 flex-shrink-0" />
          </button>
        </div>
      </div>
      <div className="flex items-center ml-auto mt-2 sm:mt-0">
        <div className="flex -space-x-1 sm:-space-x-2">
          <Avatar className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-gray-100 dark:border-zinc-900">
            <AvatarImage src="https://ik.imagekit.io/mintlifyui/avatars/avatar1.png?updatedAt=1745649103756" alt="User" />
            <AvatarFallback className="text-[8px] sm:text-xs">U1</AvatarFallback>
          </Avatar>
          <Avatar className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-gray-100 dark:border-zinc-900">
            <AvatarImage src="https://ik.imagekit.io/mintlifyui/avatars/avatar2.png?updatedAt=1745649103756" alt="User" />
            <AvatarFallback className="text-[8px] sm:text-xs">U2</AvatarFallback>
          </Avatar>
          <Avatar className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-gray-100 dark:border-zinc-900">
            <AvatarImage src="https://ik.imagekit.io/mintlifyui/avatars/avatar5.png?updatedAt=1745649103756" alt="User" />
            <AvatarFallback className="text-[8px] sm:text-xs">U3</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-1 bg-gray-300 dark:bg-zinc-700 text-gray-700 dark:text-zinc-200 text-[8px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded-full">
          3
        </div>
      </div>
    </div>
  )
}

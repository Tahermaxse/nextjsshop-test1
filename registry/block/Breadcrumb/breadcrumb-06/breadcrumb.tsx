"use client"
import { useState, useEffect } from "react"
import { MapPin, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LocationBreadcrumbProps {
  className?: string
  locations?: Array<{ name: string; href: string; current?: boolean }>
}

export function Breadcrumb06({
  className,
  locations = [
    { name: "United States", href: "#" },
    { name: "California", href: "#" },
    { name: "San Francisco", href: "#", current: true },
  ],
}: LocationBreadcrumbProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 500)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // For very small screens, show only first and current/last items
  const renderLocations = () => {
    if (!isMobile || locations.length <= 2) {
      return locations.map((location, index) => (
        <li key={location.name} className="flex items-center">
          {index > 0 && <span className="mx-1 text-[10px] sm:text-sm text-gray-500 dark:text-zinc-500">&gt;</span>}
          <a
            href={location.href}
            className={cn(
              "text-[10px] sm:text-sm hover:underline whitespace-nowrap",
              location.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
            )}
            aria-current={location.current ? "page" : undefined}
          >
            {location.name}
          </a>
        </li>
      ))
    }

    // Find the index of the current item
    const currentIndex = locations.findIndex((item) => item.current)
    const lastIndex = locations.length - 1
    const targetIndex = currentIndex !== -1 ? currentIndex : lastIndex

    // Always show first item
    const result = [
      <li key="first" className="flex items-center">
        <a
          href={locations[0].href}
          className="text-[10px] sm:text-sm hover:underline whitespace-nowrap text-gray-600 dark:text-zinc-400"
        >
          {locations[0].name}
        </a>
      </li>,
    ]

    // If there are hidden items in the middle, show dropdown
    if (locations.length > 2 && targetIndex > 1) {
      const hiddenItems = locations.slice(1, targetIndex)

      if (hiddenItems.length > 0) {
        result.push(
          <li key="dropdown" className="flex items-center">
            <span className="mx-1 text-[10px] sm:text-sm text-gray-500 dark:text-zinc-500">&gt;</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-[10px] sm:text-sm text-gray-600 dark:text-zinc-400 hover:underline">
                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {hiddenItems.map((item, idx) => (
                  <DropdownMenuItem key={idx} asChild>
                    <a href={item.href}>{item.name}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>,
        )
      }
    }

    // Show current or last item
    const lastItem = locations[targetIndex]
    result.push(
      <li key="last" className="flex items-center">
        <span className="mx-1 text-[10px] sm:text-sm text-gray-500 dark:text-zinc-500">&gt;</span>
        <a
          href={lastItem.href}
          className={cn(
            "text-[10px] sm:text-sm hover:underline whitespace-nowrap",
            lastItem.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
          )}
          aria-current={lastItem.current ? "page" : undefined}
        >
          {lastItem.name}
        </a>
      </li>,
    )

    return result
  }

  return (
    <nav
      className={cn("p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100", className)}
      aria-label="Location"
    >
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-zinc-400 flex-shrink-0" />
        <ol className="flex items-center">{renderLocations()}</ol>
      </div>
    </nav>
  )
}

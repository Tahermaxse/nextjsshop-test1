"use client"
import { useState, useEffect } from "react"
import { ChevronRight, Home, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HierarchicalBreadcrumbProps {
  className?: string
  items?: Array<{ label: string; href: string; current?: boolean }>
}

export function Breadcrumb03({
  className,
  items = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Electronics", href: "#" },
    { label: "Smartphones", href: "#", current: true },
  ],
}: HierarchicalBreadcrumbProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // For very small screens, show only first, last and current items
  const renderItems = () => {
    if (!isMobile || items.length <= 3) {
      return items.map((item, index) => (
        <li key={index} className="flex items-center">
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-zinc-500 mx-1 flex-shrink-0" />
          <a
            href={item.href}
            className={cn(
              "text-xs sm:text-sm hover:underline whitespace-nowrap",
              item.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.label}
          </a>
        </li>
      ))
    }

    // Find the index of the current item
    const currentIndex = items.findIndex((item) => item.current)

    // Always show first item
    const result = [
      <li key="first" className="flex items-center">
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-zinc-500 mx-1 flex-shrink-0" />
        <a
          href={items[0].href}
          className="text-xs sm:text-sm hover:underline whitespace-nowrap text-gray-600 dark:text-zinc-400"
        >
          {items[0].label}
        </a>
      </li>,
    ]

    // If there are hidden items in the middle, show dropdown
    if (items.length > 3) {
      const hiddenItems = items.slice(1, currentIndex !== -1 ? currentIndex : items.length - 1)

      if (hiddenItems.length > 0) {
        result.push(
          <li key="dropdown" className="flex items-center">
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-zinc-500 mx-1 flex-shrink-0" />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:underline">
                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {hiddenItems.map((item, idx) => (
                  <DropdownMenuItem key={idx} asChild>
                    <a href={item.href}>{item.label}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>,
        )
      }
    }

    // Show current or last item
    const lastItem = currentIndex !== -1 ? items[currentIndex] : items[items.length - 1]
    result.push(
      <li key="last" className="flex items-center">
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-zinc-500 mx-1 flex-shrink-0" />
        <a
          href={lastItem.href}
          className={cn(
            "text-xs sm:text-sm hover:underline whitespace-nowrap",
            lastItem.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
          )}
          aria-current={lastItem.current ? "page" : undefined}
        >
          {lastItem.label}
        </a>
      </li>,
    )

    return result
  }

  return (
    <nav
      className={cn(
        "flex items-center p-2 sm:p-3 rounded-xl overflow-x-auto scrollbar-hide bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100",
        className,
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-0">
        <li className="flex-shrink-0">
          <a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200">
            <Home className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        {renderItems()}
      </ol>
    </nav>
  )
}

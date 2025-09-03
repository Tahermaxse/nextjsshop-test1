"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface DropdownBreadcrumbProps {
  className?: string
  items?: Array<{
    label: string
    href?: string
    current?: boolean
    children?: Array<{ label: string; href: string }>
  }>
}

export function Breadcrumb08({
  className,
  items = [
    {
      label: "Products",
      href: "#",
      children: [
        { label: "Electronics", href: "#" },
        { label: "Clothing", href: "#" },
        { label: "Home & Garden", href: "#" },
      ],
    },
    {
      label: "Electronics",
      href: "#",
      children: [
        { label: "Smartphones", href: "#" },
        { label: "Laptops", href: "#" },
        { label: "Accessories", href: "#" },
      ],
    },
    {
      label: "Smartphones",
      current: true,
    },
  ],
}: DropdownBreadcrumbProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
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
  const renderItems = () => {
    if (!isMobile || items.length <= 2) {
      return items.map((item, index) => (
        <li key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-2 w-2 sm:h-4 sm:w-4 mx-1 flex-shrink-0 text-gray-500 dark:text-zinc-500" />
          )}

          {item.children ? (
            <DropdownMenu open={openDropdown === index} onOpenChange={(open) => setOpenDropdown(open ? index : null)}>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center text-[10px] sm:text-sm hover:underline",
                  item.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
                )}
              >
                <span className="truncate max-w-[80px] sm:max-w-none">{item.label}</span>
                <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3 ml-0.5 flex-shrink-0" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {item.children.map((child) => (
                  <DropdownMenuItem key={child.label} asChild>
                    <a href={child.href}>{child.label}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : item.href ? (
            <a
              href={item.href}
              className={cn(
                "text-[10px] sm:text-sm hover:underline whitespace-nowrap",
                item.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <span className="truncate max-w-[80px] sm:max-w-none">{item.label}</span>
            </a>
          ) : (
            <span
              className={cn(
                "text-[10px] sm:text-sm whitespace-nowrap",
                item.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <span className="truncate max-w-[80px] sm:max-w-none">{item.label}</span>
            </span>
          )}
        </li>
      ))
    }

    // Find the index of the current item
    const currentIndex = items.findIndex((item) => item.current)
    const lastIndex = items.length - 1
    const targetIndex = currentIndex !== -1 ? currentIndex : lastIndex

    // Always show first item
    const result = [
      <li key="first" className="flex items-center">
        {items[0].children ? (
          <DropdownMenu open={openDropdown === 0} onOpenChange={(open) => setOpenDropdown(open ? 0 : null)}>
            <DropdownMenuTrigger className="flex items-center text-[10px] sm:text-sm text-gray-600 dark:text-zinc-400 hover:underline">
              <span className="truncate max-w-[80px] sm:max-w-none">{items[0].label}</span>
              <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3 ml-0.5 flex-shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {items[0].children?.map((child) => (
                <DropdownMenuItem key={child.label} asChild>
                  <a href={child.href}>{child.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a
            href={items[0].href}
            className="text-[10px] sm:text-sm text-gray-600 dark:text-zinc-400 hover:underline whitespace-nowrap"
          >
            <span className="truncate max-w-[80px] sm:max-w-none">{items[0].label}</span>
          </a>
        )}
      </li>,
    ]

    // If there are hidden items in the middle, show dropdown
    if (items.length > 2 && targetIndex > 1) {
      const hiddenItems = items.slice(1, targetIndex)

      if (hiddenItems.length > 0) {
        result.push(
          <li key="dropdown" className="flex items-center">
            <ChevronRight className="h-2 w-2 sm:h-4 sm:w-4 mx-1 flex-shrink-0 text-gray-500 dark:text-zinc-500" />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-[10px] sm:text-sm text-gray-600 dark:text-zinc-400 hover:underline">
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
    const lastItem = items[targetIndex]
    result.push(
      <li key="last" className="flex items-center">
        <ChevronRight className="h-2 w-2 sm:h-4 sm:w-4 mx-1 flex-shrink-0 text-gray-500 dark:text-zinc-500" />
        {lastItem.children ? (
          <DropdownMenu
            open={openDropdown === targetIndex}
            onOpenChange={(open) => setOpenDropdown(open ? targetIndex : null)}
          >
            <DropdownMenuTrigger
              className={cn(
                "flex items-center text-[10px] sm:text-sm hover:underline",
                lastItem.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
              )}
            >
              <span className="truncate max-w-[80px] sm:max-w-none">{lastItem.label}</span>
              <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3 ml-0.5 flex-shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {lastItem.children?.map((child) => (
                <DropdownMenuItem key={child.label} asChild>
                  <a href={child.href}>{child.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span
            className={cn(
              "text-[10px] sm:text-sm whitespace-nowrap",
              lastItem.current ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400",
            )}
            aria-current={lastItem.current ? "page" : undefined}
          >
            <span className="truncate max-w-[80px] sm:max-w-none">{lastItem.label}</span>
          </span>
        )}
      </li>,
    )

    return result
  }

  return (
    <nav
      className={cn("p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-0 overflow-x-auto scrollbar-hide">{renderItems()}</ol>
    </nav>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { X, Plus, Clock, MoreVertical } from "lucide-react"
import { cn } from "../lib/utils"

interface GoalDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function Drawer02({ isOpen, onClose }: GoalDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 dark:bg-zinc-900/80 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed top-0 right-0 z-50 h-full max-h-full w-full sm:max-w-[400px] bg-white dark:bg-zinc-900 shadow-lg rounded-l-2xl sm:rounded-2xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 dark:border-zinc-800">
            <h2 id="drawer-title" className="text-lg font-medium text-gray-900 dark:text-zinc-100">
              Goal
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-500 dark:text-zinc-400 dark:hover:text-zinc-300 rounded-full"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Goal Info */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-400 dark:text-zinc-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                  Archive Q4-2025 Revenue & Marketing Goals
                </h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400">October 1 — December 31, 2025</p>
              </div>
            </div>

            {/* Key Results */}
            <div className="px-4 sm:px-5 py-3 bg-gray-50 dark:bg-zinc-800/20">
              <h4 className="text-xs font-medium text-gray-400 dark:text-zinc-500 uppercase tracking-wide mb-4">
                KEY RESULTS
              </h4>

              {/* Lead Conversion Rate */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600 dark:text-zinc-300">Lead Conversion Rate</div>
                  <button
                    className="p-1.5 text-gray-400 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800/50 rounded-full"
                    aria-label="More options for Lead Conversion Rate"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <svg className="h-10 w-10" viewBox="0 0 40 40">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                        className="dark:stroke-zinc-700"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeDasharray="113"
                        strokeDashoffset="93"
                        transform="rotate(-90 20 20)"
                        className="dark:stroke-blue-500"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xl font-semibold text-gray-900 dark:text-zinc-100">18.5%</span>
                    <span className="ml-2 text-sm font-medium text-green-500">+2.1%</span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-zinc-400">vs last week</span>
                  </div>
                </div>
              </div>

              {/* Sales Pipeline Progress */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600 dark:text-zinc-300">Sales Pipeline Progress</div>
                  <button
                    className="p-1.5 text-gray-400 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800/50 rounded-full"
                    aria-label="More options for Sales Pipeline Progress"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <svg className="h-10 w-10" viewBox="0 0 40 40">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                        className="dark:stroke-zinc-700"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="4"
                        strokeDasharray="113"
                        strokeDashoffset="40"
                        transform="rotate(-90 20 20)"
                        className="dark:stroke-amber-500"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xl font-semibold text-gray-900 dark:text-zinc-100">65%</span>
                    <span className="ml-2 text-sm font-medium text-red-500">-2%</span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-zinc-400">vs last week</span>
                  </div>
                </div>
              </div>

              {/* New Key Result Button */}
              <button
                className="flex items-center justify-center w-full py-3 bg-gray-100 dark:bg-zinc-800/50 rounded-md text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Add new key result"
              >
                <Plus className="h-4 w-4 mr-2" />
                New key result
              </button>
            </div>

            {/* Follow-up Actions */}
            <div className="px-4 sm:px-5 py-4">
              <h4 className="text-xs font-medium text-gray-400 dark:text-zinc-500 uppercase tracking-wide mb-4">
                FOLLOW-UPS ACTIONS
              </h4>

              <div className="space-y-5">
                {/* Action Item 1 */}
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 break-words">
                      Weekly sales pipeline review
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">James Brown — Every Monday, 10:00 AM</p>
                  </div>
                </div>

                {/* Action Item 2 */}
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 break-words">
                      Mid-quarter marketing campaign analysis
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">Sophia Williams — Nov 15, 2025</p>
                  </div>
                </div>

                {/* Action Item 3 */}
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 break-words">
                      Lead qualification process optimization
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">Wei Chen — Oct 31, 2025</p>
                  </div>
                </div>

                {/* Action Item 4 */}
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 break-words">
                      Customer feedback integration program
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">Laura Perez — Jan 18, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
              aria-label="Cancel and close drawer"
            >
              Cancel
            </button>
            <button
              className="px-4 sm:px-6 py-2.5 text-sm font-medium text-white bg-black dark:bg-zinc-800 hover:bg-gray-800 dark:hover:bg-zinc-700 rounded-md transition-colors"
              aria-label="Follow up"
            >
              Follow up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


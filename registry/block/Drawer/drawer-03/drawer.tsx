"use client"

import { useState } from "react"
import { X, FileText, Lock, ShieldCheck,Speaker, RefreshCw,ChevronRight , Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Drawer03() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <Button onClick={toggleDrawer} className="justify-center z-10 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
        Open Support
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40" onClick={toggleDrawer} />}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full sm:max-w-[400px] bg-white dark:bg-zinc-900 shadow-lg transform transition-transform duration-300 ease-in-out rounded-l-xl",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium dark:text-zinc-100">Internet Banking Support</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">Contact Support (24/7)</p>
              </div>
              <button onClick={toggleDrawer} className="text-gray-400 hover:text-gray-500 dark:text-zinc-400">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 relative">
              <div className="relative">
                <Input
                  placeholder="Search..."
                  className="pl-8 pr-8 py-2 h-9 text-sm dark:bg-zinc-800 dark:border-zinc-700 rounded-md"
                />
                <svg
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 dark:text-zinc-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="absolute right-2.5 top-2 text-xs text-gray-400 dark:text-zinc-400">⌘ I</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {/* Unable to access wallet section */}
            <div className="px-5 pb-4 border-t border-gray-100 dark:border-zinc-800">
              <h3 className="text-xs font-medium text-gray-400 dark:text-zinc-400 mt-4 mb-3">
                UNABLE TO ACCESS WALLET
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-zinc-400">1</span>
                  <span className="text-sm dark:text-zinc-200">Two-Factor Authentication Issues</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-zinc-400">2</span>
                  <span className="text-sm dark:text-zinc-200">Incorrect Login Information</span>
                </div>
                <Button variant="outline" className="w-full mt-2 py-2 border border-gray-200 dark:border-zinc-700 rounded-md text-sm dark:text-zinc-300 dark:hover:bg-zinc-800">
                  How to resolve?
                </Button>
              </div>
            </div>

            {/* You might be looking for section */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-zinc-800">
              <h3 className="text-xs font-medium text-gray-400 dark:text-zinc-400 mb-3">YOU MIGHT BE LOOKING FOR</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-gray-400 dark:text-zinc-400" />
                  </div>
                  <span className="text-sm dark:text-zinc-200">Generate monthly statement?</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 text-gray-400 dark:text-zinc-400"></RefreshCw>
                  </div>
                  <span className="text-sm dark:text-zinc-200">Want to automate your bill payments?</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      className="h-4 w-4 text-gray-400 dark:text-zinc-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm dark:text-zinc-200">Looking to earn rewards with premium banking?</span>
                </div>
              </div>
            </div>

            {/* Self service section */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-zinc-800">
              <h3 className="text-xs font-medium text-gray-400 dark:text-zinc-400 mb-3">SELF SERVICE</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-green-300 dark:bg-green-900 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-green-600 dark:text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-zinc-200">Reset Password</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Reset your online banking password.</p>
                    </div>
                  </div>
                  <div className="text-gray-400 dark:text-zinc-400"><ChevronRight /> </div>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-800" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-zinc-200">Account Security</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Update authentication settings.</p>
                    </div>
                  </div>
                  <div className="text-gray-400 dark:text-zinc-400"><ChevronRight /> </div>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                      <RefreshCw className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-zinc-200">Recover Account</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Regain access to online banking.</p>
                    </div>
                  </div>
                  <div className="text-gray-400 dark:text-zinc-400"><ChevronRight /> </div>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center">
                      <Speaker className="h-4 w-4 text-pink-600 dark:text-pink-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-zinc-200">PIN Services</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Change ATM or card PIN.</p>
                    </div>
                  </div>
                  <div className="text-gray-400 dark:text-zinc-400"><ChevronRight /> </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-400 dark:text-zinc-400" />
              <span className="text-sm text-gray-500 dark:text-zinc-400">Support (8)</span>
            </div>
            <button className="bg-gray-900 text-white dark:bg-zinc-800 dark:text-zinc-200 text-xs font-medium py-1.5 px-3 rounded">
              View Support Hours
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

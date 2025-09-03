"use client"

import { useState } from "react"
import { Check, ChevronDown, Github, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"

// Sample data for dropdowns
const users = ["praveenjuge", "johndoe", "janedoe", "alexsmith"]
const repositories = ["project-alpha", "website-redesign", "mobile-app", "dashboard-ui"]

export default function Dialog05() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState("praveenjuge")
  const [selectedRepo, setSelectedRepo] = useState("project-alpha")

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Connect to GitHub</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 border dark:border-zinc-800 overflow-hidden">
        <div className="relative">
          {/* Decorative dots pattern */}
          <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-cyan-500 dark:bg-zinc-400"
                  style={{
                    width: Math.random() * 4 + 2 + "px",
                    height: Math.random() * 4 + 2 + "px",
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Icons at the top */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.44.0/files/dark/perplexity-color.png" alt="Logo" width={32} height={32} className="w-6 h-6" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-gray-500 dark:text-zinc-400" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <Github className="w-5 h-5 text-gray-800 dark:text-zinc-200" />
              </div>
            </div>

            {/* Dialog title and description */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2 dark:text-zinc-100">Connect Mosaic to GitHub</h2>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Select a user and repository to connect with Mosaic for streamlined workflow integration.
              </p>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="github-user"
                  className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1"
                >
                  GitHub User
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      id="github-user"
                      className="flex items-center justify-between w-full px-3 py-2 text-left border rounded-md border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                      {selectedUser}
                      <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[240px]">
                    {users.map((user) => (
                      <DropdownMenuItem
                        key={user}
                        className="flex items-center justify-between"
                        onClick={() => setSelectedUser(user)}
                      >
                        {user}
                        {selectedUser === user && <Check className="w-4 h-4 ml-2" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <label
                  htmlFor="github-repo"
                  className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1"
                >
                  GitHub Repository
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      id="github-repo"
                      className="flex items-center justify-between w-full px-3 py-2 text-left border rounded-md border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                      {selectedRepo}
                      <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[240px]">
                    {repositories.map((repo) => (
                      <DropdownMenuItem
                        key={repo}
                        className="flex items-center justify-between"
                        onClick={() => setSelectedRepo(repo)}
                      >
                        {repo}
                        {selectedRepo === repo && <Check className="w-4 h-4 ml-2" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                className="flex-1 bg-transparent hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700"
                onClick={() => {
                  // Handle connection logic here
                  alert(`Connecting ${selectedUser}/${selectedRepo}`)
                  setIsOpen(false)
                }}
              >
                Connect Repository
              </Button>
            </div>

            {/* Disclaimer text */}
            <div className="mt-6 text-center text-xs text-gray-500 dark:text-zinc-500">
              By clicking "Connect Repository", you agree to grant Mosaic access to the selected GitHub repository. This
              action is subject to our{" "}
              <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Layers } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Switch02() {
  const [integrations, setIntegrations] = useState({
    office365: false,
    zoom: false,
    slack: false,
    trello: false,
  })

  const handleToggle = (key: keyof typeof integrations) => {
    setIntegrations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-inherit dark:bg-zinc-900 p-4">
      <Card className="w-full max-w-lg shadow-lg border-0 dark:bg-zinc-800 dark:border-zinc-700">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-700">
              <Layers className="h-5 w-5 text-gray-500 dark:text-zinc-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Integrations</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                Choose what notifications you want to receive.
              </p>
            </div>
          </div>
        </CardHeader>
        <div className="px-6">
          <div className="h-px bg-gray-200 dark:bg-zinc-700" />
        </div>
        <CardContent className="pt-6 space-y-4">
          <Card className="border border-gray-200 dark:border-zinc-700 shadow-none dark:bg-inherit">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#FFF4F0" className="dark:fill-orange-950/30" />
                    <path
                      d="M25 14H15C14.4477 14 14 14.4477 14 15V25C14 25.5523 14.4477 26 15 26H25C25.5523 26 26 25.5523 26 25V15C26 14.4477 25.5523 14 25 14Z"
                      fill="#EB3C00"
                    />
                    <path d="M19.5 20.5H17V23H19.5V20.5Z" fill="white" />
                    <path d="M23 20.5H20.5V23H23V20.5Z" fill="white" />
                    <path d="M19.5 17H17V19.5H19.5V17Z" fill="white" />
                    <path d="M23 17H20.5V19.5H23V17Z" fill="white" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-zinc-100">Microsoft Office 365</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Seamless collaboration and document management.
                  </p>
                </div>
              </div>
              <Switch
                checked={integrations.office365}
                onCheckedChange={() => handleToggle("office365")}
                className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500"
              />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-zinc-700 shadow-none dark:bg-inherit">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#EBF5FF" className="dark:fill-blue-950/30" />
                    <path
                      d="M20 26C23.3137 26 26 23.3137 26 20C26 16.6863 23.3137 14 20 14C16.6863 14 14 16.6863 14 20C14 23.3137 16.6863 26 20 26Z"
                      fill="#2D8CFF"
                    />
                    <path
                      d="M23 19.5H20.5V17C20.5 16.7239 20.2761 16.5 20 16.5C19.7239 16.5 19.5 16.7239 19.5 17V19.5H17C16.7239 19.5 16.5 19.7239 16.5 20C16.5 20.2761 16.7239 20.5 17 20.5H19.5V23C19.5 23.2761 19.7239 23.5 20 23.5C20.2761 23.5 20.5 23.2761 20.5 23V20.5H23C23.2761 20.5 23.5 20.2761 23.5 20C23.5 19.7239 23.2761 19.5 23 19.5Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-zinc-100">Zoom</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    For conducting virtual meetings and interviews.
                  </p>
                </div>
              </div>
              <Switch
                checked={integrations.zoom}
                onCheckedChange={() => handleToggle("zoom")}
                className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500"
              />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-zinc-700 shadow-none dark:bg-inherit">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#F0F4FF" className="dark:fill-indigo-950/30" />
                    <path d="M14 14H18V18H14V14Z" fill="#E01E5A" />
                    <path d="M14 22H18V26H14V22Z" fill="#2EB67D" />
                    <path d="M22 14H26V18H22V14Z" fill="#ECB22E" />
                    <path d="M22 22H26V26H22V22Z" fill="#36C5F0" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-zinc-100">Slack</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    For team communication and real-time collaboration.
                  </p>
                </div>
              </div>
              <Switch
                checked={integrations.slack}
                onCheckedChange={() => handleToggle("slack")}
                className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500"
              />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-zinc-700 shadow-none dark:bg-inherit">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#EBF8FF" className="dark:fill-blue-950/30" />
                    <rect x="14" y="14" width="12" height="12" rx="2" fill="#0079BF" />
                    <rect x="16" y="17" width="4" height="2" rx="1" fill="white" />
                    <rect x="16" y="21" width="8" height="2" rx="1" fill="white" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-zinc-100">Trello</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    For task management and project collaboration.
                  </p>
                </div>
              </div>
              <Switch
                checked={integrations.trello}
                onCheckedChange={() => handleToggle("trello")}
                className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500"
              />
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between gap-4 pt-2">
          <Button variant="outline" className="w-full dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700">
            Discard
          </Button>
          <Button className="w-full dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Apply Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

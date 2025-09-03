"use client"

import { useState } from "react"
import { Bell, Info } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Switch01() {
  const [preferences, setPreferences] = useState({
    newsAndUpdates: true,
    promotionsAndOffers: false,
    remindersAndEvents: false,
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-inherit dark:bg-zinc-900 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 dark:bg-zinc-800 dark:border-zinc-700">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-700">
              <Bell className="h-5 w-5 text-gray-500 dark:text-zinc-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Notification Preferences</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                Choose what notifications you want to receive.
              </p>
            </div>
          </div>
        </CardHeader>
        <div className="px-6">
          <div className="h-px bg-gray-200 dark:bg-zinc-700" />
        </div>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900 dark:text-zinc-100">News and Updates</h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Stay informed about the latest news, updates, and announcements.
              </p>
            </div>
            <Switch
              checked={preferences.newsAndUpdates}
              onCheckedChange={() => handleToggle("newsAndUpdates")}
              className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900 dark:text-zinc-100">Promotions and Offers</h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Receive notifications about special promotions, discounts, and exclusive offers.
              </p>
            </div>
            <Switch
              checked={preferences.promotionsAndOffers}
              onCheckedChange={() => handleToggle("promotionsAndOffers")}
              className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900 dark:text-zinc-100">Reminders and Events</h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Get reminders for upcoming events, deadlines, and appointments.
              </p>
            </div>
            <Switch
              checked={preferences.remindersAndEvents}
              onCheckedChange={() => handleToggle("remindersAndEvents")}
              className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500"
            />
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Maximize your app usage by leaving notification settings active.
            </p>
          </div>
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

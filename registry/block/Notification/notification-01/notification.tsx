"use client"

import type React from "react"

import { useState } from "react"
import { Bell, MoreVertical, Settings, User, Target, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NotificationItemProps {
  icon: React.ReactNode
  title: string
  description: string
  time: string
  hasOptions?: boolean
  isUnread?: boolean
}

const NotificationItem = ({
  icon,
  title,
  description,
  time,
  hasOptions = false,
  isUnread = false,
}: NotificationItemProps) => {
  return (
    <div className="flex items-start gap-3 py-4 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center ">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              {title}
              {isUnread && <span className="w-2 h-2 rounded-full bg-blue-500" />}
            </p>
            <p className="text-slate-600 dark:text-zinc-400 text-sm">{description}</p>
            <p className="text-slate-500 dark:text-zinc-500 text-sm mt-1">{time}</p>
          </div>
          {hasOptions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mark as read</DropdownMenuItem>
                <DropdownMenuItem>Delete notification</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  )
}

export function Notification01() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full h-10 w-10 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
        >
          <Bell className="h-5 w-5 text-slate-600 dark:text-zinc-400" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-blue-500" />
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[calc(100vw-32px)] p-0 sm:w-[380px] border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        align="center"
        side="bottom"
        sideOffset={8}
      >
        <Card className="border-0 shadow-none">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zinc-800">
            <h2 className="text-lg font-medium text-slate-900 dark:text-zinc-100">Notifications</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4 text-slate-600 dark:text-zinc-400" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-zinc-800 px-4">
            <NotificationItem
              icon={<User className="h-5 w-5 text-blue-500" />}
              title="New Lead Generated"
              description="John Smith submitted web form"
              time="10 minutes ago"
              hasOptions={true}
            />
            <NotificationItem
              icon={<Target className="h-5 w-5 text-amber-500" />}
              title="Campaign Milestone"
              description="Black Friday campaign hit 150% target"
              time="3 days ago"
              isUnread={true}
              hasOptions={true}
            />
            <NotificationItem
              icon={<MessageSquare className="h-5 w-5 text-purple-500" />}
              title="Live Chat Interaction"
              description="John Smith submitted web form"
              time="4 days ago"
              hasOptions={true}
            />
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
            <Button
              variant="outline"
              className="w-full text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800"
            >
              Archive All
            </Button>
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

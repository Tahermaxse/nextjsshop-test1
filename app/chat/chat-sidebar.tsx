"use client"

import * as React from "react"
import {
  Settings,
  Search,
  Edit3,
  Sparkles,
  History,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  LogOut,
  BadgeCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const chatHistory = {
  today: [],
  yesterday: [
    "Best AI for translating texts?",
    "Help me how to trade shitcoins?",
    "Need a detailed guide on how to far...",
    "Help me how to trade shitcoins?",
    "Need a detailed guide on how to far...",
  ],
  lastWeek: [
    "Best AI for translating texts?",
    "Help me how to trade shitcoins?",
    "Need a detailed guide on how to far...",
    "Help me how to trade shitcoins?",
    "Need a detailed guide on how to far...",
  ],
}

function TopNavbar() {
  const { open } = useSidebar()

  if (open) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-gray-50/95 border-gray-200">
      <div className="flex h-full items-center px-4">
        <SidebarTrigger className="h-8 w-8 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900" />
        <div className="ml-4">
          <h1 className="text-lg font-semibold text-gray-900">Chat Interface</h1>
        </div>
      </div>
    </div>
  )
}

function ChatSidebarContent() {
  const [todayOpen, setTodayOpen] = React.useState(true)
  const [yesterdayOpen, setYesterdayOpen] = React.useState(false)
  const [lastWeekOpen, setLastWeekOpen] = React.useState(false)

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="border-b border-border/40 p-2 dark:bg-zinc-900 bg-gray-100 border-gray-200">
        <div className="flex items-center justify-between mb-4 dark:bg-zinc-950 bg-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 dark:bg-zinc-900 bg-gray-100 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 dark:bg-zinc-900 bg-gray-100 hover:bg-gray-50"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <SidebarTrigger className="h-8 w-8 dark:bg-zinc-900 bg-gray-100 hover:bg-gray-50" />
        </div>

        <SidebarMenu className="dark:bg-zinc-950 bg-gray-200 rounded-lg p-2">
          <SidebarMenuItem className="dark:bg-zinc-900 bg-gray-100 rounded-lg">
            <SidebarMenuButton className="h-10 justify-start gap-3 dark:hover:bg-accent/50 hover:bg-gray-50">
              <Edit3 className="h-4 w-4" />
              <span className="font-medium">Create new chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 justify-start gap-3 dark:hover:bg-accent/50 text-muted-foreground hover:bg-gray-50 text-gray-600">
              <Sparkles className="h-4 w-4" />
              <span>New model</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 justify-start gap-3 dark:hover:bg-accent/50 text-muted-foreground hover:bg-gray-50 text-gray-600">
              <History className="h-4 w-4" />
              <span>History</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {/* Today Section */}
        <Collapsible
          open={todayOpen}
          onOpenChange={setTodayOpen}
          className="dark:bg-zinc-950 bg-gray-100 rounded-lg p-2"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-between p-2 h-8 text-sm font-medium text-muted-foreground hover:text-foreground text-gray-600 hover:text-gray-900 ${
                todayOpen ? "dark:bg-zinc-900 bg-gray-200" : ""
              }`}
            >
              Today
              {todayOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-2">
            {chatHistory.today.length === 0 && (
              <div className="text-xs text-muted-foreground px-2 py-4 text-center text-gray-500">
                No chats today
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Yesterday Section */}
        <Collapsible
          open={yesterdayOpen}
          onOpenChange={setYesterdayOpen}
          className="mt-4 dark:bg-zinc-950 bg-gray-100 rounded-lg p-2"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-between p-2 h-8 text-sm font-medium text-muted-foreground dark:hover:text-foreground text-gray-600 hover:text-gray-900 ${
                yesterdayOpen ? "dark:bg-zinc-900 bg-gray-200" : ""
              }`}
            >
              Yesterday
              {yesterdayOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-2">
            {chatHistory.yesterday.map((chat, index) => (
              <div
                key={index}
                className="group flex items-center justify-between rounded-md px-2 py-2 text-sm dark:hover:bg-accent/50 hover:bg-gray-50 cursor-pointer"
              >
                <span className="truncate text-muted-foreground  text-gray-600 group-hover:text-gray-900">
                  {chat}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0 hover:bg-gray-100"
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Last 7 days Section */}
        <Collapsible
          open={lastWeekOpen}
          onOpenChange={setLastWeekOpen}
          className="mt-4 dark:bg-zinc-950 bg-gray-100 rounded-lg p-2"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-between p-2 h-8 text-sm font-medium text-muted-foreground hover:text-foreground text-gray-600 hover:text-gray-900 ${
                lastWeekOpen ? "dark:bg-zinc-900 bg-gray-200" : ""
              }`}
            >
              Last 7 days
              {lastWeekOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-2">
            {chatHistory.lastWeek.map((chat, index) => (
              <div
                key={index}
                className="group flex items-center justify-between rounded-md px-2 py-2 text-sm dark:hover:bg-accent/50 hover:bg-gray-50 cursor-pointer"
              >
                <span className="truncate text-muted-foreground  text-gray-600 group-hover:text-gray-900">
                  {chat}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0 hover:bg-gray-100"
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4 dark:bg-zinc-950 bg-gray-200 border-gray-200 rounded-lg m-2">
        <div className="flex items-center gap-3 dark:bg-zinc-900 bg-gray-100 rounded-lg p-2">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-primary rounded-md text-primary-foreground text-xs font-medium">
              W
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm font-medium truncate">wlad</span>
            <BadgeCheck className="h-5 w-5 text-white fill-blue-500 shrink-0" />
          </div>
          <Badge
            variant="secondary"
            className="text-xs px-2 rounded-md py-0.5 dark:bg-zinc-950 bg-gray-300 text-gray-700"
          >
            PRO
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 dark:bg-zinc-950 bg-gray-300 hover:bg-gray-200"
          >
            <LogOut className="h-3 w-3" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function ChatSidebarDemo() {
  return (
    <div className="flex h-screen w-full">
      <SidebarProvider defaultOpen={true}>
        <TopNavbar />
        <ChatSidebarContent />
        <main className="flex-1 flex items-center justify-center bg-background bg-gray-50 pt-14">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900">Chat Interface</h1>
            <p className="text-muted-foreground text-gray-600">
              This is the main chat area. The sidebar matches the design from your image.
            </p>
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}

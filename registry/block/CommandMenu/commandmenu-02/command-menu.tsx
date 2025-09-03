"use client"

import * as React from "react"
import { ArrowDown, ArrowRight, ArrowUp, Check } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CommandMenu02() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const recentItems = ["Onboarding", "Reviews", "Hiring", "Benefits", "Learning"]

  const toolsAndApps = [
    {
      name: "Monday.com",
      icon: (
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#ff3d57]">
          <span className="text-[10px] font-bold text-white">M</span>
        </div>
      ),
    },
    {
      name: "Loom",
      icon: (
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#625df5]">
          <span className="text-[10px] font-bold text-white">L</span>
        </div>
      ),
    },
    {
      name: "Asana",
      icon: (
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#f06a6a]">
          <span className="text-[10px] font-bold text-white">A</span>
        </div>
      ),
    },
  ]

  const employees = [
    {
      name: "James Brown",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar2.png?updatedAt=1745649103993",
    },
    {
      name: "Sophia Williams",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar4.png?updatedAt=1745649103993",
    },
    {
      name: "Laura Perez",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar5.png?updatedAt=1745649103993",
    },
  ]

  const teams = [
    {
      name: "Aurora Solutions",
      icon: (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5a5a]">
          <span className="text-[10px] font-bold text-white">A</span>
        </div>
      ),
    },
    {
      name: "Pulse Medical",
      icon: (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5ac8ff]">
          <span className="text-[10px] font-bold text-white">P</span>
        </div>
      ),
    },
    {
      name: "Synergy HR",
      icon: (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#a259ff]">
          <span className="text-[10px] font-bold text-white">S</span>
        </div>
      ),
    },
  ]

  const locations = [
    {
      name: "United States",
      flag: "🇺🇸",
    },
    {
      name: "Spain",
      flag: "🇪🇸",
    },
    {
      name: "Italy",
      flag: "🇮🇹",
    },
  ]

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search HR tools or press...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <CommandInput placeholder="Search HR tools or press..." className="h-11 flex-1" />
          <kbd className="hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            ⌘K
          </kbd>
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent" className="px-2 py-2">
            <div className="flex flex-wrap gap-2 px-1 pb-2">
              {recentItems.map((item) => (
                <Button key={item} variant="outline" size="sm" className="h-8 rounded-md">
                  {item}
                </Button>
              ))}
            </div>
          </CommandGroup>
          <CommandSeparator />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-r">
              <CommandGroup
                heading={
                  <div className="flex items-center justify-between px-2">
                    <span>Tools & Apps</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                }
              >
                {toolsAndApps.map((item) => (
                  <CommandItem key={item.name} className="mx-2 flex items-center gap-2 rounded-md px-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup
                heading={
                  <div className="flex items-center justify-between px-2">
                    <span>Teams</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                }
              >
                {teams.map((item) => (
                  <CommandItem key={item.name} className="mx-2 flex items-center gap-2 rounded-md px-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
            <div>
              <CommandGroup
                heading={
                  <div className="flex items-center justify-between px-2">
                    <span>Employees</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                }
              >
                {employees.map((item, index) => (
                  <CommandItem
                    key={item.name}
                    className={`mx-2 flex items-center gap-2 rounded-md px-2 ${index === 1 ? "bg-accent" : ""}`}
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{item.name}</span>
                    {index === 1 && <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup
                heading={
                  <div className="flex items-center justify-between px-2">
                    <span>Locations</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                }
              >
                {locations.map((item) => (
                  <CommandItem key={item.name} className="mx-2 flex items-center gap-2 rounded-md px-2">
                    <span className="text-base">{item.flag}</span>
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </div>
          <CommandSeparator />
          <div className="flex items-center justify-between border-t p-2 px-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3" />
              <ArrowDown className="h-3 w-3" />
              <span>Navigate</span>
              <Check className="ml-2 h-3 w-3" />
              <span>Select</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Any problem?{" "}
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Contact
              </Button>
            </div>
          </div>
        </CommandList>
      </CommandDialog>
    </>
  )
}

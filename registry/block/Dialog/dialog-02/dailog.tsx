"use client"

import * as React from "react"
import { X, Link2, MoreVertical, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Teammate {
  id: string
  name: string
  email: string
  status: "online" | "away" | "inactive"
  statusText?: string
  avatarUrl?: string
}

export default function Dialog02() {
  const [open, setOpen] = React.useState(false)
  const [invitees, setInvitees] = React.useState<string[]>(["Richard Winson"])
  const [inputValue, setInputValue] = React.useState("")

  const teammates: Teammate[] = [
    {
      id: "1",
      name: "Arlo Finch",
      email: "arlofinch@company.com",
      status: "online",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Juniper Lane",
      email: "juniperlane@company.com",
      status: "away",
      statusText: "Away (2 mins)",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Rowan Sage",
      email: "rowansage@company.com",
      status: "away",
      statusText: "Away (2 days)",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Finnian York",
      email: "finnianyork@company.com",
      status: "inactive",
      statusText: "Inactive (1 year)",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleRemoveInvitee = (invitee: string) => {
    setInvitees(invitees.filter((i) => i !== invitee))
  }

  const handleAddInvitee = () => {
    if (inputValue && !invitees.includes(inputValue)) {
      setInvitees([...invitees, inputValue])
      setInputValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddInvitee()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Invite Teammates</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-md md:max-w-[480px] shadow-none rounded-[20px] dark:bg-zinc-900 ">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <DialogTitle className="text-xl font-medium">Invite Teammates</DialogTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Invite input */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 rounded-full border bg-background px-2 py-1.5 flex items-center flex-wrap gap-1">
              {invitees.map((invitee) => (
                <Badge
                  key={invitee}
                  variant="secondary"
                  className="rounded-full flex items-center gap-1 pl-1 pr-1 py-1 bg-muted"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt={invitee} />
                    <AvatarFallback>{invitee.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{invitee}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full hover:bg-muted-foreground/20 "
                    onClick={() => handleRemoveInvitee(invitee)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {invitee}</span>
                  </Button>
                </Badge>
              ))}
              <Input
                type="text"
                placeholder={invitees.length > 0 ? "" : "Add teammates..."}
                className="flex-1 ml-2 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[100px]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button className="rounded-full bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white">
              Invite
            </Button>
          </div>

          {/* Shareable link */}
          <div className="rounded-2xl border-gray-300 dark:border-zinc-600 border-2 bg-muted/50 p-4 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-background p-2 border">
                <Link2 className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="font-semibold">Shareable Link is now Live!</p>
                <p className="text-[12px] text-muted-foreground ">Create and get shareable link for this file.</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-full">
              Get Link
            </Button>
          </div>

          {/* Team members list */}
          <div className="space-y-3">
            {teammates.map((teammate) => (
              <div key={teammate.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={teammate.avatarUrl || "/placeholder.svg"} alt={teammate.name} />
                    <AvatarFallback>{teammate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{teammate.name}</p>
                    <p className="text-sm text-muted-foreground">{teammate.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {teammate.status === "online" && <span className="text-green-600 text-sm">Online</span>}
                  {teammate.status === "away" && <span className="text-amber-600 text-sm">{teammate.statusText}</span>}
                  {teammate.status === "inactive" && (
                    <span className="flex items-center gap-1 text-red-700 text-sm">
                      <AlertCircle className="h-4 w-4 fill-red-700 text-white" />
                      {teammate.statusText}
                    </span>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border-[1px] border-gray-300 dark:border-zinc-600 bg-muted/50 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

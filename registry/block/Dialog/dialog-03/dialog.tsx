"use client"

import * as React from "react"
import { X, Copy, Code, FileOutputIcon as FileExport, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ProjectMember {
  id: string
  name: string
  email: string
  role: "owner" | "view" | "edit"
  avatarUrl?: string
}

export default function Dialog03() {
  const [open, setOpen] = React.useState(false)
  const [invitees, setInvitees] = React.useState<string[]>(["johndoe@gmail.com"])
  const [inputValue, setInputValue] = React.useState("")
  const [linkPermission, setLinkPermission] = React.useState("anyone")
  const [inviteePermission, setInviteePermission] = React.useState("view")
  const [copied, setCopied] = React.useState(false)
  const { toast } = useToast()

  const projectMembers: ProjectMember[] = [
    {
      id: "1",
      name: "Insan Kamil",
      email: "insank@gmail.com",
      role: "owner",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "John Smith",
      email: "johnsmith@gmail.com",
      role: "view",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Mario Rodriguez",
      email: "mariorodriguez@gmail.com",
      role: "edit",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Emily Chen",
      email: "emilychen@gmail.com",
      role: "edit",
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://www.figma.com/design/Project-Screen")
    setCopied(true)

    toast({
      title: "Link copied to clipboard",
      description: "You can now share this link with others",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const sendInvite = () => {
    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${invitees.join(", ")}`,
    })
  }

  const getEmbedCode = () => {
    toast({
      title: "Embed code copied",
      description: "You can now embed this project on your website",
    })
  }

  const exportProject = () => {
    toast({
      title: "Export started",
      description: "Your project export will be ready shortly",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 dark:from-zinc-700 dark:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-500 text-white shadow-md transition-all duration-300"
        >
          Invite to Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-0 overflow-hidden rounded-xl shadow-xl border-0 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="bg-gradient-to-r from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 p-6">
          <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500 dark:text-zinc-300"
                >
                  <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                  <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                  <path d="M15 2v5h5" />
                </svg>
              </div>
              <div>
                <DialogTitle className="text-lg font-medium">Invite to Project</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Collaborate with members on this project.
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
        </div>

        <Separator className="my-0" />

        <div className="p-6 space-y-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 230px)" }}>
          {/* Link to Share */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-sm font-medium">Link to Share</h3>
              <Select value={linkPermission} onValueChange={setLinkPermission}>
                <SelectTrigger className="h-8 w-full sm:w-[160px] text-xs">
                  <SelectValue placeholder="Anyone with link" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anyone">Anyone with link</SelectItem>
                  <SelectItem value="team">Team members only</SelectItem>
                  <SelectItem value="specific">Specific people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">Anyone with the link can access</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Input
                  value="https://www.figma.com/design/Project-Screen"
                  readOnly
                  className="h-9 text-sm bg-muted/30 pr-10 focus-visible:ring-1 focus-visible:ring-offset-0 transition-all"
                />
                {copied && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 animate-in fade-in">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-9 px-3 flex items-center gap-1.5 transition-all duration-200 border-gray-200 dark:border-zinc-700",
                  copied ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" : "",
                )}
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Email</h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1 rounded border bg-background px-2 py-1.5 flex items-center flex-wrap gap-1.5 focus-within:ring-1 focus-within:ring-ring focus-within:border-input transition-all">
                {invitees.map((invitee) => (
                  <Badge
                    key={invitee}
                    variant="secondary"
                    className="rounded-md flex items-center gap-1 pl-2 pr-1 py-1 bg-muted/70 hover:bg-muted transition-colors"
                  >
                    <span className="text-xs">{invitee}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full hover:bg-muted-foreground/20"
                      onClick={() => handleRemoveInvitee(invitee)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {invitee}</span>
                    </Button>
                  </Badge>
                ))}
                <Input
                  type="email"
                  placeholder={invitees.length > 0 ? "" : "Enter email address"}
                  className="flex-1 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[100px]"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={inviteePermission} onValueChange={setInviteePermission}>
                  <SelectTrigger className="h-9 w-full sm:w-[120px] text-xs">
                    <SelectValue placeholder="Can View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">Can View</SelectItem>
                    <SelectItem value="edit">Can Edit</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="h-9 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 dark:from-zinc-700 dark:to-zinc-600 dark:hover:from-zinc-600 dark:hover:to-zinc-500 text-white shadow-sm transition-all duration-300"
                  onClick={sendInvite}
                >
                  Send Invite
                </Button>
              </div>
            </div>
          </div>

          {/* Project Members */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Project Members</h3>
            <div className="space-y-3">
              {projectMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-white dark:border-zinc-800 shadow-sm">
                      <AvatarImage src={member.avatarUrl || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-700 dark:to-zinc-800 text-gray-700 dark:text-zinc-300">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <Select defaultValue={member.role}>
                    <SelectTrigger className="h-8 w-full sm:w-[120px] text-xs">
                      <SelectValue>
                        {member.role === "owner" ? "Owner" : member.role === "view" ? "Can View" : "Can Edit"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {member.role === "owner" ? (
                        <SelectItem value="owner">Owner</SelectItem>
                      ) : (
                        <>
                          <SelectItem value="view">Can View</SelectItem>
                          <SelectItem value="edit">Can Edit</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-4 border-t bg-gray-50 dark:bg-zinc-800/50 flex flex-wrap items-center justify-start gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs flex items-center gap-1.5 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
            onClick={getEmbedCode}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Get embed code</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs flex items-center gap-1.5 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
            onClick={exportProject}
          >
            <FileExport className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

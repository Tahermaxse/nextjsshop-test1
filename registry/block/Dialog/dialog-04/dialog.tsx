"use client"

import { useState } from "react"
import { X, Home, Trash2, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DeleteWorkspaceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workspaceName: string
  workspaceDetails: {
    pipelines: number
    tests: number
    commits: number
  }
  onDelete: () => void
  onGoToHome: () => void
}

export function Dialog04({
  open,
  onOpenChange,
  workspaceName,
  workspaceDetails,
  onDelete,
  onGoToHome,
}: DeleteWorkspaceDialogProps) {
  const [inputValue, setInputValue] = useState("")
  const isConfirmed = inputValue === workspaceName

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-zinc-900">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Delete workspace</DialogTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <p className="text-base font-normal text-zinc-600 dark:text-zinc-400 mt-2">
            Are you sure you want to delete the following workspace?
          </p>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4">
          {/* Warning box */}
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-md p-4 flex">
            <div className="min-w-[4px] bg-red-500 dark:bg-red-600 rounded-full mr-4" />
            <div>
              <p className="flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-200">
                <AlertTriangle className="h-4 w-4 text-red-500 dark:text-red-400 mr-1.5" />
                Warning: This action <span className="font-bold">cannot be undone</span>.
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Deleting a workspace will remove all its associated data. Any test, configuration, monitoring insights,
                and more will be <span className="font-bold">permanently lost</span>.
              </p>
            </div>
          </div>

          {/* Workspace info box */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{workspaceName}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {workspaceDetails.pipelines} Pipelines, {workspaceDetails.tests} tests, {workspaceDetails.commits}{" "}
                    commits
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={onGoToHome}>
                <Home className="h-3.5 w-3.5 mr-1.5" />
                Go to Home
              </Button>
            </div>
          </div>

          {/* Confirmation input */}
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              To delete, type the workspace name{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-200">{workspaceName}</span> below
            </p>
            <div className="relative">
              <Trash2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                className="pl-9 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700"
                placeholder={`Enter ${workspaceName}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={!isConfirmed}
            onClick={onDelete}
            className={`bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white ${
              !isConfirmed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Yes, Delete Workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Drawer01 } from "./drawer"

export default function Demo() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-zinc-900">
      <Button
        onClick={() => setIsDrawerOpen(true)}
        className="rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Open Service Fee Drawer
      </Button>
      <Drawer01 isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  )
}


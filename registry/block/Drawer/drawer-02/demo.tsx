"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Drawer02 } from "./drawer"

export default function Demo02() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-zinc-900">
      <Button onClick={() => setIsDrawerOpen(true)} className="rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">Open Goal Drawer</Button>
      <Drawer02 isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  )
}


"use client"

import { useState } from "react"
import Dialog06 from "./dailog"

export default function Demo06() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-inherit  dark:bg-zinc-900">
        <div className="w-full max-w-md mx-auto">
          <Dialog06 open={dialogOpen} onOpenChange={setDialogOpen} />
        </div>
      </main>
  )
}

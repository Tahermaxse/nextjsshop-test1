"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dailog08 } from "./dailog"

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Button onClick={() => setDialogOpen(true)}>Open New Campaign Request</Button>
        <Dailog08 open={dialogOpen} onOpenChange={setDialogOpen} />
      </main>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Dialog09 from "./dialog"

export default function Demo09() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button onClick={() => setDialogOpen(true)}>Open Upgrade Dialog</Button>
      <Dialog09 open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
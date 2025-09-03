"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import DatePicker from "./date-picker"

export default function Demo() {
  const [isOpen, setIsOpen] = useState(false)
  const [scheduledData, setScheduledData] = useState<any>(null)

  const handleSchedule = (data: any) => {
    setScheduledData(data)
    setIsOpen(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Date Picker Demo</h1>
          <p className="text-muted-foreground max-w-md mx-auto sm:mx-0">
            Click the button below to open the responsive date picker component.
          </p>
        </div>

        <div className="flex justify-center sm:justify-start">
          <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2" size="lg">
            <Calendar className="h-4 w-4" />
            Open Date Picker
          </Button>
        </div>

        {scheduledData && (
          <div className="mt-8 p-4 sm:p-6 border rounded-lg bg-muted/30">
            <h2 className="font-semibold mb-4 text-lg">Scheduled Meeting:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Start Date</span>
                  <span className="font-medium">{scheduledData.startDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Start Time</span>
                  <span className="font-medium">{scheduledData.startTime}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">End Date</span>
                  <span className="font-medium">{scheduledData.endDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">End Time</span>
                  <span className="font-medium">{scheduledData.endTime}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Maximum Participants</span>
                <span className="font-medium">{scheduledData.maxParticipants}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Open to All Departments</span>
                <span className="font-medium">{scheduledData.openToAll ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpen && <DatePicker onClose={() => setIsOpen(false)} onSchedule={handleSchedule} />}
    </div>
  )
}


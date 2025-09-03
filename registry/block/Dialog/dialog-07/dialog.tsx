"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Dailog07() {
  const [open, setOpen] = useState(false)
  const [slotDuration, setSlotDuration] = useState("15")
  const [doubleBooking, setDoubleBooking] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen bg-inherit dark:bg-zinc-900 p-4">
      <Button onClick={() => setOpen(true)}>Open Create Event Dialog</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-lg">
          <DialogHeader className="px-6 pt-6 pb-2 flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-medium">Create Event</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-6 w-6 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="px-6 py-4 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="building" className="text-sm font-medium">
                Select Building
              </Label>
              <Select defaultValue="921">
                <SelectTrigger id="building" className="w-full border rounded-full border-gray-200 dark:border-zinc-800">
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="921">921 N Gardner St</SelectItem>
                  <SelectItem value="922">922 N Gardner St</SelectItem>
                  <SelectItem value="923">923 N Gardner St</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day" className="text-sm font-medium">
                  Day
                </Label>
                <Input
                  id="day"
                  type="text"
                  placeholder="DD.MM.YYYY"
                  defaultValue="14.05.2022"
                  className="border border-gray-200 rounded-full dark:border-zinc-800"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeFrom" className="text-sm font-medium">
                  Time-From
                </Label>
                <div className="relative">
                  <Input
                    id="timeFrom"
                    type="text"
                    defaultValue="08:00 AM"
                    className="border border-gray-200 rounded-full dark:border-zinc-800 pr-8"
                  />
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeTo" className="text-sm font-medium">
                  Time-To
                </Label>
                <div className="relative">
                  <Input
                    id="timeTo"
                    type="text"
                    defaultValue="08:15 AM"
                    className="border border-gray-200 dark:border-zinc-800 pr-8 rounded-full"
                  />
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Slot Duration</Label>
              <div className="grid grid-cols-3 gap-2 p-1 rounded-full bg-gray-100 dark:bg-zinc-800">
                <Button
                  variant="ghost"
                  className={`rounded-full h-10 ${slotDuration === "15" ? "bg-white dark:bg-zinc-700 shadow-sm" : "bg-transparent hover:bg-gray-200 dark:hover:bg-zinc-700"}`}
                  onClick={() => setSlotDuration("15")}
                >
                  15 min
                </Button>
                <Button
                  variant="ghost"
                  className={`rounded-full h-10 ${slotDuration === "30" ? "bg-white dark:bg-zinc-700 shadow-sm" : "bg-transparent hover:bg-gray-200 dark:hover:bg-zinc-700"}`}
                  onClick={() => setSlotDuration("30")}
                >
                  30 min
                </Button>
                <Button
                  variant="ghost"
                  className={`rounded-full h-10 ${slotDuration === "60" ? "bg-white dark:bg-zinc-700 shadow-sm" : "bg-transparent hover:bg-gray-200 dark:hover:bg-zinc-700"}`}
                  onClick={() => setSlotDuration("60")}
                >
                  60 min
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="doubleBooking" className="text-sm font-medium">
                Double Booking
              </Label>
              <Switch id="doubleBooking" className="data-[state-checked]:bg-teal-700" checked={doubleBooking} onCheckedChange={setDoubleBooking} />
            </div>

            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-[calc(50%-8px)] border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle create event logic here
                  setOpen(false)
                }}
                className="w-[calc(50%-8px)] bg-teal-700 hover:bg-teal-800 text-white"
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

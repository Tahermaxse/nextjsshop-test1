"use client"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { Calendar, ChevronLeft, ChevronRight, X, Info, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "./hooks/use-media-query"

interface DatePickerProps {
  onClose?: () => void
  onSchedule?: (data: {
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    maxParticipants: number
    openToAll: boolean
  }) => void
  initialStartDate?: Date
  initialEndDate?: Date
  className?: string
}

export default function DatePicker({
  onClose,
  onSchedule,
  initialStartDate = new Date(2024, 0, 11),
  initialEndDate = new Date(2024, 0, 21),
  className,
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date(2024, 0, 1))
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("09:00")
  const [maxParticipants, setMaxParticipants] = useState(10)
  const [openToAll, setOpenToAll] = useState(true)
  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [focusedDate, setFocusedDate] = useState<number | null>(null)

  const calendarRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Initialize with the provided date range - only run once
  useEffect(() => {
    setSelectedStartDate(initialStartDate)
    setSelectedEndDate(initialEndDate)
    setCurrentMonth(new Date(initialStartDate.getFullYear(), initialStartDate.getMonth(), 1))
  }, []) // Empty dependency array to run only once

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Handle escape key to close
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.()
      }
    }

    document.addEventListener("keydown", handleEscapeKey as any)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey as any)
    }
  }, [onClose])

  // Generate calendar days for the current month
  useEffect(() => {
    const generateCalendarDays = () => {
      const days: Date[] = []
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth()

      // Get the first day of the month
      const firstDay = new Date(year, month, 1)
      // Get the last day of the month
      const lastDay = new Date(year, month + 1, 0)

      // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
      let firstDayOfWeek = firstDay.getDay()
      // Adjust for Monday as first day of week
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

      // Add days from previous month to fill the first row
      for (let i = firstDayOfWeek; i > 0; i--) {
        const prevMonthDay = new Date(year, month, 1 - i)
        days.push(prevMonthDay)
      }

      // Add all days of the current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(year, month, i))
      }

      // Calculate how many more days we need to complete the grid
      // We'll show exactly 6 weeks (42 days) to match the design
      const remainingDays = 42 - days.length

      // Add days from next month to complete the grid
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i))
      }

      return days
    }

    setCalendarDays(generateCalendarDays())
  }, [currentMonth])

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1)
    })
  }

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1)
    })
  }

  const handleDateClick = (date: Date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start a new selection
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    } else {
      // Complete the selection
      if (date < selectedStartDate) {
        setSelectedEndDate(selectedStartDate)
        setSelectedStartDate(date)
      } else {
        setSelectedEndDate(date)
      }
    }
  }

  const handleDateKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const currentIndex = focusedDate !== null ? focusedDate : index
    let newIndex = currentIndex

    switch (e.key) {
      case "ArrowRight":
        newIndex = Math.min(currentIndex + 1, calendarDays.length - 1)
        e.preventDefault()
        break
      case "ArrowLeft":
        newIndex = Math.max(currentIndex - 1, 0)
        e.preventDefault()
        break
      case "ArrowUp":
        newIndex = Math.max(currentIndex - 7, 0)
        e.preventDefault()
        break
      case "ArrowDown":
        newIndex = Math.min(currentIndex + 7, calendarDays.length - 1)
        e.preventDefault()
        break
      case "Enter":
      case " ":
        handleDateClick(calendarDays[currentIndex])
        e.preventDefault()
        break
      default:
        return
    }

    setFocusedDate(newIndex)

    // Focus the new date button
    const buttons = calendarRef.current?.querySelectorAll("button[data-date]")
    if (buttons && buttons[newIndex]) {
      ;(buttons[newIndex] as HTMLButtonElement).focus()
    }
  }

  const isDateInRange = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false
    return date >= selectedStartDate && date <= selectedEndDate
  }

  const isDateSelected = (date: Date) => {
    if (!selectedStartDate) return false
    if (selectedEndDate) {
      return date.getTime() === selectedStartDate.getTime() || date.getTime() === selectedEndDate.getTime()
    }
    return date.getTime() === selectedStartDate.getTime()
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatInputDate = (date: Date | null) => {
    if (!date) return ""
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const handleSchedule = () => {
    if (!selectedStartDate || !selectedEndDate) return

    onSchedule?.({
      startDate: formatDate(selectedStartDate),
      startTime,
      endDate: formatDate(selectedEndDate),
      endTime,
      maxParticipants,
      openToAll,
    })
  }

  const daysOfWeek = isMobile ? ["MO", "TU", "WE", "TH", "FR", "SA", "SU"] : ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]

  return (
    <div className="fixed z-[999] inset-0 flex items-center justify-center bg-black/50  p-2 sm:p-4">
      <div
        ref={modalRef}
        className={cn(
          "bg-background dark:bg-zinc-900 rounded-[20px] shadow-lg w-full max-w-3xl",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          "max-h-[calc(100vh-16px)] overflow-auto",
          "dark:border dark:border-zinc-800",
          className,
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background dark:bg-zinc-900 flex items-center p-3 sm:p-4 border-b dark:border-zinc-800">
          <div className="flex items-center">
            <div className="bg-muted dark:bg-zinc-800 rounded-full p-1.5 sm:p-3 mr-2 sm:mr-3 flex-shrink-0">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground dark:text-zinc-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold dark:text-zinc-100">Event Calendar</h2>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400">Schedule your team meetings and events easily</p>
            </div>
          </div>
          <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-300" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row md:divide-x dark:divide-zinc-800">
          {/* Calendar */}
          <div className="p-3 sm:p-4 md:w-1/2">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 sm:p-2 rounded-full hover:bg-muted dark:hover:bg-zinc-800"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 dark:text-zinc-400" />
              </button>
              <h3 className="text-base sm:text-lg font-medium dark:text-zinc-100">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
              <button
                onClick={handleNextMonth}
                className="p-1.5 sm:p-2 rounded-full hover:bg-muted dark:hover:bg-zinc-800"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 dark:text-zinc-400" />
              </button>
            </div>

            {/* Calendar grid */}
            <div ref={calendarRef} className="grid grid-cols-7 gap-0.5 sm:gap-1" role="grid" aria-label="Calendar">
              {/* Days of week */}
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-muted-foreground dark:text-zinc-500 py-1 sm:py-2"
                  role="columnheader"
                >
                  {isMobile ? day.substring(0, 1) : day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
                const isToday = new Date().toDateString() === date.toDateString()
                const isSelected = isDateSelected(date)
                const isInRange = isDateInRange(date)
                const isRangeStart = selectedStartDate && date.getTime() === selectedStartDate.getTime()
                const isRangeEnd = selectedEndDate && date.getTime() === selectedEndDate.getTime()

                return (
                  <button
                    key={index}
                    data-date={date.toISOString()}
                    onClick={() => handleDateClick(date)}
                    onKeyDown={(e) => handleDateKeyDown(e, index)}
                    className={cn(
                      "h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-xs sm:text-sm relative",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900",
                      "transition-colors duration-200",
                      !isCurrentMonth && "text-muted-foreground/50 dark:text-zinc-700",
                      isCurrentMonth && !isSelected && !isInRange && "dark:text-zinc-300",
                      isToday && !isSelected && "border border-blue-500 dark:border-blue-500",
                      isSelected && "bg-blue-500 text-white",
                      isInRange && !isSelected && "bg-blue-500/10 dark:bg-blue-500/20 dark:text-blue-400",
                      isRangeStart && "rounded-r-none",
                      isRangeEnd && "rounded-l-none",
                      !isSelected && !isInRange && "hover:bg-muted dark:hover:bg-zinc-800",
                    )}
                    aria-selected={isSelected || isInRange}
                    aria-current={isToday ? "date" : undefined}
                    tabIndex={focusedDate === index ? 0 : -1}
                    role="gridcell"
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 md:w-1/2">
            {/* Start date */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="start-date" className="flex items-center text-xs sm:text-sm dark:text-zinc-300">
                Start date
                <span className="text-blue-500 ml-1">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative col-span-1">
                  <Input
                    id="start-date"
                    type="text"
                    value={selectedStartDate ? formatInputDate(selectedStartDate) : ""}
                    readOnly
                    className="pl-2 pr-8 h-9 sm:h-10 text-xs sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                    required
                    aria-required="true"
                  />
                  <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-zinc-500 pointer-events-none" />
                </div>
                <div className="relative col-span-1">
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-2 pr-8 h-9 sm:h-10 text-xs sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                    aria-label="Start time"
                  />
                  <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* End date */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="end-date" className="flex items-center text-xs sm:text-sm dark:text-zinc-300">
                End date
                <span className="text-blue-500 ml-1">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative col-span-1">
                  <Input
                    id="end-date"
                    type="text"
                    value={selectedEndDate ? formatInputDate(selectedEndDate) : ""}
                    readOnly
                    className="pl-2 pr-8 h-9 sm:h-10 text-xs sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                    required
                    aria-required="true"
                  />
                  <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-zinc-500 pointer-events-none" />
                </div>
                <div className="relative col-span-1">
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-2 pr-8 h-9 sm:h-10 text-xs sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                    aria-label="End time"
                  />
                  <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Maximum participants */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center">
                <Label htmlFor="max-participants" className="text-xs sm:text-sm dark:text-zinc-300">
                  Maximum participants
                </Label>
                <button
                  type="button"
                  className="ml-1 text-muted-foreground hover:text-foreground dark:text-zinc-500 dark:hover:text-zinc-400"
                  aria-label="Information about maximum participants"
                >
                  <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
              <Input
                id="max-participants"
                type="number"
                min="1"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number.parseInt(e.target.value) || 1)}
                className="h-9 sm:h-10 text-xs sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                aria-label="Maximum number of participants"
              />
            </div>

            {/* Open to all departments */}
            <div className="flex items-start space-x-2 pt-1 sm:pt-2">
              <Checkbox
                id="open-to-all"
                checked={openToAll}
                onCheckedChange={(checked) => setOpenToAll(checked as boolean)}
                className="mt-0.5 dark:border-zinc-700"
              />
              <Label
                htmlFor="open-to-all"
                className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-300"
              >
                Open to all departments
              </Label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 bg-background dark:bg-zinc-900 p-3 sm:p-4 border-t dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 w-full sm:w-auto text-center sm:text-left truncate">
            Range:{" "}
            <span className="text-gray-800 dark:text-zinc-300">
            {selectedStartDate && selectedEndDate
              ? `${formatDisplayDate(selectedStartDate)} - ${formatDisplayDate(selectedEndDate)}`
              : "Select a date range"}
              </span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-initial h-8 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              disabled={!selectedStartDate || !selectedEndDate}
              className="flex-1 sm:flex-initial h-8 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            >
              Schedule meetings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


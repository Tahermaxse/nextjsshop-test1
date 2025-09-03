"use client"

import * as React from "react"
import {
  format,
  subDays,
  subMonths,
  startOfMonth,
  startOfYear,
  isSameDay,
  isWithinInterval,
  startOfDay,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface DateRange {
  from: Date
  to: Date
}

interface DateRangePickerDialogProps {
  onRangeChange?: (range: DateRange) => void
  className?: string
}

export function DateRangePickerDialog({ onRangeChange, className }: DateRangePickerDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(2025, 2, 22), // Mar 22, 2025
    to: new Date(2025, 2, 29), // Mar 29, 2025
  })
  const [tempDateRange, setTempDateRange] = React.useState<DateRange>(dateRange)
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2025, 2)) // March 2025
  const [selectionMode, setSelectionMode] = React.useState<"start" | "end">("start")

  const today = new Date()

  const presetOptions = [
    {
      label: "Today",
      getRange: () => ({ from: today, to: today }),
    },
    {
      label: "Last 7 days",
      getRange: () => ({ from: subDays(today, 6), to: today }),
    },
    {
      label: "Last 30 days",
      getRange: () => ({ from: subDays(today, 29), to: today }),
    },
    {
      label: "Last 3 months",
      getRange: () => ({ from: subMonths(today, 3), to: today }),
    },
    {
      label: "Last 12 months",
      getRange: () => ({ from: subMonths(today, 12), to: today }),
    },
    {
      label: "Month to date",
      getRange: () => ({ from: startOfMonth(today), to: today }),
    },
    {
      label: "Year to date",
      getRange: () => ({ from: startOfYear(today), to: today }),
    },
  ]

  const handleApply = () => {
    setDateRange(tempDateRange)
    if (onRangeChange) onRangeChange(tempDateRange)
    setOpen(false)
  }

  const handleCancel = () => {
    setTempDateRange(dateRange)
    setOpen(false)
  }

  const handlePresetSelect = (getRange: () => DateRange) => {
    const newRange = getRange()
    setTempDateRange(newRange)
    setCurrentMonth(new Date(newRange.from.getFullYear(), newRange.from.getMonth()))
  }

  React.useEffect(() => {
    if (open) {
      setTempDateRange(dateRange)
    }
  }, [open, dateRange])

  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []

    // Previous month days
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDay = new Date(year, month, -i)
      days.unshift({
        date: prevMonthDay,
        isCurrentMonth: false,
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentMonthDay = new Date(year, month, i)
      days.push({
        date: currentMonthDay,
        isCurrentMonth: true,
      })
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(year, month + 1, i)
      days.push({
        date: nextMonthDay,
        isCurrentMonth: false,
      })
    }

    return days
  }

  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth())
  const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  const isSelected = (date: Date) => {
    return isSameDay(date, tempDateRange.from) || isSameDay(date, tempDateRange.to)
  }

  const isInRange = (date: Date) => {
    if (!tempDateRange.from || !tempDateRange.to) return false
    return isWithinInterval(date, {
      start: startOfDay(tempDateRange.from),
      end: startOfDay(tempDateRange.to),
    })
  }

  const handleDateClick = (date: Date) => {
    if (selectionMode === "start") {
      setTempDateRange({ from: date, to: date })
      setSelectionMode("end")
    } else {
      // Ensure the range is always from earlier date to later date
      if (date < tempDateRange.from) {
        setTempDateRange({ from: date, to: tempDateRange.from })
      } else {
        setTempDateRange({ ...tempDateRange, to: date })
      }
      setSelectionMode("start")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-center text-center font-normal h-8 sm:h-10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-input bg-white dark:bg-background text-xs sm:text-sm",
            className,
          )}
        >
          {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-white dark:bg-zinc-900 rounded-lg shadow-lg max-w-[100vw] xs:max-w-[95vw] sm:max-w-[700px] w-auto">
        <DialogTitle className="sr-only">Select a date range</DialogTitle>
        <div className="flex flex-col sm:flex-row">
          {/* Sidebar with preset options */}
          <div className="w-full sm:w-[200px] border-b sm:border-b-0 sm:border-r dark:border-zinc-800 max-h-28 xs:max-h-32 sm:max-h-none">
            <div className="flex sm:block overflow-x-auto sm:overflow-x-visible scrollbar-hide pb-1.5 sm:pb-2">
              {presetOptions.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 text-[10px] xs:text-xs sm:text-sm cursor-pointer dark:text-zinc-300",
                    "hover:bg-gray-50 dark:hover:bg-zinc-800 flex-shrink-0 sm:flex-shrink sm:block",
                    "first:ml-1 xs:first:ml-2 sm:first:ml-0 last:mr-1 xs:last:mr-2 sm:last:mr-0",
                    index === 0 && "bg-gray-100 dark:bg-zinc-800"
                  )}
                  onClick={() => handlePresetSelect(option.getRange)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="p-1.5 xs:p-2 sm:p-4 w-full sm:w-auto">
            <div className="flex items-center justify-between mb-1.5 xs:mb-2 sm:mb-4">
              <button onClick={prevMonth} className="p-0.5 xs:p-1 text-zinc-400 hover:text-zinc-300">
                <ChevronLeft className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              </button>
              <div className="text-[10px] xs:text-xs sm:text-sm font-medium dark:text-zinc-300">
                {format(currentMonth, "MMMM yyyy")}
              </div>
              <button onClick={nextMonth} className="p-0.5 xs:p-1 text-zinc-400 hover:text-zinc-300">
                <ChevronRight className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 text-center mb-0.5 xs:mb-1 sm:mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500 dark:text-zinc-500 font-medium py-0.5">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {days.map((day, index) => {
                const isSelectedDay = isSelected(day.date)
                const isInRangeDay = isInRange(day.date)

                return (
                  <div
                    key={index}
                    className={cn(
                      "h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 flex items-center justify-center text-[10px] xs:text-xs sm:text-sm rounded-md",
                      !day.isCurrentMonth && "text-gray-300 dark:text-zinc-700",
                      day.isCurrentMonth && !isSelectedDay && !isInRangeDay && "dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer",
                      isInRangeDay && !isSelectedDay && "bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400",
                      isSelectedDay && "bg-blue-500 dark:bg-blue-500 text-white"
                    )}
                    onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                  >
                    {day.date.getDate()}
                  </div>
                )
              })}
            </div>

            <div className="mt-1.5 xs:mt-2 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="text-[8px] xs:text-[10px] sm:text-xs text-gray-600 dark:text-zinc-400 mb-1.5 xs:mb-2 sm:mb-0">
                Range: {format(tempDateRange.from, "MMM dd, yyyy")} - {format(tempDateRange.to, "MMM dd, yyyy")}
              </div>
              <div className="flex space-x-1 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancel} 
                  className="text-[10px] xs:text-xs sm:text-sm flex-1 sm:flex-none h-6 xs:h-7 sm:h-8 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleApply}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-[10px] xs:text-xs sm:text-sm flex-1 sm:flex-none h-6 xs:h-7 sm:h-8"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
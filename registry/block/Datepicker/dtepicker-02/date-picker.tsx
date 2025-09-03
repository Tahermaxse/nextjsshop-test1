"use client"

import * as React from "react"
import { format, addDays, endOfWeek, isSameDay } from "date-fns"
import { CalendarIcon, Clock, X, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface DatePickerProps {
  onDateSelect?: (date: Date | undefined) => void
}

export function DatePicker02({ onDateSelect }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [tempDate, setTempDate] = React.useState<Date | undefined>(undefined)
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2025, 2)) // March 2025

  const today = new Date()
  const tomorrow = addDays(today, 1)
  const laterThisWeek = endOfWeek(today, { weekStartsOn: 1 })
  const nextWeek = addDays(endOfWeek(today, { weekStartsOn: 1 }), 7)

  const presetOptions = [
    {
      icon: <Star className="h-4 w-4 text-yellow-400" />,
      label: "Tomorrow",
      date: tomorrow,
      dayName: "Sunday",
    },
    {
      icon: <CalendarIcon className="h-4 w-4 text-green-400" />,
      label: "Later this week",
      date: laterThisWeek,
      dayName: "Saturday",
    },
    {
      icon: <CalendarIcon className="h-4 w-4 text-purple-400" />,
      label: "Next week",
      date: nextWeek,
      dayName: "Sat, 29 March",
    },
    {
      icon: <Clock className="h-4 w-4 text-red-400" />,
      label: "No date",
      date: undefined,
      dayName: "Saturday",
    },
  ]

  const handleApply = () => {
    setDate(tempDate)
    if (onDateSelect) onDateSelect(tempDate)
    setOpen(false)
  }

  const handleCancel = () => {
    setTempDate(date)
    setOpen(false)
  }

  const handlePresetSelect = (selectedDate: Date | undefined) => {
    setTempDate(selectedDate)
  }

  React.useEffect(() => {
    if (open) {
      setTempDate(date)
    }
  }, [open, date])

  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Adjust for Monday start

    const days = []

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate()
    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      days.push({
        day: i,
        month: month - 1,
        year,
        isCurrentMonth: false,
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
      })
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: month + 1,
        year,
        isCurrentMonth: false,
      })
    }

    return days
  }

  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth())
  const weekDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  const isSelectedDate = (day: number, month: number, year: number) => {
    if (!tempDate) return false
    return tempDate.getDate() === day && tempDate.getMonth() === month && tempDate.getFullYear() === year
  }

  const isCurrentDate = (day: number, month: number, year: number) => {
    return day === 29 && month === 2 && year === 2025
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-center text-center font-normal h-10 px-3 py-2 rounded-full border border-input bg-background text-sm"
        >
          {date ? format(date, "PPP") : "Select a date"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-2xl border shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
        <DialogTitle className="sr-only">Select a date</DialogTitle>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-600 dark:text-zinc-300">Select a time</span>
            </div>
            <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setOpen(false)}>
              <X className="h-4 w-4 dark:text-zinc-400" />
            </button>
          </div>
          <div className="mt-4 space-y-1">
            {presetOptions.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between p-2 rounded-md cursor-pointer",
                  (tempDate && option.date && isSameDay(tempDate, option.date)) || (!tempDate && !option.date)
                    ? "bg-gray-900 text-white dark:bg-blue-500"
                    : "dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800",
                )}
                onClick={() => handlePresetSelect(option.date)}
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span className="text-sm">{option.label}</span>
                </div>
                <span className={cn(
                  "text-sm",
                  (tempDate && option.date && isSameDay(tempDate, option.date)) || (!tempDate && !option.date)
                    ? "text-gray-400"
                    : "text-gray-400 dark:text-zinc-500"
                )}>
                  {option.dayName}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="text-sm font-medium dark:text-zinc-300">{format(currentMonth, "MMMM yyyy")}</div>
            <button onClick={nextMonth} className="p-1 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day) => (
              <div key={day} className="text-xs text-gray-500 dark:text-zinc-500 font-medium py-1">
                {day}
              </div>
            ))}

            {days.map((day, index) => {
              const isSelectedDay = isSelectedDate(day.day, day.month, day.year)
              return (
                <div
                  key={index}
                  className={cn(
                    "relative h-8 w-8 flex items-center justify-center text-sm rounded-full",
                    !day.isCurrentMonth && "text-gray-300 dark:text-zinc-700",
                    day.isCurrentMonth && "cursor-pointer dark:text-zinc-300",
                    day.isCurrentMonth && !isSelectedDay && "hover:bg-gray-100 dark:hover:bg-zinc-800",
                    isSelectedDay && "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                  onClick={() => {
                    if (day.isCurrentMonth) {
                      setTempDate(new Date(day.year, day.month, day.day))
                    }
                  }}
                >
                  {day.day}
                  {isCurrentDate(day.day, day.month, day.year) && !isSelectedDay && (
                    <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-between p-4 pt-2 border-t mt-2 dark:border-zinc-800">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 mr-2 rounded-md border border-gray-200 bg-white dark:bg-transparent dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleApply} 
            className="flex-1 rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


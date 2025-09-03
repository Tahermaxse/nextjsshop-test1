"use client"

import type React from "react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface SwitchCardProps {
  label: string
  sublabel?: string
  description?: string
  isNew?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  avatarSrc?: string
  avatarFallback?: string
  onChange?: (checked: boolean) => void
}

export default function Switch03() {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
        <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
          {/* Active switch */}
          <SwitchCard
            label="Label"
            sublabel="Sublabel"
            description="Insert the switch description here."
            isNew
            defaultChecked
          />

          {/* Regular switch with user icon */}
          <SwitchCard
            label="Label"
            sublabel="Sublabel"
            description="Insert the switch description here."
            isNew
            icon={
              <div className="rounded-full bg-gray-100 dark:bg-zinc-800 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-gray-500 dark:text-zinc-400"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            }
          />

          {/* Spotify icon switch */}
          <SwitchCard
            label="Label"
            sublabel="Sublabel"
            description="Insert the switch description here."
            isNew
            icon={
              <div className="rounded-full bg-green-500 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-white"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.192.192-.459.297-.726.297s-.534-.105-.726-.297a5.99 5.99 0 0 0-4.242-1.757 5.99 5.99 0 0 0-4.242 1.757c-.192.192-.459.297-.726.297s-.534-.105-.726-.297a1.028 1.028 0 0 1 0-1.452 8.005 8.005 0 0 1 5.694-2.356 8.005 8.005 0 0 1 5.694 2.356c.4.401.4 1.051 0 1.452zm-1.493-3.534c-.192.192-.459.297-.726.297s-.534-.105-.726-.297a4.494 4.494 0 0 0-3.181-1.318c-1.2 0-2.329.468-3.181 1.318-.192.192-.459.297-.726.297s-.534-.105-.726-.297a1.028 1.028 0 0 1 0-1.452 6.5 6.5 0 0 1 4.633-1.916 6.5 6.5 0 0 1 4.633 1.916c.4.401.4 1.051 0 1.452zm-1.493-3.534c-.192.192-.459.297-.726.297s-.534-.105-.726-.297a2.993 2.993 0 0 0-2.121-.879 2.993 2.993 0 0 0-2.121.879c-.192.192-.459.297-.726.297s-.534-.105-.726-.297a1.028 1.028 0 0 1 0-1.452 5.006 5.006 0 0 1 3.573-1.477 5.006 5.006 0 0 1 3.573 1.477c.4.401.4 1.051 0 1.452z" />
                </svg>
              </div>
            }
          />

          {/* Disabled switch with avatar */}
          <SwitchCard
            label="Label"
            sublabel="Sublabel"
            description="Insert the switch description here."
            isNew
            disabled
            avatarSrc="/placeholder.svg"
            avatarFallback="AV"
          />
        </div>
      </div>
    </div>
  )
}

function SwitchCard({
  label,
  sublabel,
  description,
  isNew = false,
  defaultChecked = false,
  disabled = false,
  icon,
  avatarSrc,
  avatarFallback,
  onChange,
}: SwitchCardProps) {
  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = (value: boolean) => {
    if (!disabled) {
      setChecked(value)
      onChange?.(value)
    }
  }

  return (
    <div
      className={cn(
        "flex items-center p-4 sm:p-5 rounded-lg border transition-all duration-200",
        "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700",
        disabled && "opacity-60",
        "hover:shadow-md dark:hover:shadow-zinc-700/50",
        "w-full"
      )}
    >
      {icon && (
        <div className="mr-3 sm:mr-4 flex-shrink-0">{icon}</div>
      )}

      {avatarSrc && (
        <Avatar className="h-9 w-9 sm:h-10 sm:w-10 mr-3 sm:mr-4 flex-shrink-0">
          <AvatarImage src={avatarSrc} alt={label} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
          <span className="font-medium text-gray-900 dark:text-zinc-100 text-sm sm:text-base truncate">
            {label}
          </span>
          {sublabel && (
            <span className="text-gray-500 dark:text-zinc-400 text-sm">({sublabel})</span>
          )}
          {isNew && (
            <span
              className={cn(
                "px-2 py-0.5 text-xs font-medium rounded-full",
                checked
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
                  : "bg-gray-100 text-gray-900 dark:bg-zinc-700 dark:text-zinc-300",
              )}
            >
              NEW
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      <Switch
        checked={checked}
        onCheckedChange={handleChange}
        disabled={disabled}
        className={cn(
          "ml-3 sm:ml-4 flex-shrink-0",
          "data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      />
    </div>
  )
}
"use client"

import type React from "react"

import { useState } from "react"
import { X, Info } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const profileSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  biography: z.string().max(200, { message: "Biography cannot exceed 200 characters" }).optional(),
  timezone: z.string().min(1, { message: "Timezone is required" }),
  language: z.string().min(1, { message: "Language is required" }),
})

type ProfileFormValues = z.infer<typeof profileSchema>

const defaultValues: Partial<ProfileFormValues> = {
  fullName: "John Doe",
  title: "e.g. Software Engineer",
  biography: "",
  timezone: "GMT-4:00 - Atlantic Standard Time",
  language: "English (US)",
}

export default function Drawer04() {
  const [isOpen, setIsOpen] = useState(false)
  const [bioLength, setBioLength] = useState(0)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data)
    toggleDrawer()
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBioLength(e.target.value.length)
    form.setValue("biography", e.target.value)
  }

  const handleDiscard = () => {
    form.reset(defaultValues)
    toggleDrawer()
  }

  return (
    <div className="relative">
      <Button onClick={toggleDrawer} className="justify-center z-10 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
        Open Profile
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40" onClick={toggleDrawer} />}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full sm:max-w-[400px] bg-white dark:bg-zinc-900 shadow-lg transform transition-transform duration-300 ease-in-out rounded-l-xl",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-medium dark:text-zinc-100">Profile</h2>
            <button onClick={toggleDrawer} className="text-gray-400 hover:text-gray-500 dark:text-zinc-400">
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 overflow-auto">
            {/* Upload Image Section */}
            <div className="px-5 pb-4 border-t border-gray-100 dark:border-zinc-800">
              <h3 className="text-xs font-medium text-gray-400 dark:text-zinc-400 mt-4 mb-3">UPLOAD IMAGE</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 dark:text-zinc-500"
                  >
                    <path
                      d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-zinc-200">Upload Image</p>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">Min 400*400px, PNG or JPEG</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 h-8 text-xs font-medium dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-zinc-800">
              <h3 className="text-xs font-medium text-gray-400 dark:text-zinc-400 mb-3">INFORMATION</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium dark:text-zinc-200 flex items-center">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <Input {...form.register("fullName")} className="dark:bg-zinc-800 dark:border-zinc-700" />
                  {form.formState.errors.fullName && (
                    <p className="text-xs text-red-500">{form.formState.errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium dark:text-zinc-200 flex items-center">
                    Title<span className="text-red-500">*</span>
                  </label>
                  <Input {...form.register("title")} className="dark:bg-zinc-800 dark:border-zinc-700" />
                  {form.formState.errors.title && (
                    <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium dark:text-zinc-200">
                    Biography <span className="font-normal text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Textarea
                      placeholder="Describe yourself..."
                      className="resize-none min-h-[80px] dark:bg-zinc-800 dark:border-zinc-700"
                      {...form.register("biography")}
                      onChange={handleBioChange}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-zinc-500">
                      {bioLength}/200
                    </div>
                  </div>
                  {form.formState.errors.biography && (
                    <p className="text-xs text-red-500">{form.formState.errors.biography.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400">
                  <Info className="h-3.5 w-3.5" />
                  <span>It will be displayed on your profile.</span>
                </div>
              </div>
            </div>

            {/* Regional Preferences Section */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-zinc-800">
              <h3 className="text-xs font-medium text-gray-400 dark:text-zinc-400 mb-3">REGIONAL PREFERENCES</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium dark:text-zinc-200 flex items-center">
                    Timezone<span className="text-red-500">*</span>
                    <Info className="h-3.5 w-3.5 ml-1 text-gray-400 dark:text-zinc-500" />
                  </label>
                  <Select
                    defaultValue={form.getValues("timezone")}
                    onValueChange={(value) => form.setValue("timezone", value)}
                  >
                    <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GMT-4:00 - Atlantic Standard Time">
                        GMT-4:00 - Atlantic Standard Time
                      </SelectItem>
                      <SelectItem value="GMT-5:00 - Eastern Standard Time">GMT-5:00 - Eastern Standard Time</SelectItem>
                      <SelectItem value="GMT-6:00 - Central Standard Time">GMT-6:00 - Central Standard Time</SelectItem>
                      <SelectItem value="GMT-7:00 - Mountain Standard Time">
                        GMT-7:00 - Mountain Standard Time
                      </SelectItem>
                      <SelectItem value="GMT-8:00 - Pacific Standard Time">GMT-8:00 - Pacific Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.timezone && (
                    <p className="text-xs text-red-500">{form.formState.errors.timezone.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium dark:text-zinc-200 flex items-center">
                    Language<span className="text-red-500">*</span>
                  </label>
                  <Select
                    defaultValue={form.getValues("language")}
                    onValueChange={(value) => form.setValue("language", value)}
                  >
                    <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700">
                      <SelectValue>
                        <div className="flex items-center">
                          <span className="mr-2">🇺🇸</span>
                          <span>English (US)</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English (US)">
                        <div className="flex items-center">
                          <span className="mr-2">🇺🇸</span>
                          <span>English (US)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="English (UK)">
                        <div className="flex items-center">
                          <span className="mr-2">🇬🇧</span>
                          <span>English (UK)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Spanish">
                        <div className="flex items-center">
                          <span className="mr-2">🇪🇸</span>
                          <span>Spanish</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="French">
                        <div className="flex items-center">
                          <span className="mr-2">🇫🇷</span>
                          <span>French</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="German">
                        <div className="flex items-center">
                          <span className="mr-2">🇩🇪</span>
                          <span>German</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.language && (
                    <p className="text-xs text-red-500">{form.formState.errors.language.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center mt-auto">
              <Button
                type="button"
                variant="outline"
                onClick={handleDiscard}
                className="dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Discard
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Apply Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

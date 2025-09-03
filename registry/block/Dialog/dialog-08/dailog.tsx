"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface NewCampaignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Dailog08({ open, onOpenChange }: NewCampaignDialogProps) {
  const [previewMode, setPreviewMode] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [campaignName, setCampaignName] = useState("")
  const [campaignType, setCampaignType] = useState("")
  const [backgroundContext, setBackgroundContext] = useState("")

  const handleSaveAsDraft = () => {
    console.log("Saving as draft:", { campaignName, campaignType, backgroundContext, startDate, endDate })
    onOpenChange(false)
  }

  const handleCreateCampaign = () => {
    console.log("Creating campaign:", { campaignName, campaignType, backgroundContext, startDate, endDate })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white dark:bg-zinc-900">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 dark:bg-zinc-800 p-2 rounded-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-xl font-medium text-left">New Campaign Request</DialogTitle>
              <DialogDescription className="text-left mt-1">
                Use this form to submit a new campaign request for approval.
              </DialogDescription>
            </div>
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="px-6 py-2 space-y-4">
          <div className="space-y-2">
            <label htmlFor="campaign-name" className="block text-sm font-medium">
              What is the name of the campaign? <span className="text-red-500">Required</span>
            </label>
            <Input
              id="campaign-name"
              placeholder="What is the name of the campaign?"
              className="w-full"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="campaign-type" className="block text-sm font-medium">
              What type of campaign is this <span className="text-red-500">(Required)</span>
            </label>
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger id="campaign-type" className="w-full">
                <SelectValue placeholder="Choose from the dropdown..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email Campaign</SelectItem>
                <SelectItem value="social">Social Media Campaign</SelectItem>
                <SelectItem value="content">Content Marketing</SelectItem>
                <SelectItem value="event">Event Marketing</SelectItem>
                <SelectItem value="product">Product Launch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="background-context" className="block text-sm font-medium">
              Is there any needed background context for this campaign?
            </label>
            <div className="border rounded-md dark:border-zinc-700">
              <Textarea
                id="background-context"
                placeholder="Type"
                className="min-h-[100px] border-0 focus-visible:ring-0 resize-none"
                value={backgroundContext}
                onChange={(e) => setBackgroundContext(e.target.value)}
              />
              <div className="border-t dark:border-zinc-700 p-2">
                <div className="flex justify-between items-center">
                  <div className="bg-black text-white text-xs px-2 py-1 rounded-md inline-flex items-center gap-1 dark:bg-zinc-800">
                    <span>Turn on preview to view the styles of the text</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span>Preview</span>
                    <button
                      className={`w-8 h-4 rounded-full flex items-center p-[2px] ${previewMode ? "bg-black justify-end dark:bg-zinc-700" : "bg-gray-200 justify-start dark:bg-zinc-800"}`}
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L9.94916 6.83441L13.5382 3.24535L12.5 2.20711ZM2.5 5C2.22386 5 2 5.22386 2 5.5V12.5C2 12.7761 2.22386 13 2.5 13H9.5C9.77614 13 10 12.7761 10 12.5V10.5C10 10.2239 10.2239 10 10.5 10C10.7761 10 11 10.2239 11 10.5V12.5C11 13.3284 10.3284 14 9.5 14H2.5C1.67157 14 1 13.3284 1 12.5V5.5C1 4.67157 1.67157 4 2.5 4H4.5C4.77614 4 5 4.22386 5 4.5C5 4.77614 4.77614 5 4.5 5H2.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H12.5C12.7761 5 13 4.77614 13 4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM4 7C4 6.72386 4.22386 6.5 4.5 6.5H10.5C10.7761 6.5 11 6.72386 11 7C11 7.27614 10.7761 7.5 10.5 7.5H4.5C4.22386 7.5 4 7.27614 4 7ZM3 9.5C3 9.22386 3.22386 9 3.5 9H11.5C11.7761 9 12 9.22386 12 9.5C12 9.77614 11.7761 10 11.5 10H3.5C3.22386 10 3 9.77614 3 9.5ZM4.5 12C4.22386 12 4 12.2239 4 12.5C4 12.7761 4.22386 13 4.5 13H10.5C10.7761 13 11 12.7761 11 12.5C11 12.2239 10.7761 12 10.5 12H4.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H11.5C12.3284 1 13 1.67157 13 2.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1.5 7C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H1.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.14921 4.5H12.8507C12.9349 4.5 13 4.56716 13 4.65V10.35C13 10.4328 12.9349 10.5 12.8507 10.5H2.14921C2.06502 10.5 2 10.4328 2 10.35V4.65C2 4.56716 2.06502 4.5 2.14921 4.5ZM1 4.65C1 4.01091 1.52938 3.5 2.14921 3.5H12.8507C13.4706 3.5 14 4.01091 14 4.65V10.35C14 10.9891 13.4706 11.5 12.8507 11.5H2.14921C1.52938 11.5 1 10.9891 1 10.35V4.65Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.85909 12.0518L2.90372 12.0965L2.94833 12.1411C3.29963 12.4925 3.53064 12.7237 3.7721 12.8822C4.76214 13.5324 6.05585 13.4976 7.04982 12.8223C7.29291 12.6572 7.52936 12.4206 7.89889 12.051L7.89897 12.0509L8.51769 11.4322C8.71295 11.2369 8.71295 10.9203 8.51769 10.7251C8.32242 10.5298 8.00584 10.5298 7.81058 10.7251L7.19186 11.3438C6.76486 11.7708 6.59939 11.9331 6.44502 12.0379C5.76867 12.4974 4.9135 12.5064 4.27816 12.0891C4.13389 11.9944 3.97982 11.844 3.56794 11.4321C3.15605 11.0202 3.00568 10.8662 2.91094 10.7219C2.49369 10.0866 2.50269 9.23132 2.96216 8.55498C3.06702 8.40061 3.22932 8.23514 3.65632 7.80814L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start-date" className="block text-sm font-medium">
                When will this campaign start?
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <div className="flex w-full justify-between items-center">
                      {startDate ? format(startDate, "PPP") : "Choose from the dropdown..."}
                      <Calendar className="h-4 w-4 opacity-50" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label htmlFor="end-date" className="block text-sm font-medium">
                When will this campaign start?
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <div className="flex w-full justify-between items-center">
                      {endDate ? format(endDate, "PPP") : "Choose from the dropdown..."}
                      <Calendar className="h-4 w-4 opacity-50" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 p-6 pt-2 border-t dark:border-zinc-800">
          <Button variant="outline" onClick={handleSaveAsDraft}>
            Save as Draft
          </Button>
          <Button
            className="bg-black hover:bg-black/90 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700"
            onClick={handleCreateCampaign}
          >
            Create Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

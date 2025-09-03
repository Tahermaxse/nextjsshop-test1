"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type CardType = "regular" | "fulfillment"

export default function Dailog06({
  open = false,
  onOpenChange,
}: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(open)
  const [cardType, setCardType] = useState<CardType>("regular")
  const [name, setName] = useState("Marketing / Fred")
  const [tags, setTags] = useState(["facebook", "ads"])
  const [newTag, setNewTag] = useState("")
  const [quantity, setQuantity] = useState("1")

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const handleCancel = () => {
    handleOpenChange(false)
  }

  const handleContinue = () => {
    // Handle form submission
    console.log({ cardType, name, tags, quantity })
    handleOpenChange(false)
  }

  return (
    <>
      <Button onClick={() => handleOpenChange(true)}>Open Create Card Dialog</Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md max-w-[90%] rounded-xl border-0 bg-[#fff] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-zinc-900 dark:text-zinc-100 text-lg font-medium">Create Card</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpenChange(false)}
              className="h-6 w-6 rounded-full p-0 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>

          <div className="grid gap-6 py-2">
            {/* Card Type Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className={cn(
                  "flex flex-col gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 cursor-pointer relative",
                  cardType === "regular" ? "bg-zinc-100/80 dark:bg-zinc-800/50" : "bg-white dark:bg-zinc-900",
                )}
                onClick={() => setCardType("regular")}
              >
                {cardType === "regular" && (
                  <div className="absolute right-3 top-3 rounded-full bg-zinc-900 dark:bg-zinc-200 p-0.5">
                    <Check className="h-4 w-4 text-white dark:text-zinc-900" />
                  </div>
                )}
                <span className="text-zinc-900 dark:text-zinc-100">Regular</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Requires billing address</span>
              </div>

              <div
                className={cn(
                  "flex flex-col gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 cursor-pointer relative",
                  cardType === "fulfillment" ? "bg-zinc-100/80 dark:bg-zinc-800/50" : "bg-white dark:bg-zinc-900",
                )}
                onClick={() => setCardType("fulfillment")}
              >
                {cardType === "fulfillment" && (
                  <div className="absolute right-3 top-3 rounded-full bg-zinc-900 dark:bg-zinc-200 p-0.5">
                    <Check className="h-4 w-4 text-white dark:text-zinc-900" />
                  </div>
                )}
                <span className="text-zinc-900 dark:text-zinc-100">Fulfillment</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">No billing address required</span>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-zinc-500 dark:text-zinc-400">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm text-zinc-500 dark:text-zinc-400">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md min-h-10">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {tag}</span>
                    </button>
                  </div>
                ))}
                <Input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add a tag..."
                  className="bg-transparent border-0 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8 min-w-[120px] max-w-[150px]"
                />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Press Enter to add a tag</p>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm text-zinc-500 dark:text-zinc-400">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-0"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

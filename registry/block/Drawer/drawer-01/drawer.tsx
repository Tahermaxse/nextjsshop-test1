"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ServiceFeeDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function Drawer01({ isOpen, onClose }: ServiceFeeDrawerProps) {
  const [feeType, setFeeType] = useState("monthly")
  const [currency, setCurrency] = useState("EUR")

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`fixed right-0 top-0 z-50 h-[560px] w-full max-w-md overflow-auto overflow-y-scroll scrollbar-hide rounded-2xl mr-4 mt-3 bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-zinc-900 dark:text-zinc-100 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Service Fee</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                  Configure your service pricing and terms
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-4">
            {/* Fee Type Tabs */}
            <div className="mb-6 grid grid-cols-3 gap-0 rounded-md border border-gray-200 bg-gray-50 p-1 text-sm dark:border-zinc-800 dark:bg-zinc-800">
              <button
                className={`rounded-md py-2 text-center ${
                  feeType === "monthly"
                    ? "bg-white font-medium shadow-sm dark:bg-zinc-700"
                    : "text-gray-500 dark:text-zinc-400"
                }`}
                onClick={() => setFeeType("monthly")}
              >
                Monthly Fee
              </button>
              <button
                className={`rounded-md py-2 text-center ${
                  feeType === "one-time"
                    ? "bg-white font-medium shadow-sm dark:bg-zinc-700"
                    : "text-gray-500 dark:text-zinc-400"
                }`}
                onClick={() => setFeeType("one-time")}
              >
                One-time Fee
              </button>
              <button
                className={`rounded-md py-2 text-center ${
                  feeType === "no-fee"
                    ? "bg-white font-medium shadow-sm dark:bg-zinc-700"
                    : "text-gray-500 dark:text-zinc-400"
                }`}
                onClick={() => setFeeType("no-fee")}
              >
                No Fee
              </button>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium">Amount</h3>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-zinc-400">€</span>
                  <Input
                    type="text"
                    defaultValue="0.00"
                    className="rounded-md border-gray-200 pl-7 dark:border-zinc-700"
                  />
                </div>
                <Select defaultValue={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24 rounded-md border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                        <span className="text-xs text-white">✓</span>
                      </div>
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="mb-6">
              <h3 className="mb-2 text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                Eligibility Criteria
              </h3>
              <div className="rounded-md border border-gray-200 dark:border-zinc-700">
                <button className="flex w-full items-center justify-between p-4 text-left">
                  <span>Prerequisites</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
                </button>
                <div className="border-t border-gray-200 p-4 dark:border-zinc-700">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="existing-account"
                      className="h-4 w-4 rounded-sm border-gray-300 text-blue-600 dark:border-zinc-600"
                    />
                    <Label htmlFor="existing-account" className="text-sm font-normal">
                      Client must have an existing account
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="mb-2 text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                Payment Methods
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="bank-transfer"
                    defaultChecked
                    className="h-4 w-4 rounded-sm border-gray-300 appearance-none bg-blue-500 text-blue-600 dark:border-zinc-600"
                  />
                  <div>
                    <Label htmlFor="bank-transfer" className="text-sm font-normal">
                      Bank Transfer{" "}
                      <span className="text-xs text-gray-500 dark:text-zinc-400">(1-3 business days)</span>
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Direct bank to bank transfers</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="credit-card"
                    className="h-4 w-4 rounded-sm border-gray-300 text-blue-600 dark:border-zinc-600"
                  />
                  <div>
                    <Label htmlFor="credit-card" className="text-sm font-normal">
                      Credit Card <span className="text-xs text-gray-500 dark:text-zinc-400">(instant)</span>
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">All major cards accepted (instant)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="digital-wallet"
                    defaultChecked
                    className="h-4 w-4 rounded-sm border-gray-300 text-blue-600 dark:border-zinc-600"
                  />
                  <div>
                    <Label htmlFor="digital-wallet" className="text-sm font-normal">
                      Digital Wallet <span className="text-xs text-gray-500 dark:text-zinc-400">(instant)</span>
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                      Popular digital payment methods (instant)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Availability */}
            <div className="mb-6">
              <h3 className="mb-2 text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                Service Availability
              </h3>
              <RadioGroup defaultValue="public">
                <div className="flex items-start space-x-2 py-2">
                  <RadioGroupItem
                    id="public"
                    value="public"
                    className="h-4 w-4 border-gray-300 text-blue-600 dark:border-zinc-600"
                  />
                  <div>
                    <Label htmlFor="public" className="text-sm font-normal">
                      Public Service <span className="text-xs text-gray-500 dark:text-zinc-400">(Recommended)</span>
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Visible to all users in the marketplace</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 py-2">
                  <RadioGroupItem
                    id="private"
                    value="private"
                    className="h-4 w-4 border-gray-300 text-blue-600 dark:border-zinc-600"
                  />
                  <div>
                    <Label htmlFor="private" className="text-sm font-normal">
                      Private Service
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Limited visibility for select clients</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto border-t border-gray-100 px-6 py-4 dark:border-zinc-800">
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-md border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button className="rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


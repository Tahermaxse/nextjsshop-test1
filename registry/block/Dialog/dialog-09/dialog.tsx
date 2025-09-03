"use client"

import * as React from "react"
import { X, Check, CreditCard, Building } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type BillingOption = "monthly" | "annually"
type PaymentMethod = "card" | "bank"

export default function Dialog09({
  open = false,
  onOpenChange,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("card")
  const [billingOption, setBillingOption] = React.useState<BillingOption>("monthly")
  const [cardNumber, setCardNumber] = React.useState("")
  const [expiration, setExpiration] = React.useState("")
  const [cvv, setCvv] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [aiAssistant, setAiAssistant] = React.useState(true)
  
  // Ensure dialog state syncs with parent component
  React.useEffect(() => {
    // No need for local isOpen state, we'll use the prop directly
  }, [open]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open)
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      paymentMethod,
      billingOption,
      cardNumber,
      expiration,
      cvv,
      country,
      zip,
      aiAssistant,
    })
    handleOpenChange(false)
  }

  const monthlyPrice = 20
  const annualPrice = monthlyPrice * 12 * 0.8 // 20% discount
  const aiAssistantPrice = 50

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-md mx-auto rounded-lg border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-0 overflow-hidden">
        <div className="relative">
          <DialogHeader className="p-4 pb-0 sm:p-6 sm:pb-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpenChange(false)}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 h-6 w-6 rounded-full p-0 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <DialogTitle className="text-lg font-semibold">Upgrade to Plus</DialogTitle>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Do more with unlimited blocks, files and integrations.
            </p>
          </DialogHeader>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Billed to */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Billed to
              </label>
              <Input
                placeholder="Ryan Johnson"
                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Billing options */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Billing options
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div
                  className={cn(
                    "flex flex-col gap-1 rounded-md border border-zinc-200 dark:border-zinc-800 p-3 cursor-pointer",
                    billingOption === "monthly" ? "ring-2 ring-zinc-900 dark:ring-zinc-400" : ""
                  )}
                  onClick={() => setBillingOption("monthly")}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Pay monthly</span>
                    {billingOption === "monthly" && (
                      <div className="rounded-full bg-zinc-900 dark:bg-zinc-200 p-0.5">
                        <Check className="h-3 w-3 text-white dark:text-zinc-900" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">${monthlyPrice}/month</span>
                </div>

                <div
                  className={cn(
                    "flex flex-col gap-1 rounded-md border border-zinc-200 dark:border-zinc-800 p-3 cursor-pointer",
                    billingOption === "annually" ? "ring-2 ring-zinc-900 dark:ring-zinc-400" : ""
                  )}
                  onClick={() => setBillingOption("annually")}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Pay annually</span>
                    {billingOption === "annually" && (
                      <div className="rounded-full bg-zinc-900 dark:bg-zinc-200 p-0.5">
                        <Check className="h-3 w-3 text-white dark:text-zinc-900" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">${annualPrice / 12}/month</span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Save 20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment details */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Payment details
              </label>
              
              {/* Payment method tabs */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div 
                  className={cn(
                    "flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 p-2 sm:p-3 rounded-md cursor-pointer", 
                    paymentMethod === "card" ? "bg-zinc-100 dark:bg-zinc-800" : "bg-white dark:bg-zinc-900"
                  )}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm font-medium">Card</span>
                </div>
                <div 
                  className={cn(
                    "flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 p-2 sm:p-3 rounded-md cursor-pointer", 
                    paymentMethod === "bank" ? "bg-zinc-100 dark:bg-zinc-800" : "bg-white dark:bg-zinc-900"
                  )}
                  onClick={() => setPaymentMethod("bank")}
                >
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">Bank</span>
                </div>
              </div>
              
              {paymentMethod === "card" && (
                <>
                  <div className="mb-3">
                    <label className="text-xs text-zinc-500 mb-1 block">Card number</label>
                    <div className="relative">
                      <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0 pr-24"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                        <div className="w-5 h-3 bg-blue-600 rounded"></div>
                        <div className="w-5 h-3 bg-orange-500 rounded"></div>
                        <div className="w-5 h-3 bg-blue-500 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Expiration</label>
                      <Input
                        value={expiration}
                        onChange={(e) => setExpiration(e.target.value)}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">CVV</label>
                      <Input
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Country</label>
                      <Input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">ZIP</label>
                      <Input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </>
              )}
              
              {paymentMethod === "bank" && (
                <div className="py-6 text-center text-zinc-500 dark:text-zinc-400">
                  <p>Bank transfer options would appear here</p>
                </div>
              )}
            </div>
            
            {/* Add-ons */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Add-ons
              </label>
              <div
                className={cn(
                  "flex items-start justify-between rounded-md border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 cursor-pointer",
                  aiAssistant ? "bg-zinc-50 dark:bg-zinc-800/50" : "bg-white dark:bg-zinc-900"
                )}
                onClick={() => setAiAssistant(!aiAssistant)}
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">AI Assistant</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 sm:mb-0">
                      Unlimited use of AI for Q&A, ChatGPT, DALL•E, GPT-4
                    </p>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">${aiAssistantPrice}/month</span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4 flex-shrink-0">
                  <div className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center",
                    aiAssistant 
                      ? "border-zinc-900 bg-zinc-900 dark:border-zinc-200 dark:bg-zinc-200" 
                      : "border-zinc-300 dark:border-zinc-700"
                  )}>
                    {aiAssistant && <Check className="h-3 w-3 text-white dark:text-zinc-900" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-3 sm:pt-4">
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                ${billingOption === "monthly" ? monthlyPrice : Math.round(annualPrice / 12)}{aiAssistant ? ` + ${aiAssistantPrice}` : ""}/month
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs px-2 py-1 h-auto"
              >
                Details
              </Button>
            </div>

            {/* Upgrade Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black py-2 rounded-md transition-colors"
            >
              Upgrade to Plus
            </Button>

            <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
              By continuing, you agree to our Terms and Conditions
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
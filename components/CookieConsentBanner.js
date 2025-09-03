"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { useSession } from "next-auth/react"
import { useCurrency } from "@/hooks/useCurrency"
// import posthog from "posthog-js"

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const { data: session, status } = useSession()
  const { currency, getCurrencyCode } = useCurrency()

  useEffect(() => {
    const cookieConsent = Cookies.get("cookie-consent")
    
    if (!cookieConsent) {
      // Show banner after 4.5 seconds delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 4500) // 4.5 seconds

      // Cleanup timer if component unmounts
      return () => clearTimeout(timer)
    } else if (cookieConsent === "accepted") {
      storeConsentInDatabase("accepted")
      // loadGoogleAnalytics()
      // loadFacebookPixel()
      // loadPostHog()
    }
  }, [])

  const storeConsentInDatabase = async (consent) => {
    try {
      const consentData = {
        consent,
        userAgent: navigator.userAgent,
        currency: getCurrencyCode(),
        country: currency === 'INR' ? 'IN' : 'US', // Simple country detection based on currency
        // IP address will be detected on the server side
      }

      const response = await fetch('/api/cookie-consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consentData),
      })

      if (!response.ok) {
        // console.warn('Failed to store cookie consent in database:', response.statusText)
      } else {
        // console.log('Cookie consent stored successfully')
      }
    } catch (error) {
      // console.error('Error storing cookie consent:', error)
    }
  }

  const handleAcceptAll = async () => {
    Cookies.set("cookie-consent", "accepted", { expires: 365 })
    
    // Store consent in database
    await storeConsentInDatabase("accepted")
    
    // loadGoogleAnalytics()
    // loadFacebookPixel()
    // loadPostHog()
    setShowBanner(false)
  }

  const handleRejectAll = async () => {
    Cookies.set("cookie-consent", "rejected", { expires: 365 })
    
    // Store consent in database
    await storeConsentInDatabase("rejected")
    
    // loadGoogleAnalytics()
    setShowBanner(false)
  }

  // const loadGoogleAnalytics = () => {
  //   if (typeof window === "undefined") return

  //   const GA_ID = "G-MPS7L8N7TL" // replace with your GA4 ID

  //   const script = document.createElement("script")
  //   script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  //   script.async = true
  //   document.head.appendChild(script)

  //   window.dataLayer = window.dataLayer || []
  //   window.gtag = function (...args) {
  //     window.dataLayer.push(args)
  //   }
  //   window.gtag("js", new Date())
  //   window.gtag("config", GA_ID)
  // }

  // const loadFacebookPixel = () => {
  //   if (typeof window === "undefined" || window.fbq) return

  //   ;(function (f, b, e, v, n, t, s) {
  //     if (f.fbq) return
  //     n = f.fbq = function (...args) {
  //       n.callMethod
  //         ? n.callMethod.apply(n, args)
  //         : n.queue.push(args)
  //     }
  //     if (!f._fbq) f._fbq = n
  //     n.push = n
  //     n.loaded = true
  //     n.version = "2.0"
  //     n.queue = []
  //     t = b.createElement(e)
  //     t.async = true
  //     t.src = v
  //     s = b.getElementsByTagName(e)[0]
  //     s.parentNode?.insertBefore(t, s)
  //   })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")

  //   window.fbq("init", "YOUR_PIXEL_ID") // replace with your Pixel ID
  //   window.fbq("track", "PageView")
  // }

  // const loadPostHog = () => {
  //   if (typeof window === "undefined") return

  //   posthog.init("phc_xxxxxxxxxxxxxxx", {
  //     api_host: "https://app.posthog.com",
  //     capture_pageview: true,
  //   })
  // }

  return (
    <div>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 z-[999999]">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-[#bbf7d0]/70 dark:bg-green-800/70 backdrop-blur-md rounded-t-lg px-3 sm:px-6 py-2 sm:py-3 mx-2 border-t border-r border-l border-green-500 dark:border-green-600">
              <p className="text-green-500 dark:text-white text-center text-xs sm:text-sm">
                By clicking &quot;Accept All&quot;, you agree to the use of cookies and similar technologies.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 shadow-md shadow-green-900/20 dark:shadow-none rounded-lg px-3 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 dark:border dark:border-zinc-800">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-zinc-200 text-sm sm:text-base leading-relaxed">
                  We use cookies and similar technologies to personalize content, analyze site traffic, and enhance your experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto sm:shrink-0">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-200 border-gray-300 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-700 px-4 sm:px-6 py-2 text-sm sm:text-base font-medium w-full sm:w-auto order-2 sm:order-1"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  variant="fancy"
                  className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base font-medium w-full sm:w-auto order-1 sm:order-2"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
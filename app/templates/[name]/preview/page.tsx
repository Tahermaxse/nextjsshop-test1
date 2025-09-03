"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRazorpay } from "@/hooks/useRazorpay";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { DownloadCloudIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useCurrency } from "@/hooks/useCurrency";
import { CurrencyDebugger } from "@/components/CurrencyDebugger";

// Cache for template data
const templateCache = new Map<string, any>();

const getInitialTemplate = () => {
  if (typeof window !== "undefined" && window.history.state?.template) {
    return window.history.state.template;
  }
  return null;
};

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const { isLoaded, loadScript } = useRazorpay();
  const { data: session } = useSession();
  const { formatPrice, currency, isLoading: currencyLoading } = useCurrency();
  const [template, setTemplate] = useState<any>(getInitialTemplate());
  const [mobile, setMobile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isPurchaseStatusLoading, setIsPurchaseStatusLoading] = useState(false);

  // Fetch template data with caching
  const fetchTemplate = useCallback(async () => {
    const name = params.name as string;
    if (templateCache.has(name)) {
      setTemplate(templateCache.get(name));
      return;
    }
    try {
      const res = await fetch(`/api/templates/${name}`);
      if (!res.ok) throw new Error("Failed to fetch template");
      const data = await res.json();
      templateCache.set(name, data);
      setTemplate(data);
    } catch (error) {
      console.error("Error fetching template:", error);
      toast.error("Failed to load template preview");
    }
  }, [params.name]);

  useEffect(() => {
    if (!template) {
      fetchTemplate();
    }
  }, [fetchTemplate, template]);

  // Check purchase status
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!session || !template) {
        setIsPurchaseStatusLoading(false);
        return;
      }
      try {
        const { data } = await axios.post(
          "/api/razorpay/check-purchase",
          {
            templateId: template.id,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setIsPurchased(data.purchased);
      } catch (error) {
        console.error("Error checking purchase status:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        setIsPurchaseStatusLoading(false);
      }
    };
    if (session && template) {
      setIsPurchaseStatusLoading(true);
      checkPurchaseStatus();
    } else {
      setIsPurchaseStatusLoading(false);
    }
  }, [session, template, router]);

  // Fetch download link
  const fetchDownloadLink = async () => {
    if (isDownloading || !template) return;
    setIsDownloading(true);
    try {
      const { data } = await axios.post("/api/get-download-link", {
        templateId: template.id,
        templateName: template.name,
      });
      if (data.downloadLink) {
        window.location.href = data.downloadLink;
        toast.success("Download started successfully!");
      } else {
        toast.error("Download link not found");
      }
    } catch (error) {
      console.error("Error fetching download link:", error);
      toast.error("Failed to get download link");
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle Razorpay payment
  const handlePayment = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!isLoaded) {
      try {
        await loadScript();
      } catch (err) {
        console.error("Razorpay script loading failed:", err);
        toast.error("Failed to load payment gateway");
        return;
      }
    }
    setIsProcessing(true);
    try {
      const { data: orderData } = await axios.post(
        "/api/razorpay/create-order",
        {
          amount: template.price,
          templateId: template.id,
          currency: currency,
        }
      );
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "LoomUI",
        description: `Purchase of ${template.name}`,
        order_id: orderData.id,
        // Payment method configuration based on currency
        ...(currency === 'INR' ? {
          // For INR: Allow all Indian payment methods
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
            paylater: true,
            emi: true,
            banktransfer: true,
          },
          // Enable UPI intent for better UX
          upi: {
            flow: "intent"
          }
        } : {
          // For USD: Restrict to international payment methods
          method: {
            card: false,
            netbanking: false,
            wallet: true,
            paylater: false,
            emi: false,
            banktransfer: false,
            upi: false,
          }
        }),
        handler: async (response: any) => {
          try {
            const { data } = await axios.post(
              "/api/razorpay/verify-payment-template",
              {
                ...response,
                templateId: template.id,
                userId: session?.user?.id || "guest_user",
                amount: template.price,
                currency: currency,
              }
            );
            if (data.success) {
              setIsPurchased(true);
              toast.success("Payment successful!");
              router.push(`/templates/${template.urlname}`);
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: {
          color: "#27272a",
          backdrop_color: "#18181b",
          hide_topbar: false,
          hide_border: true,
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', (response: { error: any }) => {
        console.error("Payment failed:", response.error);
        toast.error("Payment Failed");
      });
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Failed to initiate payment");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!template) {
    return (
      <div className="bg-gray-100 dark:bg-zinc-900 min-h-screen">
        <div className="max-w-[1200px] mx-auto flex h-dvh flex-col bg-gray-100 dark:bg-zinc-900">
          <header className="grid grid-cols-[1fr_auto] items-center px-6 pt-4 sm:pt-6 lg:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-2">
              <div className="flex gap-x-2 text-sm/6 max-sm:flex-col max-sm:gap-y-2">
                <div className="h-6 w-40 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
                <div className="max-sm:hidden text-gray-500 dark:text-zinc-300">
                  ·
                </div>
                <div className="hidden sm:block h-6 w-80 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
              </div>
              <div className="max-sm:hidden max-sm:-mx-6 max-sm:pl-6">
                <ul className="flex gap-2 text-xs/6 whitespace-nowrap">
                  {["", "", "", ""].map((_, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="h-4 w-16 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
                      {idx < 3 && (
                        <span className="text-gray-500 dark:text-zinc-300">
                          /
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              role="tablist"
              className="justify-self-center max-lg:hidden flex items-center gap-3"
            >
              <div className="h-8 w-8 bg-gray-300 dark:bg-zinc-700 rounded-md animate-pulse" />
              <div className="h-8 w-8 bg-gray-300 dark:bg-zinc-700 rounded-md animate-pulse" />
              <div className="h-4 w-px bg-gray-400 dark:bg-zinc-600" />
              <div className="h-8 w-8 bg-gray-300 dark:bg-zinc-700 rounded-md animate-pulse" />
            </div>
            <div className="justify-self-end flex items-center gap-3">
              <div className="md:hidden h-6 w-6 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
              <div className="h-8 w-28 bg-gray-300 dark:bg-zinc-700 rounded-full animate-pulse" />
            </div>
          </header>
          <main className="mt-4 flex grow px-4 pb-4 sm:mt-6 sm:px-6 sm:pb-6">
            <div
              className="relative mx-auto w-full lg:data-mobile:w-[390px]"
              data-mobile="false"
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl outline -outline-offset-1 outline-gray-400/20 dark:outline-zinc-700/20" />
              <div className="w-full h-[800px] rounded-xl bg-gray-300 dark:bg-zinc-700 animate-pulse flex items-center justify-center">
                <div className="text-gray-500 dark:text-zinc-400 text-sm">
                  Loading Preview...
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-200 dark:bg-zinc-900">
      <div className="group flex h-dvh flex-col bg-neutral-200 dark:bg-zinc-900">
        <header className="grid grid-cols-[1fr_auto] items-center px-6 pt-2 sm:pt-4 lg:grid-cols-[1fr_auto_1fr]">
          <div>
            <div className="flex gap-x-1.5 text-sm/6 max-sm:flex-col">
              <h1 className="font-semibold">
                <a href={template.preview}>{template.name}</a>
              </h1>
              <div className="max-sm:hidden" aria-hidden="true">
                ·
              </div>
              <p className="hidden sm:block">
                {template.description.split(" ").slice(0, 7).join(" ") + "...."}
              </p>
            </div>
            <div className="max-sm:hidden overflow-x-auto max-sm:-mx-6 max-sm:pl-6">
              <ul
                aria-label="Technologies used"
                className="flex gap-1.5 text-xs/6 whitespace-nowrap"
              >
                {["Next.js", "Tailwind CSS", "React", "TypeScript"].map(
                  (tech, idx, arr) => (
                    <li key={tech} className="flex gap-1.5 text-zinc-500">
                      {tech}
                      {idx < arr.length - 1 && (
                        <span className="dark:text-zinc-300 text-zinc-900 mx-1">-</span>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="justify-self-center max-lg:hidden flex items-center gap-2"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="View mobile version of template"
                    className="relative rounded-md"
                    aria-selected={mobile}
                    onClick={() => setMobile(true)}
                  >
                    <span
                      className="absolute inset-0 rounded-md"
                      style={{
                        transform: "none",
                        transformOrigin: "50% 50% 0px",
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g clipPath="url(#clip0_4418_5150)">
                        <path
                          opacity="0.4"
                          d="M16.24 2H7.76C5 2 4 3 4 5.81V18.19C4 21 5 22 7.76 22H16.23C19 22 20 21 20 18.19V5.81C20 3 19 2 16.24 2Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                        <path
                          d="M14 6.25H10C9.59 6.25 9.25 5.91 9.25 5.5C9.25 5.09 9.59 4.75 10 4.75H14C14.41 4.75 14.75 5.09 14.75 5.5C14.75 5.91 14.41 6.25 14 6.25Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                        <path
                          d="M12 19.3008C12.9665 19.3008 13.75 18.5173 13.75 17.5508C13.75 16.5843 12.9665 15.8008 12 15.8008C11.0335 15.8008 10.25 16.5843 10.25 17.5508C10.25 18.5173 11.0335 19.3008 12 19.3008Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4418_5150">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View mobile version</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="View desktop version of template"
                    className="relative rounded-md"
                    aria-selected={!mobile}
                    onClick={() => setMobile(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g clipPath="url(#clip0_4418_5141)">
                        <path
                          opacity="0.4"
                          d="M21.97 6.41V12.91H2V6.41C2 3.98 3.98 2 6.41 2H17.56C19.99 2 21.97 3.98 21.97 6.41Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                        <path
                          d="M2 12.9199V13.1199C2 15.5599 3.98 17.5299 6.41 17.5299H10.25C10.8 17.5299 11.25 17.9799 11.25 18.5299V19.4999C11.25 20.0499 10.8 20.4999 10.25 20.4999H7.83C7.42 20.4999 7.08 20.8399 7.08 21.2499C7.08 21.6599 7.41 21.9999 7.83 21.9999H16.18C16.59 21.9999 16.93 21.6599 16.93 21.2499C16.93 20.8399 16.59 20.4999 16.18 20.4999H13.76C13.21 20.4999 12.76 20.0499 12.76 19.4999V18.5299C12.76 17.9799 13.21 17.5299 13.76 17.5299H17.57C20.01 17.5299 21.98 15.5499 21.98 13.1199V12.9199H2Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4418_5141">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View desktop version</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="h-4 w-px bg-gray-950/10 dark:bg-white" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={template.preview}
                    aria-label="View full screen version of template"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g clipPath="url(#clip0_4418_4743)">
                        <path
                          opacity="0.4"
                          d="M16.48 2H8.52C5.07 2 3 4.06 3 7.52V15.47C3 18.94 5.07 21 8.52 21H16.47C19.93 21 21.99 18.94 21.99 15.48V7.52C22 4.06 19.93 2 16.48 2Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                        <path
                          d="M11 16.15V18.85C11 21.1 10.1 22 7.85 22H5.15C2.9 22 2 21.1 2 18.85V16.15C2 13.9 2.9 13 5.15 13H7.85C10.1 13 11 13.9 11 16.15Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                        <path
                          d="M18.7499 5.95C18.7499 5.86 18.7299 5.78 18.6999 5.69C18.6999 5.68 18.6899 5.67 18.6899 5.67C18.6599 5.6 18.6099 5.53 18.5599 5.48C18.5399 5.46 18.5199 5.44 18.4999 5.43C18.4499 5.39 18.3999 5.35 18.3499 5.33C18.3299 5.32 18.2999 5.31 18.2799 5.3C18.1999 5.27 18.1099 5.25 18.0199 5.25H13.9999C13.5899 5.25 13.2499 5.59 13.2499 6C13.2499 6.41 13.5799 6.72 13.9999 6.72H16.2099L12.4699 10.47C12.1799 10.76 12.1799 11.24 12.4699 11.53C12.6199 11.68 12.8099 11.75 12.9999 11.75C13.1899 11.75 13.3799 11.68 13.5299 11.53L17.2599 7.79V9.99C17.2599 10.4 17.5999 10.74 18.0099 10.74C18.4199 10.74 18.7599 10.4 18.7599 9.99V5.97C18.7599 5.96 18.7599 5.96 18.7499 5.95Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4418_4743">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View full screen version</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="justify-self-end flex items-center gap-2">
            <a
              href={template.preview}
              aria-label="View full screen version of template"
              target="_blank"
              className="md:hidden"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g clipPath="url(#clip0_4418_4743)">
                  <path
                    opacity="0.4"
                    d="M16.48 2H8.52C5.07 2 3 4.06 3 7.52V15.47C3 18.94 5.07 21 8.52 21H16.47C19.93 21 21.99 18.94 21.99 15.48V7.52C22 4.06 19.93 2 16.48 2Z"
                    fill="white"
                    style={{ fill: "var(--fillg)" }}
                  />
                  <path
                    d="M11 16.15V18.85C11 21.1 10.1 22 7.85 22H5.15C2.9 22 2 21.1 2 18.85V16.15C2 13.9 2.9 13 5.15 13H7.85C10.1 13 11 13.9 11 16.15Z"
                    fill="white"
                    style={{ fill: "var(--fillg)" }}
                  />
                  <path
                    d="M18.7499 5.95C18.7499 5.86 18.7299 5.78 18.6999 5.69C18.6999 5.68 18.6899 5.67 18.6899 5.67C18.6599 5.6 18.6099 5.53 18.5599 5.48C18.5399 5.46 18.5199 5.44 18.4999 5.43C18.4499 5.39 18.3999 5.35 18.3499 5.33C18.3299 5.32 18.2999 5.31 18.2799 5.3C18.1999 5.27 18.1099 5.25 18.0199 5.25H13.9999C13.5899 5.25 13.2499 5.59 13.2499 6C13.2499 6.41 13.5799 6.72 13.9999 6.72H16.2099L12.4699 10.47C12.1799 10.76 12.1799 11.24 12.4699 11.53C12.6199 11.68 12.8099 11.75 12.9999 11.75C13.1899 11.75 13.3799 11.68 13.5299 11.53L17.2599 7.79V9.99C17.2599 10.4 17.5999 10.74 18.0099 10.74C18.4199 10.74 18.7599 10.4 18.7599 9.99V5.97C18.7599 5.96 18.7599 5.96 18.7499 5.95Z"
                    fill="white"
                    style={{ fill: "var(--fillg)" }}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4418_4743">
                    <rect width={24} height={24} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            {isPurchaseStatusLoading || currencyLoading ? (
              <Button size="sm" variant="fancy" disabled>
                Loading...
              </Button>
            ) : isPurchased || template.price === 0 ? (
              <Button
                size="sm"
                variant="fancy"
                onClick={fetchDownloadLink}
                disabled={isDownloading}
              >
                <DownloadCloudIcon className="w-4 h-4 mr-2" />
                {isDownloading ? "Downloading..." : "Download"}
              </Button>
            ) : (
              <Button
                variant="fancy"
                size="sm"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                <div className="inline-flex justify-center rounded-full text-sm/6 font-semibold px-3.5 py-1">
                  {isProcessing ? "Processing..." : `Get Template - ${formatPrice(template.price)}`}
                </div>
              </Button>
            )}
          </div>
        </header>
        <main className="mt-2 flex grow px-2 pb-2 sm:mt-4 sm:px-4 sm:pb-4">
          <div
            className="relative mx-auto flex w-full lg:data-mobile:w-95"
            data-mobile={mobile ? "true" : "false"}
            style={
              mobile
                ? { maxWidth: 390, minWidth: 390, height: 844 }
                : { height: 800 }
            }
          >
            <div className="pointer-events-none absolute inset-0 rounded-xl outline -outline-offset-1 outline-black/10" />
            <Suspense
              fallback={
                <div className="w-full rounded-xl bg-white flex items-center justify-center h-96">
                  Loading Preview...
                </div>
              }
            >
              <iframe
                allow="clipboard-read; clipboard-write;"
                className="w-full rounded-xl bg-white"
                src={template.preview}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation"
                style={
                  mobile
                    ? { width: 390, height: 844 }
                    : { width: "100%", height: 800 }
                }
                title="Template Preview"
              />
            </Suspense>
          </div>
        </main>

        {/* Temporary Currency Debugger */}
        {/* <CurrencyDebugger /> */}
      </div>
    </div>
  );
};

export default Page;

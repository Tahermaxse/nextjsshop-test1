"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Plus, House, DownloadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Template, ImageType, FeatureType } from "@/lib/types";
import axios from "axios";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { TemplateCommentsSection } from "./components/TemplateCommentsSection";
import { Home } from "@/components/Svgs";
import { useTheme } from "next-themes";
import { useCurrency } from "@/hooks/useCurrency";

// Dynamically import heavy components
const DynamicTemplateStats = dynamic(() => import("./components/TemplateStats"), {
  loading: () => (
    <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
  ),
  ssr: false,
});

const DynamicTemplateSidebar = dynamic(
  () => import("./components/TemplateSidebar").then((mod) => ({ default: mod.TemplateSidebar })),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    ),
    ssr: false,
  }
);

const DynamicTemplateGrid = dynamic(
  () => import("../components/TemplateGrid").then((mod) => ({ default: mod.TemplateGrid })),
  {
    loading: () => (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 dark:bg-[#ffffff08] rounded-lg"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    ),
    ssr: false,
  }
);

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface TemplatePageClientProps {
  template: Template;
  hasPurchased: boolean;
}

export default function TemplatePageClient({ template: initialTemplate, hasPurchased }: TemplatePageClientProps) {
  const [template, setTemplate] = useState(initialTemplate);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(hasPurchased);
  const [isPurchaseStatusLoading, setIsPurchaseStatusLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [similarTemplates, setSimilarTemplates] = useState<Template[]>([]);
  const [isSimilarTemplatesLoading, setIsSimilarTemplatesLoading] = useState(true);
  const { isLoaded, error, loadScript } = useRazorpay();
  const { data: session } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const { formatPrice, currency, isLoading: currencyLoading } = useCurrency();

  useEffect(() => {
    const incrementView = async () => {
      try {
        const response = await fetch(`/api/templates/${template.urlname}/increment-view`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          setTemplate((prev) => ({ ...prev, views: data.views }));
        }
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };
    incrementView();
  }, [template.urlname]);

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!session) {
        setIsPurchaseStatusLoading(false);
        return;
      }
      try {
        const { data } = await axios.post("/api/razorpay/check-purchase", {
          templateId: template.id,
        }, {
          headers: { "Content-Type": "application/json" },
        });
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
    if (session) {
      checkPurchaseStatus();
    } else {
      setIsPurchaseStatusLoading(false);
    }
  }, [session, template.id, router]);

  const fetchDownloadLink = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const { data } = await axios.post("/api/get-download-link", {
        templateId: template.id,
        templateName: template.name,
      });
      if (data.downloadLink) {
        setDownloadLink(data.downloadLink);
        
        // Create a promise that tracks the file download
        const downloadPromise = new Promise((resolve, reject) => {
          const link = document.createElement('a');
          link.href = data.downloadLink;
          link.download = template.name;
          
          link.onclick = () => {
            setTimeout(resolve, 2000); // Resolve after 2 seconds as a fallback
          };
          
          link.onerror = () => {
            reject(new Error('Download failed'));
          };
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });

        // Show promise toast
        toast.promise(
          downloadPromise,
          {
            loading: 'Downloading template...',
            success: 'Template downloaded successfully!',
            error: 'Download failed. Please try again.'
          }
        );
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
        toast.error("Failed to load Razorpay. Please try again.");
        return;
      }
    }
    setIsProcessing(true);
    try {
      const { data: orderData } = await axios.post("/api/razorpay/create-order", {
        amount: template.price,
        templateId: template.id,
        currency: currency,
      });
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Nextjsshop",
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
            const { data } = await axios.post("/api/razorpay/verify-payment-template", {
              ...response,
              templateId: template.id,
              userId: session?.user?.id || "guest_user",
              amount: template.price,
              currency: currency,
            });
            if (data.success) {
              setIsPurchased(true);
              toast.success("Payment successful!");
            }
          } catch (error) {
            console.error("Payment verification failed", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: {
          color: theme === "dark" ? "#27272a" : "#ffffff",
          backdrop_color: theme === "dark" ? "#18181b" : "#fafafa",
          hide_topbar: false,
          hide_border: true,
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", (response: { error: any }) => {
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

  useEffect(() => {
    const fetchSimilarComponents = async () => {
      if (!template.categories?.length) {
        setIsSimilarTemplatesLoading(false);
        return;
      }
      try {
        const { data } = await axios.post("/api/templates/similar", {
          categories: template.categories,
          currentTemplateId: template.id,
        });
        setSimilarTemplates(data.template);
      } catch (error) {
        console.error("Error fetching similar templates:", error);
      } finally {
        setIsSimilarTemplatesLoading(false);
      }
    };
    fetchSimilarComponents();
  }, [template.categories, template.id]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 sm:mb-8">
        <Link href="/">
          <Home />
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/templates" className="hover:text-foreground transition-colors">
          Templates
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">{template.name}</span>
      </nav>
      <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight break-words">
          {template.name}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl text-justify break-words">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {isPurchaseStatusLoading || currencyLoading ? (
            <Button size="lg" variant="fancy" disabled>
              Loading...
            </Button>
          ) : isPurchased || template.price === 0 ? (
            <Button size="lg" variant="fancy" onClick={fetchDownloadLink} disabled={isDownloading}>
              <DownloadCloudIcon className="w-4 h-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          ) : (
            <Button size="lg" variant="fancy" onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Buy for ${formatPrice(template.price)}`}
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              // Pass template data to preview route
              window.history.replaceState({ template }, '', window.location.href);
              router.push(`/templates/${template.urlname}/preview`);
            }}
          >
            Preview
          </Button>
        </div>
      </div>
      <Suspense
        fallback={<div className="h-24 bg-gray-100 dark:bg-zinc-900 rounded-lg animate-pulse"></div>}
      >
        <DynamicTemplateStats template={template} />
      </Suspense>
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {template.images?.map((image: ImageType, index: React.Key | null | undefined) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted transition-transform hover:scale-[1.02]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-all duration-500 ease-in-out ${isLoading ? "blur-lg scale-105" : "blur-0 scale-100"}`}
                onLoadingComplete={() => setIsLoading(false)}
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={typeof index === "number" && index < 2}
                loading={typeof index === "number" && index < 2 ? "eager" : "lazy"}
                quality={75}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6 sm:gap-8 lg:gap-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight sm:leading-normal break-words">
              {template.name} - {template.description}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 break-words">
              {template.paragraph1}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 break-words">
              {template.paragraph2}
            </p>
            <br />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight sm:leading-normal">
              Features
            </h2>
            {template.features?.map((feature: FeatureType) => (
              <Collapsible key={feature?.id} className="border rounded-lg w-full">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-4 hover:bg-muted/50 text-sm sm:text-base">
                  <span className="flex items-center gap-2 sm:gap-3 flex-1 text-left break-words">
                    {feature.question}
                  </span>
                  <Plus className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 sm:p-4 pt-0">
                  <p className="text-muted-foreground text-sm sm:text-base break-words">
                    {feature.answer}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <Suspense
            fallback={<div className="h-64 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>}
          >
            <DynamicTemplateSidebar template={template} hasPurchased={isPurchased || hasPurchased} />
          </Suspense>
        </div>
      </div>
      {similarTemplates.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Similar Templates</h2>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 dark:bg-[#ffffff08] rounded-lg"></div>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <DynamicTemplateGrid templates={similarTemplates} loading={isSimilarTemplatesLoading} />
          </Suspense>
        </div>
      )}
      <TemplateCommentsSection templateId={template.id} />
    </div>
  );
}
"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Plus, House, DownloadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Components, ImageType, FeatureType, VideoType } from "@/lib/types";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { CommentsSection } from "./components/CommentsSection";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog copy";
import { ZoomIn, ZoomOut, X } from "lucide-react";
import { Home } from "@/components/Svgs";
import { useCurrency } from "@/hooks/useCurrency";

// Dynamically import heavy components
const DynamicComponentStats = dynamic(
  () => import("./components/ComponentStats"),
  {
    loading: () => (
      <div className="h-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
    ),
    ssr: false,
  }
);

const DynamicComponentSidebar = dynamic(
  () =>
    import("./components/ComponentSidebar").then((mod) => ({
      default: mod.ComponentSidebar,
    })),
  {
    loading: () => (
      <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
    ),
    ssr: false,
  }
);

const DynamicComponentsGrid = dynamic(
  () =>
    import("../components/ComponentsGrid").then((mod) => ({
      default: mod.ComponentsGrid,
    })),
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

interface ComponentPageClientProps {
  component: Components;
}

// Add ImageViewer component
const ImageViewer = ({
  image,
  isOpen,
  onClose,
}: {
  image: ImageType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClose = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none">
        <div className="relative w-full h-full">
          <div className="absolute top-4 right-4 z-50 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleZoomIn}
              className="bg-gray-200 dark:bg-zinc-800 rounded-full text-white"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleZoomOut}
              className="bg-gray-200 dark:bg-zinc-800 rounded-full text-white"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleClose}
              className="bg-gray-200 dark:bg-zinc-800 rounded-full  text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div
            className="w-full h-full cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
              className="w-full h-full"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={2000}
                height={1500}
                className="w-full h-full object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function ComponentPageClient({
  component,
}: ComponentPageClientProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { isLoaded, error, loadScript } = useRazorpay();
  const { data: session, status } = useSession();
  const [isPurchased, setIsPurchased] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [similarComponents, setSimilarComponents] = useState<Components[]>([]);
  const [isPurchaseStatusLoading, setIsPurchaseStatusLoading] = useState(true);
  const [isSimilarComponentsLoading, setIsSimilarComponentsLoading] =
    useState(true);
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { formatPrice, currency } = useCurrency();

  // Check if component is purchased
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!session?.user?.id) {
        setIsPurchaseStatusLoading(false);
        return;
      }

      try {
        // Use POST instead of GET and don't pass userId in the request
        const { data } = await axios.post(
          "/api/razorpay/check-purchase",
          {
            componentId: component.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (data.purchased) {
          setIsPurchased(true);
        } else {
          setIsPurchased(false);
        }
      } catch (error) {
        console.error("Error checking purchase status:", error);
        // Handle unauthorized errors
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // User is not authenticated, handle accordingly
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
  }, [session, component.id, router]);

  const fetchDownloadLink = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const { data } = await axios.post("/api/get-download-link", {
        componentId: component.id,
        componentName: component.name,
      });

      if (data.downloadLink) {
        setDownloadLink(data.downloadLink);
        window.location.href = data.downloadLink;
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
      const { data: orderData } = await axios.post(
        "/api/razorpay/create-order",
        {
          amount: component.price,
          componentId: component.id,
          currency: currency,
        }
      );

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Nextjsshop",
        description: `Purchase of ${component.name}`,
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
              "/api/razorpay/verify-payment-component",
              {
                ...response,
                componentId: component.id,
                userId: session?.user?.id || "guest_user",
                amount: component.price,
                currency: currency,
              }
            );

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
        notes: { componentId: component.id },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", (response: any) => {
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
      if (!component.categories?.length) {
        setIsSimilarComponentsLoading(false);
        return;
      }

      try {
        const { data } = await axios.post("/api/components/similar", {
          categories: component.categories, // Send the array directly, not as a string
          currentComponentId: component.id,
        });
        setSimilarComponents(data.components);
      } catch (error) {
        console.error("Error fetching similar components:", error);
      } finally {
        setIsSimilarComponentsLoading(false);
      }
    };

    fetchSimilarComponents();
  }, [component.categories, component.id]);

  // Set initial loading state to false after component mounts
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 sm:mb-8">
        <Link href="/">
          <Home />
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link
          href="/components"
          className="hover:text-foreground transition-colors"
        >
          Components
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground truncate">{component.name}</span>
      </nav>

      {/* Main Content */}
      <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight break-words">
          {component.name}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl text-justify break-words">
          {component.description}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {isPurchaseStatusLoading ? (
            <Button size="lg" variant="fancy" disabled>
              Loading...
            </Button>
          ) : isPurchased || component.price === 0 ? (
            <Button
              size="lg"
              variant="fancy"
              onClick={fetchDownloadLink}
              disabled={isDownloading}
            >
              <DownloadCloudIcon className="w-4 h-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          ) : (
            <Button
              size="lg"
              variant="fancy"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Buy for ${formatPrice(component.price)}`}
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsPreviewOpen(true)}
          >
            Preview
          </Button>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        }
      >
        <DynamicComponentStats Component={component} />
      </Suspense>

      {/* Images and Video */}
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {component.images?.map(
            (image: ImageType, index: React.Key | null | undefined) => {
              const [isViewerOpen, setIsViewerOpen] = useState(false);
              return (
                <React.Fragment key={index}>
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted transition-transform hover:scale-[1.02] cursor-pointer"
                    onClick={() => setIsViewerOpen(true)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`object-cover transition-all duration-500 ease-in-out ${
                        isLoading ? "blur-lg scale-105" : "blur-0 scale-100"
                      }`}
                      onLoadingComplete={() => setIsLoading(false)}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={typeof index === "number" && index < 2}
                      loading={
                        typeof index === "number" && index < 2
                          ? "eager"
                          : "lazy"
                      }
                      quality={75}
                    />
                  </div>
                  <ImageViewer
                    image={image}
                    isOpen={isViewerOpen}
                    onClose={() => setIsViewerOpen(false)}
                  />
                </React.Fragment>
              );
            }
          )}
          {component.videos?.map(
            (video: VideoType, index: React.Key | null | undefined) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted transition-transform hover:scale-[1.02]"
              >
                <video
                  controls
                  className="object-cover w-full h-full"
                  preload="metadata"
                >
                  <source
                    src={typeof video.src === "string" ? video.src : ""}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )
          )}
        </div>
      </div>

      {/* Features Section - Previously Identified Scrolling Issue */}
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6 sm:gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight sm:leading-normal break-words">
              {component.name} - {component.description}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 break-words">
              {component.paragraph1}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 break-words">
              {component.paragraph2}
            </p>
            <br />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight sm:leading-normal">
              Features
            </h2>
            {component.features?.map((feature: FeatureType) => (
              <Collapsible
                key={feature?.id}
                className="border rounded-lg w-full"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-4 hover:bg-muted/50 text-sm sm:text-base">
                  <span className="flex items-center gap-2 sm:gap-3 flex-1 text-left break-words">
                    {feature.question}
                  </span>
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
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
        {/* Sidebar - Stacks below on mobile */}
        <div className="mt-6 md:mt-0">
          <Suspense
            fallback={
              <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            }
          >
            <DynamicComponentSidebar
              Component={component}
              hasPurchased={isPurchased}
            />
          </Suspense>
        </div>
      </div>

      {/* Similar Components */}
      {similarComponents.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Similar Components
          </h2>
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
            <DynamicComponentsGrid
              components={similarComponents}
              loading={isSimilarComponentsLoading}
            />
          </Suspense>
        </div>
      )}

      {/* Add Comments Section */}
      <CommentsSection componentId={component.id} />

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[95vw]  max-h-[95vh] p-0 bg-transparent border-none flex items-center justify-center">
			<DialogTitle className="sr-only"></DialogTitle>
          <div
            className="overflow-y-auto rounded-lg overflow-x-hidden w-full scrollbar-none"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE and Edge
            }}
          >
            <img
              src={component.preview}
              alt="Component Preview"
              className={`transition-all duration-500 ease-in-out ${
                isLoading ? "blur-lg scale-105" : "blur-0 scale-100"
              }`}
              onLoad={() => setIsLoading(false)}
              style={{
                display: "block",
                width: "100%",
                maxWidth: "100%",
                height: "auto",
              }}
              draggable={false}
            />
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

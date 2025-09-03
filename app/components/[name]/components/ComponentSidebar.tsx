import React from "react";
import { Badge } from "@/components/ui/badge";
import { Components } from "@/lib/types";
import { ReportModal } from "./report-modal";
import {
  Footer,
  Navbar,
  Cta,
  Login,
  Singup,
  Integration,
  Pricing,
  Contact,
  Faq,
  LogoCloud,
} from "@/components/Svgs";
import Link from "next/link";

interface ComponentSidebarProps {
  Component: Components;
  hasPurchased: boolean;
}

const categoryIcons: Record<string, { icon: JSX.Element; href: string }> = {
  Footer: { icon: <Footer />, href: "/components/category/footer" },
  Navbar: { icon: <Navbar />, href: "/components/category/navbar" },
  CTA: { icon: <Cta />, href: "/components/category/cta" },
  Login: { icon: <Login />, href: "/components/category/login" },
  Singup: { icon: <Singup />, href: "/components/category/signup" },
  Integration: {
    icon: <Integration />,
    href: "/components/category/integration",
  },
  Pricing: { icon: <Pricing />, href: "/components/category/pricing" },
  Contact: { icon: <Contact />, href: "/components/category/contact" },
  Faq: { icon: <Faq />, href: "/components/category/faq" },
  LogoCloud: { icon: <LogoCloud />, href: "/components/category/logo-cloud" },
};

export function ComponentSidebar({
  Component,
  hasPurchased,
}: ComponentSidebarProps) {
  const supportItems = [
    {
      key: "contact",
      icon: "/svgs/contaxt.svg",
      content: (
        <Link
          href="mailto:hathitaher83@gmail.com"
          className="text-primary hover:underline"
        >
          Contact Andrea Montini
        </Link>
      ),
    },
    {
      key: "how",
      icon: "/svgs/how.svg",
      content: (
        <Link href="/docs" className="text-primary hover:underline">
          How Components work
        </Link>
      ),
    },
    {
      key: "message",
      icon: "/svgs/message.svg",
      content: (
        <Link   href="mailto:nextjsshop@gmail.com?subject=Request%20for%20More%20Component%20Pages&body=Hi%20Team%2C%0AI'd%20like%20to%20add%20more%20pages%20to%20the%20template.%20Please%20get%20in%20touch%20with%20me."
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer">
          Request More Components
        </Link>
      ),
    },
    {
      key: "report",
      icon: "/svgs/report.svg",
      content: (
        <ReportModal
          componentId={Component.id}
          hasPurchased={hasPurchased}
        />
      ),
    },
  ];
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {Component.categories?.map(
            (category) =>
              categoryIcons[category] && (
                <Link key={category} href={categoryIcons[category].href}>
                  <Badge
                    variant="secondary"
                    className="rounded-md p-2 cursor-pointer flex items-center"
                  >
                    <span className="mr-0 text-green-500">
                      {categoryIcons[category].icon}
                    </span>
                    {category}
                  </Badge>
                </Link>
              )
          )}
        </div>
      </div>

      {/* Pages */}
      <div className="space-y-4">
        <h3 className="font-semibold">Component</h3>
        <p className="text-sm text-muted-foreground">
          {Component.pagesList?.join(", ")}
        </p>
      </div>

      {/* Support */}
      <div className="space-y-4">
        <h3 className="font-semibold">Support</h3>
        <ul className="space-y-2 text-sm">
          {supportItems.map(({ key, icon, content }) => (
            <li key={key} className="flex items-center space-x-2">
              <span className="h-5 w-5">
                <img
                  src={icon}
                  alt={key}
                  className="dark:filter dark:invert dark:contrast-125"
                />
              </span>
              {content}
            </li>
          ))}
        </ul>
      </div>

      {/* Refund Policy */}
      <div className="space-y-4">
        <h3 className="font-semibold">Refund Policy</h3>
        <p className="text-sm text-muted-foreground">
          Due to the digital nature of our products, we do not offer refunds once the purchase is completed. Please ensure you have reviewed the product details before making a purchase.
        </p>
      </div>
    </div>
  );
}

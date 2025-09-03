import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Grid,
  SaaS,
  Splash,
  Web3,
  Display,
  Film,
  App,
  Ai,
  Blog,
  RulerAndPencil,
  Business,
  CheckCircle,
  Documentation,
  ShoppingCart,
  Education,
  Microphone,
  Food,
  Gift,
  Heart,
  LandingPage,
  Membership,
  Minimal,
  Modern,
  Star,
  News,
  User,
  Camera,
  Podcast,
  Gallery,
  Chair,
  Sidebar,
  Zap,
  Tech,
  CreditCard,
} from "@/components/Svgs";
import { Template } from "@/lib/types";
import { ReportModal } from "./report-modal";
import Link from "next/link";

interface TemplateSidebarProps {
  template: Template;
  hasPurchased: boolean;
}

interface CategoryIcons {
  [key: string]: JSX.Element;
}

export function TemplateSidebar({
  template,
  hasPurchased,
}: TemplateSidebarProps) {
  const categoryIcons: Record<string, { icon: JSX.Element; href: string }> = {
    SaaS: { icon: <SaaS />, href: "/templates/category/saas" },
    Animated: { icon: <Film />, href: "/templates/category/animated" },
    Startup: { icon: <Zap />, href: "/templates/category/startup" },
    Business: { icon: <Business />, href: "/templates/category/business" },
    Agency: { icon: <Display />, href: "/templates/category/agency" },
    Portfolio: {
      icon: <Gallery />,
      href: "/templates/category/portfolio",
    },
    Ecommerce: {
      icon: <ShoppingCart />,
      href: "/templates/category/ecommerce",
    },
    Personal: { icon: <User />, href: "/templates/category/personal" },
    Web3: { icon: <Web3 />, href: "/templates/category/web3" },
    Blog: { icon: <Blog />, href: "/templates/category/blog" },
    RulerAndPencil: {
      icon: <RulerAndPencil />,
      href: "/templates/category/ruler-and-pencil",
    },
    Education: { icon: <Education />, href: "/templates/category/education" },
    Microphone: {
      icon: <Microphone />,
      href: "/templates/category/microphone",
    },
    Film: { icon: <Film />, href: "/templates/category/film" },
    Display: { icon: <Display />, href: "/templates/category/display" },
    App: { icon: <App />, href: "/templates/category/app" },
    AI: { icon: <Ai />, href: "/templates/category/ai" },
    Documentation: {
      icon: <Documentation />,
      href: "/templates/category/documentation",
    },
    ShoppingCart: {
      icon: <ShoppingCart />,
      href: "/templates/category/shopping-cart",
    },
    Food: { icon: <Food />, href: "/templates/category/food" },
    Gift: { icon: <Gift />, href: "/templates/category/gift" },
    Heart: { icon: <Heart />, href: "/templates/category/heart" },
    LandingPage: {
      icon: <LandingPage />,
      href: "/templates/category/landing-page",
    },
    Membership: {
      icon: <Membership />,
      href: "/templates/category/membership",
    },
    Minimal: { icon: <Minimal />, href: "/templates/category/minimal" },
    Modern: { icon: <Modern />, href: "/templates/category/modern" },
    News: { icon: <News />, href: "/templates/category/news" },
    User: { icon: <User />, href: "/templates/category/user" },
    Camera: { icon: <Camera />, href: "/templates/category/camera" },
    Podcast: { icon: <Podcast />, href: "/templates/category/podcast" },
    Gallery: { icon: <Gallery />, href: "/templates/category/gallery" },
    Chair: { icon: <Chair />, href: "/templates/category/chair" },
    Sidebar: { icon: <Sidebar />, href: "/templates/category/sidebar" },
    Zap: { icon: <Zap />, href: "/templates/category/zap" },
    Tech: { icon: <Tech />, href: "/templates/category/tech" },
    CreditCard: {
      icon: <CreditCard />,
      href: "/templates/category/credit-card",
    },
  };

  const supportItems = [
    {
      key: "contact",
      icon: "/svgs/contaxt.svg",
      content: (
        <Link
          href="mailto:hathitaher83@gmail.com"
          className="text-primary hover:underline"
        >
          Contact Nextjsshop Team
        </Link>
      ),
    },
    {
      key: "how",
      icon: "/svgs/how.svg",
      content: (
        <Link href="/docs" className="text-primary hover:underline">
          How templates work
        </Link>
      ),
    },
    {
      key: "message",
      icon: "/svgs/message.svg",
      content: (
        <Link
          href="mailto:nextjsshop@gmail.com?subject=Request%20for%20More%20Template%20Pages&body=Hi%20Team%2C%0AI'd%20like%20to%20add%20more%20pages%20to%20the%20template.%20Please%20get%20in%20touch%20with%20me."
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Request More Pages
        </Link>
      ),
    },
    {
      key: "report",
      icon: "/svgs/report.svg",
      content: (
        <ReportModal templateId={template.id} hasPurchased={hasPurchased} />
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {template.categories?.map(
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
        <h3 className="font-semibold">Pages</h3>
        <p className="text-sm text-muted-foreground">
          {template.pagesList?.join(", ")}
        </p>
      </div>

      {/* Support */}
      <div className="space-y-4">
        <h3 className="font-semibold">Support</h3>
        <ul className="space-y-2 text-sm">
          {supportItems.map(({ key, icon, content }) => {
            return (
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
            );
          })}
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

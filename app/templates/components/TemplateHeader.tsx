import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { debounce } from "lodash";
import { 
  Grid, 
  Eye,
  Bot, 
  Building2, 
  ClipboardCheck, 
  Headphones, 
  Coffee,
  Gift,
  Heart,
  Target,
  Star,
  Mic,
  Camera,
  UtensilsCrossed,
  Droplets,
  Rocket,
  Smartphone,
  Home,
  SidebarClose,
  Hexagon
} from "lucide-react";

interface TemplateHeaderProps {
  onSearch: (query: string) => void;
}

export function TemplateHeader({ onSearch }: TemplateHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 500),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const templateCategories = [
    { title: "All", icon: Grid, href: "/templates/all" },
    { title: "3D", icon: Eye, href: "/templates/3d" },
    { title: "Agency", icon: Building2, href: "/templates/agency" },
    { title: "Animated", icon: Bot, href: "/templates/animated" },
    { title: "App", icon: Smartphone, href: "/templates/app" },
    { title: "AI", icon: Bot, href: "/templates/ai" },
    { title: "Blog", icon: ClipboardCheck, href: "/templates/blog" },
    { title: "Brand Guidelines", icon: Target, href: "/templates/brand-guidelines" },
    { title: "Business", icon: Building2, href: "/templates/business" },
    { title: "Changelog", icon: ClipboardCheck, href: "/templates/changelog" },
    { title: "Documentation", icon: ClipboardCheck, href: "/templates/documentation" },
    { title: "Ecommerce", icon: Building2, href: "/templates/ecommerce" },
    { title: "Education", icon: ClipboardCheck, href: "/templates/education" },
    { title: "Entertainment", icon: Headphones, href: "/templates/entertainment" },
    { title: "Food", icon: Coffee, href: "/templates/food" },
    { title: "Free", icon: Gift, href: "/templates/free" },
    { title: "Health", icon: Heart, href: "/templates/health" },
    { title: "Landing Page", icon: Target, href: "/templates/landing-page" },
    { title: "Membership", icon: ClipboardCheck, href: "/templates/membership" },
    { title: "Minimal", icon: Target, href: "/templates/minimal" },
    { title: "Modern", icon: Star, href: "/templates/modern" },
    { title: "New", icon: Star, href: "/templates/new" },
    { title: "News", icon: ClipboardCheck, href: "/templates/news" },
    { title: "Personal", icon: Heart, href: "/templates/personal" },
    { title: "Photography", icon: Camera, href: "/templates/photography" },
    { title: "Podcast", icon: Mic, href: "/templates/podcast" },
    { title: "Portfolio", icon: Grid, href: "/templates/portfolio" },
    { title: "Real Estate", icon: Home, href: "/templates/real-estate" },
    { title: "Restaurant", icon: UtensilsCrossed, href: "/templates/restaurant" },
    { title: "Resume", icon: ClipboardCheck, href: "/templates/resume" },
    { title: "SaaS", icon: Eye, href: "/templates/saas" },
    { title: "Sidebar", icon: SidebarClose, href: "/templates/sidebar" },
    { title: "Splash", icon: Droplets, href: "/templates/splash" },
    { title: "Startup", icon: Rocket, href: "/templates/startup" },
    { title: "Tech", icon: Smartphone, href: "/templates/tech" },
    { title: "Web3", icon: Hexagon, href: "/templates/web3" }
  ];

  return (
    <div className="border-b">
      <div className="container max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between overflow-x-hidden">
        <div className="flex items-center space-x-6">
          <Link href="/templates" className="text-sm  font-medium">
            Templates
          </Link>
          <Link href="/components" className="text-sm text-[#8f8f99]">
            Components
          </Link>
        </div>
        <div className="relative w-35 sm:w-80 md:w-96">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-8"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}

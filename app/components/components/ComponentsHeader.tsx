import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { debounce } from "lodash";

interface ComponentsHeaderProps {
  onSearch: (query: string) => void;
}

export function ComponentsHeader({ onSearch }: ComponentsHeaderProps) {
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

  return (
    <div className="border-b">
      <div className="container max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between overflow-hidden">
        <div className="flex items-center space-x-6">
          <Link href="/components" className="text-sm font-medium">
            Components
          </Link>
          <Link href="/templates" className="text-sm text-[#8f8f99]">
            Templates
          </Link>
          <Link href="/components/free" className="text-sm text-[#8f8f99]">
            Free
          </Link>
        </div>
        <div className="relative w-35 sm:w-80 md:w-96">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

          <Input
            className="pl-8"
            placeholder="Search Components..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}

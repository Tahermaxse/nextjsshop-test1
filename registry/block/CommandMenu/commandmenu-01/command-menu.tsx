"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, Check, X } from "lucide-react";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type FilterType = "People" | "Files" | "Emails" | "Actions";

export function CommandMenu01() {
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterType[]>([
    "People",
    "Files",
    "Emails",
    "Actions",
  ]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const removeFilter = (filter: FilterType) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const historyItems = [
    {
      name: "James Brown",
      username: "@james",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar2.png?updatedAt=1745649103993",
    },
    {
      name: "Sophia Williams",
      username: "@sophia",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar1.png?updatedAt=1745649103993",
    },
  ];

  const resultItems = [
    {
      name: "Matthew Johnson",
      username: "@matthew",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar3.png?updatedAt=1745649103993",
    },
    {
      name: "Laura Perez",
      username: "@laura",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar4.png?updatedAt=1745649103993",
    },
    {
      name: "Wei Chen",
      username: "@wei",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar5.png?updatedAt=1745649103993",
    },
    {
      name: "Lena Müller",
      username: "@lena",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar2.png?updatedAt=1745649103993",
    },
    {
      name: "Juma Omondi",
      username: "@juma",
      avatar: "https://ik.imagekit.io/mintlifyui/avatars/avatar1.png?updatedAt=1745649103993",
    },
  ];

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search or jump to...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none  absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <CommandInput
            placeholder="Search or jump to"
            className="h-11 flex-1"
          />
          <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            ⌘K
          </kbd>
        </div>

        <CommandList>
          <div className="px-3 py-2 text-sm text-muted-foreground">
            What are you looking for?
          </div>
          <div className="flex flex-wrap gap-1 px-3 pb-2">
            {filters.map((filter) => (
              <Badge
                key={filter}
                variant="outline"
                className="flex items-center gap-1 rounded-md px-2 py-1"
              >
                {filter}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
          </div>
          <CommandSeparator />
          <CommandGroup
            heading={
              <div className="flex items-center justify-between">
                <span>History</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  See All
                </Button>
              </div>
            }
          >
            {historyItems.map((item) => (
              <CommandItem
                key={item.username}
                className="flex items-center gap-2 px-4 py-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={item.avatar || "/placeholder.svg"}
                    alt={item.name}
                  />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <span>{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  {item.username}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup
            heading={
              <div className="flex items-center justify-between">
                <span>Results (4)</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  See All
                </Button>
              </div>
            }
          >
            {resultItems.map((item) => (
              <CommandItem
                key={item.username}
                className="flex items-center gap-2 px-4 py-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={item.avatar || "/placeholder.svg"}
                    alt={item.name}
                  />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <span>{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  {item.username}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <div className="flex items-center justify-between border-t p-2 px-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3" />
              <ArrowDown className="h-3 w-3" />
              <span>Navigate</span>
              <Check className="h-3 w-3 ml-2" />
              <span>Select</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Not what you&apos;re looking for? Try the{" "}
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-500 ">
                Help Center
              </Button>
            </div>
          </div>
        </CommandList>
      </CommandDialog>
    </>
  );
}

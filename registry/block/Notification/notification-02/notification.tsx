import { Bell, Check, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Notification02() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-200 dark:bg-zinc-900">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
          >
            <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 dark:text-zinc-400" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-blue-500" />
            <span className="sr-only">Notifications</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent 
          className="w-[calc(100vw-2rem)] max-w-sm p-0 sm:max-w-md md:w-96" 
          align="end"
          sideOffset={5}
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4 pb-2">
              <CardTitle className="text-base sm:text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-1 sm:gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                  <Check size={16} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="max-h-[50vh] sm:max-h-96 overflow-y-auto">
                <div className="border-b border-zinc-200 p-3 sm:p-4 dark:border-zinc-700">
                  <div className="flex items-start gap-1">
                    <div className="mr-2 sm:mr-3 mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Marketing
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                          2 minutes ago
                        </span>
                      </div>
                      <h3 className="mt-1 text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200">
                        There's a drop in campaign performance
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        Critical drop in conversion rates affecting Q4 targets
                        requires immediate review and optimization of current
                        marketing strategies.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  No more notifications
                </div>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
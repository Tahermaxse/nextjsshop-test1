"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog copy";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AlertCircle } from "lucide-react";
import { DownloadIcon } from "@radix-ui/react-icons";

export function EULAModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <AlertCircle className="h-5 w-5" />
          </Button>
        </DialogTrigger>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>          
        <Button variant="fancy" className="rounded-full" size="icon">
          <a href="/LICENSE.md" download>
          <DownloadIcon className="h-4 w-4" />
          </a>
        </Button>
        </TooltipTrigger>
          <TooltipContent side="top" >
            <p>End User License Agreement</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      </div>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto scroll-smooth px-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            End User License Agreement (EULA)
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6 px-1 sm:px-2">
          {[
            {
              title: "1. License Grant",
              content:
                "Upon purchase, you are granted a non-exclusive, non-transferable license to use the purchased templates and components in a single project. This license does not allow you to resell, redistribute, or sublicense the templates or components.",
            },
            {
              title: "2. Usage Rights",
              content:
                "You may use the purchased items for personal or commercial projects. You may modify the templates and components to suit your needs, but you may not claim ownership of the original design or code.",
            },
            {
              title: "3. Restrictions",
              content: (
                <>
                  <p className="text-gray-600 dark:text-gray-300">
                    You may not:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1 mt-2">
                    <li>Resell or redistribute the templates or components</li>
                    <li>
                      Use the items in multiple projects without purchasing
                      additional licenses
                    </li>
                    <li>Remove or alter any copyright notices or branding</li>
                    <li>Use the items for any illegal purposes</li>
                  </ul>
                </>
              ),
            },
            {
              title: "4. Support and Updates",
              content:
                "Your purchase includes access to future updates and bug fixes for the purchased items. Technical support is provided through our support channels.",
            },
            {
              title: "5. Refund Policy",
              content:
                "Due to the digital nature of our products, we do not offer refunds once the purchase is completed. Please ensure you have reviewed the product details before making a purchase.",
            },
            {
              title: "6. Asset Notice",
              content:
                "All templates and components are provided with original code authored by us. However, some icons, fonts, or images used in the demos may be sourced from third-party providers and are included for preview purposes only. You are responsible for ensuring proper licensing of any such assets before using them in your own or client projects. These third-party assets are not covered by this license and remain the property of their respective owners.",
            },
          ].map((section, i) => (
            <section
              key={i}
              className="border-l-4 border-primary pl-4 py-2 hover:bg-muted/40 transition rounded-md"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {section.title}
              </h3>
              <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

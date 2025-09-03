"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Eye, Code, Copy, ExpandIcon } from "lucide-react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";

interface CodeFile {
  name: string;
  content: string;
}

export default function PreviewTabs({
  component,
  code,
  files,
  heading,
  v0,
}: {
  component: any;
  code?: string;
  files?: CodeFile[];
  heading: string;
  v0:string;
}) {
  const [activeTab, setActiveTab] = useState("preview");
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);

  const handleCopy = async () => {
    try {
      const contentToCopy = files ? files[activeFile].content : code || "";
      await navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!");
    }
  };

  return (
    <div className="mt-5 ">
      <div className="flex items-center justify-between gap-3 pb-4">
        <h2 className="text-lg font-bold">{heading}</h2>
      </div>
      <div className="flex items-center justify-between gap-3 pb-4">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex gap-4 px-1"
        >
          <Button
            onClick={() => setActiveTab("preview")}
            className={`group relative inline-flex items-center justify-center transition-all duration-300 ease-out outline-none focus:outline-none disabled:pointer-events-none px-4 py-2 text-base font-medium
              ${
                activeTab === "preview"
                  ? "text-gray-900 dark:text-white after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 dark:after:bg-white after:transition-all after:duration-300"
                  : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
              }
              bg-transparent border-none shadow-none hover:bg-transparent`}
          >
            <Eye className="w-5 h-5 mr-2" /> Preview
          </Button>

          <Button
            onClick={() => setActiveTab("code")}
            className={`group relative inline-flex items-center justify-center transition-all duration-300 ease-out outline-none focus:outline-none disabled:pointer-events-none px-4 py-2 text-base font-medium
              ${
                activeTab === "code"
                  ? "text-gray-900 dark:text-white after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 dark:after:bg-white after:transition-all after:duration-300"
                  : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
              }
              bg-transparent border-none shadow-none hover:bg-transparent`}
          >
            <Code className="w-5 h-5 mr-2" /> Code
          </Button>
        </div>
        {activeTab === "code" && (
          <div className="flex gap-2">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={v0} className="rounded-full px-4 ">
                    <Image
                      src="/svgs/v0.svg"
                      alt="v0"
                      width={25}
                      height={25}
                      className="w-4 h-4 mr-2 dark:invert sm:w-10 sm:h-10"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Open in v0</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="default"
              className={`transition-all duration-300 rounded-full px-4 py-2 ${
                copied
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700"
              }`}
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4 mr-2" /> {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        )}
      </div>

      {activeTab === "preview" && (
        <Card className="relative rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 themes-wrapper py-4 min-h-screen px-4 flex items-center justify-center transition-colors duration-300">
          {component}
        </Card>
      )}

      {activeTab === "code" && (
        <Card className="rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 relative overflow-hidden group transition-colors duration-300">
          {files && files.length > 1 && (
            <div className="flex gap-4 mb-4 overflow-x-auto scrollbar-none pb-2 border-b border-gray-200 dark:border-zinc-800">
              {files.map((file, index) => (
                <Button
                  key={index}
                  onClick={() => setActiveFile(index)}
                  className={`relative px-4 py-2 text-base font-medium transition-all duration-300 whitespace-nowrap
                    ${
                      activeFile === index
                        ? "text-gray-900 dark:text-white after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 dark:after:bg-white after:transition-all after:duration-300"
                        : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
                    }
                    bg-transparent border-none shadow-none hover:bg-transparent focus:outline-none`}
                >
                  {file.name}
                </Button>
              ))}
            </div>
          )}
          <div className="relative">
            <SyntaxHighlighter
              language="tsx"
              style={dracula}
              showLineNumbers
              customStyle={{
                borderRadius: "12px",
                padding: "1.25rem",
                fontSize: "14px",
                maxHeight: showFullCode ? "none" : "400px",
                position: "relative",
                zIndex: 1,
                backgroundColor: "#282A36",
              }}
            >
              {files ? files[activeFile].content : code || ""}
            </SyntaxHighlighter>

            {!showFullCode && (
              <div
                className="absolute inset-0 top-auto h-32 
                bg-gradient-to-t 
                from-gray-50 dark:from-zinc-900
                via-gray-50/80 dark:via-zinc-900/80 
                to-transparent 
                z-10 
                pointer-events-none 
                opacity-100 
                transition-all
                duration-300 
                group-hover:opacity-90"
              ></div>
            )}
          </div>

          {!showFullCode && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 z-20 ">
              <Button
                variant="default"
                onClick={() => setShowFullCode(true)}
                className="flex items-center gap-2 
                  hover:shadow-lg 
                  transition-all 
                  duration-300 
                  opacity-80 
                  shadow-subheading
                  bg-green-500
                  hover:bg-green-600
                  group-hover:opacity-100"
              >
                <ExpandIcon className="w-4 h-4" /> See Full Snippet
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

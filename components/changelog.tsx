"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { RssIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChangelogEntryProps {
  date: string
  title: string
  description?: string
  children?: React.ReactNode
  image?: string
  links?: {
    text: string
    url: string
  }[]
}

interface ChangelogProps {
  title?: string
  subtitle?: string
  entries: ChangelogEntryProps[]
}

export function ChangelogEntry({ date, title, description, children, image, links = [] }: ChangelogEntryProps) {
  return (
    <div className="py-8 border-t border-border">
      <div className="text-sm text-muted-foreground mb-2">{date}</div>
      <h2 className="text-2xl font-medium mb-4">{title}</h2>

      {image && (
        <div className="relative w-full mb-6 rounded-lg overflow-hidden bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="p-6">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={800}
              height={400}
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}

      {description && <p className="text-muted-foreground mb-4">{description}</p>}

      {children}

      <div className="mt-4">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link href={link.url} className="text-primary hover:underline font-medium">
              {link.text}
            </Link>
            {index < links.length - 1 && <span className="mx-1 text-muted-foreground">and</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function Changelog({ title = "Changelog", subtitle, entries }: ChangelogProps) {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="py-12 relative">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-muted-foreground mb-6">{subtitle}</p>}

        <div className="flex space-x-2 mb-8">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            Follow
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RssIcon className="h-4 w-4" />
            RSS
          </Button>
        </div>

        {entries.map((entry, index) => (
          <ChangelogEntry key={index} {...entry} />
        ))}
      </div>
    </div>
  )
}

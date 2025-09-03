"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface MadeWithNextJsProps { 
  href?: string
  label?: string
  className?: string
}

export function MadeWithMintlify({
  href = "https://yourwebsite.com/templates",
  label = "Made with Next.js",
  className = "",
}: MadeWithNextJsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-black to-black/90 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:border-white/20 hover:shadow-xl dark:from-zinc-800 dark:to-zinc-900 dark:hover:from-zinc-700 dark:hover:to-zinc-800 ${className}`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
          <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-50"></div>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_107%,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_80%)]"></div>
        <div className="relative flex h-5 w-5 items-center justify-center rounded-full text-black">
          <Image src="https://mintlifyuii.vercel.app/images/logo.svg" alt="Mintlify Logo" width={24} height={24} />
        </div>

        <span className="relative">{label}</span>

        <ArrowUpRight className="relative size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  )
}

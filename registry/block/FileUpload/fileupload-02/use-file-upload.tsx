"use client"

import { useState, useCallback } from "react"

export type FileType = "image" | "pdf" | "doc" | "url" | "audio" | "video" | "code" | "other"

export interface FileItem {
  id: string
  file: File | null
  name: string
  size: number
  type: FileType
  url: string
  preview?: string
}

export function useFileUpload(maxSizeInMB = 500) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const getFileType = (file: File): FileType => {
    const extension = file.name.split(".").pop()?.toLowerCase() || ""

    if (file.type.startsWith("image/")) return "image"
    if (file.type === "application/pdf") return "pdf"
    if (file.type.includes("word") || extension === "doc" || extension === "docx") return "doc"
    if (file.type.startsWith("audio/")) return "audio"
    if (file.type.startsWith("video/")) return "video"
    if (["ts", "tsx", "js", "jsx", "css", "html"].includes(extension)) return "code"

    return "other"
  }

  const addFiles = useCallback(
    (newFiles: File[]) => {
      setError(null)

      // Check file size
      const oversizedFiles = newFiles.filter((file) => file.size > maxSizeInMB * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        setError(`Some files exceed the maximum size of ${maxSizeInMB}MB`)
        return
      }

      const fileItems: FileItem[] = newFiles.map((file) => {
        const type = getFileType(file)
        const id = Math.random().toString(36).substring(2, 9)

        let preview = ""
        let url = ""

        // Create object URLs only for supported file types
        if (type === "image") {
          preview = URL.createObjectURL(file)
          url = preview
        } else if (type === "audio" || type === "video") {
          url = URL.createObjectURL(file)
        }

        return {
          id,
          file,
          name: file.name,
          size: file.size,
          type,
          url,
          preview,
        }
      })

      setFiles((prev) => [...prev, ...fileItems])
    },
    [maxSizeInMB],
  )

  const addUrl = useCallback((url: string) => {
    if (!url) return

    setError(null)
    const id = Math.random().toString(36).substring(2, 9)
    setFiles((prev) => [
      ...prev,
      {
        id,
        file: null,
        name: url,
        size: 0,
        type: "url",
        url,
      },
    ])
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === id)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      if (fileToRemove?.url && (fileToRemove.type === "audio" || fileToRemove.type === "video")) {
        URL.revokeObjectURL(fileToRemove.url)
      }
      return prev.filter((file) => file.id !== id)
    })
  }, [])

  const clearFiles = useCallback(() => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
      if (file.url && (file.type === "audio" || file.type === "video")) {
        URL.revokeObjectURL(file.url)
      }
    })
    setFiles([])
  }, [files])

  return {
    files,
    error,
    addFiles,
    addUrl,
    removeFile,
    clearFiles,
  }
}

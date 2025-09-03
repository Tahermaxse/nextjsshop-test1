"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import {
  File,
  X,
  Upload,
  ExternalLink,
  Play,
  Pause,
  Plus,
  FileText,
  LinkIcon,
  ImageIcon,
  FileAudio,
  FileVideo,
  FileCode,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useFileUpload, type FileType } from "./use-file-upload"

interface UserTag {
  id: string
  name: string
}

export function FileUpload02() {
  const { files, error, addFiles, addUrl, removeFile, clearFiles } = useFileUpload(500) // 500MB max

  const [isDragging, setIsDragging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [urlInput, setUrlInput] = useState("")
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [userTags, setUserTags] = useState<UserTag[]>([
    { id: "1", name: "xchyler" },
    { id: "2", name: "smintifly" },
    { id: "3", name: "elonmusk" },
    { id: "4", name: "fervor" },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addFiles(Array.from(e.dataTransfer.files))
      }
    },
    [addFiles],
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(Array.from(e.target.files))
      }
    },
    [addFiles],
  )

  const handlePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // The play() method returns a Promise
        const playPromise = audioRef.current.play()

        // If the Promise exists, handle it properly
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              // Auto-play was prevented or other playback error
              console.error("Playback error:", error)
              setIsPlaying(false)
            })
        }
      }
    }
  }, [isPlaying])

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }, [])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const handleRemoveTag = useCallback((id: string) => {
    setUserTags((prev) => prev.filter((tag) => tag.id !== id))
  }, [])

  const handleAddUrl = useCallback(() => {
    if (urlInput.trim()) {
      addUrl(urlInput.trim())
      setUrlInput("")
      setShowUrlInput(false)
    }
  }, [urlInput, addUrl])

  const handleUrlInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleAddUrl()
      }
    },
    [handleAddUrl],
  )

  const renderFileIcon = (type: FileType) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "doc":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "url":
        return <LinkIcon className="w-5 h-5 text-green-500" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-purple-500" />
      case "audio":
        return <FileAudio className="w-5 h-5 text-amber-500" />
      case "video":
        return <FileVideo className="w-5 h-5 text-pink-500" />
      case "code":
        return <FileCode className="w-5 h-5 text-cyan-500" />
      default:
        return <File className="w-5 h-5 text-gray-500 dark:text-zinc-400" />
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
          "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600",
          isDragging && "border-zinc-500 dark:border-zinc-400 bg-zinc-50 dark:bg-zinc-800/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <Upload className="h-6 w-6 mb-2 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Drop and drop or browse files</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Maximum 500 MB file size</p>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileInputChange} multiple />
      </div>

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Attachments:</h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id}>
                {file.type === "pdf" && (
                  <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatFileSize(file.size)}</span>
                      <button
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                        onClick={() => {
                          /* Download functionality */
                        }}
                      >
                        <Upload className="w-4 h-4 text-zinc-500 dark:text-zinc-400 transform rotate-180" />
                      </button>
                      <button
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      </button>
                    </div>
                  </div>
                )}

                {file.type === "url" && (
                  <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">Web</span>
                      <button
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                        onClick={() => window.open(file.url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      </button>
                      <button
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      </button>
                    </div>
                  </div>
                )}

                {file.type === "image" && (
                  <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatFileSize(file.size)}</span>
                      <button
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                        onClick={() => {
                          /* Download functionality */
                        }}
                      >
                        <Upload className="w-4 h-4 text-zinc-500 dark:text-zinc-400 transform rotate-180" />
                      </button>
                      <button
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      </button>
                    </div>
                  </div>
                )}

                {file.type === "audio" && (
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatTime(currentTime)}</span>
                        <div className="relative w-48 sm:w-64 md:w-80 h-6 flex items-center">
                          {/* Audio waveform visualization */}
                          <div className="absolute inset-0 flex items-center justify-between">
                            {Array.from({ length: 40 }).map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "w-1 rounded-full",
                                  i % 3 === 0 ? "h-4" : i % 2 === 0 ? "h-3" : "h-2",
                                  i / 40 < currentTime / duration
                                    ? "bg-zinc-700 dark:bg-zinc-300"
                                    : "bg-zinc-300 dark:bg-zinc-600",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatTime(duration)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full"
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                          ) : (
                            <Play className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                          )}
                        </button>
                        <button
                          className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                        </button>
                      </div>
                    </div>
                    {/* Only render audio element if file.url is not empty */}
                    {file.url && (
                      <audio
                        ref={audioRef}
                        src={file.url || undefined}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => setIsPlaying(false)}
                        onError={(e) => {
                          console.error("Audio error:", e)
                          setIsPlaying(false)
                        }}
                        className="hidden"
                      />
                    )}
                  </div>
                )}

                {(file.type === "video" || file.type === "code" || file.type === "doc" || file.type === "other") && (
                  <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                      {renderFileIcon(file.type)}
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatFileSize(file.size)}</span>
                      <button
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image thumbnails grid */}
          {files.some((file) => file.type === "image") && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {files
                .filter((file) => file.type === "image")
                .map((file, index) => (
                  <div key={file.id} className="relative group aspect-square">
                    <Image
                      src={file.preview || "/placeholder.svg?height=100&width=100"}
                      alt={file.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
                    <button
                      className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                ))}
              <button
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg flex items-center justify-center aspect-square hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                onClick={handleBrowseClick}
              >
                <Plus className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>
          )}

          {/* User tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {userTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full pl-1 pr-2 py-1"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-300 dark:bg-zinc-600 flex items-center justify-center text-xs">
                  @
                </div>
                <span className="text-xs">{tag.name}</span>
                <button className="ml-1" onClick={() => handleRemoveTag(tag.id)}>
                  <X className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* URL input */}
      {showUrlInput && (
        <div className="mt-4 flex items-center gap-2">
          <input
            ref={urlInputRef}
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={handleUrlInputKeyDown}
            placeholder="Enter URL"
            className="flex-1 p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            autoFocus
          />
          <button
            onClick={handleAddUrl}
            className="p-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 text-sm"
          >
            Add
          </button>
          <button
            onClick={() => setShowUrlInput(false)}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md text-zinc-500 dark:text-zinc-400 text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Add URL button */}
      {!showUrlInput && (
        <button
          onClick={() => {
            setShowUrlInput(true)
            setTimeout(() => urlInputRef.current?.focus(), 0)
          }}
          className="mt-4 flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          <LinkIcon className="w-4 h-4" />
          Add URL
        </button>
      )}
    </div>
  )
}

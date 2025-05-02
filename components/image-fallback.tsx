"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { ImageOff } from "lucide-react"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function ImageWithFallback({ src, alt, fallbackSrc = "/placeholder.svg", ...rest }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative">
      <Image
        {...rest}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        onError={() => {
          setImgSrc(fallbackSrc)
          setHasError(true)
        }}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="flex flex-col items-center">
            <ImageOff className="w-8 h-8 text-gray-400" />
            <span className="text-xs text-gray-500 mt-2">Image not available</span>
          </div>
        </div>
      )}
    </div>
  )
}

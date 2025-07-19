"use client"

import { useState, useEffect } from "react"

declare global {
  interface Window {
    Mindbody: {
      isLoaded: boolean
      onLoad: () => void
    }
  }
}

export function useMindbodyScript() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  useEffect(() => {
    if (window.Mindbody?.isLoaded) {
      setIsScriptLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js"
    script.async = true
    script.onload = () => {
      window.Mindbody.onLoad()
      setIsScriptLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return isScriptLoaded
} 
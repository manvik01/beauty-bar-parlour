"use client"

import Script from "next/script"
import { useScriptLoader } from "@/contexts/script-loader-context"

export const MindbodyScriptLoader = () => {
  const { setScriptLoaded } = useScriptLoader()

  return (
    <Script
      src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
      strategy="afterInteractive"
      onLoad={() => {
        setScriptLoaded(true)
      }}
    />
  )
} 
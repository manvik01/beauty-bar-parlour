"use client"

import React, { useEffect, useRef } from "react"
import Script from "next/script"
import { useRouter } from "next/navigation"

// Declare the types that HealCode adds at runtime so TypeScript doesn't complain
declare global {
  interface Window {
    healcode?: () => void
  }
}

interface ProspectsWidgetProps {
  widgetId?: string
}

export function ProspectsWidget({ widgetId = "0e58934e78e" }: ProspectsWidgetProps) {
  const router = useRouter()
  const widgetRef = useRef<HTMLDivElement | null>(null)
  /* HealCode registers a function named healcode() on window when the
     script finishes loading.  Calling it re-initialises all widgets that
     are already in the DOM – exactly what we need after a client-side
     route change. */
  const handleHealcodeReady = () => {
    if (typeof window !== "undefined" && typeof window.healcode === "function") {
      window.healcode()
    }
  }

  // Re-run HealCode initialiser whenever this component remounts (e.g. after a
  // client-side navigation back to /contact). The Script tag's onReady callback
  // only fires the first time the file is loaded, so we need this as well.
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.healcode === "function") {
      window.healcode()
    }
  }, [])

  useEffect(() => {
    if (!widgetRef.current) return
    const root = widgetRef.current
    let redirected = false

    const isSuccessMessage = () => {
      const text = root.textContent?.toLowerCase() ?? ""
      return text.includes("thank you") && (text.includes("contact") || text.includes("message"))
    }

    const observer = new MutationObserver(() => {
      if (redirected) return
      if (isSuccessMessage()) {
        redirected = true
        router.push("/thank-you-contact")
      }
    })

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [router])

  return (
    <>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive" // load once, after hydration
        onReady={handleHealcodeReady} // re-initialise widgets
      />

      <div ref={widgetRef}>
        {/* this stays exactly as provided by HealCode */}
        {React.createElement("healcode-widget", {
          "data-type": "prospects",
          "data-widget-partner": "object",
          "data-widget-id": widgetId,
          "data-widget-version": "0",
        })}
      </div>
    </>
  )
} 
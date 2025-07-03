"use client"

import { useEffect } from "react"

export function AppointmentsWidget() {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // Inject the Mindbody script once if it doesn't exist
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://brandedweb.mindbodyonline.com/embed/widget.js"]'
    )

    if (!existingScript) {
      const script = document.createElement("script")
      script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id="0e33258e78e"
      // The widget library will hydrate this div
    ></div>
  )
} 
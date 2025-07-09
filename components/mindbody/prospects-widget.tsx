"use client"

import { useEffect } from "react"

interface ProspectsWidgetProps {
  widgetId?: string
}

export function ProspectsWidget({ widgetId = "0e58934e78e" }: ProspectsWidgetProps) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://widgets.mindbodyonline.com/javascripts/healcode.js"]'
    )
    if (!existing) {
      const script = document.createElement("script")
      script.src = "https://widgets.mindbodyonline.com/javascripts/healcode.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    (<healcode-widget
      data-type="prospects"
      data-widget-partner="object"
      data-widget-id={widgetId}
      data-widget-version="0"
    ></healcode-widget>) as unknown as JSX.Element
  )
} 
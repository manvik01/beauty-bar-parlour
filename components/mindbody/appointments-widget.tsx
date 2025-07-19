"use client"

import { useEffect } from "react"

interface AppointmentsWidgetProps {
  widgetId: string
}

export function AppointmentsWidget({ widgetId }: AppointmentsWidgetProps) {
  useEffect(() => {
    // Check if the script is already on the page
    if (!document.querySelector('script[src="https://brandedweb.mindbodyonline.com/embed/widget.js"]')) {
      const script = document.createElement("script")
      script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div
      key={widgetId}
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id={widgetId}
    ></div>
  )
} 
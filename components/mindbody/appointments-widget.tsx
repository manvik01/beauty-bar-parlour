"use client"

import { useEffect } from "react"

interface AppointmentsWidgetProps {
  widgetId: string
}

export function AppointmentsWidget({ widgetId }: AppointmentsWidgetProps) {
  useEffect(() => {
    // Dynamically inject the Mindbody script every time the widgetId changes
    const script = document.createElement("script")
    script.src = `https://brandedweb.mindbodyonline.com/embed/widget.js?v=${Date.now()}`
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup: remove the script tag when the component unmounts or widgetId changes
      document.body.removeChild(script)
    }
  }, [widgetId])

  return (
    <div
      key={widgetId}
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id={widgetId}
    ></div>
  )
} 
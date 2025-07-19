"use client"

import { useEffect } from "react"

interface AppointmentsWidgetProps {
  widgetId: string
}

export function AppointmentsWidget({ widgetId }: AppointmentsWidgetProps) {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id={widgetId}
    ></div>
  )
} 
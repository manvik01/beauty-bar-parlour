"use client"

import { useEffect } from "react"

interface ScheduleWidgetProps {
  widgetId: string
}

export function ScheduleWidget({ widgetId }: ScheduleWidgetProps) {
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
      data-widget-type="Schedules"
      data-widget-id={widgetId}
    ></div>
  )
} 
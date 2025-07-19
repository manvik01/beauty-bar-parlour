"use client"

import { useEffect } from "react"
import { useMindbodyScript } from "@/hooks/use-mindbody-script"

interface AppointmentsWidgetProps {
  widgetId: string
}

export function AppointmentsWidget({ widgetId }: AppointmentsWidgetProps) {
  const isScriptLoaded = useMindbodyScript()

  useEffect(() => {
    if (isScriptLoaded) {
      window.Mindbody.onLoad()
    }
  }, [isScriptLoaded, widgetId])

  return (
    <div
      key={widgetId}
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id={widgetId}
    ></div>
  )
} 
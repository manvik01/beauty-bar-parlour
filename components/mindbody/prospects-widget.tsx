"use client"

import React, { useEffect } from 'react'
import { useScriptLoader } from "@/contexts/script-loader-context"
import { LoadingSpinner } from "@/components/loading-spinner"

// Declare the types that HealCode adds at runtime so TypeScript doesn't complain
declare global {
  interface Window {
    healcode?: () => void
  }
}

interface ProspectsWidgetProps {
  widgetId?: string
}

export function ProspectsWidget({ widgetId = '0e58934e78e' }: ProspectsWidgetProps) {
  const { isScriptLoaded } = useScriptLoader()

  // Re-run HealCode initialiser whenever this component remounts (e.g. after a
  // client-side navigation back to /contact). The Script tag's onReady callback
  // only fires the first time the file is loaded, so we need this as well.
  useEffect(() => {
    if (isScriptLoaded && typeof window !== 'undefined' && typeof window.healcode === 'function') {
      window.healcode()
    }
  }, [isScriptLoaded])

  if (!isScriptLoaded) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <healcode-widget
      data-type="prospects"
      data-widget-partner="object"
      data-widget-id={widgetId}
      data-widget-version="0"
    />
  )
} 
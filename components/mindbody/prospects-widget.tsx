"use client"

import React, { useEffect } from 'react'
import Script from 'next/script'

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
  /* HealCode registers a function named healcode() on window when the
     script finishes loading.  Calling it re-initialises all widgets that
     are already in the DOM – exactly what we need after a client-side
     route change. */
  const handleHealcodeReady = () => {
    if (typeof window !== 'undefined' && typeof window.healcode === 'function') {
      window.healcode()
    }
  }

  // Re-run HealCode initialiser whenever this component remounts (e.g. after a
  // client-side navigation back to /contact). The Script tag's onReady callback
  // only fires the first time the file is loaded, so we need this as well.
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.healcode === 'function') {
      window.healcode()
    }
  }, [])

  return (
    <>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"        // load once, after hydration
        onReady={handleHealcodeReady}      // re-initialise widgets
      />

      {/* this stays exactly as provided by HealCode */}
      {React.createElement('healcode-widget', {
        'data-type': 'prospects',
        'data-widget-partner': 'object',
        'data-widget-id': widgetId,
        'data-widget-version': '0',
      })}
    </>
  )
} 
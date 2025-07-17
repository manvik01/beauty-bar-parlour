"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export function RegistrationWidget() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
      />
      {isClient && (
        <healcode-widget
          data-type="registrations"
          data-widget-partner="object"
          data-widget-id="0e163173e78e"
          data-widget-version="0"
        ></healcode-widget>
      )}
    </>
  )
} 
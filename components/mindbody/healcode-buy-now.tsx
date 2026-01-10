"use client"

import { useEffect, useState } from "react"

export function HealcodeBuyNow() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const scriptId = "mindbody-healcode-script"
      if (document.getElementById(scriptId)) return
      const script = document.createElement("script")
      script.id = scriptId
      script.src = "https://widgets.mindbodyonline.com/javascripts/healcode.js"
      script.async = true
      script.type = "text/javascript"
      document.body.appendChild(script)
    } catch {
      // no-op: avoid crashing client if DOM is unavailable
    }
  }, [])

  if (!mounted) {
    return null
  }

  // The widget will replace this custom element with a styled anchor.
  return (
    <healcode-widget
      data-version="0.2"
      data-link-class="healcode-pricing-option-text-link"
      data-site-id="127612"
      data-mb-site-id="5746301"
      data-service-id="100051"
      data-bw-identity-site="true"
      data-type="pricing-link"
      data-inner-html="Buy Now"
    />
  )
}


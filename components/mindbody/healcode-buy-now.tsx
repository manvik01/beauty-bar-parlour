"use client"

import { useEffect } from "react"

export function HealcodeBuyNow() {
  useEffect(() => {
    const scriptId = "mindbody-healcode-script"
    if (document.getElementById(scriptId)) return
    const script = document.createElement("script")
    script.id = scriptId
    script.src = "https://widgets.mindbodyonline.com/javascripts/healcode.js"
    script.async = true
    script.type = "text/javascript"
    document.body.appendChild(script)
  }, [])

  return (
    // The widget will replace this custom element with a styled anchor.
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


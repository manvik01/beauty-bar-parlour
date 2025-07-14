"use client"

import { useEffect } from "react"

const RegistrationWidget = () => {
  useEffect(() => {
    // Check if the script is already on the page
    if (
      !document.querySelector(
        'script[src="https://widgets.mindbodyonline.com/javascripts/healcode.js"]'
      )
    ) {
      const script = document.createElement("script")
      script.src = "https://widgets.mindbodyonline.com/javascripts/healcode.js"
      script.type = "text/javascript"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <healcode-widget
      data-type="registrations"
      data-widget-partner="object"
      data-widget-id="0e163173e78e"
      data-widget-version="0"
    ></healcode-widget>
  )
}

export default RegistrationWidget 
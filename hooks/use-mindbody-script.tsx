"use client"

import { useEffect } from "react"

export function useMindbodyScript() {
  useEffect(() => {
    if (document.getElementById("mindbody-widget-script")) return
    const script = document.createElement("script")
    script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js"
    script.async = true
    script.id = "mindbody-widget-script"
    document.body.appendChild(script)
    // Never remove the script
  }, [])
} 
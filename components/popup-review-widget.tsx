"use client"

import React, { useEffect } from "react"

export default function PopupReviewWidget() {
  useEffect(() => {
    const scriptId = "popup-rating-widget-script"
    if (document.getElementById(scriptId)) {
      return // Script already exists, do nothing
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.src = "https://widget.reviewability.com/js/popupWidget.min.js"
    script.async = true
    script.setAttribute(
      "data-gfspw",
      "https://app.revu.cloud/popup-pixel/get/b1c74ab87bcbd6830d10d1e2497d33e483d1ddef"
    )
    document.body.appendChild(script)

    return () => {
      // Cleanup: remove the script when the component unmounts
      const existingScript = document.getElementById(scriptId)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, []) // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return <div id="popup-rating-widget" className="fixed bottom-4 right-4 z-50" />
}

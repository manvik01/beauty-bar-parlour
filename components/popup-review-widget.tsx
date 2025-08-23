"use client"

import React from "react"

export default function PopupReviewWidget() {
  const embedCode = `
    <div id="popup-rating-widget"></div><script id="popup-rating-widget-script" src="https://widget.reviewability.com/js/popupWidget.min.js" data-gfspw="https://app.revu.cloud/popup-pixel/get/b1c74ab87bcbd6830d10d1e2497d33e483d1ddef" async></script>
  `

  return (
    <div
      dangerouslySetInnerHTML={{ __html: embedCode }}
      className="fixed bottom-4 right-4 z-50"
    />
  )
}

"use client"

import React from "react"
import dynamic from "next/dynamic"

const DynamicPopupReviewWidget = dynamic(
  () => import("./popup-review-widget"),
  { ssr: false }
)

export default function PopupReviewWidgetWrapper() {
  return <DynamicPopupReviewWidget />
}

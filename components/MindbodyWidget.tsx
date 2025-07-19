"use client";

import { useEffect, useRef } from "react";

interface MindbodyWidgetProps {
  widgetId: string;
  minHeight?: number;
}

export default function MindbodyWidget({ widgetId, minHeight = 650 }: MindbodyWidgetProps) {
  return (
    <div
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id={widgetId}
      style={{
        width: "100%",
        minHeight: minHeight,
        boxSizing: "border-box",
        marginBottom: "32px",
      }}
    />
  );
} 
"use client";

import { useEffect, useRef } from "react";

interface MindbodyWidgetProps {
  widgetId: string;
  minHeight?: number;
}

export default function MindbodyWidget({ widgetId, minHeight = 650 }: MindbodyWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-initialize the Mindbody widget when component mounts
    if (window.MB && typeof window.MB.reloadWidgets === "function") {
      window.MB.reloadWidgets();
    }
  }, []);

  return (
    <div
      ref={ref}
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
"use client";

import { useEffect } from "react";

interface MindbodyWidgetProps {
  widgetId: string;
  minHeight?: number;
}

export default function MindbodyWidget({ widgetId, minHeight = 650 }: MindbodyWidgetProps) {
  useEffect(() => {
    // Re-initialize the Mindbody widget when component mounts
    const initializeWidget = () => {
      if (window.MB && typeof window.MB.reloadWidgets === "function") {
        window.MB.reloadWidgets();
      }
    };

    // The Mindbody script might take a moment to load
    const timeout = setTimeout(initializeWidget, 100);

    return () => clearTimeout(timeout);
  }, [widgetId]);

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
"use client";

import { useEffect, useRef } from "react";

interface MindbodyWidgetProps {
  widgetId: string;
  minHeight?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export default function MindbodyWidget({ widgetId, minHeight = 650, onLoad, onError }: MindbodyWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (window.MB && typeof window.MB.reloadWidgets === "function") {
        window.MB.reloadWidgets();
        if (onLoad) onLoad();
      } else {
        // If MB is not available, try again after a short delay
        const timeout = setTimeout(() => {
          if (window.MB && typeof window.MB.reloadWidgets === "function") {
            window.MB.reloadWidgets();
            if (onLoad) onLoad();
          } else {
            if (onError) onError();
          }
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } catch (e) {
      if (onError) onError();
    }
  }, [widgetId, onLoad, onError]);

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
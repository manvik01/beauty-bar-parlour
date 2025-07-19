'use client';
import { useEffect } from 'react';

export default function MindbodyWidget({ widgetId, minHeight = 650 }: { widgetId: string, minHeight?: number }) {
  useEffect(() => {
    const timer = setTimeout(() => {
        if (window.MB?.reloadWidgets) {
            window.MB.reloadWidgets();
        }
    }, 100); // A small delay can help ensure the script is ready

    return () => clearTimeout(timer);
  }, [widgetId]); // Re-run effect if widgetId changes

  return (
    <div
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id={widgetId}
      style={{
        width: '100%',
        minHeight,
        boxSizing: 'border-box',
        marginBottom: '32px'
      }}
    />
  );
} 
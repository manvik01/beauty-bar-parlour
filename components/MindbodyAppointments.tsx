'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MindbodyAppointments({ widgetId = "0e33258e78e" }: { widgetId?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    (window as any)?.HC?.init?.();
  }, [pathname]);

  return (
    <div
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id={widgetId}
      style={{ width: '100%' }}
    />
  );
} 
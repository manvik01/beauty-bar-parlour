'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    HC?: any;
    MB?: any;
  }
}

export default function MindbodyAppointments({ widgetId = "0e33258e78e" }: { widgetId?: string }) {
  const pathname = usePathname();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up previous widget markup
    if (widgetRef.current) {
      widgetRef.current.innerHTML = '';
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'mindbody-widget';
      widgetDiv.setAttribute('data-widget-type', 'Appointments');
      widgetDiv.setAttribute('data-widget-id', widgetId!);
      widgetRef.current.appendChild(widgetDiv);
    }
    // Try both HC.init() and MB.embed() for maximum compatibility
    setTimeout(() => {
      console.log('Mindbody: calling HC.init and MB.embed', window.HC, window.MB);
      window.HC?.init?.();
      window.MB?.embed?.();
    }, 100);
  }, [pathname, widgetId]);

  return (
    <div ref={widgetRef} style={{ width: '100%' }} />
  );
} 
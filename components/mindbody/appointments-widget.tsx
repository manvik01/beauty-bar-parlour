"use client"

import { useState, useEffect, useRef } from "react"

// Declare window types for TypeScript
declare global {
  interface Window {
    HC?: any
    MB?: any
  }
}

interface AppointmentsWidgetProps {
  widgetId: string;
  isAftTreatment?: boolean;
}

export function AppointmentsWidget({ widgetId, isAftTreatment = false }: AppointmentsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const deployWidget = () => {
      if (!containerRef.current) return;

      try {
        setIsLoading(true);
        setHasError(false);
        console.log(`Deploying widget ${isAftTreatment ? 'AFT (special)' : 'standard'}`);
        
        containerRef.current.innerHTML = '';

        if (isAftTreatment) {
          const widgetHTML = `
            <!-- Mindbody Appointments widget begin -->
            <div class="mindbody-widget" data-widget-type="Appointments" data-widget-id="${widgetId}"></div>
            <script async src="https://brandedweb.mindbodyonline.com/embed/widget.js"></script>
            <!-- Mindbody Appointments widget end -->
          `;
          containerRef.current.innerHTML = widgetHTML;
        } else {
          const widgetDiv = document.createElement('div');
          widgetDiv.className = 'mindbody-widget';
          widgetDiv.setAttribute('data-widget-type', 'Appointments');
          widgetDiv.setAttribute('data-widget-id', widgetId);
          containerRef.current.appendChild(widgetDiv);

          const existingScript = document.querySelector('script[src*="brandedweb.mindbodyonline.com/embed/widget.js"]');
          if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://brandedweb.mindbodyonline.com/embed/widget.js';
            script.async = true;
            document.head.appendChild(script);
          }
        }

        setTimeout(() => {
          try {
            if (window.HC?.init) window.HC.init();
            if (window.MB?.embed) window.MB.embed();
            setIsLoading(false);
          } catch (e) {
            console.error('Widget initialization error:', e);
            setHasError(true);
            setIsLoading(false);
          }
        }, 1500);
        
      } catch (e) {
        console.error('Widget deployment error:', e);
        setHasError(true);
        setIsLoading(false);
      }
    };

    deployWidget();
  }, [widgetId, isAftTreatment]);

  return (
    <div className="min-h-[600px] w-full">
      {isLoading && (
        <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 font-light">Loading Booking Widget...</p>
            <p className="text-xs text-gray-500 mt-2">ID: {widgetId}</p>
          </div>
        </div>
      )}
      {hasError && (
        <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-lg font-serif font-medium mb-2">Booking Widget Unavailable</h3>
            <p className="text-gray-600 mb-4 font-light">There was an issue loading the booking widget. Please try again or contact us.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-black text-sm uppercase tracking-wider">Reload</button>
              <a href="tel:+6584158896" className="px-4 py-2 bg-gold text-white text-sm uppercase tracking-wider">Call to Book</a>
            </div>
          </div>
        </div>
      )}
      <div ref={containerRef} className={isLoading || hasError ? 'hidden' : 'block'} />
    </div>
  );
} 
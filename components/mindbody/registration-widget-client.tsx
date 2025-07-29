"use client";

import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../loading-spinner'; // Assuming this exists

const MindbodyRegistrationWidgetClient = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadHealCodeScript = () => {
      const existingScript = document.querySelector('script[src*="widgets.mindbodyonline.com/javascripts/healcode.js"]');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
        script.type = 'text/javascript';
        script.async = true;

        script.onload = () => {
          if (mounted) {
            setIsLoading(false); // Set loading to false once script is loaded
          }
        };

        script.onerror = () => {
          if (mounted) {
            setHasError(true);
            setIsLoading(false);
          }
        };

        document.head.appendChild(script);
      } else {
        // Script already loaded, just set loading to false
        setIsLoading(false);
      }
    };

    loadHealCodeScript();

    return () => {
      mounted = false;
    };
  }, []);

  // New useEffect to call healcode() after the widget is rendered
  useEffect(() => {
    if (!isLoading && !hasError && typeof window !== 'undefined' && (window as any).healcode) {
      const timer = setTimeout(() => {
        (window as any).healcode();
      }, 50); // Small delay to ensure DOM is ready

      return () => clearTimeout(timer);
    }
  }, [isLoading, hasError]);

  return (
    <div className="bg-white border border-primary/10 shadow-sm rounded-lg overflow-hidden">
      {isLoading && !hasError && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 font-light">Loading registration form...</p>
            <p className="text-xs text-gray-500 mt-2">Widget ID: 0e163173e78e</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-medium mb-2">Registration Form Unavailable</h3>
            <p className="text-gray-600 mb-4 font-light">
              We're having trouble loading the registration form. Please contact us directly to register.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="tel:+6584158896"
                className="px-4 py-2 bg-primary text-white text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Call to Register
              </a>
              <a
                href="/contact"
                className="px-4 py-2 bg-secondary text-black text-sm uppercase tracking-wider hover:bg-secondary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mindbody Registration Widget */}
      {!isLoading && !hasError && (
        <div className="min-h-[600px]">
          {React.createElement('healcode-widget', {
            'data-type': 'registrations',
            'data-widget-partner': 'object',
            'data-widget-id': '0e163173e78e',
            'data-widget-version': '0',
          })}
        </div>
      )}
    </div>
  );
};

export default MindbodyRegistrationWidgetClient; 
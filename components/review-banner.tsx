'use client';

import React, { useEffect, useRef } from 'react';

export default function ReviewBanner() {
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptContainerRef.current) {
      // Clear any existing content to prevent duplication on re-renders
      scriptContainerRef.current.innerHTML = '';

      const div = document.createElement('div');
      div.setAttribute('data-bid', '157659');
      div.setAttribute('data-url', 'https://app.revu.cloud');
      div.setAttribute('data-aid', '23780');
      scriptContainerRef.current.appendChild(div);

      const script = document.createElement('script');
      script.src = 'https://widget.reviewability.com/js/widgetAdv.min.js';
      script.async = true;
      script.onload = () => {
        // You might want to add a callback here if the widget provides one for initialization
        console.log('Reviewability widget script loaded.');
      };
      script.onerror = (error) => {
        console.error('Failed to load Reviewability widget script:', error);
      };
      scriptContainerRef.current.appendChild(script);

      const jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.className = 'json-ld-content';
      // You can add your JSON-LD content here if needed
      // For example: jsonLdScript.textContent = JSON.stringify({ "@context": "http://schema.org", "@type": "Review", "itemReviewed": { ... } });
      scriptContainerRef.current.appendChild(jsonLdScript);
    }
  }, []);

  return (
    <section className="clean-section bg-secondary py-16">
      <div className="container-custom text-center">
        <h2 className="clean-heading text-black mb-8">What Our Clients Say</h2>
        <div id="review-banner-container" ref={scriptContainerRef} className="min-h-[200px] flex items-center justify-center">
          {/* The widget will be injected here */}
        </div>
      </div>
    </section>
  );
}

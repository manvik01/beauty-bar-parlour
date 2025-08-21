'use client';

import React, { useEffect, useRef } from 'react';

export default function PopupReviewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The full widget HTML snippet
  const widgetHtml = `
    <div id="popup-rating-widget"></div>
    <script 
      id="popup-rating-widget-script" 
      src="https://widget.reviewability.com/js/popupWidget.min.js" 
      data-gfspw="https://app.revu.cloud/popup-pixel/get/b1c74ab87bcbd6830d10d1e2497d33e483d1ddef" 
      async
    ></script>
  `;

  useEffect(() => {
    if (containerRef.current) {
      console.log("PopupReviewWidget: Component mounted, injecting widget HTML.");
      containerRef.current.innerHTML = widgetHtml;

      // Manually re-execute scripts that were inserted via innerHTML
      const scripts = containerRef.current.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const oldScript = scripts[i];
        const newScript = document.createElement('script');
        // Copy attributes
        for (let j = 0; j < oldScript.attributes.length; j++) {
          const attribute = oldScript.attributes[j];
          newScript.setAttribute(attribute.name, attribute.value);
        }
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.removeChild(oldScript);
        document.body.appendChild(newScript); // Append to body where scripts often execute
      }
    }

    return () => {
      console.log("PopupReviewWidget: Component unmounted, cleaning up.");
      // Clean up the script when the component unmounts
      const existingScripts = document.querySelectorAll('script[src*="popupWidget.min.js"]');
      existingScripts.forEach(script => script.remove());
    };
  }, []); // Run only once on mount

  return (
    <div ref={containerRef} style={{ display: 'none' }}>
      {/* Popup widget will be injected here */}
    </div>
  );
}

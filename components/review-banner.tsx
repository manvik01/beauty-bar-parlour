"use client"

import React, { useEffect } from "react"

export default function ReviewBanner() {
  const scriptContent = `
    (function () {
      function loadRevu() {
        if (document.getElementById('revu-script-banner')) return; // guard
        var s = document.createElement('script');
        s.id = 'revu-script-banner';
        s.src = 'https://widget.reviewability.com/js/widgetAdv.min.js';
        s.async = true;
        document.body.appendChild(s);
      }

      // If you gate 3P scripts behind consent, call loadRevu() only after consent is granted.
      var consentGranted = window.__cmpGranted || window.gtagConsent === 'granted' || false;

      function lazyWhenVisible() {
        var el = document.getElementById('revu-banner-widget');
        if (!('IntersectionObserver' in window) || !el) return loadRevu();
        var io = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            loadRevu();
            io.disconnect();
          }
        }, { rootMargin: '200px' });
        io.observe(el);
      }

      if (consentGranted) {
        lazyWhenVisible();
      } else {
        // Example: hook into your consent manager’s event
        window.addEventListener('consent:granted', lazyWhenVisible, { once: true });
      }
    })();
  `

  return (
    <section className="clean-section bg-secondary py-16">
      <div className="container-custom text-center">
        <h2 className="clean-heading text-black mb-8">What Our Clients Say</h2>
        <div
          id="revu-banner-widget"
          data-bid="157659"
          data-url="https://app.revu.cloud"
          data-aid="23780" // Added data-aid based on previous successful implementations
          role="complementary"
          aria-label="Customer reviews"
          className="min-h-[200px] flex items-center justify-center relative"
        >
          <noscript>Please enable JavaScript to view our reviews.</noscript>
          <script
            dangerouslySetInnerHTML={{ __html: scriptContent }}
          />
        </div>
      </div>
    </section>
  )
}

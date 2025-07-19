"use client"

import { useState, useEffect } from "react"
import { AppointmentsWidget } from "@/components/mindbody/appointments-widget"
import { useSearchParams, useRouter } from "next/navigation"

const serviceCategories = [
  {
    id: "hair",
    name: "Herbal Treatment",
    widgetId: "0e33258e78e",
    isSpecial: true, // Mark this as special to handle differently
  },
  {
    id: "nail",
    name: "Nail & Foot Spa",
    widgetId: "0e33444e78e",
    isSpecial: false,
  },
  {
    id: "facial",
    name: "Facial Services",
    widgetId: "0e33532e78e",
    isSpecial: false,
  },
  {
    id: "waxing",
    name: "Waxing Services",
    widgetId: "0e33533e78e",
    isSpecial: false,
  },
  {
    id: "threading",
    name: "Threading Services",
    widgetId: "0e33534e78e",
    isSpecial: false,
  },
  {
    id: "laser",
    name: "AFT Treatment",
    widgetId: "0e33535e78e",
    isSpecial: false,
  },
]

interface ServiceSelectionProps {
  onNext: () => void
}

// Special widget component for Herbal Treatment with enhanced reloading
function HerbalTreatmentWidget({ key: widgetKey }: { key: string }) {
  useEffect(() => {
    // Enhanced Mindbody widget implementation
    const WIDGET_ID = '0e33258e78e';
    const WIDGET_TYPE = 'Appointments';
    const SCRIPT_URL = 'https://brandedweb.mindbodyonline.com/embed/widget.js';

    /* Mount or re‑mount the widget */
    function mountWidget() {
      const host = document.getElementById('mb-widget-wrapper');
      if (!host) return;

      /* 1  Clear any previous mount (important for SPA revisits) */
      host.innerHTML = '';

      /* 2  Insert the widget element expected by Mindbody */
      const widget = document.createElement('div');
      widget.className = 'mindbody-widget';
      widget.dataset.widgetType = WIDGET_TYPE;
      widget.dataset.widgetId = WIDGET_ID;
      host.appendChild(widget);

      /* 3  Load once, then just re‑initialise */
      if (!(window as any).__MB_WIDGET_LOADED__) {
        const s = document.createElement('script');
        s.src = SCRIPT_URL;
        s.async = true;
        s.onload = () => { 
          (window as any).__MB_WIDGET_LOADED__ = true; 
        };
        document.head.appendChild(s);
      } else if ((window as any).MB && typeof (window as any).MB.embed === 'function') {
        (window as any).MB.embed(); // call the Mindbody initialiser again
      }
    }

    // Mount the widget immediately
    mountWidget();

    // Set up event listeners for SPA navigation
    const events = [
      'turbolinks:load',       // Squarespace 7.0, Rails Turbolinks, Stimulus Reflex
      'routeChangeComplete',   // Next.js
      'router:after-navigate', // SvelteKit
      'vue:route-loaded'       // example custom event
    ];

    events.forEach(evt => document.addEventListener(evt, mountWidget));

    // Cleanup function
    return () => {
      events.forEach(evt => document.removeEventListener(evt, mountWidget));
      
      // Clean up the widget wrapper
      const host = document.getElementById('mb-widget-wrapper');
      if (host) {
        host.innerHTML = '';
      }
    };
  }, [widgetKey]); // Re-run when key changes

  return (
    <div>
      {/* Mindbody Appointments widget (enhanced) */}
      <div id="mb-widget-wrapper" className="min-h-[400px]"></div>
    </div>
  )
}

export function ServiceSelection({ onNext }: ServiceSelectionProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCategory = searchParams.get("category") || serviceCategories[0].id
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [showWidget, setShowWidget] = useState(false)
  const [widgetKey, setWidgetKey] = useState(0) // For forcing widget remount

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setShowWidget(false) // Hide widget when changing categories
    setWidgetKey(prev => prev + 1) // Force widget remount
    const url = new URL(window.location.href)
    url.searchParams.set("category", categoryId)
    router.replace(url.toString())
  }

  const handleMakeBooking = () => {
    setShowWidget(true)
    setWidgetKey(prev => prev + 1) // Force widget remount for fresh loading
  }

  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory)

  return (
    <div>
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">
        Select a Service
      </h2>

      <div className="mb-8 overflow-x-auto">
        <div className="flex justify-center space-x-2 min-w-max pb-2">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors group ${
                activeCategory === category.id
                  ? "bg-primary text-black font-medium"
                  : "bg-secondary text-black hover:bg-primary/10"
              }`}
            >
              <span className={`${activeCategory === category.id ? "glitter-bold" : "group-hover:glitter-bold"}`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Show selected service info */}
      {currentCategory && !showWidget && (
        <div className="mb-8 p-6 bg-white border border-primary/20 text-center">
          <h3 className="text-lg font-serif font-medium mb-2 uppercase tracking-wider text-black">
            Selected Service
          </h3>
          <p className="text-primary font-medium mb-4">{currentCategory.name}</p>
          <button
            onClick={handleMakeBooking}
            className="px-8 py-3 bg-gold text-black hover:bg-gold/90 font-medium uppercase tracking-widest transition-all"
          >
            Make a Booking
          </button>
        </div>
      )}

      {/* Show widget after clicking Make a Booking */}
      {currentCategory && showWidget && (
        <div className="mb-8">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black mb-2">
              Book Your {currentCategory.name} Appointment
            </h3>
          </div>
          
          {/* Render the appropriate widget */}
          {currentCategory.isSpecial ? (
            <HerbalTreatmentWidget key={`herbal-${widgetKey}`} />
          ) : (
            <AppointmentsWidget key={`widget-${widgetKey}`} widgetId={currentCategory.widgetId} />
          )}
        </div>
      )}
    </div>
  )
}

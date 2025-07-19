"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

const serviceCategories = [
  {
    id: "hair",
    name: "Herbal Treatment",
    widgetId: "0e33258e78e",
  },
  {
    id: "nail",
    name: "Nail & Foot Spa",
    widgetId: "0e33444e78e",
  },
  {
    id: "facial",
    name: "Facial Services",
    widgetId: "0e33532e78e",
  },
  {
    id: "waxing",
    name: "Waxing Services",
    widgetId: "0e33533e78e",
  },
  {
    id: "threading",
    name: "Threading Services",
    widgetId: "0e33534e78e",
  },
  {
    id: "laser",
    name: "AFT Treatment",
    widgetId: "0e33535e78e",
  },
]

interface ServiceSelectionProps {
  // No props needed for this component anymore
}

interface MindbodyWidgetProps {
  widgetId: string
}

function MindbodyWidget({ widgetId }: MindbodyWidgetProps) {
  const widgetWrapperId = `mb-widget-wrapper-${widgetId}`

  useEffect(() => {
    // --- Aggressive Cleanup: Force a clean slate on every mount ---
    const cleanup = () => {
      // 1. Remove any existing widget script
      const existingScript = document.getElementById("mindbody-widget-script")
      if (existingScript) {
        existingScript.remove()
      }

      // 2. Clear any global Mindbody objects to prevent conflicts
      if ((window as any).MB) delete (window as any).MB
      if ((window as any).__MB_WIDGET_LOADED__) delete (window as any).__MB_WIDGET_LOADED__

      // 3. Ensure the host container is empty
      const host = document.getElementById(widgetWrapperId)
      if (host) host.innerHTML = ""
    }

    cleanup()

    // --- Mount Widget ---
    const timer = setTimeout(() => {
      const host = document.getElementById(widgetWrapperId)
      if (!host) return

      // 1. Create the widget element
      const widget = document.createElement("div")
      widget.className = "mindbody-widget"
      widget.dataset.widgetType = "Appointments"
      widget.dataset.widgetId = widgetId
      host.appendChild(widget)

      // 2. Create and load the script
      const script = document.createElement("script")
      script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js"
      script.async = true
      script.id = "mindbody-widget-script" // Assign ID for easy removal
      document.head.appendChild(script)
    }, 100) // Small delay to ensure DOM is ready after cleanup

    // --- Return Cleanup Function for when component unmounts ---
    return () => {
      clearTimeout(timer)
      cleanup()
    }
  }, [widgetId, widgetWrapperId]) // Rerun if widgetId changes

  return <div id={widgetWrapperId} className="min-h-[400px]" />
}

export function ServiceSelection({}: ServiceSelectionProps) {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || serviceCategories[0].id
  )
  const [showWidget, setShowWidget] = useState(!!categoryFromUrl)
  const [widgetKey, setWidgetKey] = useState(0)
  const serviceSelectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // On initial load, if a category is specified in the URL, don't scroll.
    // The user should be able to see the top of the page.
    if (categoryFromUrl) {
      // The widget will be shown automatically, no need to scroll.
    }
  }, []) // Run only once on mount

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setShowWidget(true) // Show widget immediately
    setWidgetKey(prev => prev + 1) // Force remount with a new key

    // Prevent the page from scrolling down.
    // The user should remain at the category selection prompt.
    if (serviceSelectionRef.current) {
      serviceSelectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentCategory = serviceCategories.find(
    (cat) => cat.id === activeCategory
  )

  return (
    <div ref={serviceSelectionRef}>
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

      {currentCategory && showWidget && (
        <div className="mb-8" data-widget-area>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black mb-2">
              Book Your {currentCategory.name} Appointment
            </h3>
          </div>
          
          <MindbodyWidget
            key={widgetKey}
            widgetId={currentCategory.widgetId}
          />
        </div>
      )}
    </div>
  )
}

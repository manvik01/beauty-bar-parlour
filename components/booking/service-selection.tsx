"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import MindbodyAppointments from "@/components/MindbodyAppointments"

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
    // Only update the widget container and call MB.embed
    const host = document.getElementById(widgetWrapperId)
    if (!host) return
    host.innerHTML = ""
    const widget = document.createElement("div")
    widget.className = "mindbody-widget"
    widget.dataset.widgetType = "Appointments"
    widget.dataset.widgetId = widgetId
    host.appendChild(widget)
    // Call Mindbody re-initializer if available
    if (typeof window !== "undefined" && (window as any).MB && typeof (window as any).MB.embed === "function") {
      (window as any).MB.embed()
    }
  }, [widgetId, widgetWrapperId])

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
          <MindbodyAppointments key={currentCategory.widgetId} widgetId={currentCategory.widgetId} />
        </div>
      )}
    </div>
  )
}

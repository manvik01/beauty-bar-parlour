"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

const serviceCategories = [
  { id: "hair", name: "Herbal Treatment", widgetId: "0e33258e78e" },
  { id: "nail", name: "Nail & Foot Spa", widgetId: "0e33444e78e" }, // Reverted to direct embed
  { id: "facial", name: "Facial Services", widgetId: "0e33532e78e" },
  { id: "waxing", name: "Waxing Services", widgetId: "0e33533e78e" },
  { id: "threading", name: "Threading Services", widgetId: "0e33534e78e" },
  { id: "laser", name: "AFT Treatment", widgetId: "0e33535e78e" },
]

// Direct HTML injection for robust widget loading.
function MindbodySnippetEmbed({ widgetId }: { widgetId: string }) {
  const getWidgetSnippet = () => {
    const div = `<div class="mindbody-widget" data-widget-type="Appointments" data-widget-id="${widgetId}"></div>`
    const script = `<script async src="https://brandedweb.mindbodyonline.com/embed/widget.js?v=${Date.now()}"><\/script>`
    return { __html: div + script }
  }
  return <div dangerouslySetInnerHTML={getWidgetSnippet()} className="min-h-[600px] w-full" />
}

export function ServiceSelection() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)
  const [widgetKey, setWidgetKey] = useState(0)
  const serviceSelectionRef = useRef<HTMLDivElement>(null)
  
  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory)

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setWidgetKey(prev => prev + 1)

    setTimeout(() => {
      serviceSelectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div ref={serviceSelectionRef}>
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">Select a Service</h2>
      <div className="mb-8 overflow-x-auto">
        <div className="flex justify-center flex-wrap gap-2 md:gap-4">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors group ${activeCategory === category.id ? "bg-primary text-black font-medium" : "bg-secondary text-black hover:bg-primary/10"}`}
            >
              <span className={`${activeCategory === category.id ? "glitter-bold" : "group-hover:glitter-bold"}`}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {currentCategory && (
        <div className="mb-8" data-widget-area>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black mb-2">Book Your {currentCategory.name} Appointment</h3>
          </div>
          <div className="max-h-[80vh] overflow-y-auto rounded-lg border">
            <MindbodySnippetEmbed key={widgetKey} widgetId={currentCategory.widgetId} />
          </div>
        </div>
      )}
    </div>
  )
}

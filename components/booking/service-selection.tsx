"use client"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import MindbodyWidget from "@/components/MindbodyWidget"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/hooks/use-toast"

const serviceCategories = [
  { id: "hair", name: "Herbal Treatment", widgetId: "0e33258e78e" },
  { id: "nail", name: "Nail & Foot Spa", widgetId: "0e33444e78e" },
  { id: "facial", name: "Facial Services", widgetId: "0e33532e78e" },
  { id: "waxing", name: "Waxing Services", widgetId: "0e33533e78e" },
  { id: "threading", name: "Threading Services", widgetId: "0e33534e78e" },
  { id: "laser", name: "AFT Treatment", widgetId: "0e33535e78e" },
]

export function ServiceSelection() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)
  const [widgetKey, setWidgetKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const serviceSelectionRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory)

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setWidgetKey(prev => prev + 1)
    setLoading(true)
    setError(null)
    // Analytics event (replace with real analytics in prod)
    console.log(`Category selected: ${categoryId}`)
    setTimeout(() => {
      serviceSelectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Widget load/error handlers
  const handleWidgetLoad = () => {
    setLoading(false)
    setError(null)
    // Analytics event (replace with real analytics in prod)
    if (currentCategory) {
      console.log(`Widget loaded: ${currentCategory.widgetId}`)
    }
  }
  const handleWidgetError = () => {
    setLoading(false)
    setError("Failed to load booking widget. Please try again later.")
    toast({
      title: "Widget Load Error",
      description: "Failed to load booking widget. Please try again later.",
      variant: "destructive",
    })
  }

  return (
    <div ref={serviceSelectionRef}>
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">Select a Service</h2>
      <div className="mb-8 overflow-x-auto">
        <div className="flex justify-center flex-wrap gap-2 md:gap-4" role="tablist" aria-label="Service Categories">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors group ${activeCategory === category.id ? "bg-primary text-black font-medium" : "bg-secondary text-black hover:bg-primary/10"}`}
              aria-selected={activeCategory === category.id}
              aria-controls={`widget-panel-${category.id}`}
              role="tab"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleCategoryChange(category.id)
              }}
            >
              <span className={`${activeCategory === category.id ? "glitter-bold" : "group-hover:glitter-bold"}`}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      {loading && <LoadingSpinner text="Loading booking widget..." />}
      {error && (
        <div className="text-center text-red-600 my-4" role="alert">{error}</div>
      )}
      {currentCategory && !loading && !error && (
        <div className="mb-8" data-widget-area id={`widget-panel-${currentCategory.id}`} role="tabpanel" aria-labelledby={currentCategory.id}>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black mb-2">Book Your {currentCategory.name} Appointment</h3>
          </div>
          <div className="max-h-[80vh] overflow-y-auto rounded-lg border">
            <MindbodyWidget key={widgetKey} widgetId={currentCategory.widgetId} onLoad={handleWidgetLoad} onError={handleWidgetError} />
          </div>
        </div>
      )}
    </div>
  )
}

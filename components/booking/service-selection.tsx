"use client"

import { useState } from "react"
import { AppointmentsWidget } from "@/components/mindbody/appointments-widget"
import { useSearchParams, useRouter } from "next/navigation"
import { Copy, X } from "lucide-react"

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

export function ServiceSelection({ onNext }: ServiceSelectionProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCategory = searchParams.get("category") || serviceCategories[0].id
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [showWidget, setShowWidget] = useState(false)
  const [showCodePrompt, setShowCodePrompt] = useState(false)

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setShowWidget(false) // Hide widget when changing categories
    setShowCodePrompt(false) // Hide code prompt when changing categories
    const url = new URL(window.location.href)
    url.searchParams.set("category", categoryId)
    router.replace(url.toString())
  }

  const handleMakeBooking = () => {
    const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory)
    
    if (currentCategory?.isSpecial) {
      // For Herbal Treatment, show the code prompt instead of loading widget
      setShowCodePrompt(true)
    } else {
      // For other services, load the widget as before
      setShowWidget(true)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here if needed
  }

  const widgetCode = `<!-- Mindbody Appointments widget begin -->
<div class="mindbody-widget" data-widget-type="Appointments" data-widget-id="0e33258e78e"></div>
<script async src="https://brandedweb.mindbodyonline.com/embed/widget.js"></script>
<!-- Mindbody Appointments widget end -->`

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
      {currentCategory && !showWidget && !showCodePrompt && (
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

      {/* Show widget code prompt for Herbal Treatment */}
      {currentCategory && showCodePrompt && currentCategory.isSpecial && (
        <div className="mb-8">
          <div className="bg-white border border-primary/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black">
                Herbal Treatment Widget Code
              </h3>
              <button
                onClick={() => setShowCodePrompt(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Copy the code below to embed the Herbal Treatment booking widget:
            </p>
            
            <div className="bg-gray-100 p-4 rounded border relative">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap break-all">
                <code>{widgetCode}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(widgetCode)}
                className="absolute top-2 right-2 p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowCodePrompt(false)}
                className="px-6 py-2 text-sm text-primary hover:underline"
              >
                ← Back to Services
              </button>
              <button
                onClick={onNext}
                className="px-8 py-3 bg-primary text-white hover:bg-primary/90 uppercase tracking-widest text-xs transition-all"
              >
                Continue with Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show widget only after clicking Make a Booking for non-special services */}
      {currentCategory && showWidget && !currentCategory.isSpecial && (
        <div className="mb-8">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black mb-2">
              Book Your {currentCategory.name} Appointment
            </h3>
            <button
              onClick={() => setShowWidget(false)}
              className="text-sm text-primary hover:underline"
            >
              ← Change Service
            </button>
          </div>
          <AppointmentsWidget widgetId={currentCategory.widgetId} />
        </div>
      )}

      {/* Continue button - only show if widget is loaded or if using the form flow */}
      {showWidget && !currentCategory?.isSpecial && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="px-8 py-3 uppercase tracking-widest text-xs transition-all bg-primary text-white hover:bg-primary/90"
          >
            Continue with Form
          </button>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { AppointmentsWidget } from "@/components/mindbody/appointments-widget"
import { useSearchParams, useRouter } from "next/navigation"

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
  onNext: () => void
}

export function ServiceSelection({ onNext }: ServiceSelectionProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCategory = searchParams.get("category") || serviceCategories[0].id
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    const url = new URL(window.location.href)
    url.searchParams.set("category", categoryId)
    router.replace(url.toString())
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

      {currentCategory && (
        <div className="mb-8">
          <AppointmentsWidget widgetId={currentCategory.widgetId} />
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-8 py-3 uppercase tracking-widest text-xs transition-all bg-primary text-white hover:bg-primary/90"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

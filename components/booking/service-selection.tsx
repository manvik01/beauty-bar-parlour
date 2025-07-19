"use client"

import { useState } from "react"
import Script from "next/script"
import { AppointmentsWidget } from "@/components/mindbody/appointments-widget"

const serviceCategories = [
  {
    id: "hair",
    name: "Herbal Treatment",
    services: [],
  },
  {
    id: "nail",
    name: "Nail & Foot Spa",
    services: [],
  },
  {
    id: "facial",
    name: "Facial Services",
    services: [],
  },
  {
    id: "waxing",
    name: "Waxing Services",
    services: [],
  },
  {
    id: "threading",
    name: "Threading Services",
    services: [],
  },
  {
    id: "laser",
    name: "AFT Treatment",
    services: [],
  },
]

interface ServiceSelectionProps {
  selectedService: string
  selectedCategory: string
  onSelect: (service: string, category: string) => void
  onNext: () => void
}

export function ServiceSelection({ selectedService, selectedCategory, onSelect, onNext }: ServiceSelectionProps) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || serviceCategories[0].id)

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  const handleServiceSelect = (service: string) => {
    const category = serviceCategories.find((cat) => cat.id === activeCategory)?.name || ""
    onSelect(service, category)
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

      {activeCategory === "nail" && (
        <div className="mb-8">
          <AppointmentsWidget widgetId="0e33444e78e" />
        </div>
      )}

      {activeCategory === "hair" && (
        <div className="mb-8">
          <AppointmentsWidget widgetId="0e33258e78e" />
        </div>
      )}

      {activeCategory === "facial" && (
        <div className="mb-8">
          <AppointmentsWidget widgetId="0e33532e78e" />
        </div>
      )}

      {activeCategory === "waxing" && (
        <div className="mb-8">
          <AppointmentsWidget widgetId="0e33533e78e" />
        </div>
      )}

      {activeCategory === "threading" && (
        <div className="mb-8">
          <AppointmentsWidget widgetId="0e33534e78e" />
        </div>
      )}

      {activeCategory === "laser" && (
        <div className="mb-8">
          <AppointmentsWidget widgetId="0e33535e78e" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Service mapping removed */}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedService}
          className={`px-8 py-3 uppercase tracking-widest text-xs transition-all ${
            selectedService
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"

const serviceCategories = [
  {
    id: "hair",
    name: "Hair Services",
    services: ["Henna Root Touch Up", "Hot Oil Massage", "Herbal Hair treatment"],
  },
  {
    id: "nail",
    name: "Nail Services",
    services: [
      "Express Manicure (Shape, Buff & Colour)",
      "Express Pedicure (Shape, Buff & Colour)",
      "Classic Manicure",
      "Classic Pedicure",
      "Gel Express Manicure",
      "Gel Express Pedicure",
      "Gel Manicure",
      "Gel Pedicure",
      "Nail Art (per nail)",
      "Nail Extension (Full Set)",
      "Foot SPA",
    ],
  },
  {
    id: "facial",
    name: "Facial Services",
    services: ["Basic Facial", "Ayurvedic Facial", "Hydrating Facial", "Whitening Facial", "Anti-Aging Facial"],
  },
  {
    id: "waxing",
    name: "Waxing Services",
    services: [
      "Side Burn",
      "Upper Lip / Chin",
      "Eyebrow Wax",
      "Full Face Wax",
      "Half Arms",
      "Half Legs",
      "Full Arms",
      "Full Legs",
      "Underarms",
      "Bikini Line",
      "Brazilian",
    ],
  },
  {
    id: "threading",
    name: "Threading Services",
    services: ["Eyebrows", "Upper Lip", "Chin", "Forehead", "Full Face"],
  },
  {
    id: "henna",
    name: "Henna Art Services",
    services: ["Simple Henna (One Hand)", "Bridal Henna - Hands & Feet", "Customized Henna Design"],
  },
  {
    id: "bridal",
    name: "Bridal Services",
    services: ["Bridal Makeup & Hair (Trial + Event Day)", "Bridal Facial", "Full Bridal Package"],
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {currentCategory?.services.map((service) => (
          <div
            key={service}
            onClick={() => handleServiceSelect(service)}
            className={`p-4 border cursor-pointer transition-all group ${
              selectedService === service ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center justify-center text-center">
              <div
                className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                  selectedService === service ? "border-primary" : "border-gray-300"
                }`}
              >
                {selectedService === service && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <span className={`font-medium text-black group-hover:glitter-bold transition-all`}>{service}</span>
            </div>
          </div>
        ))}
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

"use client"

import { useState } from "react"
import { useScriptLoader } from "@/contexts/script-loader-context"

const serviceCategories = [
  {
    id: "hair",
    name: "Herbal Treatment",
    services: [
      "Root Touch Up – 90 mins",
      "Hair Pack (Short Hair) – 90 mins",
      "Hair Pack (Medium Hair) – 90 mins",
      "Hair Pack (Long Hair) – 90 mins",
      "Hot Oil Massage (Seated) – 60 mins",
      "Hot Oil Massage (Spa) – 90 mins",
    ],
  },
  {
    id: "nail",
    name: "Nail & Foot Spa",
    services: [
      "Soak Off Gel Hand – 15 mins",
      "Soak Off Gel Feet – 15 mins",
      "Express Manicure – 20 mins",
      "Express Pedicure – 20 mins",
      "Classic Manicure – 40 mins",
      "Classic Pedicure – 40 mins",
      "Gel Express Manicure – 30 mins",
      "Gel Express Pedicure – 30 mins",
      "Classic Gel Manicure – 40 mins",
      "Classic Gel Pedicure – 40 mins",
      "Nail Extension (Full Set) – 60 mins",
      "Parafin Wax SPA Hand – 30 mins",
      "Parafin Wax SPA Feet – 30 mins",
      "Milk Foot Spa – 45 mins",
      "Milk & Wine Foot Spa – 45 mins",
      "Signature Foot Spa – 45 mins",
    ],
  },
  {
    id: "facial",
    name: "Facial Services",
    services: [
      "Advanced Clinicals Basic – 45 mins",
      "Advanced Clinicals Basic – 60 mins",
      "Advanced Clinicals Advanced – 45 mins",
      "Advanced Clinicals Advanced – 60 mins",
      "WOB - Vitamin C Brightening – 45 mins",
      "WOB – Akoia Gold – 60 mins",
      "WOB - Hydra Calm – 90 mins",
      "WOB - Collagen Hlayu – 90 mins",
      "TAE - Ayurvedic Oily Skin Treatment – 60 mins",
      "TAE - Ayurvedic Skin Tightening Treatment – 60 mins",
      "TAE - Ayurvedic Hydrating Treatment – 90 mins",
      "TAE - Ayurvedic Anti Aging – 90 mins",
    ],
  },
  {
    id: "waxing",
    name: "Waxing Services",
    services: [
      "Side Burn – 15 mins",
      "Upper Lip / Chin – 15 mins",
      "Eyebrow Wax – 15 mins",
      "Full Face Wax – 30 mins",
      "Half Arms – 30 mins",
      "Half Legs – 30 mins",
      "Full Arms – 30 mins",
      "Full Legs – 30 mins",
      "Underarms – 15 mins",
      "Bikini Line – 20 mins",
      "Brazilian – 45 mins",
    ],
  },
  {
    id: "threading",
    name: "Threading Services",
    services: [
      "Eyebrows – 15 mins",
      "Upper Lip – 15 mins",
      "Chin – 15 mins",
      "Forehead – 15 mins",
      "Full Face – 30 mins",
    ],
  },
  {
    id: "laser",
    name: "AFT Treatment",
    services: [
      "Upper Lip – 15 mins",
      "Chin – 15 mins",
      "Sideburns – 20 mins",
      "Full Face – 30 mins",
      "Neck (Front/Back) – 30 mins",
      "Underarms – 20 mins",
      "Half Arms (Upper/Lower) – 30 mins",
      "Full Arms – 45 mins",
      "Hands & Fingers – 15 mins",
      "Chest – 30 mins",
      "Areola – 15 mins",
      "Abdomen – 30 mins",
      "Back (Full) – 45 mins",
      "Lower Back – 30 mins",
      "Bikini Line – 30 mins",
      "Brazilian + Crack – 45 mins",
      "Buttocks (Full) – 30 mins",
      "Half Legs (Upper/Lower) – 45 mins",
      "Full Legs – 60 mins",
      "Feet & Toes – 20 mins",
    ],
  },
]

interface ServiceSelectionProps {
  selectedService: string
  selectedCategory: string
  onSelect: (service: string, category: string) => void
  onNext: () => void
}

export function ServiceSelection({ selectedService, selectedCategory, onSelect, onNext }: ServiceSelectionProps) {
  const { isScriptLoaded } = useScriptLoader()
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
        {currentCategory?.services.map((service) => {
          if (service.startsWith("Root Touch Up")) {
            if (!isScriptLoaded) {
              return (
                <div
                  key="healcode-root-touch-up"
                  className="p-4 border transition-all border-border hover:border-primary/50 flex items-center justify-center text-center"
                >
                  <div className="text-sm text-gray-500">Loading...</div>
                </div>
              )
            }

            const widgetHtml = `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="127612" data-mb-site-id="5746301" data-service-id="100059" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Root Touch Up – 90 mins"></healcode-widget>`
            return (
              <div
                key="healcode-root-touch-up"
                className="p-4 border transition-all border-border hover:border-primary/50 flex items-center justify-center text-center"
              >
                <div dangerouslySetInnerHTML={{ __html: widgetHtml }} />
              </div>
            )
          }

          return (
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
          )
        })}
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

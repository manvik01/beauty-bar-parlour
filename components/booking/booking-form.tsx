"use client"

import { useState } from "react"
import MindbodyWidget from "@/components/MindbodyWidget"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const serviceCategories = [
    { name: "Herbal Treatment", widgetId: "0e33258e78e" },
    { name: "Nail & Foot Spa", widgetId: "0e33444e78e" },
    { name: "Facial Services", widgetId: "0e33532e78e" },
    { name: "Waxing Services", widgetId: "0e33533e78e" },
    { name: "Threading Services", widgetId: "0e33534e78e" },
    { name: "AFT Treatment", widgetId: "0e33535e78e" },
]

export function BookingForm() {
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);

  const handleCategoryChange = (widgetId: string) => {
    setSelectedWidgetId(widgetId);
    setWidgetKey(prev => prev + 1); // Force re-render of the widget
  };

  return (
    <div className="bg-white p-8 border border-primary/10 shadow-sm">
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">
        Book Your Appointment
      </h2>
      
      <div className="max-w-md mx-auto mb-8">
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full h-12 text-base font-serif">
            <SelectValue placeholder="Select a service category..." />
          </SelectTrigger>
          <SelectContent>
            {serviceCategories.map((category) => (
              <SelectItem key={category.widgetId} value={category.widgetId} className="text-base font-serif">
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedWidgetId && (
        <div className="mt-8">
          <MindbodyWidget key={widgetKey} widgetId={selectedWidgetId} />
        </div>
      )}
    </div>
  )
}

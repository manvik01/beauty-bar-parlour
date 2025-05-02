"use client"

import { useState } from "react"
import { BookingWidget } from "./booking-widget"
import { ServiceScheduleWidget } from "./service-schedule-widget"
import { StaffWidget } from "./staff-widget"

interface EmbedWidgetProps {
  defaultWidget?: "booking" | "services" | "staff"
  businessId?: string
  theme?: "light" | "dark"
}

export function EmbedWidget({ defaultWidget = "booking", businessId = "default", theme = "light" }: EmbedWidgetProps) {
  const [activeWidget, setActiveWidget] = useState(defaultWidget)

  return (
    <div className={`font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="p-4 border-b border-primary/10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-serif">Beauty Bar Parlour</h3>

          <div className="flex">
            <button
              onClick={() => setActiveWidget("booking")}
              className={`px-3 py-1 text-xs uppercase tracking-wider mr-2 ${
                activeWidget === "booking"
                  ? "bg-primary text-white"
                  : theme === "dark"
                    ? "text-white/70"
                    : "text-black/70"
              }`}
            >
              Book
            </button>
            <button
              onClick={() => setActiveWidget("services")}
              className={`px-3 py-1 text-xs uppercase tracking-wider mr-2 ${
                activeWidget === "services"
                  ? "bg-primary text-white"
                  : theme === "dark"
                    ? "text-white/70"
                    : "text-black/70"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveWidget("staff")}
              className={`px-3 py-1 text-xs uppercase tracking-wider ${
                activeWidget === "staff"
                  ? "bg-primary text-white"
                  : theme === "dark"
                    ? "text-white/70"
                    : "text-black/70"
              }`}
            >
              Team
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {activeWidget === "booking" && <BookingWidget embedded={true} />}
        {activeWidget === "services" && <ServiceScheduleWidget />}
        {activeWidget === "staff" && <StaffWidget />}
      </div>

      <div className="p-2 text-center text-xs text-muted-foreground border-t border-primary/10">
        Powered by Beauty Bar Parlour & Mindbody
      </div>
    </div>
  )
}

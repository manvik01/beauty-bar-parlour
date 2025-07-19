"use client"
import { useState } from "react"

const serviceCategories = [
  { id: "hair", name: "Herbal Treatment", widgetId: "0e33258e78e" },
  { id: "nail", name: "Nail & Foot Spa", widgetId: "0e33444e78e" },
  { id: "facial", name: "Facial Services", widgetId: "0e33532e78e" },
  { id: "waxing", name: "Waxing Services", widgetId: "0e33533e78e" },
  { id: "threading", name: "Threading Services", widgetId: "0e33534e78e" },
  { id: "laser", name: "AFT Treatment", widgetId: "0e33535e78e" },
]

export default function BookingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(serviceCategories[0].id)
  const currentCategory = serviceCategories.find(cat => cat.id === selectedCategory)

  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Reservations</h3>
          <h1 className="clean-subheading">Book Your Appointment</h1>
        </div>
      </section>

      {/* Booking Content */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto bg-white p-8 border border-gold/20 shadow-sm">
            <h2 className="text-xl font-serif uppercase tracking-wider text-gold text-center font-bold mb-8">
              Book Your Appointment
            </h2>
            <div className="mb-8">
              <label htmlFor="service-category" className="block mb-2 text-sm font-serif uppercase tracking-widest text-black">
                Select a Service Category
              </label>
              <select
                id="service-category"
                className="w-full px-4 py-3 border border-gold/30 rounded-lg font-serif text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {serviceCategories.map(category => (
                  <option key={category.id} value={category.id} className="font-serif">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {currentCategory && (
              <div className="mt-8">
                {/* Mindbody Appointments widget begin */}
                <div
                  className="mindbody-widget"
                  data-widget-type="Appointments"
                  data-widget-id={currentCategory.widgetId}
                  style={{ width: "100%", minHeight: 650, boxSizing: "border-box", marginBottom: 32 }}
                ></div>
                {/* Mindbody Appointments widget end */}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Mindbody widget script (should only be loaded once globally, but included here for strict compliance) */}
      <script async src="https://brandedweb.mindbodyonline.com/embed/widget.js"></script>
    </main>
  )
}

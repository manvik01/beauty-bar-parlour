"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MindbodyWidget from "@/components/MindbodyWidget"

const serviceCategories = [
  { id: "hair", name: "Herbal Treatment", widgetId: "0e33258e78e" },
  { id: "nail", name: "Nail & Foot Spa", widgetId: "0e33444e78e" },
  { id: "facial", name: "Facial Services", widgetId: "0e33532e78e" },
  { id: "waxing", name: "Waxing Services", widgetId: "0e33533e78e" },
  { id: "threading", name: "Threading Services", widgetId: "0e33534e78e" },
  { id: "laser", name: "AFT Treatment", widgetId: "0e33535e78e" },
]

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
  
  const selectedCategory = serviceCategories.find(cat => cat.id === activeTab);

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
          <div className="max-w-4xl mx-auto bg-white p-8 border border-gold/20 shadow-sm">
            <h2 className="text-xl font-serif uppercase tracking-wider text-gold font-bold mb-8 text-center">
                Select a Service to Book
            </h2>
            
            {/* Category Boxes */}
            <div className="flex justify-center flex-wrap gap-4 md:gap-6 mb-8">
              {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`group flex items-center justify-center p-4 w-36 h-36 md:w-40 md:h-40 rounded-lg text-center transition-all duration-300 ease-in-out font-serif uppercase text-xs tracking-widest focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                      activeTab === category.id
                        ? "bg-gold text-black shadow-lg scale-105"
                        : "bg-secondary text-black hover:bg-gold/20"
                    }`}
                  >
                    <span className="font-bold">{category.name}</span>
                  </button>
              ))}
            </div>

            {/* Widget Display */}
            {selectedCategory && (
              <motion.div 
                key={selectedCategory.id}
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black mb-4 text-center">
                  Book Your {selectedCategory.name} Appointment
                </h3>
                <MindbodyWidget widgetId={selectedCategory.widgetId} />
              </motion.div>
            )}
            
          </div>
        </div>
      </section>
    </main>
  )
}

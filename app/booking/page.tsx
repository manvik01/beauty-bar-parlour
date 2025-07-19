"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MindbodyWidget from "@/components/MindbodyWidget"

const serviceCategories = [
  { id: "hair", name: "Herbal Treatment", widgetId: "0e33258e78e" },
  { id: "nail", name: "Nail & Foot Spa", widgetId: "0e33444e78e" },
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
            
            {/* Tabs */}
            <div className="flex justify-center border-b border-gold/20 mb-8">
                {serviceCategories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`px-6 py-3 text-sm font-serif uppercase tracking-widest transition-colors focus:outline-none ${
                            activeTab === category.id 
                                ? 'border-b-2 border-gold text-black font-bold' 
                                : 'text-gray-500 hover:text-black'
                        }`}
                    >
                        {category.name}
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
                <MindbodyWidget widgetId={selectedCategory.widgetId} />
              </motion.div>
            )}
            
          </div>
        </div>
      </section>
    </main>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Scissors, Palette, Star, Sparkles } from "lucide-react"
import MindbodyWidget from "@/components/MindbodyWidget"

const serviceCategories = [
  { id: "hair", name: "Herbal Treatment", widgetId: "0e33258e78e", icon: Scissors },
  { id: "nail", name: "Nail & Foot Spa", widgetId: "0e33444e78e", icon: Palette },
  { id: "facial", name: "Facial Services", widgetId: "0e33532e78e", icon: Star },
  { id: "waxing", name: "Waxing Services", widgetId: "0e33533e78e", icon: Sparkles },
  { id: "threading", name: "Threading Services", widgetId: "0e33534e78e", icon: Scissors },
  { id: "laser", name: "AFT Treatment", widgetId: "0e33535e78e", icon: Sparkles },
]

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<typeof serviceCategories[0] | null>(null);

  const handleCategorySelect = (category: typeof serviceCategories[0]) => {
    setSelectedCategory(category);
    setStep(3);
  }
  
  const resetSelection = () => {
    setSelectedCategory(null);
    setStep(2);
  }

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
          <div className="max-w-4xl mx-auto bg-white p-8 border border-gold/20 shadow-sm text-center">
            
            {/* Step 1: Initial Button */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                 <h2 className="text-xl font-serif uppercase tracking-wider text-gold font-bold mb-6">
                    Schedule Your Visit
                </h2>
                <p className="mb-8 font-serif">
                  Click the button below to schedule your appointment with our skilled professionals. 
                  We look forward to pampering you at Beauty Bar Parlour.
                </p>
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 glitter-border"
                >
                  Book Here
                </button>
              </motion.div>
            )}

            {/* Step 2: Category Selection */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-serif uppercase tracking-wider text-gold font-bold mb-8">
                    Select a Service Category
                </h2>
                <div className="flex justify-center flex-wrap gap-3 md:gap-4">
                  {serviceCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        className="px-4 py-3 bg-gold/10 text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center rounded-lg font-serif"
                      >
                        <Icon className="w-4 h-4 mr-2 glitter-icon" /> {category.name}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Widget Display */}
            {step === 3 && selectedCategory && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-6 text-left">
                    <button onClick={resetSelection} className="text-sm text-gold hover:underline font-serif">
                        &larr; Back to Categories
                    </button>
                </div>
                <h2 className="text-xl font-serif uppercase tracking-wider text-gold font-bold mb-6">
                    Book Your {selectedCategory.name}
                </h2>
                <div className="mt-4">
                  <MindbodyWidget widgetId={selectedCategory.widgetId} />
                </div>
              </motion.div>
            )}
            
          </div>
        </div>
      </section>
    </main>
  )
}

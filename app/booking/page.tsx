"use client"

import { useState } from "react"
import MindbodyWidget from "@/components/MindbodyWidget"

export default function BookingPage() {
  const [showWidget, setShowWidget] = useState(false);

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
            <h2 className="text-xl font-serif uppercase tracking-wider text-gold font-bold mb-6">
                Schedule Your Visit
            </h2>
            <p className="mb-8 font-serif">
              Click the button below to schedule your appointment with our skilled professionals. 
              We look forward to pampering you at Beauty Bar Parlour.
            </p>
            
            {!showWidget && (
                <button
                onClick={() => setShowWidget(true)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 glitter-border"
                >
                Book Herbal Treatment
                </button>
            )}

            {showWidget && (
              <div className="mt-8">
                <h2 className="text-xl font-serif uppercase tracking-wider text-gold font-bold mb-6">
                    Book Your Herbal Treatment
                </h2>
                <MindbodyWidget widgetId="0e33258e78e" />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

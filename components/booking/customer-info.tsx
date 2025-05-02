"use client"

import type React from "react"

import type { BookingData } from "./booking-form"

interface CustomerInfoProps {
  bookingData: BookingData
  onChange: (data: Partial<BookingData>) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  errors?: Record<string, string>
}

export function CustomerInfo({
  bookingData,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  errors = {},
}: CustomerInfoProps) {
  // Format date for display
  const formattedDate = bookingData.date
    ? bookingData.date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">
        Your Information
      </h2>

      <div className="mb-8 p-4 bg-white border border-primary/10">
        <h3 className="text-sm uppercase tracking-wider mb-2 text-black font-medium">Booking Summary</h3>
        <p className="font-medium text-black">
          <span className="font-bold">Service:</span> {bookingData.service}
        </p>
        <p className="font-medium text-black">
          <span className="font-bold">Date:</span> {formattedDate}
        </p>
        <p className="font-medium text-black">
          <span className="font-bold">Time:</span> {bookingData.time}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-center">
            {errors.submit}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <label htmlFor="name" className="block text-sm uppercase tracking-wider mb-2 text-black font-medium">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={bookingData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              required
              className={`w-full border ${errors?.name ? "border-red-500" : "border-border"} p-3 focus:outline-none focus:ring-1 focus:ring-primary text-center`}
              placeholder="Your Name"
            />
            {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="text-center">
            <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2 text-black font-medium">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={bookingData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              required
              className={`w-full border ${errors?.email ? "border-red-500" : "border-border"} p-3 focus:outline-none focus:ring-1 focus:ring-primary text-center`}
              placeholder="Your Email"
            />
            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="text-center">
          <label htmlFor="phone" className="block text-sm uppercase tracking-wider mb-2 text-black font-medium">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={bookingData.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            required
            className={`w-full border ${errors?.phone ? "border-red-500" : "border-border"} p-3 focus:outline-none focus:ring-1 focus:ring-primary text-center`}
            placeholder="Your Phone Number"
          />
          {errors?.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="text-center">
          <label htmlFor="notes" className="block text-sm uppercase tracking-wider mb-2 text-black font-medium">
            Special Requests (Optional)
          </label>
          <textarea
            id="notes"
            value={bookingData.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            rows={4}
            className="w-full border border-border p-3 focus:outline-none focus:ring-1 focus:ring-primary text-center"
            placeholder="Any special requests or notes for your appointment"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-all uppercase tracking-widest text-xs"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !bookingData.name || !bookingData.email || !bookingData.phone}
            className={`px-8 py-3 uppercase tracking-widest text-xs transition-all ${
              isSubmitting || !bookingData.name || !bookingData.email || !bookingData.phone
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  )
}

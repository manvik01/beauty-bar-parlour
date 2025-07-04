"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ServiceSelection } from "./service-selection"
import { DateSelection } from "./date-selection"
import { TimeSelection } from "./time-selection"
import { CustomerInfo } from "./customer-info"
import { BookingConfirmation } from "./booking-confirmation"
import { submitBooking } from "@/app/actions/booking-actions"

export type BookingData = {
  service: string
  serviceCategory: string
  date: Date | null
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

export function BookingForm() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    serviceCategory: "",
    date: null,
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingReference, setBookingReference] = useState("")
  // Add error state to the component
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Add validation function before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate required fields
    if (!bookingData.name) newErrors.name = "Name is required"
    if (!bookingData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(bookingData.email)) newErrors.email = "Email is invalid"
    if (!bookingData.phone) newErrors.phone = "Phone number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Update the handleSubmit function to include validation
  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // In a real application, this would be a server action or API call
      const result = await submitBooking(bookingData)
      setBookingReference(result.reference)
      setBookingConfirmed(true)
    } catch (error) {
      console.error("Error submitting booking:", error)
      setErrors({ submit: "Failed to submit booking. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: "Service" },
      { num: 2, label: "Date" },
      { num: 3, label: "Time" },
      { num: 4, label: "Details" },
    ]

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-light mb-6 text-center uppercase tracking-wider glitter-bold">
          Book Your Appointment
        </h2>
        <div className="flex justify-between">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center group">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                  s.num === step ? "bg-primary text-black" : "bg-gray-200 text-gray-500 group-hover:bg-primary/20"
                }`}
              >
                {s.num}
              </div>
              <span
                className={`text-xs uppercase ${s.num === step ? "text-primary glitter-bold" : "text-gray-500 group-hover:text-primary/70"}`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (bookingConfirmed) {
    return <BookingConfirmation bookingData={bookingData} reference={bookingReference} />
  }

  return (
    <div className="bg-white p-8 border border-primary/10 shadow-sm">
      {renderStepIndicator()}

      <motion.div
        key={`step-${step}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <ServiceSelection
            selectedService={bookingData.service}
            selectedCategory={bookingData.serviceCategory}
            onSelect={(service, category) => updateBookingData({ service, serviceCategory: category })}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <DateSelection
            selectedDate={bookingData.date}
            onSelect={(date) => updateBookingData({ date })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 3 && (
          <TimeSelection
            selectedTime={bookingData.time}
            selectedDate={bookingData.date}
            serviceCategory={bookingData.serviceCategory}
            onSelect={(time) => updateBookingData({ time })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 4 && (
          <CustomerInfo
            bookingData={bookingData}
            onChange={updateBookingData}
            onSubmit={handleSubmit}
            onBack={prevStep}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        )}
      </motion.div>
    </div>
  )
}

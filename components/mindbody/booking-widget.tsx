"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { getServices, getStaff, getAvailability, bookAppointment } from "@/lib/mindbody-api"
import { Calendar, Clock, User, ChevronRight, ChevronLeft } from "lucide-react"

interface BookingWidgetProps {
  embedded?: boolean
}

export function BookingWidget({ embedded = false }: BookingWidgetProps) {
  const searchParams = useSearchParams()
  const initialServiceId = searchParams.get("serviceId")
  const initialStaffId = searchParams.get("staffId")

  const [step, setStep] = useState(1)
  const [services, setServices] = useState([])
  const [staff, setStaff] = useState([])
  const [selectedService, setSelectedService] = useState<string | null>(initialServiceId)
  const [selectedStaff, setSelectedStaff] = useState<string | null>(initialStaffId)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimes, setAvailableTimes] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingReference, setBookingReference] = useState("")

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        const [servicesData, staffData] = await Promise.all([getServices(), getStaff()])

        setServices(servicesData)
        setStaff(staffData)

        // If we have initial IDs from URL, skip to date selection
        if (initialServiceId && initialStaffId) {
          setStep(2)
        }
      } catch (err) {
        setError("Failed to load booking data. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [initialServiceId, initialStaffId])

  useEffect(() => {
    // When date and service/staff are selected, fetch available times
    const fetchAvailableTimes = async () => {
      if (selectedService && selectedStaff && selectedDate) {
        try {
          setLoading(true)
          const formattedDate = selectedDate.toISOString().split("T")[0]
          const times = await getAvailability(selectedService, selectedStaff, formattedDate)
          setAvailableTimes(times)
        } catch (err) {
          setError("Failed to load available times. Please try again later.")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchAvailableTimes()
  }, [selectedService, selectedStaff, selectedDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime) {
      setError("Please complete all booking details")
      return
    }

    try {
      setLoading(true)

      const appointmentData = {
        ClientId: "GUEST", // For guest booking
        ServiceId: selectedService,
        StaffId: selectedStaff,
        StartDateTime: `${selectedDate.toISOString().split("T")[0]}T${selectedTime}`,
        FirstName: customerInfo.firstName,
        LastName: customerInfo.lastName,
        Email: customerInfo.email,
        Phone: customerInfo.phone,
        Notes: customerInfo.notes,
      }

      const result = await bookAppointment(appointmentData)
      setBookingReference(result.AppointmentId || "BBP-" + Math.floor(100000 + Math.random() * 900000))
      setBookingConfirmed(true)
    } catch (err) {
      setError("Failed to book appointment. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
    setError(null)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    setError(null)
  }

  // For demo purposes, generate mock available times if API fails
  const mockAvailableTimes = ["10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:30", "16:00", "16:30"]

  const displayTimes = availableTimes.length > 0 ? availableTimes : mockAvailableTimes

  // Mock data for services and staff if API fails
  const mockServices = [
    { Id: "s1", Name: "Classic Manicure", Price: 29, Duration: 30 },
    { Id: "s2", Name: "Gel Pedicure", Price: 52, Duration: 45 },
    { Id: "s3", Name: "Hair Styling", Price: 45, Duration: 60 },
    { Id: "s4", Name: "Facial Treatment", Price: 67, Duration: 60 },
  ]

  const mockStaff = [
    { Id: "p1", FirstName: "Sarah", LastName: "Johnson", Role: "Nail Technician" },
    { Id: "p2", FirstName: "Aisha", LastName: "Patel", Role: "Hair Stylist" },
    { Id: "p3", FirstName: "Michael", LastName: "Chen", Role: "Esthetician" },
  ]

  const displayServices = services.length > 0 ? services : mockServices
  const displayStaff = staff.length > 0 ? staff : mockStaff

  // Generate calendar days
  const generateCalendar = () => {
    const today = new Date()
    const days = []

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }

    return days
  }

  const calendarDays = generateCalendar()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  if (loading && step === 1) {
    return (
      <div className={`bg-white border border-primary/10 p-8 text-center ${embedded ? "" : "max-w-2xl mx-auto"}`}>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm uppercase tracking-wider">Loading booking options...</p>
      </div>
    )
  }

  if (bookingConfirmed) {
    return (
      <div className={`bg-white border border-primary/10 p-8 text-center ${embedded ? "" : "max-w-2xl mx-auto"}`}>
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-8 h-8 text-primary" />
        </div>

        <h3 className="text-2xl font-serif uppercase tracking-wider mb-4">Booking Confirmed</h3>
        <p className="text-sm mb-6">Your appointment has been scheduled successfully.</p>

        <div className="bg-secondary p-6 mb-6 text-left">
          <p className="mb-2">
            <span className="font-medium">Reference:</span> {bookingReference}
          </p>
          <p className="mb-2">
            <span className="font-medium">Date:</span>{" "}
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mb-2">
            <span className="font-medium">Time:</span> {selectedTime}
          </p>
          <p className="mb-2">
            <span className="font-medium">Name:</span> {customerInfo.firstName} {customerInfo.lastName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {customerInfo.email}
          </p>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          A confirmation email has been sent to {customerInfo.email}. If you need to make any changes to your
          appointment, please contact us.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors uppercase tracking-wider text-xs"
        >
          Return to Home
        </button>
      </div>
    )
  }

  return (
    <div className={`bg-white border border-primary/10 ${embedded ? "" : "max-w-2xl mx-auto"}`}>
      <div className="p-6 border-b border-primary/10">
        <h3 className="text-xl font-serif uppercase tracking-wider text-black">Make a Booking</h3>
        <p className="text-sm text-gold mt-2 font-medium">Schedule your visit to Beauty Bar Parlour</p>
        <p className="text-sm mt-1 text-black">Beyond Ordinary</p>
      </div>

      {/* Progress Steps */}
      <div className="flex border-b border-primary/10">
        <div
          className={`flex-1 p-3 text-center text-xs uppercase tracking-wider ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}
        >
          <span
            className={`inline-block w-6 h-6 rounded-full ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"} mb-1`}
          >
            1
          </span>
          <p>Service</p>
        </div>
        <div
          className={`flex-1 p-3 text-center text-xs uppercase tracking-wider ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}
        >
          <span
            className={`inline-block w-6 h-6 rounded-full ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"} mb-1`}
          >
            2
          </span>
          <p>Date</p>
        </div>
        <div
          className={`flex-1 p-3 text-center text-xs uppercase tracking-wider ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}
        >
          <span
            className={`inline-block w-6 h-6 rounded-full ${step >= 3 ? "bg-primary text-white" : "bg-gray-200"} mb-1`}
          >
            3
          </span>
          <p>Time</p>
        </div>
        <div
          className={`flex-1 p-3 text-center text-xs uppercase tracking-wider ${step >= 4 ? "text-primary" : "text-muted-foreground"}`}
        >
          <span
            className={`inline-block w-6 h-6 rounded-full ${step >= 4 ? "bg-primary text-white" : "bg-gray-200"} mb-1`}
          >
            4
          </span>
          <p>Details</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 text-sm">{error}</div>}

      {/* Step 1: Select Service and Staff */}
      {step === 1 && (
        <div className="p-6">
          <h4 className="font-serif text-lg mb-4">Select Service & Provider</h4>

          <div className="mb-6">
            <label className="block text-sm uppercase tracking-wider mb-2">Service</label>
            <div className="grid grid-cols-1 gap-2">
              {displayServices.map((service) => (
                <div
                  key={service.Id}
                  onClick={() => setSelectedService(service.Id)}
                  className={`p-3 border cursor-pointer transition-colors ${
                    selectedService === service.Id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <span className="font-serif">{service.Name}</span>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3 inline-block mr-1" />
                        {service.Duration} min
                      </div>
                    </div>
                    <span className="text-primary">${service.Price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm uppercase tracking-wider mb-2">Provider</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {displayStaff.map((person) => (
                <div
                  key={person.Id}
                  onClick={() => setSelectedStaff(person.Id)}
                  className={`p-3 border cursor-pointer transition-colors ${
                    selectedStaff === person.Id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center">
                    <User className="w-8 h-8 mr-3 text-muted-foreground" />
                    <div>
                      <span className="font-serif">
                        {person.FirstName} {person.LastName}
                      </span>
                      <div className="text-xs text-muted-foreground mt-1">{person.Role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={nextStep}
              disabled={!selectedService || !selectedStaff}
              className={`px-6 py-3 flex items-center text-xs uppercase tracking-wider ${
                selectedService && selectedStaff
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Date */}
      {step === 2 && (
        <div className="p-6">
          <h4 className="font-serif text-lg mb-4">Select Date</h4>

          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex space-x-2 min-w-max">
              {calendarDays.map((date, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`w-24 p-3 border text-center cursor-pointer transition-colors ${
                    isDateSelected(date) ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="text-xs uppercase tracking-wider mb-1">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="font-serif">{date.getDate()}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {date.toLocaleDateString("en-US", { month: "short" })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 flex items-center text-xs uppercase tracking-wider border border-primary text-primary hover:bg-primary/10"
            >
              <ChevronLeft className="mr-1 w-4 h-4" /> Back
            </button>

            <button
              onClick={nextStep}
              disabled={!selectedDate}
              className={`px-6 py-3 flex items-center text-xs uppercase tracking-wider ${
                selectedDate
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Select Time */}
      {step === 3 && (
        <div className="p-6">
          <h4 className="font-serif text-lg mb-4">Select Time</h4>

          <div className="mb-4 text-center">
            <span className="text-sm font-light">
              {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm">Loading available times...</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
              {displayTimes.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 text-center text-sm transition-colors ${
                    selectedTime === time ? "bg-primary text-white" : "border border-gray-200 hover:border-primary"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 flex items-center text-xs uppercase tracking-wider border border-primary text-primary hover:bg-primary/10"
            >
              <ChevronLeft className="mr-1 w-4 h-4" /> Back
            </button>

            <button
              onClick={nextStep}
              disabled={!selectedTime}
              className={`px-6 py-3 flex items-center text-xs uppercase tracking-wider ${
                selectedTime
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Customer Details */}
      {step === 4 && (
        <div className="p-6">
          <h4 className="font-serif text-lg mb-4">Your Information</h4>

          <div className="bg-secondary p-4 mb-6">
            <h5 className="text-sm uppercase tracking-wider mb-2">Booking Summary</h5>
            <p className="text-sm mb-1">
              <span className="font-medium">Service:</span>{" "}
              {displayServices.find((s) => s.Id === selectedService)?.Name}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Provider:</span>{" "}
              {displayStaff.find((s) => s.Id === selectedStaff)?.FirstName}{" "}
              {displayStaff.find((s) => s.Id === selectedStaff)?.LastName}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Date:</span>{" "}
              {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <p className="text-sm">
              <span className="font-medium">Time:</span> {selectedTime}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.firstName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.lastName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Email *</label>
              <input
                type="email"
                required
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full border border-gray-200 p-3 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="w-full border border-gray-200 p-3 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Special Requests (Optional)</label>
              <textarea
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                rows={3}
                className="w-full border border-gray-200 p-3 focus:outline-none focus:border-primary"
              ></textarea>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 flex items-center text-xs uppercase tracking-wider border border-primary text-primary hover:bg-primary/10"
              >
                <ChevronLeft className="mr-1 w-4 h-4" /> Back
              </button>

              <button
                type="submit"
                disabled={
                  loading ||
                  !customerInfo.firstName ||
                  !customerInfo.lastName ||
                  !customerInfo.email ||
                  !customerInfo.phone
                }
                className={`px-6 py-3 text-xs uppercase tracking-wider ${
                  loading ||
                  !customerInfo.firstName ||
                  !customerInfo.lastName ||
                  !customerInfo.email ||
                  !customerInfo.phone
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

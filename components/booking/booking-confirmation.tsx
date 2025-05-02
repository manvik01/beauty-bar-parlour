import Link from "next/link"
import { CheckCircle } from "lucide-react"
import type { BookingData } from "./booking-form"

interface BookingConfirmationProps {
  bookingData: BookingData
  reference: string
}

export function BookingConfirmation({ bookingData, reference }: BookingConfirmationProps) {
  // Format date for display
  const formattedDate = bookingData.date
    ? bookingData.date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-primary" />
      </div>

      <h2 className="text-2xl font-serif font-light mb-4 uppercase tracking-wider">Booking Confirmed</h2>

      <p className="font-light mb-8">
        Thank you for booking with Beauty Bar Parlour. We look forward to seeing you soon.
      </p>

      <div className="bg-secondary p-6 mb-8 mx-auto max-w-md">
        <h3 className="text-sm uppercase tracking-wider mb-4">Booking Details</h3>

        <div className="space-y-2 text-left">
          <p className="font-light">
            <span className="font-medium">Reference:</span> {reference}
          </p>
          <p className="font-light">
            <span className="font-medium">Service:</span> {bookingData.service}
          </p>
          <p className="font-light">
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
          <p className="font-light">
            <span className="font-medium">Time:</span> {bookingData.time}
          </p>
          <p className="font-light">
            <span className="font-medium">Name:</span> {bookingData.name}
          </p>
          <p className="font-light">
            <span className="font-medium">Email:</span> {bookingData.email}
          </p>
          <p className="font-light">
            <span className="font-medium">Phone:</span> {bookingData.phone}
          </p>
          {bookingData.notes && (
            <p className="font-light">
              <span className="font-medium">Notes:</span> {bookingData.notes}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        A confirmation email has been sent to {bookingData.email}. If you need to make any changes to your appointment,
        please contact us at +65 90662824.
      </p>

      <div className="flex justify-center space-x-4">
        <Link
          href="/"
          className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-all uppercase tracking-widest text-xs"
        >
          Return Home
        </Link>
        <Link
          href="/services"
          className="px-8 py-3 bg-primary text-white hover:bg-primary/90 transition-all uppercase tracking-widest text-xs"
        >
          Explore Services
        </Link>
      </div>
    </div>
  )
}

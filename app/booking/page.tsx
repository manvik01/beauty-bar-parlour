import { BookingForm } from "@/components/booking/booking-form"
import { Suspense } from "react"

// Loading component for the booking form
function BookingFormLoading() {
  return (
    <div className="bg-white p-8 border border-primary/10 shadow-sm">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Reservations</h3>
          <h1 className="clean-subheading">Make a Booking</h1>
        </div>
      </section>

      {/* Booking Content */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mx-auto mb-0 text-left bg-white p-8 border border-gold/20 shadow-sm">
              <h2 className="text-xl font-serif uppercase tracking-wider text-gold text-center font-bold">
                Before Booking Your Appointment at Beauty Bar Parlour
              </h2>
              <p>We're excited to have you visit us! Please read the following before making your appointment:</p>
              
              <h3 className="text-lg font-serif uppercase tracking-wider text-gold mt-6 font-bold">Booking Requests</h3>
              <ul>
                <li>Submitting a booking request does not mean your appointment is confirmed.</li>
                <li>You will receive an email once your booking is approved.</li>
                <li>If you don't hear from us, please contact us directly and we'll be happy to help.</li>
              </ul>

              <h3 className="text-lg font-serif uppercase tracking-wider text-gold mt-6 font-bold">Scheduling Information</h3>
              <ul>
                <li>Appointments are scheduled only during our operating hours and must be approved by our team.</li>
                <li>If you're booking more than one service, please submit a separate request for each time slot, as services can't be split between different beauticians.</li>
                <li>For faster assistance, you're welcome to call or message us directly to book.</li>
              </ul>
              
              <h3 className="text-lg font-serif uppercase tracking-wider text-gold mt-6 font-bold">Need help with your booking?</h3>
              <p>
                Call or WhatsApp us at <a href="tel:+6584158896" className="text-gold hover:underline">+65 8415 8896</a> to schedule your appointment instantly.
              </p>
              
              <p className="text-center mt-6">
                Schedule your appointment with our skilled professionals. Please select your preferred service, date, and time below. We look forward to pampering you at Beauty Bar Parlour.
              </p>
            </div>

            <Suspense fallback={<BookingFormLoading />}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}

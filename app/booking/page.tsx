import { BookingForm } from "@/components/booking/booking-form"

export default function BookingPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Reservations</h3>
          <h1 className="clean-subheading">Make Payment</h1>
        </div>
      </section>

      {/* Booking Content */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-center mb-12 font-light">
              Schedule your appointment with our skilled professionals. Please select your preferred service, date, and
              time below. We look forward to pampering you at Beauty Bar Parlour.
            </p>
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  )
}

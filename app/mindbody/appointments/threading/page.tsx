import { AppointmentsWidget } from "@/components/mindbody/appointments-widget"

export const metadata = {
  title: "Book Threading Service | Beauty Bar Parlour",
  description: "Book your threading appointment online via Mindbody.",
}

export default function ThreadingBookingPage() {
  return (
    <main className="pt-24">
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="clean-heading">Threading Service Booking</h1>
          <p className="clean-subheading">Schedule your threading service conveniently online</p>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom max-w-3xl mx-auto">
          <AppointmentsWidget widgetId="0e33534e78e" />
        </div>
      </section>
    </main>
  )
} 
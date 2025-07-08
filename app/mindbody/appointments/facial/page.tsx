import { AppointmentsWidget } from "@/components/mindbody/appointments-widget"

export const metadata = {
  title: "Book Facial Service | Beauty Bar Parlour",
  description: "Book your facial appointment online via Mindbody.",
}

export default function FacialBookingPage() {
  return (
    <main className="pt-24">
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="clean-heading">Facial Service Booking</h1>
          <p className="clean-subheading">Schedule your facial treatment conveniently online</p>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom max-w-3xl mx-auto">
          <AppointmentsWidget widgetId="0e33532e78e" />
        </div>
      </section>
    </main>
  )
} 
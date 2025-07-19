import MindbodyAppointments from "@/components/MindbodyAppointments"

export const metadata = {
  title: "Book Waxing Service | Beauty Bar Parlour",
  description: "Book your waxing appointment online via Mindbody.",
}

export default function WaxingBookingPage() {
  return (
    <main className="pt-24">
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="clean-heading">Waxing Service Booking</h1>
          <p className="clean-subheading">Schedule your waxing service conveniently online</p>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom max-w-3xl mx-auto">
          <MindbodyAppointments widgetId="0e33533e78e" />
        </div>
      </section>
    </main>
  )
} 
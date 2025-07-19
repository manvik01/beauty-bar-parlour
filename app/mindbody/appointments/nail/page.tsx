import MindbodyAppointments from "@/components/MindbodyAppointments"

export const metadata = {
  title: "Book Nail & Foot Spa Service | Beauty Bar Parlour",
  description: "Book your nail and foot spa appointment online via Mindbody.",
}

export default function NailBookingPage() {
  return (
    <main className="pt-24">
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="clean-heading">Nail & Foot Spa Booking</h1>
          <p className="clean-subheading">Schedule your nail or foot spa service online</p>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom max-w-3xl mx-auto">
          <MindbodyAppointments widgetId="0e33444e78e" />
        </div>
      </section>
    </main>
  )
} 
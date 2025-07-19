import { AppointmentsWidget } from "@/components/mindbody/appointments-widget";

export const metadata = {
  title: "Book AFT Treatment | Beauty Bar Parlour",
  description: "Book your AFT Treatment appointment online via Mindbody.",
}

export default function AFTBookingPage() {
  return (
    <main className="pt-24">
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="clean-heading">AFT Treatment Booking</h1>
          <p className="clean-subheading">Schedule your laser hair removal treatment conveniently online</p>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom max-w-3xl mx-auto">
          {/* Re-usable and Robust Mindbody Appointments Widget */}
          <AppointmentsWidget widgetId="0e33535e78e" isAftTreatment={true} />
        </div>
      </section>
    </main>
  );
} 
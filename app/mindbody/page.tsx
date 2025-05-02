import { ServiceScheduleWidget } from "@/components/mindbody/service-schedule-widget"
import { StaffWidget } from "@/components/mindbody/staff-widget"
import { BookingWidget } from "@/components/mindbody/booking-widget"
import { ClientAccountWidget } from "@/components/mindbody/client-account-widget"
import { Suspense } from "react"

export default function MindbodyIntegrationPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Mindbody Integration</h3>
          <h1 className="clean-subheading">Booking & Services</h1>
        </div>
      </section>

      {/* Widgets Showcase */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-center mb-12 font-light">
              Beauty Bar Parlour is integrated with Mindbody to provide a seamless booking experience. Browse our
              services, meet our team, book appointments, and manage your account all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-serif uppercase tracking-wider mb-6">Services Schedule</h2>
              <p className="mb-6 font-light">
                Browse our services and pricing. This widget displays all available services from our Mindbody system.
              </p>
              <ServiceScheduleWidget />
            </div>

            <div>
              <h2 className="text-2xl font-serif uppercase tracking-wider mb-6">Our Team</h2>
              <p className="mb-6 font-light">
                Meet our skilled professionals. This widget displays our staff members from Mindbody.
              </p>
              <StaffWidget />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-serif uppercase tracking-wider mb-6 text-center">Booking Widget</h2>
            <p className="text-center mb-6 font-light max-w-2xl mx-auto">
              Book appointments directly through our website. This widget integrates with Mindbody to show real-time
              availability and process bookings.
            </p>
            <Suspense fallback={<div className="text-center p-8">Loading booking widget...</div>}>
              <BookingWidget />
            </Suspense>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif uppercase tracking-wider mb-6 text-center">Client Account</h2>
            <p className="text-center mb-6 font-light">
              Manage your appointments and profile. This widget allows clients to view and manage their Mindbody
              account.
            </p>
            <ClientAccountWidget />
          </div>
        </div>
      </section>
    </main>
  )
}

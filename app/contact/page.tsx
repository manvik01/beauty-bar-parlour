"use client"
import { MapPin, Clock, Phone, Mail, type LucideIcon } from "lucide-react"
import { EnquiryForm } from "@/components/enquiry/enquiry-form"

type ContactPillar = {
  icon: LucideIcon
  label: string
  primary: string
  href?: string
  secondary?: string
  secondaryHref?: string
}

const contactPillars: ContactPillar[] = [
  {
    icon: MapPin,
    label: "Location",
    primary: "Elias Mall, #02-328",
    secondary: "625 Elias Road, Pasir Ris, Singapore 510625",
  },
  {
    icon: Clock,
    label: "Operating Hours",
    primary: "Mon – Sat · 10am – 7pm",
    secondary: "Sun · 10am – 6pm",
  },
  {
    icon: Phone,
    label: "Call or WhatsApp",
    primary: "+65 8415 8896",
    href: "tel:+6584158896",
    secondaryHref: "https://wa.me/6584158896",
    secondary: "Message us on WhatsApp",
  },
  {
    icon: Mail,
    label: "Email",
    primary: "enquiry@beautybarparlour.com",
    href: "mailto:enquiry@beautybarparlour.com",
  },
]

export default function ContactPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h3 className="clean-heading">Contact Us</h3>
          <h1 className="clean-subheading">Get In Touch</h1>
          <p className="body-md mt-6 max-w-2xl mx-auto">
            Tell us what you&apos;re interested in and we&apos;ll reach out through the channel
            you prefer. For booking, you can also head straight to Fresha.
          </p>
        </div>
      </section>

      {/* Contact info pillars */}
      <section className="py-12 bg-white border-b border-gold/15">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.label}
                  className="flex items-start gap-4 p-5 rounded-lg border border-gold/15 bg-white hover:border-gold/40 transition-colors"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 text-gold flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-gold/80 font-medium">
                      {pillar.label}
                    </p>
                    {pillar.href ? (
                      <a
                        href={pillar.href}
                        target={pillar.href.startsWith("http") ? "_blank" : undefined}
                        rel={pillar.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="block text-sm font-medium text-black mt-0.5 break-words hover:text-gold transition-colors"
                      >
                        {pillar.primary}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-black mt-0.5 break-words">
                        {pillar.primary}
                      </p>
                    )}
                    {pillar.secondary &&
                      (pillar.secondaryHref ? (
                        <a
                          href={pillar.secondaryHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-muted-foreground mt-1 hover:text-gold transition-colors"
                        >
                          {pillar.secondary}
                        </a>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-1">
                          {pillar.secondary}
                        </p>
                      ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enquiry form — the page centerpiece */}
      <section id="enquiry-form" className="py-16 sm:py-20 bg-secondary scroll-mt-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="clean-heading">Customer Interest Form</h3>
              <h2 className="clean-subheading">Tell us what you&apos;re looking for</h2>
              <p className="body-md mt-4 max-w-2xl mx-auto">
                Pick the services you&apos;re interested in and the best way to reach you.
                Our team will follow up personally.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-10 border border-gold/20 shadow-sm rounded-lg">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white">
        <div className="container-custom py-12">
          <div className="text-center mb-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold font-medium">
              Visit Us
            </p>
            <h2 className="font-serif text-2xl text-black mt-1">
              Elias Mall, Pasir Ris
            </h2>
          </div>
          <div className="h-[360px] sm:h-[420px] w-full overflow-hidden rounded-lg border border-gold/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7258670816313!2d103.9494!3d1.3767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjInMzYuMSJOIDEwM8KwNTYnNTcuOCJF!5e0!3m2!1sen!2ssg!4v1619144473623!5m2!1sen!2ssg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Beauty Bar Parlour location"
              className="grayscale"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}

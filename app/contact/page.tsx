"use client"
import { MapPin, Clock, Phone, Mail } from "lucide-react"
import { EnquiryForm } from "@/components/enquiry/enquiry-form"

export default function ContactPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Contact Us</h3>
          <h1 className="clean-subheading">Get In Touch</h1>
        </div>
      </section>

      {/* Contact info + map */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif mb-8">We&apos;d Love To Hear From You</h2>
              <p className="body-md mb-8">
                Whether you have questions about our services, want to book an appointment, or just want to say hello,
                we&apos;re here for you. Reach out to us using any of the methods below, or fill in the enquiry form to tell us
                exactly what you&apos;re interested in &mdash; we&apos;ll get back to you on your preferred channel.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg mb-1">Location</h3>
                    <p>Elias Mall, #02-328, 625 Elias Road, Pasir Ris, Singapore 510625</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg mb-1">Operating Hours</h3>
                    <div className="mt-1 flex">
                      <p className="w-32">Operating Hours:</p>
                      <div>
                        <p>10:00 AM - 7:00 PM, Mon-Sat</p>
                        <p>10:00 AM - 6:00 PM, Sun</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg mb-1">Phone</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a href="tel:+6584158896" className="hover:text-primary transition-colors">
                        +65 84158896
                      </a>
                      <span className="text-gray-400">|</span>
                      <a
                        href="https://wa.me/6584158896"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg mb-1">Email</h3>
                    <a
                      href="mailto:enquiry@beautybarparlour.com"
                      className="hover:text-primary transition-colors"
                    >
                      enquiry@beautybarparlour.com
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="#enquiry-form"
                className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium uppercase tracking-widest text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:bg-gold/90 glitter-border"
              >
                Enquire Now
              </a>
            </div>

            <div className="h-[400px] sm:h-[500px] lg:h-auto lg:min-h-[500px]">
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
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry-form" className="clean-section bg-secondary scroll-mt-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="clean-heading">Customer Interest Form</h3>
              <h2 className="clean-subheading">Tell us what you&apos;re looking for</h2>
              <p className="body-md mt-4 max-w-2xl mx-auto">
                Pick the services you&apos;re interested in and the best way to reach you. Our team will follow up
                personally &mdash; this form is for enquiries only and is separate from the Fresha booking journey.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-10 border border-gold/20 shadow-sm rounded-lg">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client"
import { MapPin, Clock, Phone, Mail } from "lucide-react"
import { ProspectsWidget } from "@/components/mindbody/prospects-widget"

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

      {/* Contact Content */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif mb-8">We'd Love To Hear From You</h2>
              <p className="body-md mb-8">
                Whether you have questions about our services, want to book an appointment, or just want to say hello,
                we're here for you. Reach out to us using any of the methods below.
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
                    <h3 className="font-serif text-lg mb-1">Opening Soon</h3>
                    <p>July 26, 2025</p>
                    <p className="mt-1">Operating Hours: 10:00 AM – 8:00 PM, Daily</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg mb-1">Phone</h3>
                    <p>+65 84158896</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg mb-1">Email</h3>
                    <p>enquiry@beautybarparlour.com</p>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-border p-3 focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium mb-2">Contact</label>
                    <input
                      type="tel"
                      id="contact"
                      className="w-full border border-border p-3 focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your Contact Number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-border p-3 focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                {/* Mindbody Prospects Widget */}
                <div id="prospects-container">
                  <ProspectsWidget />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const container = document.getElementById("prospects-container")
                      if (container) {
                        const btn = container.querySelector<HTMLElement>('input[type="submit"], button[type="submit"]')
                        btn?.click()
                      }
                    }
                  }}
                  className="clean-button"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="h-[600px] lg:h-auto">
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
    </main>
  )
}

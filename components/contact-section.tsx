import Link from "next/link"
import { MapPin, Clock, Phone, Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section className="clean-section bg-secondary">
      <div className="container-custom">
        <h3 className="clean-heading">Contact</h3>
        <h2 className="clean-subheading">Visit Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mt-8">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-light text-lg mb-1 uppercase tracking-wider">Location</h3>
                  <p className="font-light">Elias Mall, Singapore</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-light text-lg mb-1 uppercase tracking-wider">Opening Soon</h3>
                  <p className="font-light">June 7, 2025</p>
                  <p className="mt-1 font-light">Operating Hours: 10:00 AM – 8:00 PM, Daily</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-light text-lg mb-1 uppercase tracking-wider">Phone</h3>
                  <p className="font-light">+65 90662824</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-light text-lg mb-1 uppercase tracking-wider">Email</h3>
                  <p className="font-light">enquiry@beautybarparlour.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/contact" className="clean-button">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="h-[400px] md:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7258670816313!2d103.9494!3d1.3767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768<Thinking>
The text was cut off in the middle of an iframe src URL in the contact-section.tsx component. I need to continue the iframe code and complete the component, then finish any other components that might have been cut off. This appears to be part of updating the contact section with the new email address.
</Thinking>

maps/embed?pb=!1m18!1m12!1m3!1d3988.7258670816313!2d103.9494!3d1.3767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjInMzYuMSJOIDEwM8KwNTYnNTcuOCJF!5e0!3m2!1sen!2ssg!4v1619144473623!5m2!1sen!2ssg"
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
  )
}

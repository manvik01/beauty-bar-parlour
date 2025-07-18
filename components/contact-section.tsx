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
                  <p className="font-light">Elias Mall, #02-328, 625 Elias Road, Pasir Ris, Singapore 510625</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-light text-lg mb-1 uppercase tracking-wider">Opening Soon</h3>
                  <p className="font-light">July 27, 2025</p>
                  <div className="mt-1 font-light">
                      <p>Operating Hours: 10:00 AM - 8:00 PM, Mon-Sat</p>
                      <p>10:00 AM - 6:00 PM, Sun</p>
                    </div>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-light text-lg mb-1 uppercase tracking-wider">Phone</h3>
                  <p className="font-light">+65 84158896</p>
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

          <div className="h-[400px] md:h-auto bg-gray-100 relative">
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=103.93272399902345%2C1.3605785378077986%2C103.96688842773439%2C1.38552628565068&amp;layer=mapnik&amp;marker=1.3730532168123306%2C103.94980621337892" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Beauty Bar Parlour location"
              className="grayscale"
            ></iframe>
            <div className="absolute bottom-3 right-3">
              <a 
                href="https://goo.gl/maps/LgK2L3ybJzQpfRtR8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-white text-xs px-3 py-1 rounded-sm hover:bg-primary/90 transition-colors"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

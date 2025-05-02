import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">About Us</h3>
          <h1 className="clean-subheading">Our Story</h1>
        </div>
      </section>

      {/* About Content */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-serif mb-6">Beauty Bar Parlour</h2>
              <p className="body-md mb-6">
                Welcome to Beauty Bar Parlour, where we redefine beauty with our tagline "Beyond Ordinary." Our primary
                focus is on caring for our customers and providing a truly pampering experience.
              </p>
              <p className="body-md mb-6">
                We proudly use high-quality products in all our services, including our specialized nail spa,
                rejuvenating hair spa, revitalizing facials, expert waxing and threading, and exquisite henna services.
              </p>
              <p className="body-md">
                Our skilled professionals are dedicated to understanding your unique beauty needs and tailoring each
                treatment just for you. Experience the extraordinary care you deserve at Beauty Bar Parlour!
              </p>
            </div>
            <div className="relative h-[500px]">
              <Image src="/pedicure-service.jpeg" alt="Beauty Bar Parlour Interior" fill className="object-cover" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif mb-6 text-center">Our Vision</h2>
            <p className="body-md mb-8 text-center">
              At Beauty Bar Parlour, we envision a space where beauty services transcend the ordinary, where each client
              feels valued, understood, and transformed. We strive to create an environment that celebrates
              individuality while providing exceptional care and results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 border-t border-primary/20">
                <h3 className="text-xl font-serif mb-4">Quality</h3>
                <p>
                  We use only premium products and techniques to ensure the best results for our clients. Quality is
                  never compromised.
                </p>
              </div>
              <div className="text-center p-6 border-t border-primary/20">
                <h3 className="text-xl font-serif mb-4">Expertise</h3>
                <p>
                  Our team consists of skilled professionals who are passionate about their craft and continuously
                  update their skills.
                </p>
              </div>
              <div className="text-center p-6 border-t border-primary/20">
                <h3 className="text-xl font-serif mb-4">Care</h3>
                <p>
                  We believe in personalized care that addresses the unique needs and preferences of each individual
                  client.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/services" className="clean-button">
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

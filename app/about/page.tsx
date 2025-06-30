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
                Beauty Bar Parlour – Where Beauty Feels Beyond Ordinary
              </p>
              <p className="body-md mb-6">
                Welcome to Beauty Bar Parlour, a modern sanctuary for self-care nestled in Elias Mall, Singapore. We
                offer a luxurious yet approachable beauty experience—where top-class service meets fair, transparent
                pricing, and you'll never face the pressure of hard selling.
              </p>
              <p className="body-md mb-6">
                Our wide range of treatments includes manicures, pedicures, indulgent foot spas, revitalizing facials,
                traditional herbal hair therapies, expert waxing and threading, and advanced laser hair removal. We
                proudly feature over 900 gel polish shades, including HEMA-free, halal, and vegan options—making beauty
                safer, more inclusive, and truly personalized.
              </p>
              <p className="body-md mb-6">
                Our facial services use natural products from renowned brands like World of Beauty Italy and The Ayurveda
                Experience, blending modern science with ancient wisdom. We also offer nourishing hot oil massages with
                premium, all-natural oils that deeply condition and support healthy hair growth. For long-lasting
                smoothness, our laser hair removal uses the latest AFT (Advanced Fluorescence Technology)—a cooling,
                effective, and painless method designed for optimal comfort and results.
              </p>
              <p className="body-md">
                Hygiene and safety are at the heart of everything we do. Whether you're dropping in for a quick polish
                or indulging in a full pampering session, we're here to ensure you leave feeling refreshed, confident,
                and completely cared for—because at Beauty Bar Parlour, beauty isn't just a service, it's a celebration
                of you.
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

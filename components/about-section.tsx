import Image from "next/image"

export function AboutSection() {
  return (
    <section className="clean-section">
      <div className="container-custom">
        <h3 className="clean-heading">About Us</h3>
        <h2 className="clean-subheading">Beauty Bar Parlour</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="body-md mb-6 font-light">
              <strong>Beauty Bar Parlour – Where Beauty Feels Beyond Ordinary</strong>
            </p>
            <p className="body-md mb-6 font-light">
              Welcome to Beauty Bar Parlour, a modern sanctuary for self-care nestled in Elias Mall, Singapore. We
              offer a luxurious yet approachable beauty experience—where top-class service meets fair, transparent
              pricing, and you'll never face the pressure of hard selling.
            </p>
            <p className="body-md mb-6 font-light">
              Our wide range of treatments includes manicures, pedicures, indulgent foot spas, revitalizing facials,
              traditional herbal hair therapies, expert waxing and threading, and advanced laser hair removal. We
              proudly feature over 900 gel polish shades, including HEMA-free, halal, and vegan options—making beauty
              safer, more inclusive, and truly personalized.
            </p>
            <p className="body-md mb-6 font-light">
              Our facial services use natural products from renowned brands like <em>World of Beauty Italy</em> and
              <em> The Ayurveda Experience</em>, blending modern science with ancient wisdom. We also offer nourishing
              hot oil massages with premium, all-natural oils that deeply condition and support healthy hair growth.
              For long-lasting smoothness, our laser hair removal employs the latest AFT (Advanced Fluorescence
              Technology)—a cooling, effective, and painless method designed for optimal comfort and results.
            </p>
            <p className="body-md mb-6 font-light">
              Hygiene and safety are at the heart of everything we do. We uphold the highest standards of cleanliness
              and provide a calm, cooling, and relaxing environment designed for your complete comfort and peace of
              mind.
            </p>
            <p className="body-md font-light">
              Whether you're dropping in for a quick polish or indulging in a full pampering session, we're here to
              ensure you leave feeling refreshed, confident, and completely cared for—because at Beauty Bar Parlour,
              beauty isn't just a service, it's a celebration of <em>you</em>.
            </p>
          </div>
          <div className="relative h-[500px]">
            <Image src="/about-us-photo.png" alt="Beauty Bar Parlour Nail Spa" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

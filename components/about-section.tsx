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
              Welcome to Beauty Bar Parlour, where beauty goes Beyond Ordinary. We're more than just a beauty salon —
              we're a sanctuary where customers are truly celebrated.
            </p>
            <p className="body-md mb-6 font-light">
              From our specialized nail spa offering over 900 GEL colors and vegan nail polish options, to our herbal
              treatments, expert waxing and threading, revitalizing facials using luxurious products like World of
              Beauty Italy and the Ayurvedic Experience, and our advanced painless AFT hair removal services, every
              service is designed with your comfort and care in mind. We take pride in our exceptional hygiene
              standards, non-pushy approach, and use only high-quality products, while keeping our prices refreshingly
              reasonable.
            </p>
            <p className="body-md font-light">
              At Beauty Bar Parlour, we don't just enhance your beauty — we create a pampering experience that's
              personal, uplifting, and truly beyond the ordinary.
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

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
              Welcome to Beauty Bar Parlour, where we redefine beauty with our tagline "Beyond Ordinary." Our primary
              focus is on caring for our customers and providing a truly pampering experience.
            </p>
            <p className="body-md mb-6 font-light">
              We proudly use high-quality products in all our services, including our specialized nail spa, rejuvenating
              hair spa, revitalizing facials, expert waxing and threading, and exquisite henna services.
            </p>
            <p className="body-md font-light">
              Our skilled professionals are dedicated to understanding your unique beauty needs and tailoring each
              treatment just for you. Experience the extraordinary care you deserve at Beauty Bar Parlour!
            </p>
          </div>
          <div className="relative h-[500px]">
            <Image src="/pedicure-service.jpeg" alt="Beauty Bar Parlour Interior" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

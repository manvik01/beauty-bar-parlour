import Link from "next/link"
import Image from "next/image"

const serviceCategories = [
  {
    title: "Hair Services",
    description: "Professional Styling",
    image: "/hair-service-hd.png",
    link: "/services#hair",
  },
  {
    title: "Nail Services",
    description: "Manicure & Pedicure",
    image: "/nail-service-gold.png",
    link: "/services#nail",
  },
  {
    title: "Facial Services",
    description: "Skincare Treatments",
    image: "/facial-service-hd.png",
    link: "/services#facial",
  },
  {
    title: "Waxing & Threading",
    description: "Hair Removal",
    image: "/waxing-service-hd.png",
    link: "/services#waxing",
  },
  {
    title: "Henna Art",
    description: "Traditional Designs",
    image: "/henna-service-hd.png",
    link: "/services#henna",
  },
  {
    title: "Bridal Services",
    description: "Special Occasions",
    image: "/bridal-service-hd.png",
    link: "/services#bridal",
  },
  // You can add new service categories here
  // Example:
  // {
  //   title: "Massage Therapy",
  //   description: "Relaxation & Wellness",
  //   image: "/massage-service.png",
  //   link: "/services#massage",
  // },
]

export function ServicesSection() {
  return (
    <section className="clean-section bg-secondary">
      <div className="container-custom">
        <h3 className="clean-heading">Our Services</h3>
        <h2 className="clean-subheading">What We Offer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <Link key={category.title} href={category.link} className="group">
              <div className="bg-white overflow-hidden elegant-hover">
                <div className="relative h-64">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg uppercase tracking-wider mb-2 font-medium">{category.title}</h3>
                  <p className="text-sm text-gold font-medium">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="clean-button">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

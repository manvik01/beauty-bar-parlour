"use client"

import React from "react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Priya",
    role: "Full-time Beautician",
    image: "/public/images/priya.png", // Placeholder image path
    description: "Priya is our full-time Beautician from Chennai, India, bringing over 10 years of experience in the beauty and wellness industry. She is especially loved for her signature facials and hot oil spa treatments, with many loyal clients returning to her regularly. Priya is known for her exceptional dedication, often going above and beyond to ensure her clients leave fully satisfied. Her work has earned her outstanding reviews and deep client trust.",
    availability: "Monday, Tuesday, Thursday to Sunday (Off on Wednesdays)",
  },
  {
    name: "Komal",
    role: "Full-time Beautician",
    image: "/public/images/komal.png", // Placeholder image path
    description: "Komal is our full-time Beautician from Malaysia, with over 8 years of hands-on experience working in Singapore. She is highly skilled in threading and waxing, and is known for her gentle touch, attention to detail, and dedication to client comfort and care. Her friendly nature and professional expertise make every appointment a smooth and pleasant experience. Fluent in English, Hindi, Malay, Tamil, and Punjabi, Komal ensures every client feels at ease and well-understood.",
    availability: "Tuesday to Sunday (Off on Mondays)",
  },
  {
    name: "Jasmine",
    role: "Full-time Nail Technician",
    image: "/public/images/jasmine.png", // Placeholder image path
    description: "Our full-time Nail Technician from Vietnam, Jasmine has been living in Singapore for over 10 years. With more than a decade of experience, she brings a meticulous eye for detail, a soft approach, and a loving personality to every session. Jasmine can do it all — from classic to creative — to make your nails look their absolute best.",
    availability: "Monday to Saturday (Off on Sundays)",
  },
  {
    name: "Nana",
    role: "Part-time Nail Technician",
    image: "/public/images/nana.png", // Placeholder image path
    description: "Our part-time Nail Technician from Vietnam, now based in Singapore for 14 years. With over 10 years of experience, she’s skilled in manicures, pedicures, nail art, extensions, foot spa, and nail care treatments. Nana’s bubbly, friendly personality makes every visit a joy.",
    availability: "Saturdays & Sundays",
  },
]

export default function OurTeamPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Our Expertise</h3>
          <h1 className="clean-subheading">Meet Our Team</h1>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gold/20 flex flex-col items-center text-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <h2 className="text-xl font-serif text-black font-medium mb-1">{member.name}</h2>
                <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">{member.description}</p>
                <p className="text-gray-600 text-xs font-medium italic">
                  Available: {member.availability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

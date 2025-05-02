"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Nails",
    description: "Nail art that's totally you ✨",
    image: "/gen-z-nails.png",
    emoji: "💅",
  },
  {
    id: 2,
    name: "Hair",
    description: "Styles that pass the vibe check 💯",
    image: "/gen-z-hair.png",
    emoji: "💇‍♀️",
  },
  {
    id: 3,
    name: "Makeup",
    description: "Slay all day, no filter needed 💄",
    image: "/gen-z-makeup.png",
    emoji: "👁️",
  },
  {
    id: 4,
    name: "Spa",
    description: "Self-care isn't selfish, bestie 🧖‍♀️",
    image: "/gen-z-spa.png",
    emoji: "🧖‍♀️",
  },
]

export function ServiceTeasers() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="sticker sticker-teal inline-flex items-center">
              <Sparkles className="w-4 h-4 mr-2" /> Our Services
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif mb-4 text-black"
          >
            <span className="squiggle squiggle-yellow">Glow-Up</span> Services
          </motion.h2>
          <p className="text-xl max-w-md mx-auto text-black font-medium">
            Main character energy starts here. No gatekeeping, just good vibes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="service-card group"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  className="object-cover service-image"
                />
                <div
                  className="absolute top-4 right-4 text-4xl emoji-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {service.emoji}
                </div>
                <div className="service-caption bg-white/90 text-black">
                  <h3 className="text-xl font-serif">{service.name}</h3>
                  <p className="text-sm">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

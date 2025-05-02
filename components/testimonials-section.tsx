"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah L.",
    service: "Gel Manicure & Pedicure",
    quote: "The attention to detail at Beauty Bar Parlour is unmatched. My nails have never looked better!",
    rating: 5,
  },
  {
    name: "Priya M.",
    service: "Bridal Package",
    quote: "I felt like royalty on my wedding day. The team went above and beyond to make me look and feel beautiful.",
    rating: 5,
  },
  {
    name: "James T.",
    service: "Men's Haircut",
    quote: "Professional service in a relaxing environment. Best haircut I've had in Singapore.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h3 className="clean-heading text-gold">Testimonials</h3>
        <h2 className="clean-subheading text-black">What Our Clients Say</h2>

        <div className="max-w-3xl mx-auto relative bg-white border border-primary/10 p-8">
          <div className="text-center px-8">
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-xl italic mb-8 text-black">"{testimonials[currentIndex].quote}"</p>
            <p className="font-serif text-lg text-black">{testimonials[currentIndex].name}</p>
            <p className="text-sm text-black/70">{testimonials[currentIndex].service}</p>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-white border border-primary rounded-none hover:bg-primary/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-white border border-primary rounded-none hover:bg-primary/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </section>
  )
}

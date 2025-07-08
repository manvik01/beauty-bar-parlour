"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { GlitterEffect } from "./glitter-effect"

const heroImages = [
  {
    src: "/manicure-closeup.png",
    alt: "Elegant manicure service at Beauty Bar Parlour",
  },
  {
    src: "/hand-treatment.png",
    alt: "Luxurious hand treatment at Beauty Bar Parlour",
  },
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate images
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Pause auto-rotation when user interacts
  const handleManualNavigation = (index: number) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)

    // Resume auto-rotation after 10 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)

    return () => clearTimeout(timeout)
  }

  const nextImage = () => {
    handleManualNavigation((currentImageIndex + 1) % heroImages.length)
  }

  const prevImage = () => {
    handleManualNavigation((currentImageIndex - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section className="relative h-[90vh] md:h-screen flex items-center overflow-hidden pt-16 md:pt-24">
      {/* Hero Background with Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroImages[currentImageIndex].src || "/placeholder.svg"}
            alt={heroImages[currentImageIndex].alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualNavigation(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-gold scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slider Arrows - larger touch targets */}
      <button
        onClick={prevImage}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Content - improved mobile layout */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-4 md:ml-8 lg:ml-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight mb-2 uppercase tracking-widest text-white">
            Beauty Bar <br />
            <span className="text-gold glitter-text-enhanced">Parlour</span>
          </h1>

          {/* Sparkle elements */}
          <div className="relative">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `sparkle ${1 + Math.random() * 2}s infinite ${Math.random() * 2}s`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                }}
              />
            ))}
          </div>

          <div className="mb-4 md:mb-6">
            <span className="text-sm uppercase tracking-widest text-gold font-medium glitter-bold">
              Beyond Ordinary
            </span>
          </div>

          <div className="w-16 md:w-24 h-px bg-gold mb-4 md:mb-6"></div>

          <p className="text-base md:text-lg mb-6 md:mb-8 max-w-md font-medium text-white">
            Step into our tranquil oasis, indulge in self-care, and discover a beauty journey that exceeds your
            expectations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/services"
              className="px-6 sm:px-8 py-3 bg-gold text-black hover:bg-gold/90 transition-all duration-300 uppercase tracking-widest text-xs glitter-border text-center"
            >
              Our Services
            </Link>
            <Link
              href="/booking"
              className="px-6 sm:px-8 py-3 border border-white text-white hover:bg-white/10 transition-all duration-300 uppercase tracking-widest text-xs glitter-border text-center"
            >
              Buy Now
            </Link>
          </div>
        </motion.div>
      </div>
      <GlitterEffect targetSelector=".glitter-text-enhanced" />
    </section>
  )
}

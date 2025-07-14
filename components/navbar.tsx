"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery", hidden: true },
  { name: "Service Menu", href: "/services" },
  { name: "Register", href: "/register" },
  { name: "Contact Us", href: "/contact" },
  { name: "Buy Now", href: "/booking" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useIsMobile()

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-elegant ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo - positioned left */}
          <Link href="/" className="relative z-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Transparent%20Logo-UGwsiSqHFvdgpAJe0uPY3bKNkKzNVw.png"
              alt="Beauty Bar Parlour"
              width={280}
              height={130}
              className="h-auto w-auto max-w-[200px] md:max-w-[280px]"
              priority
            />
          </Link>

          {/* Desktop Navigation - moved to right */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks
              .filter(link => !link.hidden)
              .map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white text-xs uppercase tracking-widest hover:text-gold transition-colors group ${
                    link.name === "Buy Now"
                      ? "px-4 py-2 bg-gold text-black hover:bg-gold/90 font-medium glitter-border"
                      : ""
                  }`}
                >
                  <span className="group-hover:glitter-bold">
                    {link.name}
                  </span>
                </Link>
              ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center touch-none">
            <nav className="flex flex-col items-center space-y-8 p-6 w-full max-w-sm">
              {navLinks
                .filter(link => !link.hidden)
                .map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-white text-lg uppercase tracking-wider ${
                      link.name === "Buy Now"
                        ? "px-6 py-3 bg-gold text-black hover:bg-gold/90 font-medium mt-6 w-full text-center"
                        : "w-full text-center py-2"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

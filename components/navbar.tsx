"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Service Menu", href: "/services" },
  { name: "Contact Us", href: "/contact" },
  { name: "Book Now", href: "/booking" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
              className="h-auto"
            />
          </Link>

          {/* Desktop Navigation - moved to right */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-white text-xs uppercase tracking-widest hover:text-gold transition-colors group ${
                  link.name === "Book Now"
                    ? "px-4 py-2 bg-gold text-black hover:bg-gold/90 font-medium glitter-border"
                    : ""
                }`}
              >
                <span className="group-hover:glitter-bold">{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-0 flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white text-lg uppercase tracking-wider ${
                    link.name === "Book Now" ? "px-6 py-2 bg-gold text-black hover:bg-gold/90 font-medium mt-4" : ""
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

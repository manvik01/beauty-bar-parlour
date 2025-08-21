"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    subLinks: [
      { name: "Our Team", href: "/about/our-team" },
    ],
  },
  { name: "Gallery", href: "/gallery", hidden: true },
  { name: "Service Menu", href: "/services" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Register", href: "/register" },
  { name: "Book Now", href: "/booking" },
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
                link.subLinks ? (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger
                      className={`text-white text-xs uppercase tracking-widest hover:text-gold transition-colors group focus:outline-none`}
                    >
                      <span className="group-hover:glitter-bold">
                        {link.name}
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black border-gold/50 text-white rounded-md shadow-lg min-w-[150px]">
                      {link.subLinks.map(subLink => (
                        <DropdownMenuItem key={subLink.name} asChild>
                          <Link href={subLink.href} className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-gold/20 hover:text-gold transition-colors">
                            {subLink.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-white text-xs uppercase tracking-widest hover:text-gold transition-colors group ${
                      link.name === "Book Now"
                        ? "px-4 py-2 bg-gold text-black hover:bg-gold/90 font-medium glitter-border"
                        : ""
                    }`}
                  >
                    <span className="group-hover:glitter-bold">
                      {link.name}
                    </span>
                  </Link>
                )
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
            <nav className="flex flex-col items-center space-y-8 p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
              {navLinks
                .filter(link => !link.hidden)
                .map(link => (
                  link.subLinks ? (
                    <div key={link.name} className="w-full text-center">
                      <Link
                        href={link.href}
                        className="text-white text-lg uppercase tracking-wider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-150 w-full text-center py-4 px-2 block"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                      <div className="flex flex-col items-center mt-2 space-y-2">
                        {link.subLinks.map(subLink => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className="text-white/80 text-base uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-150 w-full text-center py-2 px-2 block"
                            onClick={() => setIsOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-white text-lg uppercase tracking-wider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-150 ${
                        link.name === "Book Now"
                          ? "px-8 py-4 bg-gold text-black hover:bg-gold/90 font-medium mt-6 w-full text-center"
                          : "w-full text-center py-4 px-2"
                      }`}
                      style={{ minHeight: 56 }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

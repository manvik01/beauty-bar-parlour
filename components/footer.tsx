"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"

export function Footer() {
  // Set the target date to July 27, 2025
  const openingDate = new Date("2025-07-27T00:00:00")

  return (
    <footer className="bg-white py-12 text-black border-t border-gold/20">
      <div className="container-custom">
        {/* Opening Soon Section */}
        <div className="mb-12 py-8 border-b border-primary/20">
          <div className="max-w-xl mx-auto">
            <h3 className="text-center text-2xl font-serif mb-6 uppercase tracking-widest text-black">
              Opening Soon
            </h3>
            <CountdownTimer targetDate={openingDate} />
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Transparent%20Logo-UGwsiSqHFvdgpAJe0uPY3bKNkKzNVw.png"
            alt="Beauty Bar Parlour"
            width={180}
            height={90}
            className="h-auto mb-6"
          />

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-black hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-xs uppercase tracking-widest text-black hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-xs uppercase tracking-widest text-black hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/register"
              className="text-xs uppercase tracking-widest text-black hover:text-primary transition-colors"
            >
              Register
            </Link>
            <Link
              href="/booking"
              className="text-xs uppercase tracking-widest text-black hover:text-primary transition-colors"
            >
              Book Now
            </Link>
          </div>

          <div className="flex space-x-4 mb-6">
            <Link
              href="https://www.instagram.com/beautybarparlour?igsh=dGpwZXlzM3d5Ynhq"
              className="text-black hover:text-primary transition-colors"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.facebook.com/share/15ezMQYwpK/?mibextid=wwXIfr"
              className="text-black hover:text-primary transition-colors"
            >
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-black hover:text-primary transition-colors"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>

          <div className="text-xs text-black/70">
            <p>
              © {new Date().getFullYear()} Beauty Bar Parlour. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

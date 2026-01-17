"use client"

import Link from "next/link"

export default function ThankYouContactPage() {
  return (
    <main className="pt-24 min-h-screen bg-secondary">
      <section className="py-16">
        <div className="container-custom max-w-xl mx-auto text-center bg-white p-10 rounded-lg shadow-md border border-gold/20">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-4 uppercase tracking-widest">
            Thank You!
          </h1>
          <p className="text-lg md:text-xl text-black mb-6 font-serif">
            Thank you for contacting us.<br />
            We will get back to you shortly.
          </p>
          <p className="text-base text-muted-foreground mb-8">
            If you need immediate assistance, call{" "}
            <a href="tel:+6584158896" className="text-gold hover:underline">
              +65 8415 8896
            </a>
            .
          </p>
          <div className="flex flex-col gap-4 items-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gold text-black rounded-full font-medium uppercase tracking-widest hover:bg-gold/90 transition-all glitter-border"
            >
              Return Home
            </Link>
            <Link
              href="/services"
              className="px-8 py-3 border border-gold text-gold rounded-full font-medium uppercase tracking-widest hover:bg-gold/10 transition-all"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


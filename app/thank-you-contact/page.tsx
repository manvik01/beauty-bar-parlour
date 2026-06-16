"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ThankYouContent() {
  const params = useSearchParams()
  const reference = params.get("ref")

  return (
    <section className="py-16">
      <div className="container-custom max-w-xl mx-auto text-center bg-white p-10 rounded-lg shadow-md border border-gold/20">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-4 uppercase tracking-widest">
          Thank You!
        </h1>
        <p className="text-lg md:text-xl text-black mb-6 font-serif">
          Your enquiry has been received by Beauty Bar Parlour.
          <br />
          Our team will contact you shortly through your preferred contact method.
        </p>

        {reference && (
          <div className="mb-6 inline-block bg-secondary border border-gold/30 rounded-md px-5 py-3 text-left sm:text-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Enquiry reference
            </p>
            <p className="text-xl font-semibold text-black tracking-wide">
              {reference}
            </p>
          </div>
        )}

        <p className="text-base text-muted-foreground mb-8">
          For urgent assistance, WhatsApp{" "}
          <a
            href={`https://wa.me/6584158896${reference ? `?text=${encodeURIComponent(`Hi Beauty Bar Parlour, I just submitted an enquiry (reference ${reference}).`)}` : ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            +65 8415 8896
          </a>{" "}
          or call{" "}
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
  )
}

export default function ThankYouContactPage() {
  return (
    <main className="pt-24 min-h-screen bg-secondary">
      <Suspense
        fallback={
          <section className="py-16">
            <div className="container-custom max-w-xl mx-auto text-center bg-white p-10 rounded-lg shadow-md border border-gold/20">
              <p className="text-lg text-black font-serif">Loading…</p>
            </div>
          </section>
        }
      >
        <ThankYouContent />
      </Suspense>
    </main>
  )
}

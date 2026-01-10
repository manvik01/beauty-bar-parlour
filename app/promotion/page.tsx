"use client"

import Link from "next/link"

export default function PromotionPage() {
  const giftCardUrl =
    "https://clients.mindbodyonline.com/classic/ws?studioid=5746301&stype=42&sLoc=0&giftCardID=100132"

  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Special Offers</h3>
          <h1 className="clean-subheading">Promotions & Gift Cards</h1>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="body-md">
              Treat yourself or a loved one. Grab our limited-time $65 Gift Card and enjoy services at Beauty Bar Parlour.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl text-black font-serif mb-1">Gift Card</h2>
                <p className="text-gray-700">Value: $65</p>
              </div>
              <a
                href={giftCardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 glitter-border"
              >
                Buy $65 Gift Card
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              Purchasing is handled securely via our Mindbody portal. The link opens in a new tab.
            </p>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 glitter-border"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}




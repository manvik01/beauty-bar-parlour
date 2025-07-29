"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Sparkles, Scissors, Palette, Star, X } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

function MindbodyWidgetModal({ widgetId, onClose }: { widgetId: string; onClose: () => void }) {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://brandedweb.mindbodyonline.com/embed/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-full overflow-y-auto">
        <div className="flex justify-end sticky top-0 bg-white z-10">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div
          className="mindbody-widget"
          data-widget-type="Appointments"
          data-widget-id={widgetId}
        ></div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [modalWidgetId, setModalWidgetId] = useState<string | null>(null)

  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Our Menu</h3>
          <h1 className="clean-subheading">Services & Pricing</h1>
        </div>
      </section>

      {/* Services Content */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="body-md mb-12 text-center">
              At Beauty Bar Parlour, we offer a comprehensive range of beauty services delivered with exceptional care
              and using premium products. Explore our service categories below.
            </p>
          </div>

          {/* Service Navigation */}
          <div className="mb-12" role="navigation" aria-label="Service categories">
            <div className="flex justify-center flex-wrap gap-2 md:gap-4">
              <a
                href="#hair"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Scissors className="w-4 h-4 mr-2 glitter-icon" /> Herbal Treatment
              </a>
              <a
                href="#nail"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Palette className="w-4 h-4 mr-2 glitter-icon" /> Nail & Foot Spa
              </a>
              <a
                href="#facial"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Star className="w-4 h-4 mr-2 glitter-icon" /> Facial
              </a>
              <a
                href="#waxing"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Sparkles className="w-4 h-4 mr-2 glitter-icon" /> Waxing
              </a>
              <a
                href="#threading"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Scissors className="w-4 h-4 mr-2 glitter-icon" /> Threading
              </a>
              {/* Henna and Bridal navigation removed */}
              <a
                href="#laser"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Sparkles className="w-4 h-4 mr-2 glitter-icon" /> AFT Treatment
              </a>
            </div>
          </div>

          {/* Herbal Services */}
          <div id="hair" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="hair-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="hair-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Herbal Treatment</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Root Touch Up – 90 mins</span>
                  <span className="text-primary font-medium">$88</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Hair Pack (Short Hair) – 90 mins</span>
                  <span className="text-primary font-medium">$60</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Hair Pack (Medium Hair) – 90 mins</span>
                  <span className="text-primary font-medium">$70</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Hair Pack (Long Hair) – 90 mins</span>
                  <span className="text-primary font-medium">$80</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Signature Hot Oil Head Spa – 60 mins</span>
                  <span className="text-primary font-medium">$85</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Signature Hot Oil Head Spa – 90 mins</span>
                  <span className="text-primary font-medium">$120</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nail Services */}
          <div id="nail" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="nail-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="nail-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Nail & Foot Spa</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                {[
                  ["Soak Off Gel Hand – 15 mins", "$10"],
                  ["Soak Off Gel Feet – 15 mins", "$10"],
                  ["Express Manicure – 20 mins", "$12"],
                  ["Express Pedicure – 20 mins", "$18"],
                  ["Classic Manicure – 40 mins", "$25"],
                  ["Classic Manicure (Male) - 40 mins", "$25"],
                  ["Classic Pedicure – 40 mins", "$35"],
                  ["Classic Pedicure (Male) - 40 mins", "$55"],
                  ["Gel Express Manicure – 30 mins", "$28"],
                  ["Gel Express Pedicure – 30 mins", "$38"],
                  ["Classic Gel Manicure – 40 mins", "$48"],
                  ["Classic Gel Pedicure – 40 mins", "$58"],
                  ["Nail Extension (Full Set) – 60 mins", "$99"],
                  ["Parafin Wax SPA Hand – 30 mins", "$25"],
                  ["Parafin Wax SPA Feet – 30 mins", "$45"],
                  ["Milk Foot Spa – 45 mins", "$55"],
                  ["Milk & Wine Foot Spa – 45 mins", "$65"],
                  ["Signature Foot Spa – 45 mins", "$75"]
                ].map(([label, price]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group"
                  >
                    <span className="font-serif text-black group-hover:glitter-bold transition-all">{label}</span>
                    <span className="text-primary font-medium">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Facial Services */}
          <div id="facial" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="facial-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="facial-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Facial Services</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                {[
                  ["Advanced Clinicals Basic – 45 mins", "$69"],
                  ["Advanced Clinicals Basic – 60 mins", "$79"],
                  ["Advanced Clinicals Advanced – 45 mins", "$89"],
                  ["Advanced Clinicals Advanced – 60 mins", "$99"],
                  ["WOB - Vitamin C Brightening – 45 mins", "$139"],
                  ["WOB – Akoia Gold – 60 mins", "$183"],
                  ["WOB - Hydra Calm – 90 mins", "$230"],
                  ["WOB - Collagen Hlayu – 90 mins", "$252"],
                  ["TAE - Ayurvedic Oily Skin Treatment – 60 mins", "$160"],
                  ["TAE - Ayurvedic Skin Tightening Treatment – 60 mins", "$180"],
                  ["TAE - Ayurvedic Hydrating Treatment – 90 mins", "$190"],
                  ["TAE - Ayurvedic Anti Aging – 90 mins", "$210"]
                ].map(([label, price]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group"
                  >
                    <span className="font-serif text-black group-hover:glitter-bold transition-all">{label}</span>
                    <span className="text-primary font-medium">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Waxing Services */}
          <div id="waxing" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="waxing-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="waxing-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Waxing Services</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                {[
                  ["Side Burn – 15 mins", "$15"],
                  ["Upper Lip / Chin – 15 mins", "$15"],
                  ["Eyebrow Wax – 15 mins", "$15"],
                  ["Full Face Wax – 30 mins", "$50"],
                  ["Half Arms – 30 mins", "$25"],
                  ["Half Legs – 30 mins", "$30"],
                  ["Full Arms – 30 mins", "$40"],
                  ["Full Legs – 30 mins", "$60"],
                  ["Underarms – 15 mins", "$25"],
                  ["Bikini Line – 20 mins", "$38"],
                  ["Brazilian – 45 mins", "$65"]
                ].map(([label, price]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group"
                  >
                    <span className="font-serif text-black group-hover:glitter-bold transition-all">{label}</span>
                    <span className="text-primary font-medium">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Threading Services */}
          <div id="threading" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="threading-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="threading-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Threading Services</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                {[
                  ["Eyebrows – 15 mins", "$12"],
                  ["Upper Lip – 15 mins", "$10"],
                  ["Chin – 15 mins", "$10"],
                  ["Forehead – 15 mins", "$15"],
                  ["Full Face – 30 mins", "$40"]
                ].map(([label, price]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group"
                  >
                    <span className="font-serif text-black group-hover:glitter-bold transition-all">{label}</span>
                    <span className="text-primary font-medium">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Henna Art Services */}
          <div id="henna" className="mb-20 pt-16 -mt-16 hidden" role="region" aria-labelledby="henna-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="henna-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Henna Art Services</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Simple Henna (One Hand)
                  </span>
                  <span className="text-primary font-medium">$10-$25</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Bridal Henna - Hands & Feet
                  </span>
                  <span className="text-primary font-medium">$200-$400</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Customized Henna Design
                  </span>
                  <span className="text-primary font-medium">$25-$150</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bridal Services */}
          <div id="bridal" className="mb-20 pt-16 -mt-16 hidden" role="region" aria-labelledby="bridal-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="bridal-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Bridal Services</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Bridal Makeup & Hair (Trial + Event Day)
                  </span>
                  <span className="text-primary font-medium">$300-$500</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Bridal Facial</span>
                  <span className="text-primary font-medium">$250</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Full Bridal Package
                  </span>
                  <span className="text-primary font-medium">Starting From $888</span>
                </div>
              </div>
            </div>
          </div>

          {/* Laser Hair Removal Services */}
          <div id="laser" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="laser-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="laser-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">AFT Treatment</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                {[
                  ["Upper Lip – 15 mins", "$60"],
                  ["Chin – 15 mins", "$64"],
                  ["Sideburns – 20 mins", "$83"],
                  ["Full Face – 30 mins", "$153"],
                  ["Neck (Front/Back) – 30 mins", "$95"],
                  ["Underarms – 20 mins", "$95"],
                  ["Half Arms (Upper/Lower) – 30 mins", "$134"],
                  ["Full Arms – 45 mins", "$189"],
                  ["Hands & Fingers – 15 mins", "$69"],
                  ["Chest – 30 mins", "$172"],
                  ["Areola – 15 mins", "$47"],
                  ["Abdomen – 30 mins", "$159"],
                  ["Back (Full) – 45 mins", "$210"],
                  ["Lower Back – 30 mins", "$124"],
                  ["Bikini Line – 30 mins", "$115"],
                  ["Brazilian + Crack – 45 mins", "$172"],
                  ["Buttocks (Full) – 30 mins", "$153"],
                  ["Half Legs (Upper/Lower) – 45 mins", "$172"],
                  ["Full Legs – 60 mins", "$287"],
                  ["Feet & Toes – 20 mins", "$67"]
                ].map(([label, price]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group"
                  >
                    <span className="font-serif text-black group-hover:glitter-bold transition-all">{label}</span>
                    <span className="text-primary font-medium">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="max-w-4xl mx-auto bg-secondary p-6 mb-8">
              <p className="text-sm text-black mb-0">
                <strong>Disclaimer:</strong> All prices listed are based on varying product ranges and equipment used.
                Please note that future pricing may change due to fluctuations in product costs, availability, and
                potential upgrades to equipment.
              </p>
            </div>
            <div className="text-center mt-12">
            <Link
              href="/booking"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 glitter-border"
            >
              BOOK NOW
            </Link>
          </div>
          </div>
        </div>
      </section>
      {modalWidgetId && (
        <MindbodyWidgetModal widgetId={modalWidgetId} onClose={() => setModalWidgetId(null)} />
      )}
      <ScrollToTop />
    </main>
  )
}

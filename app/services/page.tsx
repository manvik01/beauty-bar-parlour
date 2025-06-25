import Link from "next/link"
import { ChevronRight, Sparkles, Scissors, Palette, Star } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ServicesPage() {
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
                <Scissors className="w-4 h-4 mr-2 glitter-icon" /> Herbal
              </a>
              <a
                href="#nail"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Palette className="w-4 h-4 mr-2 glitter-icon" /> Nail
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
              <a
                href="#henna"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Palette className="w-4 h-4 mr-2 glitter-icon" /> Henna
              </a>
              <a
                href="#bridal"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Star className="w-4 h-4 mr-2 glitter-icon" /> Bridal
              </a>
              <a
                href="#laser"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-all uppercase tracking-widest text-xs flex items-center"
              >
                <Sparkles className="w-4 h-4 mr-2 glitter-icon" /> Laser Hair Removal
              </a>
            </div>
          </div>

          {/* Herbal Services */}
          <div id="hair" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="hair-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="hair-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Herbal Services</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Henna Root Touch Up
                  </span>
                  <span className="text-primary font-medium">$75</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Hot Oil Massage</span>
                  <span className="text-primary font-medium">$75-$95</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Herbal Hair treatment
                  </span>
                  <span className="text-primary font-medium">$70-$120</span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link href="/booking?service=hair" className="inline-flex items-center text-gold hover:underline group">
                  <span className="group-hover:glitter-bold">Book Herbal Service</span>{" "}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:glitter-icon" />
                </Link>
              </div>
            </div>
          </div>

          {/* Nail Services */}
          <div id="nail" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="nail-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="nail-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Nail Services</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Express Manicure (Shape, Buff & Colour)
                  </span>
                  <span className="text-primary font-medium">$12</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Express Pedicure (Shape, Buff & Colour)
                  </span>
                  <span className="text-primary font-medium">$18</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Classic Manicure
                  </span>
                  <span className="text-primary font-medium">$25</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Classic Pedicure
                  </span>
                  <span className="text-primary font-medium">$35</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Gel Express Manicure
                  </span>
                  <span className="text-primary font-medium">$28</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Gel Express Pedicure
                  </span>
                  <span className="text-primary font-medium">$38</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Gel Manicure</span>
                  <span className="text-primary font-medium">$48</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Gel Pedicure</span>
                  <span className="text-primary font-medium">$58</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Nail Art (per nail)
                  </span>
                  <span className="text-primary font-medium">$3-$5</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Nail Extension (Full Set)
                  </span>
                  <span className="text-primary font-medium">$99</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Foot SPA</span>
                  <span className="text-primary font-medium">$55-$90</span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link href="/booking?service=nail" className="inline-flex items-center text-gold hover:underline group">
                  <span className="group-hover:glitter-bold">Book Nail Service</span>{" "}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:glitter-icon" />
                </Link>
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
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Basic Facial</span>
                  <span className="text-primary font-medium">$58</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Ayurvedic Facial
                  </span>
                  <span className="text-primary font-medium">$110</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Hydrating Facial
                  </span>
                  <span className="text-primary font-medium">$110-$299</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Whitening Facial
                  </span>
                  <span className="text-primary font-medium">$110-$299</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Anti-Aging Facial
                  </span>
                  <span className="text-primary font-medium">$188-$299</span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link
                  href="/booking?service=facial"
                  className="inline-flex items-center text-gold hover:underline group"
                >
                  <span className="group-hover:glitter-bold">Book Facial Service</span>{" "}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:glitter-icon" />
                </Link>
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
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Side Burn</span>
                  <span className="text-primary font-medium">$15</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Upper Lip / Chin
                  </span>
                  <span className="text-primary font-medium">$15</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Eyebrow Wax</span>
                  <span className="text-primary font-medium">$15</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Full Face Wax</span>
                  <span className="text-primary font-medium">$50</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Half Arms</span>
                  <span className="text-primary font-medium">$25</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Half Legs</span>
                  <span className="text-primary font-medium">$30</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Full Arms</span>
                  <span className="text-primary font-medium">$40</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Full Legs</span>
                  <span className="text-primary font-medium">$60</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Underarms</span>
                  <span className="text-primary font-medium">$25</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Bikini Line</span>
                  <span className="text-primary font-medium">$38</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Brazilian</span>
                  <span className="text-primary font-medium">$65</span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link
                  href="/booking?service=waxing"
                  className="inline-flex items-center text-gold hover:underline group"
                >
                  <span className="group-hover:glitter-bold">Book Waxing Service</span>{" "}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:glitter-icon" />
                </Link>
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
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Eyebrows</span>
                  <span className="text-primary font-medium">$12</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Upper Lip</span>
                  <span className="text-primary font-medium">$10</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Chin</span>
                  <span className="text-primary font-medium">$10</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Forehead</span>
                  <span className="text-primary font-medium">$15</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">Full Face</span>
                  <span className="text-primary font-medium">$40</span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link
                  href="/booking?service=threading"
                  className="inline-flex items-center text-gold hover:underline group"
                >
                  <span className="group-hover:glitter-bold">Book Threading Service</span>{" "}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:glitter-icon" />
                </Link>
              </div>
            </div>
          </div>

          {/* Henna Art Services */}
          <div id="henna" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="henna-heading">
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

              <div className="mt-6 text-right">
                <Link
                  href="/booking?service=henna"
                  className="inline-flex items-center text-gold hover:underline group"
                >
                  <span className="group-hover:glitter-bold">Book Henna Service</span>{" "}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:glitter-icon" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bridal Services */}
          <div id="bridal" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="bridal-heading">
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

              <div className="mt-6 text-right">
                <Link
                  href="/booking?service=bridal"
                  className="inline-flex items-center text-gold hover:underline group"
                >
                  <span className="group-hover:glitter-bold">Book Bridal Service</span>{" "}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:glitter-icon" />
                </Link>
              </div>
            </div>
          </div>

          {/* Laser Hair Removal Services */}
          <div id="laser" className="mb-20 pt-16 -mt-16" role="region" aria-labelledby="laser-heading">
            <div className="max-w-4xl mx-auto bg-white p-8 border-t-4 border-gold shadow-sm">
              <h2 id="laser-heading" className="text-2xl uppercase tracking-widest text-center mb-2 text-black">
                <span className="glitter-bold">Laser Hair Removal Services</span>
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Upper Lip
                  </span>
                  <span className="text-primary font-medium">$60</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Chin (AFT)
                  </span>
                  <span className="text-primary font-medium">$64</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Sideburns (AFT)
                  </span>
                  <span className="text-primary font-medium">$83</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Full Face (AFT)
                  </span>
                  <span className="text-primary font-medium">$153</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Neck – Front or Back (AFT)
                  </span>
                  <span className="text-primary font-medium">$95</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Underarms
                  </span>
                  <span className="text-primary font-medium">$95</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Half Arms (Upper or Lower)
                  </span>
                  <span className="text-primary font-medium">$134</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Full Arms
                  </span>
                  <span className="text-primary font-medium">$189</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Hands & Fingers
                  </span>
                  <span className="text-primary font-medium">$69</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Chest
                  </span>
                  <span className="text-primary font-medium">$172</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Areola
                  </span>
                  <span className="text-primary font-medium">$47</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Abdomen
                  </span>
                  <span className="text-primary font-medium">$159</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Back (Full)
                  </span>
                  <span className="text-primary font-medium">$210</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Lower Back
                  </span>
                  <span className="text-primary font-medium">$124</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Bikini Line
                  </span>
                  <span className="text-primary font-medium">$115</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Brazilian + Crack
                  </span>
                  <span className="text-primary font-medium">$172</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Buttocks (Full)
                  </span>
                  <span className="text-primary font-medium">$153</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Half Legs (Upper or Lower)
                  </span>
                  <span className="text-primary font-medium">$172</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Full Legs
                  </span>
                  <span className="text-primary font-medium">$287</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 group">
                  <span className="font-serif text-black group-hover:glitter-bold transition-all">
                    Feet & Toes
                  </span>
                  <span className="text-primary font-medium">$67</span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link
                  href="/booking?service=laser"
                  className="inline-flex items-center text-gold hover:underline group"
                >
                  <span className="group-hover:glitter-bold">Book Laser Hair Removal Service</span>{" "}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:glitter-icon" />
                </Link>
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
            <Link href="/booking" className="clean-button">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </main>
  )
}

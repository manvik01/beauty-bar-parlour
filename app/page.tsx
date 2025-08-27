import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import PopupReviewWidgetWrapper from "@/components/popup-review-widget-wrapper"
import ReviewsBanner from "@/components/reviews-banner"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReviewsBanner />
      <ContactSection />
      <PopupReviewWidgetWrapper />
    </main>
  )
}

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import dynamic from "next/dynamic"

// Move the dynamic import to a client component
const ClientReviewBannerWrapper = dynamic(
  () => import("@/components/review-banner"),
  {
    ssr: false,
    loading: () => <div className="min-h-[200px] flex items-center justify-center bg-secondary"><p>Loading reviews...</p></div>,
  }
);

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientReviewBannerWrapper /> {/* Use the wrapper component here */}
      <ContactSection />
    </main>
  )
}

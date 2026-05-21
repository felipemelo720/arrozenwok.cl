import PageTracker from "@/components/PageTracker"
import Navbar from "@/components/Navbar"
import Hero from "@/components/sections/Hero"
import StatsBar from "@/components/sections/StatsBar"
import MenuSection from "@/components/sections/MenuSection"
import ExtrasSection from "@/components/sections/ExtrasSection"
import WhyUsSection from "@/components/sections/WhyUsSection"
import HowToOrderSection from "@/components/sections/HowToOrderSection"
import UrgencySection from "@/components/sections/UrgencySection"
import CTAFinalSection from "@/components/sections/CTAFinalSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <PageTracker />
      <Navbar />
      <Hero />
      <StatsBar />
      <MenuSection />
      <ExtrasSection />
      <WhyUsSection />
      <HowToOrderSection />
      <UrgencySection />
      <CTAFinalSection />
      <Footer />
    </main>
  )
}

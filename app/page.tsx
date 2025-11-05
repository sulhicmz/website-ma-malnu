import HeroSection from '@/components/sections/HeroSection'
import PPDBHighlight from '@/components/sections/PPDBHighlight'
import NewsSection from '@/components/sections/NewsSection'
import FacilitySection from '@/components/sections/FacilitySection'
import TestimonialSection from '@/components/sections/TestimonialSection'
import GallerySection from '@/components/sections/GallerySection'
import CTASection from '@/components/sections/CTASection'
import SkipLink from '@/components/ui/SkipLink'
import LiveChatWidget from '@/components/ui/LiveChatWidget'
import PerformanceMonitor from '@/components/ui/PerformanceMonitor'

export default function Home() {
  return (
    <div className="min-h-screen">
      <SkipLink targetId="main-content">
        Lewati ke konten utama
      </SkipLink>
      
      <main id="main-content">
        <HeroSection />
        <PPDBHighlight />
        <NewsSection />
        <FacilitySection />
        <TestimonialSection />
        <GallerySection />
        <CTASection />
      </main>
      
      <LiveChatWidget />
      <PerformanceMonitor />
    </div>
  )
}
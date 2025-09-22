import HeroSection from '@/components/sections/HeroSection'
import PPDBHighlight from '@/components/sections/PPDBHighlight'
import NewsSection from '@/components/sections/NewsSection'
import FacilitySection from '@/components/sections/FacilitySection'
import TestimonialSection from '@/components/sections/TestimonialSection'
import GallerySection from '@/components/sections/GallerySection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PPDBHighlight />
      <NewsSection />
      <FacilitySection />
      <TestimonialSection />
      <GallerySection />
      <CTASection />
    </div>
  )
}
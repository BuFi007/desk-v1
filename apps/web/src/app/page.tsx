import Community from '@/sections/community'
import Features from '@/sections/features'
import Header from '@/sections/header'
import Faq from '@/sections/faq'
import Pricing from '@/sections/pricing'
import Footer from '@/components/footer'
import { BuLogo } from '@bu/ui/bu-logo'

export default function Home() {
  return (
    <>
      <BuLogo logo="/BooFi-icon.png" text="bu.fi" />
      <Header />
      <Features />
      <Community />
      <Faq />
      <Pricing />
      <Footer />
    </>
  )
}

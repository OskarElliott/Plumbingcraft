import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { Services } from '@/components/sections/Services'
import { Realizacje } from '@/components/sections/Realizacje'
import { Process } from '@/components/sections/Process'
import { About } from '@/components/sections/About'
import { Testimonials } from '@/components/sections/Testimonials'
import { Area } from '@/components/sections/Area'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { MobileCta } from '@/components/sections/MobileCta'
import { getSiteData } from '@/lib/siteData.server'

export default function HomePage() {
  const data = getSiteData()
  const { images } = data.gallery
  // About portrait image: kotlownia-kociol (index 1); falls back to first if reordered.
  const aboutImage = images[1] ?? images[0]

  return (
    <>
      <Navbar logoAvailable={data.logoAvailable} />
      <Hero imageAvailable={data.hero.imageAvailable} />
      <TrustStrip />
      <Services />
      <Realizacje images={images} />
      <Process />
      <About image={aboutImage} />
      <Testimonials />
      <Area />
      <Contact />
      <Footer logoAvailable={data.logoAvailable} />
      <MobileCta />
    </>
  )
}

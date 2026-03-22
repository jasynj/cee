import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Stats from '../components/sections/Stats'
import Gallery from '../components/sections/Gallery'
import Services from '../components/sections/Services'
import Testimonials from '../components/sections/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Gallery />
      <Services />
      <Testimonials />
    </>
  )
}
import { useEffect } from 'react'
import AOS from 'aos'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Stats from './components/sections/Stats'
import Gallery from './components/sections/Gallery'
import Services from './components/sections/Services'
import Testimonials from './components/sections/Testimonials'
import InquiryForm from './components/sections/InquiryForm'
import Footer from './components/layout/Footer'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Gallery />
        <Services />
        <Testimonials />
        <InquiryForm />
      </main>
      <Footer />
    </>
  )
}

export default App

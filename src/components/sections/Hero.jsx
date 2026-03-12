import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import Button from '../ui/Button'
import { useScrollTo } from '../../hooks/useScrollTo'
import { heroSlides } from '../../data/heroSlides'

export default function Hero() {
  const scrollTo = useScrollTo()

  return (
    <section id="hero" className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-screen"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide h-screen">
              <img
                src={slide.image}
                alt={slide.heading}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="hero-slide-content absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6 max-w-4xl mx-auto">
                  <p className="font-nav text-gold uppercase tracking-[0.4em] text-xs md:text-sm mb-6">
                    {slide.label}
                  </p>
                  <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-tight mb-10">
                    {slide.heading}
                  </h1>
                  <Button variant="white" onClick={() => scrollTo('contact')}>
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

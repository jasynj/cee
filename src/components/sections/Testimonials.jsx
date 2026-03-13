import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=800&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p
          className="font-nav text-xs uppercase tracking-[0.3em] text-gold mb-4"
          data-aos="fade-up"
        >
          Testimonials
        </p>
        <h2
          className="font-heading text-4xl md:text-5xl font-semibold text-white mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          What Our Clients Say
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="testimonials-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="px-4 pb-14">
                <p className="text-white/80 text-lg md:text-xl leading-relaxed italic mb-8 max-w-3xl mx-auto">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <p className="font-heading text-xl font-semibold text-gold">{item.name}</p>
                  <p className="font-nav text-xs uppercase tracking-[0.2em] text-white/50 mt-1">{item.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

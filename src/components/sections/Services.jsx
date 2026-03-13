import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../ui/SectionHeader'
import ServiceCard from '../ui/ServiceCard'
import { services } from '../../data/services'

export default function Services() {
  const navigate = useNavigate()

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="What We Do"
          title="Explore Our"
          scriptText="Services"
          subtitle="Comprehensive event solutions designed to make your special day truly extraordinary."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <ServiceCard
                title={service.title}
                scriptTitle={service.scriptTitle}
                image={service.image}
                onClick={() => navigate('/about#services')}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

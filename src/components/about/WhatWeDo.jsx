import { services } from '../../data/services'

export default function WhatWeDo() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-nav text-gold uppercase tracking-[0.3em] text-xs mb-4"
            data-aos="fade-up"
          >
            What We Do
          </p>
          <h2
            className="font-heading text-4xl md:text-5xl font-semibold text-white mb-2"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Our <span className="font-script text-gold">Services</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4 mb-6" data-aos="fade-up" data-aos-delay="100" />
          <p
            className="text-white/50 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Comprehensive event solutions designed to make your special day truly extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-dark-card border border-white/10 p-8 text-center hover:border-gold/30 transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="font-heading text-xl text-white font-semibold mb-1">
                {service.title}
              </h3>
              {/* <p className="font-script text-gold text-lg mb-4">{service.scriptTitle}</p> */}
              <div className="w-8 h-0.5 bg-gold/30 mx-auto mb-4" />
              <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

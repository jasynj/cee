import Counter from '../ui/Counter'

export default function Stats() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=600&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4"
          data-aos="fade-up"
        >
          We&apos;ve Earned a Strong Reputation
        </h2>
        <p className="text-white/60 mb-16 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          for delivering exceptional events that exceed expectations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12" data-aos="fade-up" data-aos-delay="200">
          <div className="text-center">
            <p className="font-heading text-6xl md:text-7xl font-bold text-white mb-4">
              <Counter end={5} suffix="+" />
            </p>
            <p className="font-nav text-xs uppercase tracking-[0.3em] text-gold">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-6xl md:text-7xl font-bold text-white mb-4">
              <Counter end={50} suffix="+" />
            </p>
            <p className="font-nav text-xs uppercase tracking-[0.3em] text-gold">Projects Completed</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-6xl md:text-7xl font-bold text-white mb-4">
              <Counter end={100} suffix="%" />
            </p>
            <p className="font-nav text-xs uppercase tracking-[0.3em] text-gold">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-black">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=900&fit=crop"
        alt="About Craig Events"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="font-nav text-gold uppercase tracking-[0.4em] text-xs md:text-sm mb-6"
          data-aos="fade-up"
        >
          Get To Know Us
        </p>
        <h1
          className="font-heading text-5xl md:text-7xl font-semibold text-white leading-tight mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          About Us
        </h1>
        <p
          className="font-script text-gold text-2xl md:text-3xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Bringing Your Vision into Reality
        </p>
      </div>
    </section>
  )
}

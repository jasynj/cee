export default function BookingHero() {
  return (
    <section className="pt-32 pb-16 px-6 bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="font-nav text-gold uppercase tracking-[0.4em] text-xs mb-6"
          data-aos="fade-up"
        >
          Schedule Your Event
        </p>
        <h1
          className="font-heading text-5xl md:text-6xl font-semibold text-white leading-tight mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Book Your <span className="font-script text-gold">Event</span>
        </h1>
        <div className="w-12 h-0.5 bg-gold mx-auto mt-4 mb-6" data-aos="fade-up" data-aos-delay="150" />
        <p
          className="text-white/50 max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Select your preferred date and time, then fill in the details. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    </section>
  )
}

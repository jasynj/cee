export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-cream text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-black mb-2 leading-tight">
              Greetings From
            </h2>
            <p className="font-script text-gold text-4xl md:text-5xl mb-8">Craig Events</p>
            <div className="w-16 h-0.5 bg-gold mb-8" />
            <p className="text-black/70 text-base leading-relaxed mb-6">
              At Craig Events & Entertainments, we believe every event tells a story.
              With years of experience in the industry, our passionate team brings creativity,
              precision, and heart to every celebration we touch.
            </p>
            <p className="text-black/70 text-base leading-relaxed mb-6">
              From weddings and birthdays to corporate galas and concerts, we handle every
              detail — so you can focus on what truly matters: enjoying the moment with the
              people who mean the most.
            </p>
            <p className="text-black/70 text-base leading-relaxed">
              Our commitment to excellence means we don&apos;t just plan events — we craft
              experiences that leave lasting impressions. Your vision is our blueprint,
              and your satisfaction is our measure of success.
            </p>
          </div>

          <div data-aos="fade-left" className="relative">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=900&fit=crop"
              alt="Craig Events team at work"
              className="w-full h-[500px] lg:h-[600px] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-gold hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}

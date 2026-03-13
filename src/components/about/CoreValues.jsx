import { MdFavorite, MdPalette, MdStar, MdTheaters, MdPeople } from 'react-icons/md'

const values = [
  {
    icon: MdFavorite,
    title: 'Hospitality',
    description: 'We believe every guest should feel welcomed, valued, and cared for.',
  },
  {
    icon: MdPalette,
    title: 'Creativity',
    description: 'We bring imagination and innovation into every event experience.',
  },
  {
    icon: MdStar,
    title: 'Excellence',
    description: 'We are committed to delivering professional, high-quality service.',
  },
  {
    icon: MdTheaters,
    title: 'Culture',
    description: 'We celebrate traditions, food, music, and community through our events.',
  },
  {
    icon: MdPeople,
    title: 'Community',
    description: 'We believe events should uplift and bring people together.',
  },
]

export default function CoreValues() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-nav text-gold uppercase tracking-[0.3em] text-xs mb-4"
            data-aos="fade-up"
          >
            What We Stand For
          </p>
          <h2
            className="font-heading text-4xl md:text-5xl font-semibold text-white mb-2"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Our Core <span className="font-script text-gold">Values</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4" data-aos="fade-up" data-aos-delay="100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`bg-dark-card border border-white/10 p-8 text-center hover:border-gold/30 transition-all duration-500 ${
                index >= 3 ? 'lg:col-span-1 lg:mx-auto lg:w-full' : ''
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <value.icon className="text-gold" size={28} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

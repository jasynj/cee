import founder from "../../assets/founder.jpeg";

export default function FounderStory() {
  return (
    <section className="py-24 px-6 bg-cream text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative" data-aos="fade-right">
            <img
              src={founder}
              alt="Craig Johnson Jr."
              className="w-full h-[500px] lg:h-[600px] object-cover object-top"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-gold hidden lg:block" />
          </div>

          <div data-aos="fade-left">
            <p className="font-nav text-gold uppercase tracking-[0.3em] text-xs mb-4">
              Our Story
            </p>
            <p className="font-script text-gold text-3xl mb-1">Meet The Founder</p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-black mb-4 leading-tight">
              Craig Johnson Jr.
            </h2>

            <div className="w-16 h-0.5 bg-gold mb-8" />

            <div className="space-y-4 text-black/70 text-sm md:text-base leading-relaxed">
              <p>
                Craig Events & Entertainment was born from a simple yet meaningful moment during the
                COVID-19 pandemic. A close friend of Craig Johnson Jr. wanted to create a special evening
                for his girlfriend and asked Craig to help transform a rented Airbnb into an intimate,
                romantic setting. Craig decorated the space with roses, candles, and thoughtful touches
                to create the perfect atmosphere for the evening. While his friend prepared the meal,
                Craig assisted with serving and hosting, ensuring the experience felt elegant, welcoming,
                and unforgettable.
              </p>
              <p>
                What started as a thoughtful gesture quickly sparked something bigger. The experience
                revealed Craig&apos;s natural ability to create memorable environments where people could
                celebrate meaningful moments together. From that evening forward, Craig Events &
                Entertainment was born, beginning with curated in-home private dining experiences
                featuring chefs, d&eacute;cor, and full-service hosting.
              </p>
              <p>
                Craig&apos;s passion for hospitality and food was deeply inspired by his upbringing. Watching
                his mother and grandmother cook and experiencing the warmth that came from gathering
                around the table shaped his appreciation for food, culture, and community. The aromas
                from their kitchen and the joy people felt when sharing meals together left a lasting
                impression on him. When friends visited his home, his mother and grandmother made sure
                everyone was welcomed and fed. The love people expressed for the food and the experience
                inspired Craig to continue that legacy and share that same feeling with others.
              </p>
              <p>
                Over time, Craig Events & Entertainment expanded beyond private dinners into catering,
                event planning, cultural programming, and curated experiences. Craig has worked on
                university events, community celebrations, and cultural initiatives while also providing
                catering and event services for organizations and special events across the region.
              </p>
              <p>
                Today, Craig continues to grow the company with a vision of creating experiences that
                combine hospitality, culture, creativity, and community. Through Craig Events &
                Entertainment, he strives to ensure that every event&mdash;large or small&mdash;reflects
                the client&apos;s vision in a way that leaves a lasting impression.
              </p>
            </div>

            <div className="mt-8 p-6 bg-black/5 border-l-4 border-gold">
              <p className="font-script text-gold text-xl mb-2">Our Philosophy</p>
              <p className="font-heading text-xl md:text-2xl text-black/80 italic">
                &ldquo;Bringing Your Vision into Reality.&rdquo;
              </p>
              <p className="text-black/60 text-sm mt-2">
                For Craig, this means taking the ideas and dreams a client has in their mind and
                transforming them into an experience that exceeds expectations and creates
                unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

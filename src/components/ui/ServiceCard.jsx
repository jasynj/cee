export default function ServiceCard({ title, scriptTitle, image, onClick }) {
  return (
    <div className="relative group h-[450px] overflow-hidden" data-aos="fade-up">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="service-card-overlay absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="font-heading text-2xl text-white font-semibold">{title}</h3>
        <p className="font-script text-gold text-xl">{scriptTitle}</p>
        <div className="mt-3 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
          <button
            onClick={onClick}
            className="font-nav text-xs uppercase tracking-[0.2em] text-gold cursor-pointer hover:text-gold-light"
          >
            Explore &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}

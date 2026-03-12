export default function SectionHeader({ label, title, scriptText, subtitle, light = false }) {
  return (
    <div className="text-center mb-16" data-aos="fade-up">
      {label && (
        <p className={`font-nav text-xs uppercase tracking-[0.3em] mb-4 ${light ? 'text-gold' : 'text-gold'}`}>
          {label}
        </p>
      )}
      <h2 className={`font-heading text-4xl md:text-5xl lg:text-6xl font-semibold mb-2 ${light ? 'text-white' : 'text-white'}`}>
        {title}
        {scriptText && (
          <span className="font-script text-gold ml-3">{scriptText}</span>
        )}
      </h2>
      <div className="w-16 h-0.5 bg-gold mx-auto mt-4 mb-4" />
      {subtitle && (
        <p className={`text-base max-w-2xl mx-auto mt-4 ${light ? 'text-white/70' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

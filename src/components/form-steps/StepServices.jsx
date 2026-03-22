import cateringImg from '../../assets/catering.png'
import decorImg from '../../assets/decor.jpg'
import photoImg from '../../assets/setup.jpg'
import videoImg from '../../assets/videography.jpg'

const SERVICES = [
  { id: 'catering',     label: 'Catering',     image: cateringImg },
  { id: 'decoration',   label: 'Decoration',   image: decorImg },
  { id: 'photography',  label: 'Photography',  image: photoImg },
  { id: 'videography',  label: 'Videography',  image: videoImg },
]

export default function StepServices({ formData, onServiceToggle, errors }) {
  return (
    <div className="space-y-6">
      <p className="text-white/50 text-sm font-body">
        Select all the services you&apos;d like for your event.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {SERVICES.map((service) => {
          const isSelected = formData.services.includes(service.id)
          return (
            <button
              key={service.id}
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onServiceToggle(service.id)}
              className={`relative overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                isSelected
                  ? 'border-gold'
                  : 'border-white/10 hover:border-gold/30'
              }`}
            >
              <img
                src={service.image}
                alt={service.label}
                className="w-full h-32 object-cover opacity-50 group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="font-nav text-xs uppercase tracking-wider text-white">
                  {service.label}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">&#10003;</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {errors.services && (
        <p className="text-red-400 text-xs mt-2">{errors.services}</p>
      )}
    </div>
  )
}

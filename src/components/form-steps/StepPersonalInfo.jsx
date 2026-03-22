const inputClass =
  'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const labelClass = 'block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2'
const errorClass = 'text-red-400 text-xs mt-1'

export default function StepPersonalInfo({ formData, updateField, errors }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="First name"
            className={inputClass}
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="Last name"
            className={inputClass}
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Contact Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="+1 (555) 000-0000"
          className={inputClass}
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      <div>
        <label className={labelClass}>Primary Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>
    </div>
  )
}

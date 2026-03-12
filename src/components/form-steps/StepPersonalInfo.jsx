const inputClass = 'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const errorClass = 'text-red-400 text-xs mt-1'

export default function StepPersonalInfo({ formData, updateField, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-nav text-xs uppercase tracking-wider text-white/70 mb-2">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          placeholder="Your full name"
          className={inputClass}
        />
        {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
      </div>
      <div>
        <label className="block font-nav text-xs uppercase tracking-wider text-white/70 mb-2">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>
      <div>
        <label className="block font-nav text-xs uppercase tracking-wider text-white/70 mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="+1 (555) 000-0000"
          className={inputClass}
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>
    </div>
  )
}

const inputClass = 'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const errorClass = 'text-red-400 text-xs mt-1'

const EVENT_TYPES = [
  'Wedding',
  'Birthday',
  'Corporate Event',
  'Concert',
  'Anniversary',
  'Graduation',
  'Other',
]

export default function StepEventDetails({ formData, updateField, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-nav text-xs uppercase tracking-wider text-white/70 mb-2">Event Type</label>
        <select
          value={formData.eventType}
          onChange={(e) => updateField('eventType', e.target.value)}
          className={`${inputClass} ${!formData.eventType ? 'text-white/30' : ''}`}
        >
          <option value="">Select event type</option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.eventType && <p className={errorClass}>{errors.eventType}</p>}
      </div>
      <div>
        <label className="block font-nav text-xs uppercase tracking-wider text-white/70 mb-2">Preferred Date</label>
        <input
          type="date"
          value={formData.preferredDate}
          onChange={(e) => updateField('preferredDate', e.target.value)}
          className={inputClass}
        />
        {errors.preferredDate && <p className={errorClass}>{errors.preferredDate}</p>}
      </div>
      <div>
        <label className="block font-nav text-xs uppercase tracking-wider text-white/70 mb-2">Estimated Guest Count</label>
        <input
          type="number"
          value={formData.guestCount}
          onChange={(e) => updateField('guestCount', e.target.value)}
          placeholder="e.g. 150"
          min="1"
          className={inputClass}
        />
        {errors.guestCount && <p className={errorClass}>{errors.guestCount}</p>}
      </div>
    </div>
  )
}

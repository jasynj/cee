const inputClass =
  'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const labelClass = 'block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2'
const errorClass = 'text-red-400 text-xs mt-1'

const EVENT_TYPES = [
  'Wedding',
  'Birthday Party',
  'Corporate Event',
  'Baby Shower / Bridal Shower',
  'Anniversary',
  'Graduation',
  'Private Dinner',
  'Religious / Cultural Event',
  'Concert / Show',
  'Other',
]

const BUDGET_RANGES = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Prefer not to say',
]

const VENUE_TYPES = [
  { id: 'indoor', label: 'Indoor' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'both', label: 'Both' },
]

export default function StepEventDetails({ formData, updateField, errors }) {
  return (
    <div className="space-y-5">
      <div>
        <label className={labelClass}>Event Name</label>
        <input
          type="text"
          value={formData.eventName}
          onChange={(e) => updateField('eventName', e.target.value)}
          placeholder="Name of your event"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Event Type</label>
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
        {formData.eventType === 'Other' && (
          <input
            type="text"
            value={formData.eventTypeOther || ''}
            onChange={(e) => updateField('eventTypeOther', e.target.value)}
            placeholder="Please describe your event type..."
            className={`${inputClass} mt-3`}
          />
        )}
      </div>

      <div>
        <label className={labelClass}>Event Description</label>
        <textarea
          value={formData.eventDescription}
          onChange={(e) => updateField('eventDescription', e.target.value)}
          placeholder="Tell us a bit about your event — the vibe, theme, or any details that matter to you..."
          rows={3}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Venue Setting</label>
        <div className="grid grid-cols-3 gap-3">
          {VENUE_TYPES.map((vt) => (
            <button
              key={vt.id}
              onClick={() => updateField('venueType', vt.id)}
              className={`p-3 border text-center transition-all cursor-pointer ${
                formData.venueType === vt.id
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80'
              }`}
            >
              <span className="block font-nav text-xs uppercase tracking-wider">{vt.label}</span>
            </button>
          ))}
        </div>
        {errors.venueType && <p className={errorClass}>{errors.venueType}</p>}
      </div>

      <div>
        <label className={labelClass}>Venue / Location</label>
        <input
          type="text"
          value={formData.venue}
          onChange={(e) => updateField('venue', e.target.value)}
          placeholder="Venue name or address (if known)"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Expected Guest Count</label>
          <input
            type="number"
            value={formData.guestCount}
            onChange={(e) => updateField('guestCount', e.target.value)}
            placeholder="Estimated guests"
            className={inputClass}
            min="1"
          />
          {errors.guestCount && <p className={errorClass}>{errors.guestCount}</p>}
        </div>
        <div>
          <label className={labelClass}>Budget Range</label>
          <select
            value={formData.budgetRange}
            onChange={(e) => updateField('budgetRange', e.target.value)}
            className={`${inputClass} ${!formData.budgetRange ? 'text-white/30' : ''}`}
          >
            <option value="">Select range</option>
            {BUDGET_RANGES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.budgetRange && <p className={errorClass}>{errors.budgetRange}</p>}
        </div>
      </div>
    </div>
  )
}

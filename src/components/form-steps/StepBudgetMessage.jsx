const inputClass = 'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const errorClass = 'text-red-400 text-xs mt-1'

const BUDGET_RANGES = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000+',
]

export default function StepBudgetMessage({ formData, updateField, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-nav text-xs uppercase tracking-wider text-white/70 mb-2">Budget Range</label>
        <select
          value={formData.budgetRange}
          onChange={(e) => updateField('budgetRange', e.target.value)}
          className={`${inputClass} ${!formData.budgetRange ? 'text-white/30' : ''}`}
        >
          <option value="">Select budget range</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
        {errors.budgetRange && <p className={errorClass}>{errors.budgetRange}</p>}
      </div>
      <div>
        <label className="block font-nav text-xs uppercase tracking-wider text-white/70 mb-2">Additional Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell us more about your vision for the event..."
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  )
}

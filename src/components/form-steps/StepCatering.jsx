const inputClass =
  'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const labelClass = 'block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2'
const errorClass = 'text-red-400 text-xs mt-2'

const SERVICE_TYPES = [
  { id: 'full',       label: 'Full Catering' },
  { id: 'bar',        label: 'Bar / Beverage Service' },
  { id: 'desserts',   label: 'Desserts & Cake' },
  { id: 'appetizers', label: 'Appetizers / Small Chops' },
  { id: 'breakfast',  label: 'Breakfast / Brunch' },
]

const SERVICE_STYLES = ['Buffet', 'Plated', 'Food Stations', 'Cocktail-style']

const CUISINES = [
  { id: 'nigerian',      label: 'Nigerian / African' },
  { id: 'continental',   label: 'Continental' },
  { id: 'asian',         label: 'Chinese / Asian' },
  { id: 'mediterranean', label: 'Mediterranean' },
  { id: 'mixed',         label: 'Mixed / Variety' },
  { id: 'other',         label: 'Other' },
]

const DIETARY = [
  { id: 'vegan',       label: 'Vegan' },
  { id: 'vegetarian',  label: 'Vegetarian' },
  { id: 'halal',       label: 'Halal' },
  { id: 'kosher',      label: 'Kosher' },
  { id: 'nut_free',    label: 'Nut-free' },
  { id: 'gluten_free', label: 'Gluten-free' },
  { id: 'none',        label: 'None' },
]

function MultiSelectChips({ options, selected, onToggle, errorKey, errors }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id)
          return (
            <button
              key={opt.id}
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onToggle(opt.id)}
              className={`px-3 py-2 border text-xs font-nav uppercase tracking-wide transition-all cursor-pointer ${
                isSelected
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
      {errorKey && errors[errorKey] && <p className={errorClass}>{errors[errorKey]}</p>}
    </div>
  )
}

function YesNoToggle({ value, onChange, errorKey, errors }) {
  return (
    <div>
      <div className="flex gap-3">
        {[{ val: true, label: 'Yes' }, { val: false, label: 'No' }].map(({ val, label }) => (
          <button
            key={label}
            onClick={() => onChange(val)}
            className={`flex-1 py-3 border text-sm font-nav uppercase tracking-wider transition-all cursor-pointer ${
              value === val
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-white/10 text-white/50 hover:border-gold/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {errorKey && errors[errorKey] && <p className={errorClass}>{errors[errorKey]}</p>}
    </div>
  )
}

export default function StepCatering({ data, updateField, errors }) {
  const toggleMulti = (field, id) => {
    const current = data[field]
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id]
    updateField(field, next)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Type of Catering Service</label>
        <MultiSelectChips
          options={SERVICE_TYPES}
          selected={data.serviceTypes}
          onToggle={(id) => toggleMulti('serviceTypes', id)}
          errorKey="catering.serviceTypes"
          errors={errors}
        />
      </div>

      <div>
        <label className={labelClass}>Service Style</label>
        <select
          value={data.serviceStyle}
          onChange={(e) => updateField('serviceStyle', e.target.value)}
          className={`${inputClass} ${!data.serviceStyle ? 'text-white/30' : ''}`}
        >
          <option value="">Select a style</option>
          {SERVICE_STYLES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors['catering.serviceStyle'] && (
          <p className={errorClass}>{errors['catering.serviceStyle']}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Cuisine Preferences</label>
        <MultiSelectChips
          options={CUISINES}
          selected={data.cuisinePreferences}
          onToggle={(id) => toggleMulti('cuisinePreferences', id)}
          errorKey="catering.cuisinePreferences"
          errors={errors}
        />
      </div>

      <div>
        <label className={labelClass}>Dietary Restrictions / Requirements</label>
        <MultiSelectChips
          options={DIETARY}
          selected={data.dietaryRestrictions}
          onToggle={(id) => toggleMulti('dietaryRestrictions', id)}
          errorKey={null}
          errors={errors}
        />
      </div>

      {!data.serviceTypes.includes('bar') && (
        <div>
          <label className={labelClass}>Will you need bar / beverage service?</label>
          <YesNoToggle
            value={data.needsBarService}
            onChange={(val) => updateField('needsBarService', val)}
            errorKey={null}
            errors={errors}
          />
        </div>
      )}

      <div>
        <label className={labelClass}>Do you have tables and chairs?</label>
        <YesNoToggle
          value={data.hasTablesAndChairs}
          onChange={(val) => updateField('hasTablesAndChairs', val)}
          errorKey="catering.hasTablesAndChairs"
          errors={errors}
        />
      </div>

      <div>
        <label className={labelClass}>Specific menu requests or notes</label>
        <textarea
          value={data.menuNotes}
          onChange={(e) => updateField('menuNotes', e.target.value)}
          placeholder="Any specific dishes, dietary accommodations, or requests..."
          rows={3}
          className={inputClass}
        />
      </div>
    </div>
  )
}

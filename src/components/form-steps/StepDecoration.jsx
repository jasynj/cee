const inputClass =
  'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const labelClass = 'block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2'
const errorClass = 'text-red-400 text-xs mt-2'

const THEMES = [
  'Elegant / Classic',
  'Modern / Contemporary',
  'Rustic / Bohemian',
  'Floral Fantasy',
  'Fairytale / Whimsical',
  'African / Cultural',
  'Custom / Other',
]

const AREAS = [
  { id: 'entrance',   label: 'Entrance / Foyer' },
  { id: 'main_hall',  label: 'Main Hall / Venue' },
  { id: 'tables',     label: 'Tables / Centerpieces' },
  { id: 'stage',      label: 'Stage / Head Table' },
  { id: 'photo_booth',label: 'Photo Booth Area' },
  { id: 'ceiling',    label: 'Ceiling / Draping' },
  { id: 'outdoor',    label: 'Outdoor / Garden' },
]

const ITEMS = [
  { id: 'floral',       label: 'Floral Arrangements' },
  { id: 'balloons',     label: 'Balloon Décor' },
  { id: 'centerpieces', label: 'Table Centerpieces' },
  { id: 'draping',      label: 'Fabric Draping' },
  { id: 'lighting',     label: 'Lighting' },
  { id: 'backdrop',     label: 'Backdrop / Arch' },
  { id: 'chairs',       label: 'Chair Covers / Sashes' },
  { id: 'other',        label: 'Other' },
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

export default function StepDecoration({ data, updateField, errors }) {
  const toggleMulti = (field, id) => {
    const current = data[field]
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id]
    updateField(field, next)
  }

  const handleMoodBoardToggle = (val) => {
    updateField('hasMoodBoard', val)
    if (!val) updateField('moodBoardUrl', '')
  }

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Decoration Theme / Style</label>
        <select
          value={data.theme}
          onChange={(e) => updateField('theme', e.target.value)}
          className={`${inputClass} ${!data.theme ? 'text-white/30' : ''}`}
        >
          <option value="">Select a theme</option>
          {THEMES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors['decoration.theme'] && (
          <p className={errorClass}>{errors['decoration.theme']}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Color Palette</label>
        <input
          type="text"
          value={data.colorPalette}
          onChange={(e) => updateField('colorPalette', e.target.value)}
          placeholder="e.g. gold, white, champagne"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Areas to Decorate</label>
        <MultiSelectChips
          options={AREAS}
          selected={data.areasToDecorate}
          onToggle={(id) => toggleMulti('areasToDecorate', id)}
          errorKey="decoration.areasToDecorate"
          errors={errors}
        />
      </div>

      <div>
        <label className={labelClass}>Items Needed</label>
        <MultiSelectChips
          options={ITEMS}
          selected={data.itemsNeeded}
          onToggle={(id) => toggleMulti('itemsNeeded', id)}
          errorKey="decoration.itemsNeeded"
          errors={errors}
        />
      </div>

      <div>
        <label className={labelClass}>Do you have a mood board or inspiration images?</label>
        <YesNoToggle
          value={data.hasMoodBoard}
          onChange={handleMoodBoardToggle}
          errorKey="decoration.hasMoodBoard"
          errors={errors}
        />
      </div>

      {data.hasMoodBoard === true && (
        <div>
          <label className={labelClass}>Mood Board / Inspiration Link</label>
          <input
            type="url"
            value={data.moodBoardUrl}
            onChange={(e) => updateField('moodBoardUrl', e.target.value)}
            placeholder="https://pinterest.com/your-board or Google Drive link"
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label className={labelClass}>Additional Notes</label>
        <textarea
          value={data.decorationNotes}
          onChange={(e) => updateField('decorationNotes', e.target.value)}
          placeholder="Any other details, specific requests, or inspiration to share..."
          rows={3}
          className={inputClass}
        />
      </div>
    </div>
  )
}

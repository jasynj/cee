const inputClass =
  'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const inputSmClass =
  'w-24 font-body bg-dark-elevated border border-white/10 px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
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
  { id: 'entrance',    label: 'Entrance / Foyer' },
  { id: 'main_hall',   label: 'Main Hall / Venue' },
  { id: 'tables',      label: 'Tables / Centerpieces' },
  { id: 'stage',       label: 'Stage / Head Table' },
  { id: 'photo_booth', label: 'Photo Booth Area' },
  { id: 'ceiling',     label: 'Ceiling / Draping' },
  { id: 'outdoor',     label: 'Outdoor / Garden' },
]

// Countable items require a quantity input when selected
const COUNTABLE_IDS = ['floral', 'balloons', 'centerpieces', 'backdrop', 'chairs']

const ITEMS = [
  { id: 'floral',       label: 'Floral Arrangements',  countable: true },
  { id: 'balloons',     label: 'Balloon Décor',        countable: true },
  { id: 'centerpieces', label: 'Table Centerpieces',   countable: true },
  { id: 'draping',      label: 'Fabric Draping',       countable: false },
  { id: 'lighting',     label: 'Lighting',             countable: false },
  { id: 'backdrop',     label: 'Backdrop / Arch',      countable: true },
  { id: 'chairs',       label: 'Chair Covers / Sashes',countable: true },
  { id: 'other',        label: 'Other',                countable: false },
]

const TABLE_SHAPES = [
  { id: 'circular',    label: 'Circular' },
  { id: 'rectangular', label: 'Rectangular' },
  { id: 'mixed',       label: 'Mixed' },
]

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
  const toggleArea = (id) => {
    const next = data.areasToDecorate.includes(id)
      ? data.areasToDecorate.filter((x) => x !== id)
      : [...data.areasToDecorate, id]
    updateField('areasToDecorate', next)
  }

  const toggleItem = (id, countable) => {
    const wasSelected = data.itemsNeeded.includes(id)
    const next = wasSelected
      ? data.itemsNeeded.filter((x) => x !== id)
      : [...data.itemsNeeded, id]
    updateField('itemsNeeded', next)
    // Clear quantity when deselecting a countable item
    if (countable && wasSelected) {
      updateField('itemQuantities', { ...data.itemQuantities, [id]: '' })
    }
  }

  const handleMoodBoardToggle = (val) => {
    updateField('hasMoodBoard', val)
    if (!val) updateField('moodBoardUrl', '')
  }

  const handleTablesChairsToggle = (val) => {
    updateField('hasTablesChairs', val)
    if (!val) {
      updateField('tableShape', '')
      updateField('numberOfTables', '')
      updateField('chairsPerTable', '')
      updateField('needsTableCovers', null)
      updateField('needsChairCovers', null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Theme */}
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

      {/* Color Palette */}
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

      {/* Areas to Decorate */}
      <div>
        <label className={labelClass}>Areas to Decorate</label>
        <div className="flex flex-wrap gap-2">
          {AREAS.map((area) => {
            const isSelected = data.areasToDecorate.includes(area.id)
            return (
              <button
                key={area.id}
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => toggleArea(area.id)}
                className={`px-3 py-2 border text-xs font-nav tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80'
                }`}
              >
                {area.label}
              </button>
            )
          })}
        </div>
        {errors['decoration.areasToDecorate'] && (
          <p className={errorClass}>{errors['decoration.areasToDecorate']}</p>
        )}
      </div>

      {/* Items Needed (with qty for countable) */}
      <div>
        <label className={labelClass}>Items Needed</label>
        <div className="flex flex-wrap gap-2">
          {ITEMS.map((item) => {
            const isSelected = data.itemsNeeded.includes(item.id)
            return (
              <button
                key={item.id}
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => toggleItem(item.id, item.countable)}
                className={`px-3 py-2 border text-xs font-nav tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        {/* Quantity inputs for selected countable items */}
        {ITEMS.filter((item) => item.countable && data.itemsNeeded.includes(item.id)).length > 0 && (
          <div className="mt-4 space-y-3">
            {ITEMS.filter((item) => item.countable && data.itemsNeeded.includes(item.id)).map(
              (item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <span className="text-white/60 text-xs font-nav uppercase tracking-wide w-40 shrink-0">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={data.itemQuantities[item.id] || ''}
                      onChange={(e) =>
                        updateField('itemQuantities', {
                          ...data.itemQuantities,
                          [item.id]: e.target.value,
                        })
                      }
                      placeholder="Qty"
                      className={inputSmClass}
                    />
                    <span className="text-white/30 text-xs">needed</span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
        {data.itemsNeeded.includes('other') && (
          <input
            type="text"
            value={data.otherItemNote || ''}
            onChange={(e) => updateField('otherItemNote', e.target.value)}
            placeholder="Please describe the additional item(s)..."
            className={`${inputClass} mt-3`}
          />
        )}
        {errors['decoration.itemsNeeded'] && (
          <p className={errorClass}>{errors['decoration.itemsNeeded']}</p>
        )}
      </div>

      {/* Tables & Chairs */}
      <div>
        <label className={labelClass}>Do you have your own tables and chairs?</label>
        <YesNoToggle
          value={data.hasTablesChairs}
          onChange={handleTablesChairsToggle}
          errorKey="decoration.hasTablesChairs"
          errors={errors}
        />
      </div>

      {data.hasTablesChairs === true && (
        <div className="bg-dark-elevated border border-white/10 p-5 space-y-5">
          <div>
            <label className={labelClass}>Table Shape</label>
            <div className="grid grid-cols-3 gap-3">
              {TABLE_SHAPES.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => updateField('tableShape', shape.id)}
                  className={`p-3 border text-center transition-all cursor-pointer ${
                    data.tableShape === shape.id
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80'
                  }`}
                >
                  <span className="block font-nav text-xs uppercase tracking-wider">
                    {shape.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Number of Tables</label>
              <input
                type="number"
                min="1"
                value={data.numberOfTables}
                onChange={(e) => updateField('numberOfTables', e.target.value)}
                placeholder="e.g. 10"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Chairs Per Table</label>
              <input
                type="number"
                min="1"
                value={data.chairsPerTable}
                onChange={(e) => updateField('chairsPerTable', e.target.value)}
                placeholder="e.g. 8"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Would you like table covers?</label>
            <YesNoToggle
              value={data.needsTableCovers}
              onChange={(val) => updateField('needsTableCovers', val)}
              errorKey={null}
              errors={errors}
            />
          </div>

          <div>
            <label className={labelClass}>Would you like chair covers?</label>
            <YesNoToggle
              value={data.needsChairCovers}
              onChange={(val) => updateField('needsChairCovers', val)}
              errorKey={null}
              errors={errors}
            />
          </div>
        </div>
      )}

      {/* Mood Board */}
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

      {/* Notes */}
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

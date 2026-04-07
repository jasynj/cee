const inputClass =
  'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'
const labelClass = 'block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2'
const sectionHeaderClass =
  'font-nav text-xs uppercase tracking-[0.2em] text-gold border-b border-gold/20 pb-2 mb-3'
const errorClass = 'text-red-400 text-xs mt-2'

const SERVICE_TYPES = [
  { id: 'full', label: 'Full Catering' },
  { id: 'bar', label: 'Bar / Beverage Service' },
  { id: 'desserts', label: 'Desserts & Cake' },
  { id: 'appetizers', label: 'Appetizers / Small Chops' },
  { id: 'breakfast', label: 'Breakfast / Brunch' },
]

const SERVICE_STYLES = ['Buffet', 'Plated', 'Food Stations', 'Cocktail-style']

const MENU_CATEGORIES = [
  {
    key: 'fruitsVeggies',
    label: 'Fruits & Veggies',
    items: [
      { id: 'fruit_tray', label: 'Fruit Tray' },
      { id: 'fruit_kabobs', label: 'Fruit Kabobs' },
      { id: 'fruit_display', label: 'Fruit Display' },
      { id: 'meat_cheese_tray', label: 'Meat & Cheese Tray' },
    ],
  },
  {
    key: 'appetizers',
    label: 'Appetizers',
    items: [
      { id: 'bacon_deviled_eggs', label: 'Bacon Deviled Eggs' },
      { id: 'deviled_eggs', label: 'Deviled Eggs' },
      { id: 'shrimp_deviled_eggs', label: 'Shrimp Deviled Eggs' },
      { id: 'buffalo_dip', label: 'Buffalo Dip' },
      { id: 'queso', label: 'Queso (without beef)' },
      { id: 'queso_beef', label: 'Queso (with beef)' },
      { id: 'salsa', label: 'Salsa' },
      { id: 'spinach_dip', label: 'Spinach Dip' },
    ],
  },
  {
    key: 'pastasSides',
    label: 'Pastas & Sides',
    items: [
      { id: 'shrimp_pasta', label: 'Shrimp Pasta' },
      { id: 'chicken_sausage_pasta', label: 'Chicken & Sausage Pasta' },
      { id: 'combo_pasta', label: 'Combo Pasta' },
      { id: 'cajun_dirty_rice', label: 'Cajun Dirty Rice' },
      { id: 'loaded_jambalaya', label: 'Loaded Jambalaya' },
      { id: 'pasta_salad', label: 'Pasta Salad' },
      { id: 'mac_cheese', label: "Mac 'n Cheese" },
      { id: 'green_beans', label: 'Green Beans' },
      { id: 'corn', label: 'Corn' },
      { id: 'loaded_potatoes', label: 'Loaded Potatoes' },
    ],
  },
  {
    key: 'meatballs',
    label: 'Meatballs',
    items: [
      { id: 'bbq_meatballs', label: 'BBQ' },
      { id: 'parmesan_garlic_meatballs', label: 'Parmesan Garlic' },
    ],
  },
  {
    key: 'wings',
    label: 'Wings',
    items: [
      { id: 'honey_bbq_wings', label: 'Honey BBQ' },
      { id: 'hot_wings', label: 'Hot' },
      { id: 'jamaican_jerk_wings', label: 'Jamaican Jerk' },
      { id: 'lemon_pepper_wings', label: 'Lemon Pepper' },
    ],
  },
  {
    key: 'sliders',
    label: 'Sliders & Sandwiches',
    items: [
      { id: 'catfish_slider', label: 'Catfish' },
      { id: 'pulled_pork', label: 'Pulled Pork' },
      { id: 'ham_cheese', label: 'Ham & Cheese' },
      { id: 'turkey', label: 'Turkey' },
      { id: 'pinwheel_sandwiches', label: 'Pinwheel Sandwiches' },
    ],
  },
  {
    key: 'protein',
    label: 'Protein',
    items: [
      { id: 'chicken_baked', label: 'Chicken — Baked' },
      { id: 'chicken_fried', label: 'Chicken — Fried' },
      { id: 'chicken_grilled', label: 'Chicken — Grilled' },
      { id: 'chicken_bites', label: 'Chicken Bites — Fried' },
      { id: 'shrimp', label: 'Shrimp' },
      { id: 'steak_bites', label: 'Steak Bites' },
      { id: 'catfish_strips', label: 'Catfish Strips' },
      { id: 'chicken_strips', label: 'Chicken Strips' },

    ],
  },
  {
    key: 'desserts',
    label: 'Desserts',
    items: [
      { id: 'banana_pudding', label: 'Banana Pudding' },
      { id: 'peach_cobbler', label: 'Peach Cobbler' },
      { id: 'assorted_cakes', label: 'Assorted Cakes' },
    ],
  },
]

const DIETARY = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'halal', label: 'Halal' },
  { id: 'kosher', label: 'Kosher' },
  { id: 'nut_free', label: 'Nut-free' },
  { id: 'gluten_free', label: 'Gluten-free' },
  { id: 'none', label: 'None' },
]

function Chip({ label, isSelected, onToggle }) {
  return (
    <button
      role="checkbox"
      aria-checked={isSelected}
      onClick={onToggle}
      className={`px-3 py-2 border text-xs font-nav tracking-wide transition-all cursor-pointer ${isSelected
        ? 'border-gold bg-gold/10 text-gold'
        : 'border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80'
        }`}
    >
      {label}
    </button>
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
            className={`flex-1 py-3 border text-sm font-nav uppercase tracking-wider transition-all cursor-pointer ${value === val
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
  const toggleMenuItem = (categoryKey, itemId) => {
    const current = data.menuSelections[categoryKey]
    const next = current.includes(itemId)
      ? current.filter((x) => x !== itemId)
      : [...current, itemId]
    updateField('menuSelections', { ...data.menuSelections, [categoryKey]: next })
  }

  const toggleMulti = (field, id) => {
    const current = data[field]
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id]
    updateField(field, next)
  }

  return (
    <div className="space-y-8">
      {/* Service Type */}
      <div>
        <label className={labelClass}>Type of Catering Service</label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_TYPES.map((opt) => (
            <Chip
              key={opt.id}
              label={opt.label}
              isSelected={data.serviceTypes.includes(opt.id)}
              onToggle={() => toggleMulti('serviceTypes', opt.id)}
            />
          ))}
        </div>
        {errors['catering.serviceTypes'] && (
          <p className={errorClass}>{errors['catering.serviceTypes']}</p>
        )}
      </div>

      {/* Service Style */}
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

      {/* Menu Selection */}
      <div className="space-y-6">
        <label className={labelClass}>Menu Selection</label>
        <p className="text-white/40 text-xs font-body -mt-1">
          Select as many dishes as you&apos;d like across any category.
        </p>
        {MENU_CATEGORIES.map((cat) => (
          <div key={cat.key}>
            <p className={sectionHeaderClass}>{cat.label}</p>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <Chip
                  key={item.id}
                  label={item.label}
                  isSelected={data.menuSelections[cat.key].includes(item.id)}
                  onToggle={() => toggleMenuItem(cat.key, item.id)}
                />
              ))}
            </div>
          </div>
        ))}
        {errors['catering.menuSelections'] && (
          <p className={errorClass}>{errors['catering.menuSelections']}</p>
        )}
      </div>

      {/* Dietary Restrictions */}
      <div>
        <label className={labelClass}>Dietary Restrictions / Requirements</label>
        <div className="flex flex-wrap gap-2">
          {DIETARY.map((opt) => (
            <Chip
              key={opt.id}
              label={opt.label}
              isSelected={data.dietaryRestrictions.includes(opt.id)}
              onToggle={() => toggleMulti('dietaryRestrictions', opt.id)}
            />
          ))}
        </div>
      </div>

      {/* Bar Service (hidden if 'bar' already in serviceTypes) */}
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

      {/* Menu Notes */}
      <div>
        <label className={labelClass}>Additional Notes or Requests</label>
        <textarea
          value={data.menuNotes}
          onChange={(e) => updateField('menuNotes', e.target.value)}
          placeholder="Any special preparation instructions, allergies not listed above, or other requests..."
          rows={3}
          className={inputClass}
        />
      </div>
    </div>
  )
}

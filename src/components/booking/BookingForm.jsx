import { useState, useCallback } from 'react'
import { useForm } from '@formspree/react'
import ProgressBar from '../ui/ProgressBar'
import FormStep from '../ui/FormStep'
import Button from '../ui/Button'
import Calendar from '../ui/Calendar'
import StepPersonalInfo from '../form-steps/StepPersonalInfo'
import StepEventDetails from '../form-steps/StepEventDetails'
import StepServices from '../form-steps/StepServices'
import StepCatering from '../form-steps/StepCatering'
import StepDecoration from '../form-steps/StepDecoration'
import { FORMSPREE_ID } from '../../constants/navigation'

const TIME_SLOTS = [
  { id: 'morning',   label: 'Morning',   range: '8:00 AM – 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', range: '12:00 PM – 5:00 PM' },
  { id: 'evening',   label: 'Evening',   range: '5:00 PM – 10:00 PM' },
]

const initialFormData = {
  // Step 1 — Schedule
  preferredDate: '',
  timeSlot: '',

  // Step 2 — Personal Info
  firstName: '',
  lastName: '',
  phone: '',
  email: '',

  // Step 3 — Event Details
  eventName: '',
  eventType: '',
  eventTypeOther: '',
  eventDescription: '',
  venueType: '',
  venue: '',
  guestCount: '',
  budgetRange: '',

  // Step 4 — Services
  services: [],

  // Step 5 — Catering (conditional)
  catering: {
    serviceTypes: [],
    serviceStyle: '',
    menuSelections: {
      fruitsVeggies: [],
      appetizers:    [],
      pastasSides:   [],
      meatballs:     [],
      wings:         [],
      sliders:       [],
      meats:         [],
      desserts:      [],
    },
    dietaryRestrictions: [],
    needsBarService: null,
    menuNotes: '',
  },

  // Step 6 — Decoration (conditional)
  decoration: {
    theme: '',
    colorPalette: '',
    areasToDecorate: [],
    itemsNeeded: [],
    itemQuantities: {
      floral: '', balloons: '', centerpieces: '', backdrop: '', chairs: '',
    },
    otherItemNote: '',
    hasTablesChairs: null,
    tableShape: '',
    numberOfTables: '',
    chairsPerTable: '',
    needsTableCovers: null,
    needsChairCovers: null,
    hasMoodBoard: null,
    moodBoardUrl: '',
    decorationNotes: '',
  },
}

function validateStep(stepIndex, data, cateringStepIndex, decorationStepIndex) {
  const errors = {}

  if (stepIndex === 0) {
    if (!data.preferredDate) errors.preferredDate = 'Please select a date'
    if (!data.timeSlot)      errors.timeSlot = 'Please select a time slot'
  }

  if (stepIndex === 1) {
    if (!data.firstName.trim()) errors.firstName = 'First name is required'
    if (!data.lastName.trim())  errors.lastName = 'Last name is required'
    if (!data.phone.trim())     errors.phone = 'Phone number is required'
    if (!data.email.trim())     errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = 'Please enter a valid email'
  }

  if (stepIndex === 2) {
    if (!data.eventType)    errors.eventType = 'Please select an event type'
    if (!data.venueType)    errors.venueType = 'Please select a venue setting'
    if (!data.guestCount)   errors.guestCount = 'Please enter an estimated guest count'
    if (!data.budgetRange)  errors.budgetRange = 'Please select a budget range'
  }

  if (stepIndex === 3) {
    if (data.services.length === 0)
      errors.services = 'Please select at least one service'
  }

  if (cateringStepIndex !== null && stepIndex === cateringStepIndex) {
    if (data.catering.serviceTypes.length === 0)
      errors['catering.serviceTypes'] = 'Please select at least one catering service'
    if (!data.catering.serviceStyle)
      errors['catering.serviceStyle'] = 'Please select a service style'
  }

  if (decorationStepIndex !== null && stepIndex === decorationStepIndex) {
    if (!data.decoration.theme)
      errors['decoration.theme'] = 'Please select a decoration theme'
    if (data.decoration.areasToDecorate.length === 0)
      errors['decoration.areasToDecorate'] = 'Please select at least one area to decorate'
    if (data.decoration.itemsNeeded.length === 0)
      errors['decoration.itemsNeeded'] = 'Please select at least one item needed'
    if (data.decoration.hasMoodBoard === null)
      errors['decoration.hasMoodBoard'] = 'Please indicate if you have a mood board'
    if (data.decoration.hasTablesChairs === null)
      errors['decoration.hasTablesChairs'] = 'Please indicate if you have tables and chairs'
  }

  return errors
}

function flattenFormData(data, hasCatering, hasDecoration) {
  const flat = {
    '_replyto': data.email,
    'First Name': data.firstName,
    'Last Name': data.lastName,
    'Phone': data.phone,
    'Email': data.email,
    'Preferred Date': data.preferredDate,
    'Preferred Time': data.timeSlot,
    'Event Name': data.eventName || '—',
    'Event Type': data.eventType === 'Other' && data.eventTypeOther
      ? `Other — ${data.eventTypeOther}`
      : data.eventType,
    'Event Description': data.eventDescription || '—',
    'Venue Setting': data.venueType,
    'Venue / Location': data.venue || '—',
    'Guest Count': data.guestCount,
    'Budget Range': data.budgetRange,
    'Services Requested': data.services.join(', '),
  }

  if (hasCatering) {
    const c = data.catering
    const m = c.menuSelections
    const barService = c.serviceTypes.includes('bar')
      ? 'Yes (selected as service type)'
      : c.needsBarService === true ? 'Yes' : c.needsBarService === false ? 'No' : '—'

    Object.assign(flat, {
      'Catering — Service Types': c.serviceTypes.join(', ') || '—',
      'Catering — Service Style': c.serviceStyle || '—',
      'Catering — Menu — Fruits & Veggies': m.fruitsVeggies.join(', ') || '—',
      'Catering — Menu — Appetizers': m.appetizers.join(', ') || '—',
      'Catering — Menu — Pastas & Sides': m.pastasSides.join(', ') || '—',
      'Catering — Menu — Meatballs': m.meatballs.join(', ') || '—',
      'Catering — Menu — Wings': m.wings.join(', ') || '—',
      'Catering — Menu — Sliders & Sandwiches': m.sliders.join(', ') || '—',
      'Catering — Menu — Meat': m.meats.join(', ') || '—',
      'Catering — Menu — Desserts': m.desserts.join(', ') || '—',
      'Catering — Dietary Restrictions': c.dietaryRestrictions.join(', ') || 'None specified',
      'Catering — Bar Service': barService,
      'Catering — Menu Notes': c.menuNotes || '—',
    })
  }

  if (hasDecoration) {
    const d = data.decoration
    // Build items string with quantities for countable items
    const COUNTABLE = ['floral', 'balloons', 'centerpieces', 'backdrop', 'chairs']
    const itemsStr = d.itemsNeeded.map((id) => {
      if (COUNTABLE.includes(id) && d.itemQuantities[id]) {
        return `${id} (x${d.itemQuantities[id]})`
      }
      return id
    }).join(', ') || '—'

    Object.assign(flat, {
      'Decoration — Theme': d.theme || '—',
      'Decoration — Color Palette': d.colorPalette || '—',
      'Decoration — Areas': d.areasToDecorate.join(', ') || '—',
      'Decoration — Items Needed': itemsStr,
      'Decoration — Has Tables & Chairs': d.hasTablesChairs === true ? 'Yes' : d.hasTablesChairs === false ? 'No' : '—',
      ...(d.hasTablesChairs === true ? {
        'Decoration — Table Shape': d.tableShape || '—',
        'Decoration — Number of Tables': d.numberOfTables || '—',
        'Decoration — Chairs Per Table': d.chairsPerTable || '—',
        'Decoration — Needs Table Covers': d.needsTableCovers === true ? 'Yes' : d.needsTableCovers === false ? 'No' : '—',
        'Decoration — Needs Chair Covers': d.needsChairCovers === true ? 'Yes' : d.needsChairCovers === false ? 'No' : '—',
      } : {}),
      'Decoration — Has Mood Board': d.hasMoodBoard ? 'Yes' : 'No',
      'Decoration — Mood Board URL': d.hasMoodBoard ? (d.moodBoardUrl || '—') : 'N/A',
      'Decoration — Notes': d.decorationNotes || '—',
      ...(d.itemsNeeded.includes('other') && d.otherItemNote
        ? { 'Decoration — Other Item': d.otherItemNote }
        : {}),
    })
  }

  return flat
}

export default function BookingForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

  // Derived step logic
  const hasCatering = formData.services.includes('catering')
  const hasDecoration = formData.services.includes('decoration')
  const cateringStepIndex = hasCatering ? 4 : null
  const decorationStepIndex = hasDecoration ? (hasCatering ? 5 : 4) : null

  const stepLabels = [
    'Schedule',
    'Personal Info',
    'Event Details',
    'Services',
    ...(hasCatering ? ['Catering'] : []),
    ...(hasDecoration ? ['Decoration'] : []),
  ]
  const totalSteps = stepLabels.length

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const updateNestedField = useCallback((section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
    const errorKey = `${section}.${field}`
    setErrors((prev) => {
      if (!prev[errorKey]) return prev
      const next = { ...prev }
      delete next[errorKey]
      return next
    })
  }, [])

  const handleServiceToggle = useCallback((serviceId) => {
    setFormData((prev) => {
      const current = prev.services
      const newServices = current.includes(serviceId)
        ? current.filter((s) => s !== serviceId)
        : [...current, serviceId]

      const newHasCatering = newServices.includes('catering')
      const newHasDecoration = newServices.includes('decoration')
      const newTotal = 4 + (newHasCatering ? 1 : 0) + (newHasDecoration ? 1 : 0)

      setCurrentStep((cs) => (cs >= newTotal ? newTotal - 1 : cs))
      return { ...prev, services: newServices }
    })
    setErrors((prev) => {
      if (!prev.services) return prev
      const next = { ...prev }
      delete next.services
      return next
    })
  }, [])

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData, cateringStepIndex, decorationStepIndex)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setCurrentStep((s) => s + 1)
  }

  const handleBack = () => {
    setErrors({})
    setCurrentStep((s) => s - 1)
  }

  const onSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData, cateringStepIndex, decorationStepIndex)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    const payload = flattenFormData(formData, hasCatering, hasDecoration)
    await handleSubmit(payload)
  }

  if (state.succeeded) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div
            className="text-center bg-dark-card border border-gold/30 p-12"
            data-aos="zoom-in"
          >
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gold text-4xl">&#10003;</span>
            </div>
            <h3 className="font-heading text-3xl font-semibold mb-4">Inquiry Submitted!</h3>
            <p className="text-white/70 text-base">
              Thank you for reaching out. We&apos;ll review your inquiry and get back to you within 24 hours with a personalised quote.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-24 pt-8 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-dark-card border border-white/10 p-8 md:p-12" data-aos="fade-up">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            labels={stepLabels}
          />

          <FormStep key={currentStep}>
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-3">
                    Select Date
                  </label>
                  <Calendar
                    selectedDate={formData.preferredDate}
                    onSelect={(date) => updateField('preferredDate', date)}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-400 text-xs mt-2">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-3">
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => updateField('timeSlot', slot.id)}
                        className={`p-4 border text-center transition-all cursor-pointer ${
                          formData.timeSlot === slot.id
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80'
                        }`}
                      >
                        <span className="block font-nav text-xs uppercase tracking-wider mb-1">
                          {slot.label}
                        </span>
                        <span className="block text-xs opacity-60">{slot.range}</span>
                      </button>
                    ))}
                  </div>
                  {errors.timeSlot && (
                    <p className="text-red-400 text-xs mt-2">{errors.timeSlot}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <StepPersonalInfo
                formData={formData}
                updateField={updateField}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <StepEventDetails
                formData={formData}
                updateField={updateField}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <StepServices
                formData={formData}
                onServiceToggle={handleServiceToggle}
                errors={errors}
              />
            )}

            {cateringStepIndex !== null && currentStep === cateringStepIndex && (
              <StepCatering
                data={formData.catering}
                updateField={(field, value) => updateNestedField('catering', field, value)}
                errors={errors}
              />
            )}

            {decorationStepIndex !== null && currentStep === decorationStepIndex && (
              <StepDecoration
                data={formData.decoration}
                updateField={(field, value) => updateNestedField('decoration', field, value)}
                errors={errors}
              />
            )}
          </FormStep>

          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handleBack}>Back</Button>
            ) : (
              <div />
            )}
            {currentStep < totalSteps - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={onSubmit} disabled={state.submitting}>
                {state.submitting ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

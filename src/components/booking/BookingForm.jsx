import { useState, useCallback } from 'react'
import { useForm } from '@formspree/react'
import ProgressBar from '../ui/ProgressBar'
import FormStep from '../ui/FormStep'
import Button from '../ui/Button'
import { FORMSPREE_ID } from '../../constants/navigation'

const STEP_LABELS = ['Schedule', 'Details']
const TOTAL_STEPS = 2

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', range: '8:00 AM – 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', range: '12:00 PM – 5:00 PM' },
  { id: 'evening', label: 'Evening', range: '5:00 PM – 10:00 PM' },
]

const EVENT_TYPES = [
  'Wedding',
  'Birthday Party',
  'Corporate Event',
  'Private Dinner',
  'Concert / Show',
  'Cultural Event',
  'Other',
]

const inputClass =
  'w-full font-body bg-dark-elevated border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all'

const initialFormData = {
  preferredDate: '',
  timeSlot: '',
  fullName: '',
  email: '',
  phone: '',
  eventType: '',
  guestCount: '',
  message: '',
}

function validateStep(step, data) {
  const errors = {}
  if (step === 0) {
    if (!data.preferredDate) errors.preferredDate = 'Please select a date'
    if (!data.timeSlot) errors.timeSlot = 'Please select a time slot'
  }
  if (step === 1) {
    if (!data.fullName.trim()) errors.fullName = 'Name is required'
    if (!data.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email'
    if (!data.phone.trim()) errors.phone = 'Phone number is required'
    if (!data.eventType) errors.eventType = 'Please select an event type'
  }
  return errors
}

function Calendar({ selectedDate, onSelect }) {
  const [viewDate, setViewDate] = useState(() => {
    const d = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate()
  const firstDayOfWeek = new Date(viewDate.year, viewDate.month, 1).getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const prevMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 }
      return { ...prev, month: prev.month - 1 }
    })
  }

  const nextMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 }
      return { ...prev, month: prev.month + 1 }
    })
  }

  const handleDayClick = (day) => {
    const date = new Date(viewDate.year, viewDate.month, day)
    if (date < today) return
    const yyyy = viewDate.year
    const mm = String(viewDate.month + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    onSelect(`${yyyy}-${mm}-${dd}`)
  }

  const isPastMonth =
    viewDate.year < today.getFullYear() ||
    (viewDate.year === today.getFullYear() && viewDate.month <= today.getMonth())

  return (
    <div className="bg-dark-elevated border border-white/10 p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          disabled={isPastMonth}
          className={`w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors cursor-pointer ${
            isPastMonth ? 'opacity-30 cursor-not-allowed' : ''
          }`}
        >
          &larr;
        </button>
        <h3 className="font-heading text-lg text-white font-semibold">
          {monthNames[viewDate.month]} {viewDate.year}
        </h3>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors cursor-pointer"
        >
          &rarr;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-center text-white/30 text-xs font-nav uppercase py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const date = new Date(viewDate.year, viewDate.month, day)
          const isPast = date < today
          const dateStr = `${viewDate.year}-${String(viewDate.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isSelected = selectedDate === dateStr

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={isPast}
              className={`h-10 flex items-center justify-center text-sm transition-all cursor-pointer ${
                isPast
                  ? 'text-white/15 cursor-not-allowed'
                  : isSelected
                    ? 'bg-gold text-black font-semibold'
                    : 'text-white/70 hover:bg-gold/20 hover:text-gold'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function BookingForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev }
        delete next[field]
        return next
      }
      return prev
    })
  }, [])

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setCurrentStep(1)
  }

  const handleBack = () => {
    setErrors({})
    setCurrentStep(0)
  }

  const onSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    await handleSubmit(formData)
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
            <h3 className="font-heading text-3xl font-semibold mb-4">Booking Submitted!</h3>
            <p className="text-white/70 text-base">
              Thank you for your booking request. We&apos;ll confirm your event details within 24 hours.
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
            totalSteps={TOTAL_STEPS}
            labels={STEP_LABELS}
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
              <div className="space-y-5">
                <div>
                  <label className="block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className={inputClass}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => updateField('eventType', e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select type</option>
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.eventType && <p className="text-red-400 text-xs mt-1">{errors.eventType}</p>}
                  </div>
                  <div>
                    <label className="block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) => updateField('guestCount', e.target.value)}
                      placeholder="Estimated guests"
                      className={inputClass}
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-nav text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Tell us about your vision for the event..."
                    rows={4}
                    className={inputClass}
                  />
                </div>
              </div>
            )}
          </FormStep>

          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handleBack}>Back</Button>
            ) : (
              <div />
            )}
            {currentStep < TOTAL_STEPS - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={onSubmit} disabled={state.submitting}>
                {state.submitting ? 'Submitting...' : 'Submit Booking'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

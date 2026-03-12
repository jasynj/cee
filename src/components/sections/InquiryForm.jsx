import { useState, useCallback } from 'react'
import { useForm } from '@formspree/react'
import SectionHeader from '../ui/SectionHeader'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import FormStep from '../ui/FormStep'
import StepPersonalInfo from '../form-steps/StepPersonalInfo'
import StepEventDetails from '../form-steps/StepEventDetails'
import StepBudgetMessage from '../form-steps/StepBudgetMessage'
import { FORMSPREE_ID } from '../../constants/navigation'

const TOTAL_STEPS = 3

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  eventType: '',
  preferredDate: '',
  guestCount: '',
  budgetRange: '',
  message: '',
}

function validateStep(step, data) {
  const errors = {}
  if (step === 0) {
    if (!data.fullName.trim()) errors.fullName = 'Name is required'
    if (!data.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email'
    if (!data.phone.trim()) errors.phone = 'Phone number is required'
  }
  if (step === 1) {
    if (!data.eventType) errors.eventType = 'Please select an event type'
    if (!data.preferredDate) errors.preferredDate = 'Please select a date'
    if (!data.guestCount) errors.guestCount = 'Please enter estimated guest count'
  }
  if (step === 2) {
    if (!data.budgetRange) errors.budgetRange = 'Please select a budget range'
  }
  return errors
}

export default function InquiryForm() {
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
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setErrors({})
    setCurrentStep((prev) => prev - 1)
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
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div
            className="text-center bg-dark-card border border-gold/30 p-12"
            data-aos="zoom-in"
          >
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gold text-4xl">&#10003;</span>
            </div>
            <h3 className="font-heading text-3xl font-semibold mb-4">Thank You!</h3>
            <p className="text-white/70 text-base">
              Your inquiry has been submitted successfully. We&apos;ll be in touch within 24 hours to discuss your event.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          label="Get In Touch"
          title="Plan Your"
          scriptText="Event"
          subtitle="Tell us about your vision and we'll make it happen."
        />

        <div className="bg-dark-card border border-white/10 p-8 md:p-12" data-aos="fade-up">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          <FormStep key={currentStep}>
            {currentStep === 0 && (
              <StepPersonalInfo formData={formData} updateField={updateField} errors={errors} />
            )}
            {currentStep === 1 && (
              <StepEventDetails formData={formData} updateField={updateField} errors={errors} />
            )}
            {currentStep === 2 && (
              <StepBudgetMessage formData={formData} updateField={updateField} errors={errors} />
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
                {state.submitting ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

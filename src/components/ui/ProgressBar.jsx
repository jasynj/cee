const DEFAULT_LABELS = ['Personal Info', 'Event Details', 'Budget & Message']

export default function ProgressBar({ currentStep, totalSteps, labels }) {
  const stepLabels = labels || DEFAULT_LABELS

  return (
    <div className="flex items-center justify-center mb-10">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                i < currentStep
                  ? 'bg-gold text-black'
                  : i === currentStep
                    ? 'border-2 border-gold text-gold'
                    : 'border-2 border-white/20 text-white/30'
              }`}
            >
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span
              className={`text-xs mt-2 hidden md:block transition-colors duration-300 ${
                i <= currentStep ? 'text-gold' : 'text-white/30'
              }`}
            >
              {stepLabels[i]}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`w-12 md:w-20 h-0.5 mx-2 transition-colors duration-300 ${
                i < currentStep ? 'bg-gold' : 'bg-white/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

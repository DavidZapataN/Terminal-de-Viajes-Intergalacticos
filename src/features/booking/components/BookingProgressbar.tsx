import { Check } from 'lucide-react'

export interface BookingProgressbarProps {
  steps: string[]
  activeStep: number
  className?: string
}

export const BookingProgressbar = ({
  steps,
  activeStep = 1,
  className,
}: BookingProgressbarProps) => {
  return (
    <div className={`flex w-full justify-center ${className || ''}`}>
      <div className="relative flex w-full max-w-4xl items-center justify-between px-4">
        {/* Background line */}
        <div className="absolute top-5 left-[5%] z-0 h-0.5 w-[90%] bg-gray-700" />

        {/* Progress line */}
        <div
          className="absolute top-5 left-[5%] z-0 h-0.5 bg-linear-to-r from-cyan-500 to-purple-500 transition-all duration-500"
          style={{
            width:
              steps.length > 1
                ? `${((activeStep - 1) / (steps.length - 1)) * 90}%`
                : '0%',
          }}
        />

        {steps.map((label, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < activeStep
          const isActive = stepNumber === activeStep

          return (
            <div key={index} className="z-10 flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'border-cyan-500 bg-cyan-500 text-gray-900'
                    : isActive
                      ? 'border-cyan-400 bg-linear-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                      : 'border-gray-600 bg-gray-900 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <Check size={20} strokeWidth={3} />
                ) : (
                  <span className="font-medium">{stepNumber}</span>
                )}
              </div>
              <span
                className={`text-center text-xs transition-colors duration-300 ${
                  isActive
                    ? 'font-medium text-cyan-400'
                    : isCompleted
                      ? 'text-gray-300'
                      : 'text-gray-500'
                }`}
                style={{ maxWidth: '80px' }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

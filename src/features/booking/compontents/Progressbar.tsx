import { Check } from 'lucide-react'

export interface ProgressbarProps {
  steps: string[]
  activeStep: number
  className?: string
}

export const Progressbar = ({
  steps,
  activeStep = 1,
  className,
}: ProgressbarProps) => {
  return (
    <div className={`flex ${className}`}>
      <div className="relative flex w-full max-w-3xl items-center justify-between">
        <div className="absolute top-1/2 left-0 z-0 h-0.5 w-full -translate-y-1/2 bg-gray-400" />

        <div
          className="absolute top-1/2 left-0 z-0 h-0.5 -translate-y-1/2 bg-cyan-500 transition-all duration-500"
          style={{
            width:
              steps.length > 1
                ? `${((activeStep - 1) / (steps.length - 1)) * 100}%`
                : '0%',
          }}
        />

        {steps.map((label, index) => {
          const isCompleted = index + 1 < activeStep
          const isActive = index + 1 === activeStep

          return (
            <div key={index} className="z-10 flex w-10 flex-col items-center">
              <div
                title={label}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'border-cyan-500 bg-cyan-500 text-gray-800'
                    : isActive
                      ? 'border-cyan-500 bg-cyan-500 text-gray-800'
                      : 'border-gray-400 bg-black text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check size={20} />
                ) : (
                  <span className="font-medium">{index + 1}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

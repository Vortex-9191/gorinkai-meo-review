interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div
            key={stepNumber}
            className={`h-2 rounded-full transition-all duration-300 ${
              isActive
                ? "w-8 bg-[oklch(0.72_0.16_60)]"
                : isCompleted
                  ? "w-2 bg-[oklch(0.80_0.12_60)]"
                  : "w-2 bg-[oklch(0.88_0.015_75)]"
            }`}
          />
        )
      })}
    </div>
  )
}

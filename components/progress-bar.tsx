interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground font-medium">
          ステップ {currentStep} / {totalSteps}
        </span>
        <span className="text-muted-foreground">{Math.round(progress)}%</span>
      </div>

      <div className="relative h-2 bg-[oklch(0.90_0.015_75)] rounded-full overflow-hidden shadow-inner">
        <div
          className="absolute inset-y-0 left-0 bg-[oklch(0.45_0.09_155)] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

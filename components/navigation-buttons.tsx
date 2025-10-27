"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface NavigationButtonsProps {
  currentStep: number
  totalSteps: number
  canProceed: boolean
  onNext: () => void
  onPrev: () => void
  isSubmitting?: boolean
}

export default function NavigationButtons({
  currentStep,
  totalSteps,
  canProceed,
  onNext,
  onPrev,
  isSubmitting = false,
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <div className="flex gap-4 mt-10">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={isFirstStep || isSubmitting}
        className="flex-1 h-12 bg-transparent border-2"
      >
        戻る
      </Button>

      <Button onClick={onNext} disabled={!canProceed || isSubmitting} className="flex-1 h-12">
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            送信中...
          </>
        ) : isLastStep ? (
          "送信する"
        ) : (
          "次へ"
        )}
      </Button>
    </div>
  )
}

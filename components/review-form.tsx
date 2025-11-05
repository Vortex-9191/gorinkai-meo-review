"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import FormHeader from "./form-header"
import StepIndicator from "./step-indicator"
import StepContainer from "./step-container"
import NavigationButtons from "./navigation-buttons"
import ResultScreen from "./result-screen"

export type FormData = {
  rating: number
  q1: string | null  // 来院のきっかけや当院を知った経緯（選択式）
  q2: string | null  // 利用期間や回数（選択式）
  q3: string | null  // どのような症状で来院（選択式）
  q4: string | null  // 診療の感想や診療後の経過（選択式）
  q5: string | null  // 担当医やスタッフの対応（選択式）
  q6: string | null  // 院内の環境や設備（選択式）
  q7: string | null  // 予約システムや待ち時間（選択式）
  q8: string | null  // アクセスや駐車場（選択式）
  q9: string | null  // 治療費やお支払い（選択式）
  q10: string | null // メッセージやコメント（自由記述）
}

export type ReviewResult = {
  rating: number
  generatedText: string | null
}

export default function ReviewForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showResult, setShowResult] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<ReviewResult | null>(null)
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
    q9: null,
    q10: null,
  })

  const totalSteps = 11

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === totalSteps) {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    console.log("送信するformData:", formData)

    try {
      const response = await fetch("/api/generate-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("APIレスポンスステータス:", response.status)

      const data = await response.json()
      console.log("APIレスポンスデータ:", data)

      if (!response.ok || !data.success) {
        const errorMessage = data.error || "レビュー生成に失敗しました"
        console.error("API Error:", errorMessage)

        // デバッグ情報を含めたアラート
        const debugInfo = `
エラーが発生しました:

${errorMessage}

--- デバッグ情報 ---
送信データ: ${JSON.stringify(formData, null, 2)}
        `.trim()

        alert(debugInfo)
        setIsSubmitting(false)
        return
      }

      console.log("生成されたテキスト:", data.generatedText)

      // スプレッドシートにデータを送信（生成テキストは除外）
      try {
        console.log("スプレッドシートにデータを送信中...")
        const spreadsheetResponse = await fetch("/api/save-to-sheet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        const spreadsheetData = await spreadsheetResponse.json()

        if (spreadsheetResponse.ok && spreadsheetData.success) {
          console.log("スプレッドシートへの送信成功")
        } else {
          console.error("スプレッドシートへの送信に失敗しました:", spreadsheetData.error)
        }
      } catch (spreadsheetError) {
        // スプレッドシートへの送信エラーは無視（ユーザー体験を損なわない）
        console.error("スプレッドシートへの送信エラー:", spreadsheetError)
      }

      setResult({
        rating: data.rating,
        generatedText: data.generatedText,
      })
      setShowResult(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(`申し訳ございません。エラーが発生しました:\n\n${error instanceof Error ? error.message : "不明なエラー"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.rating > 0
      case 2:
        return formData.q1 !== null
      case 3:
        return formData.q2 !== null
      case 4:
        return formData.q3 !== null
      case 5:
        return formData.q4 !== null
      case 6:
        return formData.q5 !== null
      case 7:
        return formData.q6 !== null
      case 8:
        return formData.q7 !== null
      case 9:
        return formData.q8 !== null
      case 10:
        return formData.q9 !== null
      case 11:
        return formData.q10 !== null && formData.q10.trim() !== ""
      default:
        return false
    }
  }

  const handleAutoNext = () => {
    setTimeout(() => {
      handleNext()
    }, 300)
  }

  if (showResult && result) {
    return <ResultScreen result={result} />
  }

  return (
    <Card className="w-full max-w-2xl overflow-hidden shadow-2xl border-purple-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormHeader currentStep={currentStep} totalSteps={totalSteps} />

      <div className="p-6 md:p-10 min-h-[500px] flex flex-col">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="flex-1 flex flex-col justify-between">
          <StepContainer
            currentStep={currentStep}
            formData={formData}
            setFormData={setFormData}
            onAutoNext={handleAutoNext}
          />

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            canProceed={canProceed()}
            onNext={handleNext}
            onPrev={handlePrev}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </Card>
  )
}

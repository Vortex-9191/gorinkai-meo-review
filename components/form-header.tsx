interface FormHeaderProps {
  currentStep: number
  totalSteps: number
}

export default function FormHeader({ currentStep, totalSteps }: FormHeaderProps) {
  // 1ページ目（星評価）のみ説明文を表示
  if (currentStep === 1) {
    return (
      <div className="bg-card px-6 md:px-10 py-12 md:py-16 border-b">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4 text-balance tracking-tight">
          診察のご感想をお聞かせください
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          より良い医療サービスのご提供のため
          <br />
          皆様のお声をお聞かせいただければ幸いです
        </p>
      </div>
    )
  }

  // 2ページ目以降は何も表示しない
  return null
}

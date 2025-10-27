import type { FormData } from "./review-form"
import { generateStarDisplay, getAnswerText } from "@/lib/form-utils"

interface ReviewSummaryProps {
  formData: FormData
}

export default function ReviewSummary({ formData }: ReviewSummaryProps) {
  return (
    <div className="bg-secondary border border-border rounded-xl p-5 mt-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">ご回答内容</h3>
      <div className="space-y-2 text-xs">
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">満足度：</span>
          <span className="text-foreground">{generateStarDisplay(formData.rating)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">来院のきっかけ：</span>
          <span className="text-foreground break-words">{getAnswerText("q1", formData.q1)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">利用期間：</span>
          <span className="text-foreground break-words">{getAnswerText("q2", formData.q2)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">来院目的：</span>
          <span className="text-foreground break-words">{getAnswerText("q3", formData.q3)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">診療の感想：</span>
          <span className="text-foreground break-words">{getAnswerText("q4", formData.q4)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">スタッフ対応：</span>
          <span className="text-foreground break-words">{getAnswerText("q5", formData.q5)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">環境・設備：</span>
          <span className="text-foreground break-words">{getAnswerText("q6", formData.q6)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">予約・待ち時間：</span>
          <span className="text-foreground break-words">{getAnswerText("q7", formData.q7)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">アクセス：</span>
          <span className="text-foreground break-words">{getAnswerText("q8", formData.q8)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">治療費：</span>
          <span className="text-foreground break-words">{getAnswerText("q9", formData.q9)}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground min-w-[120px] shrink-0">メッセージ：</span>
          <span className="text-foreground break-words">{formData.q10 || "-"}</span>
        </div>
      </div>
    </div>
  )
}

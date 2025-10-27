"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, CheckCircle2, Copy, Check } from "lucide-react"
import type { ReviewResult } from "./review-form"

interface ResultScreenProps {
  result: ReviewResult
}

export default function ResultScreen({ result }: ResultScreenProps) {
  const [isCopied, setIsCopied] = useState(false)
  const isFiveStars = result.rating === 5
  const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "https://g.page/r/CZDRdxyEUzcgEBM/review"

  const handleRestart = () => {
    window.location.reload()
  }

  const handleCopy = async () => {
    if (result.generatedText) {
      try {
        await navigator.clipboard.writeText(result.generatedText)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy text:", err)
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 md:p-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 text-balance">
            アンケートにご協力いただきありがとうございました
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {isFiveStars ? "お褒めの言葉をいただき光栄です" : "貴重なご意見として承りました"}
          </p>
        </div>

        {result.generatedText && (
          <div className="bg-secondary border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">生成されたレビューテキスト</h3>
            <div className="mb-4">
              <p className="text-foreground leading-relaxed text-sm md:text-base whitespace-pre-wrap">{result.generatedText}</p>
            </div>

            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    コピーしました
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    テキストをコピー
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4 border-t">
              <span className="text-sm text-muted-foreground">ご評価：</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < result.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {isFiveStars ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <p className="text-green-800 text-center text-sm md:text-base leading-relaxed">
              高評価をいただき、誠にありがとうございます。
              <br />
              もしよろしければ、Googleマップでもご感想をお聞かせください。
            </p>
          </div>
        ) : (
          <div className="bg-secondary border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 text-center">
              貴重なご意見をありがとうございます
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-center">
              いただいたご意見を真摯に受け止め、
              <br />
              より良い医療サービスのご提供に向けて
              <br />
              改善に努めてまいります。
              <br />
              <br />
              今後ともどうぞよろしくお願いいたします。
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {isFiveStars && (
            <Button asChild className="w-full">
              <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Googleマップで感想を投稿
              </a>
            </Button>
          )}

          <Button variant="outline" onClick={handleRestart} className="w-full bg-transparent">
            最初に戻る
          </Button>
        </div>
      </div>
    </Card>
  )
}

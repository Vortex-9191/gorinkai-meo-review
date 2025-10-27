"use client"

import type { FormData } from "./review-form"
import StarRating from "./star-rating"
import OptionsList from "./options-list"
import { Textarea } from "@/components/ui/textarea"
import ReviewSummary from "./review-summary"

interface StepContainerProps {
  currentStep: number
  formData: FormData
  setFormData: (data: FormData) => void
  onAutoNext?: () => void
}

// Q1: 来院のきっかけ
const q1Options = [
  { label: "インターネット検索", value: "web_search" },
  { label: "ご家族・ご友人のご紹介", value: "referral" },
  { label: "他の医療機関からのご紹介", value: "doctor_referral" },
  { label: "立地やアクセスの良さ", value: "location" },
  { label: "評判や口コミを見て", value: "reputation" },
]

// Q2: 利用期間
const q2Options = [
  { label: "初診", value: "first_time" },
  { label: "3ヶ月未満", value: "less_than_3months" },
  { label: "3ヶ月〜6ヶ月", value: "3to6months" },
  { label: "6ヶ月〜1年", value: "6to12months" },
  { label: "1年以上", value: "over_1year" },
]

// Q3: 来院の症状・目的
const q3Options = [
  { label: "不妊検査・相談", value: "infertility_checkup" },
  { label: "タイミング法", value: "timing_method" },
  { label: "人工授精（AIH）", value: "aih" },
  { label: "体外受精（IVF）", value: "ivf" },
  { label: "その他の治療", value: "other_treatment" },
]

// Q4: 診療の感想
const q4Options = [
  { label: "とても満足している", value: "very_satisfied" },
  { label: "満足している", value: "satisfied" },
  { label: "治療の効果を感じている", value: "feeling_effect" },
  { label: "治療を継続中", value: "ongoing" },
  { label: "まだ判断できない", value: "too_early" },
]

// Q5: 担当医・スタッフの対応
const q5Options = [
  { label: "とても親切で丁寧だった", value: "excellent" },
  { label: "親切で安心できた", value: "good" },
  { label: "専門的で信頼できる", value: "professional" },
  { label: "普通", value: "normal" },
  { label: "もう少し改善してほしい", value: "needs_improvement" },
]

// Q6: 院内環境・設備
const q6Options = [
  { label: "とても清潔で快適", value: "very_clean" },
  { label: "清潔で過ごしやすい", value: "clean" },
  { label: "プライバシーに配慮されている", value: "privacy_good" },
  { label: "普通", value: "normal" },
  { label: "改善してほしい点がある", value: "needs_improvement" },
]

// Q7: 予約システム・待ち時間
const q7Options = [
  { label: "予約が取りやすく待ち時間も短い", value: "excellent" },
  { label: "予約システムが使いやすい", value: "easy_booking" },
  { label: "待ち時間は許容範囲", value: "acceptable_wait" },
  { label: "やや待ち時間が長い", value: "long_wait" },
  { label: "予約が取りにくい", value: "difficult_booking" },
]

// Q8: アクセス・駐車場
const q8Options = [
  { label: "とても通いやすい", value: "very_accessible" },
  { label: "アクセスが良い", value: "good_access" },
  { label: "駐車場が便利", value: "good_parking" },
  { label: "普通", value: "normal" },
  { label: "やや通いにくい", value: "difficult_access" },
]

// Q9: 治療費・お支払い
const q9Options = [
  { label: "納得できる料金設定", value: "reasonable" },
  { label: "説明が丁寧でわかりやすい", value: "clear_explanation" },
  { label: "支払い方法が便利", value: "convenient_payment" },
  { label: "普通", value: "normal" },
  { label: "もう少し詳しい説明がほしい", value: "need_more_info" },
]

// Q10: 治療費・お支払いの次に削除される予定だった旧Q10は削除

export default function StepContainer({ currentStep, formData, setFormData, onAutoNext }: StepContainerProps) {
  return (
    <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
      {currentStep === 1 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            1
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            当院の診察はいかがでしたか？
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">総合的な満足度をお聞かせください</p>
          <StarRating
            value={formData.rating}
            onChange={(rating) => {
              setFormData({ ...formData, rating })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            2
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            来院のきっかけや当院を知った経緯など具体的に教えてください。
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">該当するものをお選びください</p>
          <OptionsList
            options={q1Options}
            value={formData.q1}
            onChange={(value) => {
              setFormData({ ...formData, q1: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            3
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            当院を利用されている期間や回数などお聞かせいただけますか？
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">おおよその期間をお教えください</p>
          <OptionsList
            options={q2Options}
            value={formData.q2}
            onChange={(value) => {
              setFormData({ ...formData, q2: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 4 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            4
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            どのような症状や目的で来院されましたか？
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">差し支えない範囲でお聞かせください</p>
          <OptionsList
            options={q3Options}
            value={formData.q3}
            onChange={(value) => {
              setFormData({ ...formData, q3: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 5 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            5
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            診療に関してのご感想や、診療後の経過についてお聞かせください。
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">率直なご感想をお聞かせください</p>
          <OptionsList
            options={q4Options}
            value={formData.q4}
            onChange={(value) => {
              setFormData({ ...formData, q4: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 6 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            6
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            担当医やスタッフの対応についていかがでしたか？
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">スタッフの対応についてお聞かせください</p>
          <OptionsList
            options={q5Options}
            value={formData.q5}
            onChange={(value) => {
              setFormData({ ...formData, q5: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 7 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            7
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            院内の環境や設備について、印象やご感想をお聞かせください
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">清潔さや待合室の雰囲気など</p>
          <OptionsList
            options={q6Options}
            value={formData.q6}
            onChange={(value) => {
              setFormData({ ...formData, q6: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 8 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            8
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            予約システムや待ち時間について、ご感想があればお聞かせください。
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">予約の取りやすさや待ち時間について</p>
          <OptionsList
            options={q7Options}
            value={formData.q7}
            onChange={(value) => {
              setFormData({ ...formData, q7: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 9 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            9
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            アクセスや駐車場に関してご感想があればお聞かせください。
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">通いやすさや駐車場の利便性など</p>
          <OptionsList
            options={q8Options}
            value={formData.q8}
            onChange={(value) => {
              setFormData({ ...formData, q8: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 10 && (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
            10
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            治療費やお支払いについて、ご感想やご要望があればぜひお聞かせください。
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-10">料金や支払い方法について</p>
          <OptionsList
            options={q9Options}
            value={formData.q9}
            onChange={(value) => {
              setFormData({ ...formData, q9: value })
              onAutoNext?.()
            }}
          />
        </div>
      )}

      {currentStep === 11 && (
        <div>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg font-medium text-primary mx-auto mb-8">
              11
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
              来院を検討されている方や、当院のスタッフに向け、メッセージやコメントなどいただけるでしょうか？
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-8">これから来院される方へのメッセージなど</p>
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <Textarea
              placeholder="メッセージやコメントをお聞かせください"
              value={formData.q10 || ""}
              onChange={(e) => setFormData({ ...formData, q10: e.target.value || null })}
              className="min-h-[120px] border-border focus:border-primary bg-card"
            />
            <ReviewSummary formData={formData} />
          </div>
        </div>
      )}
    </div>
  )
}

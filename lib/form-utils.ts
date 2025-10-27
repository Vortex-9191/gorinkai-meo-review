export const getAnswerText = (question: string, value: string | null): string => {
  if (!value) return "-"

  const textMap: Record<string, Record<string, string>> = {
    q1: {
      web_search: "インターネット検索",
      referral: "ご家族・ご友人のご紹介",
      doctor_referral: "他の医療機関からのご紹介",
      location: "立地やアクセスの良さ",
      reputation: "評判や口コミを見て",
    },
    q2: {
      first_time: "初診",
      less_than_3months: "3ヶ月未満",
      "3to6months": "3ヶ月〜6ヶ月",
      "6to12months": "6ヶ月〜1年",
      over_1year: "1年以上",
    },
    q3: {
      infertility_checkup: "不妊検査・相談",
      timing_method: "タイミング法",
      aih: "人工授精（AIH）",
      ivf: "体外受精（IVF）",
      other_treatment: "その他の治療",
    },
    q4: {
      very_satisfied: "とても満足している",
      satisfied: "満足している",
      feeling_effect: "治療の効果を感じている",
      ongoing: "治療を継続中",
      too_early: "まだ判断できない",
    },
    q5: {
      excellent: "とても親切で丁寧だった",
      good: "親切で安心できた",
      professional: "専門的で信頼できる",
      normal: "普通",
      needs_improvement: "もう少し改善してほしい",
    },
    q6: {
      very_clean: "とても清潔で快適",
      clean: "清潔で過ごしやすい",
      privacy_good: "プライバシーに配慮されている",
      normal: "普通",
      needs_improvement: "改善してほしい点がある",
    },
    q7: {
      excellent: "予約が取りやすく待ち時間も短い",
      easy_booking: "予約システムが使いやすい",
      acceptable_wait: "待ち時間は許容範囲",
      long_wait: "やや待ち時間が長い",
      difficult_booking: "予約が取りにくい",
    },
    q8: {
      very_accessible: "とても通いやすい",
      good_access: "アクセスが良い",
      good_parking: "駐車場が便利",
      normal: "普通",
      difficult_access: "やや通いにくい",
    },
    q9: {
      reasonable: "納得できる料金設定",
      clear_explanation: "説明が丁寧でわかりやすい",
      convenient_payment: "支払い方法が便利",
      normal: "普通",
      need_more_info: "もう少し詳しい説明がほしい",
    },
  }

  return textMap[question]?.[value] || value
}

export const generateStarDisplay = (rating: number): string => {
  return "★".repeat(rating) + "☆".repeat(5 - rating)
}

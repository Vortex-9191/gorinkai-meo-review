import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rating, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = body

    // Prepare data for Dify API
    const difyEndpoint = process.env.DIFY_API_ENDPOINT
    const difyApiKey = process.env.DIFY_API_KEY

    if (!difyEndpoint || !difyApiKey) {
      const missingVars = []
      if (!difyEndpoint) missingVars.push("DIFY_API_ENDPOINT")
      if (!difyApiKey) missingVars.push("DIFY_API_KEY")

      return NextResponse.json(
        {
          success: false,
          error: `Dify API設定が不足しています。

Vercelで以下の環境変数を設定してください：
${missingVars.map(v => `- ${v}`).join('\n')}

設定方法：
1. Vercel Dashboard → Settings → Environment Variables
2. 以下を追加：
   DIFY_API_ENDPOINT = https://api.dify.ai/v1/workflows/run
   DIFY_API_KEY = app-0XnNfvp81IOkAdoaxvAKj4Rz
3. Redeploy`,
        },
        { status: 500 },
      )
    }

    const requestBody = {
      inputs: {
        q1: q1 || "",
        q2: q2 || "",
        q3: q3 || "",
        q4: q4 || "",
        q5: q5 || "",
        q6: q6 || "",
        q7: q7 || "",
        q8: q8 || "",
        q9: q9 || "",
        q10: q10 || "",
      },
      response_mode: "blocking",
      user: `user_${Date.now()}`,
    }

    // Call Dify API
    const difyResponse = await fetch(difyEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${difyApiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!difyResponse.ok) {
      const errorText = await difyResponse.text()
      return NextResponse.json(
        {
          success: false,
          error: `Dify APIエラー (${difyResponse.status}): APIキーやエンドポイントを確認してください。詳細: ${errorText.substring(0, 200)}`,
        },
        { status: 500 },
      )
    }

    const difyData = await difyResponse.json()

    // Dify workflow APIのレスポンス形式: { data: { outputs: { text: "..." } } }
    const outputs = difyData.data?.outputs
    const generatedText = outputs?.text || outputs?.result || outputs?.answer || outputs?.message

    if (!generatedText) {
      return NextResponse.json(
        {
          success: false,
          error: `Difyからテキストを取得できませんでした。レスポンス構造を確認してください。\n\nレスポンス: ${JSON.stringify(difyData, null, 2)}`,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      rating,
      generatedText,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `エラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}`,
      },
      { status: 500 },
    )
  }
}


import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // スプレッドシートWebhook URLを取得（サーバーサイド用の環境変数）
    const webhookUrl = process.env.SPREADSHEET_WEBHOOK_URL || process.env.NEXT_PUBLIC_SPREADSHEET_WEBHOOK_URL

    if (!webhookUrl) {
      console.log("スプレッドシートWebhook URLが設定されていません")
      return NextResponse.json(
        {
          success: false,
          error: "スプレッドシートWebhook URLが設定されていません",
        },
        { status: 400 }
      )
    }

    console.log("スプレッドシートURL (最初の50文字):", webhookUrl.substring(0, 50))

    // Google Apps ScriptにPOSTリクエストを送信
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("スプレッドシートへの送信エラー:", errorText)
      return NextResponse.json(
        {
          success: false,
          error: `スプレッドシートへの送信に失敗しました: ${response.status}`,
        },
        { status: 500 }
      )
    }

    const data = await response.json()
    console.log("スプレッドシートへの送信成功")

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("スプレッドシート送信エラー:", error)
    return NextResponse.json(
      {
        success: false,
        error: `エラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}`,
      },
      { status: 500 }
    )
  }
}

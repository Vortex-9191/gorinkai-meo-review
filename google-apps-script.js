/**
 * Google Apps Script - レビューデータ受信用
 *
 * セットアップ方法：
 * 1. Googleスプレッドシートを開く
 * 2. 「拡張機能」→「Apps Script」をクリック
 * 3. このコードを貼り付け
 * 4. 「デプロイ」→「新しいデプロイ」
 * 5. 種類：ウェブアプリ
 * 6. アクセス: 全員
 * 7. デプロイして、URLをコピー
 * 8. そのURLを NEXT_PUBLIC_SPREADSHEET_WEBHOOK_URL に設定
 */

function doPost(e) {
  try {
    // リクエストボディをパース
    const data = JSON.parse(e.postData.contents);

    // スプレッドシートを取得（このスクリプトが紐付いているシート）
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // ヘッダー行がない場合は追加
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'タイムスタンプ',
        '評価',
        '来院のきっかけ',
        '利用期間',
        '症状',
        '診療の感想',
        'スタッフ対応',
        '院内環境',
        '予約・待ち時間',
        'アクセス',
        '治療費',
        'コメント'
      ]);
    }

    // データを追加（生成テキストは保存しない）
    sheet.appendRow([
      new Date(),
      data.rating || '',
      data.q1 || '',
      data.q2 || '',
      data.q3 || '',
      data.q4 || '',
      data.q5 || '',
      data.q6 || '',
      data.q7 || '',
      data.q8 || '',
      data.q9 || '',
      data.q10 || ''
    ]);

    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// テスト用
function doGet(e) {
  return ContentService
    .createTextOutput('レビューデータ受信用Webhookが正常に動作しています')
    .setMimeType(ContentService.MimeType.TEXT);
}

import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP, Playfair_Display } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "レビュー収集ツール",
  description: "お客様の声を集めるための洗練されたレビューツール",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans ${notoSans.variable} ${playfair.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "glowcasa - Professional Lighting Solutions",
  description:
    "Leading provider of innovative LED lights, smart lighting systems, and industrial lighting solutions. Energy-efficient, sustainable, and expertly designed.",
  keywords: "LED lights, smart lighting, industrial lighting, energy efficient, lighting solutions",
  authors: [{ name: "glowcasa" }],
  creator: "glowcasa",
  publisher: "glowcasa",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://glowcasa.com",
    title: "glowcasa - Professional Lighting Solutions",
    description:
      "Leading provider of innovative LED lights, smart lighting systems, and industrial lighting solutions.",
    siteName: "glowcasa",
  },
  twitter: {
    card: "summary_large_image",
    title: "glowcasa - Professional Lighting Solutions",
    description:
      "Leading provider of innovative LED lights, smart lighting systems, and industrial lighting solutions.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

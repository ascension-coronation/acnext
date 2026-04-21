import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ascension",
  description: "Make projects, get prizes.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

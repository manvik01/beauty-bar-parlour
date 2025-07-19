import type React from "react"
import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OfflineDetector } from "@/components/offline-detector"
import { useMindbodyScript } from "@/hooks/use-mindbody-script"
import { MindbodyScriptProvider } from "@/components/MindbodyScriptProvider"
import Script from 'next/script';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Beauty Bar Parlour | Beyond Ordinary",
  description:
    "Redefining beauty with a truly pampering experience using high-quality products and skilled professionals.",
  generator: 'v0.dev',
}

// Provide viewport information via the dedicated export to follow Next.js 15 API
import type { Viewport } from "next"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MindbodyScriptProvider>
            <div className="flex flex-col min-h-screen">
              <OfflineDetector />
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </MindbodyScriptProvider>
        </ThemeProvider>
        {/* Mindbody SDK loads exactly once after hydration */}
        <Script
          id="mindbody-sdk"
          src="https://brandedweb.mindbodyonline.com/embed/widget.js"
          strategy="afterInteractive"
          onReady={() => console.log('Mindbody SDK ready')}
        />
      </body>
    </html>
  )
}

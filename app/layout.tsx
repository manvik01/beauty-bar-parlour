import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OfflineDetector } from "@/components/offline-detector"
import { WhatsAppFloat } from "@/components/whatsapp-float"

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
      <head>
        {/* The Mindbody widget script will now be loaded by the component itself */}
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NX4VN3JF');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans bg-background`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NX4VN3JF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <OfflineDetector />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            {/* Reviewability widget script - loaded once globally */}
            {/* <script src="https://widget.reviewability.com/js/widgetAdv.min.js" async></script> */}
            <script type="application/ld+json" className="json-ld-content"></script>
            <WhatsAppFloat />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

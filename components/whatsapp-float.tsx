"use client"

import React, { useMemo } from "react"

export function WhatsAppFloat() {
  const phoneNumber = "6584158896" // +65 8415 8896 without plus and spaces
  const prefilled = "Hi Beauty Bar Parlour, I’d like to enquire about your services / book an appointment."
  const href = useMemo(() => {
    const text = encodeURIComponent(prefilled)
    return `https://wa.me/${phoneNumber}?text=${text}`
  }, [])

  return (
    <div className="fixed z-40 bottom-5 right-5 md:bottom-6 md:right-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative inline-flex items-center justify-center h-12 w-12 rounded-full shadow-lg bg-[#25D366] transition-transform duration-200 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      >
        {/* Tooltip (desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden md:block">
          Chat with us on WhatsApp
        </span>
        {/* Official WhatsApp glyph (white) over brand green circle */}
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-white">
          <path
            fill="currentColor"
            d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.44.03.1 5.37.13 11.98c.01 2.1.58 4.16 1.67 5.99L0 24l6.18-1.76c1.77.96 3.76 1.47 5.78 1.47h.03c6.6-.02 11.95-5.37 11.97-11.97a11.86 11.86 0 0 0-3.44-8.26zM12 22.06h-.02a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.67 1.04 1.05-3.58-.24-.37A9.9 9.9 0 0 1 1.94 12C1.92 6.9 6.1 2.7 11.2 2.68h.02c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.86 7.02c-.02 5.1-4.2 9.28-9.3 9.46zM17.47 14.38c-.29-.14-1.7-.83-1.96-.93-.26-.1-.45-.14-.65.15-.19.29-.74.93-.9 1.12-.17.19-.33.22-.62.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.5.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.56-.88-2.13-.23-.56-.47-.48-.64-.5-.17-.01-.36-.01-.56-.01-.2 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.19 3.03.14.2 2.06 3.15 4.99 4.42.7.3 1.25.47 1.67.61.7.22 1.34.19 1.85.12.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.2-.55-.34z"
          />
        </svg>
      </a>
    </div>
  )
}


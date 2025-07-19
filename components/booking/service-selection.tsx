"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

const serviceCategories = [
  { id: "hair", name: "Herbal Treatment", widgetId: "0e33258e78e" },
  { id: "nail", name: "Nail & Foot Spa", widgetId: "0e33444e78e" },
  { id: "facial", name: "Facial Services", widgetId: "0e33532e78e" },
  { id: "waxing", name: "Waxing Services", widgetId: "0e33533e78e" },
  { id: "threading", name: "Threading Services", widgetId: "0e33534e78e" },
  { id: "laser", name: "AFT Treatment", widgetId: "0e33535e78e" },
]

// Improved Mindbody Widget Component with proper error handling and fallback
function MindbodyWidget({ widgetId }: { widgetId: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  useEffect(() => {
    let mounted = true
    
    const initializeWidget = async () => {
      if (!containerRef.current || !mounted) return

      try {
        setIsLoading(true)
        setHasError(false)

        // Clear any existing widget content
        containerRef.current.innerHTML = ''

        // Create widget container
        const widgetDiv = document.createElement('div')
        widgetDiv.className = 'mindbody-widget'
        widgetDiv.setAttribute('data-widget-type', 'Appointments')
        widgetDiv.setAttribute('data-widget-id', widgetId)
        containerRef.current.appendChild(widgetDiv)

        // Check if script is already loaded
        const existingScript = document.querySelector('script[src*="brandedweb.mindbodyonline.com/embed/widget.js"]')
        
        if (!existingScript) {
          // Load script if not already present
          const script = document.createElement('script')
          script.src = 'https://brandedweb.mindbodyonline.com/embed/widget.js'
          script.async = true
          script.onload = () => {
            if (mounted) {
              setTimeout(() => initializeMindbodyWidgets(), 100)
            }
          }
          script.onerror = () => {
            if (mounted) {
              setHasError(true)
              setIsLoading(false)
            }
          }
          document.head.appendChild(script)
        } else {
          // Script already loaded, initialize widgets
          setTimeout(() => initializeMindbodyWidgets(), 100)
        }

        function initializeMindbodyWidgets() {
          if (!mounted) return

          try {
            // Try multiple initialization methods
            if (typeof window !== 'undefined') {
              const w = window as any
              
              // Method 1: Standard Mindbody initialization
              if (w.HC && typeof w.HC.init === 'function') {
                w.HC.init()
              }
              
              // Method 2: Alternative initialization
              if (w.MB && typeof w.MB.embed === 'function') {
                w.MB.embed()
              }
              
              // Method 3: Force re-scan for widgets
              setTimeout(() => {
                if (w.HC && typeof w.HC.init === 'function') {
                  w.HC.init()
                }
                if (mounted) {
                  setIsLoading(false)
                }
              }, 500)
            }
          } catch (error) {
            console.error('Error initializing Mindbody widget:', error)
            if (mounted) {
              setHasError(true)
              setIsLoading(false)
            }
          }
        }

      } catch (error) {
        console.error('Error setting up Mindbody widget:', error)
        if (mounted) {
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    initializeWidget()

    return () => {
      mounted = false
    }
  }, [widgetId, retryCount])

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1)
    }
  }

  const handleFallback = () => {
    // Redirect to Mindbody booking page as fallback
    const mindbodyUrl = `https://clients.mindbodyonline.com/classic/ws?studioid=5746301&stype=-7&sTG=25&sVT=7&sView=day&sLoc=1`
    window.open(mindbodyUrl, '_blank')
  }

  return (
    <div className="min-h-[600px] w-full">
      {isLoading && !hasError && (
        <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 font-light">Loading booking widget...</p>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-medium mb-2">Booking Widget Unavailable</h3>
            <p className="text-gray-600 mb-4 font-light">
              We're having trouble loading the booking widget. You can still book your appointment directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {retryCount < maxRetries && (
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-primary text-black text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                  Try Again ({maxRetries - retryCount} left)
                </button>
              )}
              <button
                onClick={handleFallback}
                className="px-4 py-2 bg-secondary text-black text-sm uppercase tracking-wider hover:bg-secondary/90 transition-colors"
              >
                Book on Mindbody
              </button>
              <a
                href="tel:+6584158896"
                className="px-4 py-2 bg-gold text-white text-sm uppercase tracking-wider hover:bg-gold/90 transition-colors"
              >
                Call to Book
              </a>
            </div>
          </div>
        </div>
      )}
      
      <div ref={containerRef} className={isLoading || hasError ? 'hidden' : 'block'} />
    </div>
  )
}

export function ServiceSelection() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)
  const [widgetKey, setWidgetKey] = useState(0)
  const serviceSelectionRef = useRef<HTMLDivElement>(null)
  
  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory)

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setWidgetKey(prev => prev + 1)

    setTimeout(() => {
      serviceSelectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div ref={serviceSelectionRef}>
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">Select a Service</h2>
      <div className="mb-8 overflow-x-auto">
        <div className="flex justify-center flex-wrap gap-2 md:gap-4">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors group ${activeCategory === category.id ? "bg-primary text-black font-medium" : "bg-secondary text-black hover:bg-primary/10"}`}
            >
              <span className={`${activeCategory === category.id ? "glitter-bold" : "group-hover:glitter-bold"}`}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {currentCategory && (
        <div className="mb-8" data-widget-area>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black mb-2">Book Your {currentCategory.name} Appointment</h3>
          </div>
          <div className="max-h-[80vh] overflow-y-auto rounded-lg border">
            <MindbodyWidget key={widgetKey} widgetId={currentCategory.widgetId} />
          </div>
        </div>
      )}
    </div>
  )
}

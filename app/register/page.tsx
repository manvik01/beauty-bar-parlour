"use client"

import { useEffect, useState } from "react"
import React from "react"

export default function RegisterPage() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let mounted = true

    const loadHealCodeScript = async () => {
      try {
        // Check if HealCode script is already loaded
        const existingScript = document.querySelector('script[src*="widgets.mindbodyonline.com/javascripts/healcode.js"]')
        
        if (!existingScript) {
          // Load HealCode script
          const script = document.createElement('script')
          script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js'
          script.type = 'text/javascript'
          script.async = true
          
          script.onload = () => {
            if (mounted) {
              setIsScriptLoaded(true)
              setTimeout(() => {
                // Initialize HealCode widgets
                if (typeof window !== 'undefined' && (window as any).healcode) {
                  (window as any).healcode()
                }
                setIsLoading(false)
              }, 500)
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
          // Script already loaded
          setIsScriptLoaded(true)
          setTimeout(() => {
            if (typeof window !== 'undefined' && (window as any).healcode) {
              (window as any).healcode()
            }
            setIsLoading(false)
          }, 100)
        }
      } catch (error) {
        console.error('Error loading HealCode script:', error)
        if (mounted) {
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    loadHealCodeScript()

    return () => {
      mounted = false
    }
  }, [])

  // Re-initialize HealCode on component mount
  useEffect(() => {
    if (isScriptLoaded && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        if ((window as any).healcode) {
          (window as any).healcode()
        }
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [isScriptLoaded])

  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Client Registration</h3>
          <h1 className="clean-subheading">Join Beauty Bar Parlour</h1>
        </div>
      </section>

      {/* Registration Content */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mx-auto mb-8 text-center bg-white p-8 border border-gold/20 shadow-sm">
              <h2 className="text-xl font-serif uppercase tracking-wider text-gold font-bold">
                Welcome to Beauty Bar Parlour
              </h2>
              <p>
                Register with us to book appointments, manage your profile, and stay updated with our latest services and offers.
              </p>
              <p className="text-sm text-muted-foreground">
                Complete the registration form below to create your client account.
              </p>
            </div>

            {/* Registration Widget Container */}
            <div className="bg-white border border-primary/10 shadow-sm rounded-lg overflow-hidden">
              {isLoading && !hasError && (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 font-light">Loading registration form...</p>
                    <p className="text-xs text-gray-500 mt-2">Widget ID: 0e163173e78e</p>
                  </div>
                </div>
              )}

              {hasError && (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-serif font-medium mb-2">Registration Form Unavailable</h3>
                    <p className="text-gray-600 mb-4 font-light">
                      We're having trouble loading the registration form. Please contact us directly to register.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <a
                        href="tel:+6584158896"
                        className="px-4 py-2 bg-primary text-white text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
                      >
                        Call to Register
                      </a>
                      <a
                        href="/contact"
                        className="px-4 py-2 bg-secondary text-black text-sm uppercase tracking-wider hover:bg-secondary/90 transition-colors"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Mindbody Registration Widget */}
              <div className={`min-h-[600px] ${isLoading || hasError ? 'hidden' : 'block'}`}>
                {React.createElement('healcode-widget', {
                  'data-type': 'registrations',
                  'data-widget-partner': 'object',
                  'data-widget-id': '0e163173e78e',
                  'data-widget-version': '0',
                })}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Already have an account? You can manage your appointments and profile through our booking system.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/booking"
                  className="px-8 py-3 bg-primary text-white hover:bg-primary/90 transition-all uppercase tracking-widest text-xs"
                >
                  Book Appointment
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-all uppercase tracking-widest text-xs"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
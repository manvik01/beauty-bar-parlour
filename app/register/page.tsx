"use client"

import { useEffect, useState } from "react"
import React from "react"
import dynamic from "next/dynamic"

const MindbodyRegistrationWidgetClient = dynamic(
  () => import("../../components/mindbody/registration-widget-client"),
  { ssr: false }
);

export default function RegisterPage() {
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
            {/* Registration Widget Container */}
            <MindbodyRegistrationWidgetClient />

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
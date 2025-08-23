"use client"

import React from "react"

export default function ReviewBanner() {
  const embedCode = `
    <div data-bid="157659" data-url="https://app.revu.cloud" ><script src="https://widget.reviewability.com/js/widgetAdv.min.js" async></script></div><script class="json-ld-content" type="application/ld+json"></script>
  `

  return (
    <section className="clean-section bg-secondary py-16">
      <div className="container-custom text-center">
        <h2 className="clean-heading text-black mb-8">What Our Clients Say</h2>
        <div
          dangerouslySetInnerHTML={{ __html: embedCode }}
          role="complementary"
          aria-label="Customer reviews"
          className="min-h-[200px] flex items-center justify-center relative"
        />
      </div>
    </section>
  )
}

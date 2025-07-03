"use client"

import { useEffect } from "react"

export const metadata = {
  title: "Buy Root Touch Up | Beauty Bar Parlour",
  description: "Purchase the Root Touch Up service online via Mindbody.",
}

export default function RootTouchUpPage() {
  useEffect(() => {
    const scriptId = "healcode-script"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.src = "https://widgets.mindbodyonline.com/javascripts/healcode.js"
      script.type = "text/javascript"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const widgetHtml = `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="127612" data-mb-site-id="5746301" data-service-id="100003" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy"></healcode-widget>`

  return (
    <main className="pt-24">
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="clean-heading">Root Touch Up</h1>
          <p className="clean-subheading">Purchase this service online</p>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom text-center" dangerouslySetInnerHTML={{ __html: widgetHtml }} />
      </section>
    </main>
  )
} 
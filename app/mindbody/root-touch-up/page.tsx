import Script from "next/script"

export const metadata = {
  title: "Root Touch Up | Beauty Bar Parlour",
  description: "Purchase our Root Touch Up service online.",
}

export default function RootTouchUpPage() {
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
        <Script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" strategy="afterInteractive" />
        <div className="container-custom text-center" dangerouslySetInnerHTML={{ __html: widgetHtml }} />
      </section>
    </main>
  )
} 
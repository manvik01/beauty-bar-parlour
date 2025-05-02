export default function MindbodyEmbedPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Developer Resources</h3>
          <h1 className="clean-subheading">Embed Widgets</h1>
        </div>
      </section>

      {/* Embed Code Examples */}
      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-center mb-12 font-light">
              Integrate Beauty Bar Parlour's booking system into your own website with our embed widgets. Simply copy
              and paste the code snippets below to add our Mindbody-powered widgets to your site.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-serif uppercase tracking-wider mb-6">Booking Widget</h2>
            <p className="mb-6 font-light">Allow your visitors to book appointments directly from your website.</p>

            <div className="bg-gray-900 text-white p-6 rounded overflow-x-auto mb-8">
              <pre className="text-sm">
                <code>{`<iframe 
  src="https://beautybar.parlour/api/embed?widget=booking&theme=light" 
  width="100%" 
  height="600" 
  frameborder="0"
></iframe>`}</code>
              </pre>
            </div>

            <div className="bg-white border border-primary/10 p-6">
              <h3 className="text-lg font-serif mb-4">Configuration Options</h3>
              <ul className="space-y-2 font-light">
                <li>
                  <span className="font-medium">widget:</span> booking (default), services, staff
                </li>
                <li>
                  <span className="font-medium">theme:</span> light (default), dark
                </li>
                <li>
                  <span className="font-medium">businessId:</span> Your Mindbody business ID (optional)
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-serif uppercase tracking-wider mb-6">Services Widget</h2>
            <p className="mb-6 font-light">Display your services and pricing on your website.</p>

            <div className="bg-gray-900 text-white p-6 rounded overflow-x-auto mb-8">
              <pre className="text-sm">
                <code>{`<iframe 
  src="https://beautybar.parlour/api/embed?widget=services&theme=light" 
  width="100%" 
  height="600" 
  frameborder="0"
></iframe>`}</code>
              </pre>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-serif uppercase tracking-wider mb-6">Staff Widget</h2>
            <p className="mb-6 font-light">Showcase your team members on your website.</p>

            <div className="bg-gray-900 text-white p-6 rounded overflow-x-auto mb-8">
              <pre className="text-sm">
                <code>{`<iframe 
  src="https://beautybar.parlour/api/embed?widget=staff&theme=light" 
  width="100%" 
  height="600" 
  frameborder="0"
></iframe>`}</code>
              </pre>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-6 font-light">
              Need help integrating these widgets into your website? Contact our development team for assistance with
              custom integration options and advanced configurations.
            </p>
            <a
              href="/contact"
              className="px-8 py-3 bg-primary text-white hover:bg-primary/90 transition-all uppercase tracking-widest text-xs inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

import Script from "next/script"

export const metadata = {
  title: "Register | Beauty Bar Parlour",
  description: "Create a new account with Beauty Bar Parlour.",
}

export default function RegisterPage() {
  return (
    <main className="pt-24">
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="clean-heading">Create a New Account</h1>
          <p className="clean-subheading">Register with Beauty Bar Parlour</p>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <Script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript" strategy="afterInteractive" />
            <healcode-widget 
              data-type="registrations" 
              data-widget-partner="object" 
              data-widget-id="0e163173e78e" 
              data-widget-version="0"
            ></healcode-widget>
          </div>
        </div>
      </section>
    </main>
  )
} 
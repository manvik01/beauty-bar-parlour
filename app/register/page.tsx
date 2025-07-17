import { RegistrationWidget } from "@/components/mindbody/registration-widget"

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
            <RegistrationWidget />
          </div>
        </div>
      </section>
    </main>
  )
} 
import { RootTouchUpWidget } from "@/components/mindbody/root-touch-up-widget"

export const metadata = {
  title: "Root Touch Up | Beauty Bar Parlour",
  description: "Purchase our Root Touch Up service online.",
}

export default function RootTouchUpPage() {
  return (
    <main className="pt-24">
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="clean-heading">Root Touch Up</h1>
          <p className="clean-subheading">Purchase this service online</p>
        </div>
      </section>

      <section className="clean-section">
        <div className="container-custom text-center">
          <RootTouchUpWidget />
        </div>
      </section>
    </main>
  )
} 
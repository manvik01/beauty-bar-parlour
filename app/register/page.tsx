"use client"

import RegistrationWidget from "@/components/mindbody/registration-widget"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <div className="container-custom py-12 pt-32">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-serif uppercase tracking-widest text-black">
              Create a New Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RegistrationWidget />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useFormStore } from "@/store/form-store"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react"

export function LeadForm() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { formData, updateFormData } = useFormStore()

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-accent/30">
        <div className="container px-4 max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-6 text-[#0AC2A3]"
          >
            <CheckCircle size={64} className="mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-serif mb-4">OMG, Thank You! 🎉</h2>
          <p className="text-lg">
            We'll slide into your inbox soon! <span className="text-2xl">💌</span>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="sticker sticker-pink inline-flex items-center">
              <Sparkles className="w-4 h-4 mr-2" /> Join Us
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif mb-4 text-black"
          >
            Get on the <span className="squiggle squiggle-teal">List</span>
          </motion.h2>
          <p className="text-xl max-w-md mx-auto text-black font-medium">
            No FOMO here! Be the first to know when we drop new services.
          </p>
        </div>

        <div className="max-w-md mx-auto gen-z-card">
          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-serif text-black">Hey there! What's your name? 👋</h3>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-black">
                      Your Name
                    </Label>
                    <input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData({ name: e.target.value })}
                      required
                      className="input-gen-z w-full text-black"
                      placeholder="Type your name here..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.name}
                    className="btn-gen-z btn-gen-z-teal w-full flex items-center justify-center"
                  >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-serif text-black">Cool! Where can we reach you? 📱</h3>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black">
                      Email Address
                    </Label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                      required
                      className="input-gen-z w-full text-black"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.email}
                    className="btn-gen-z btn-gen-z-teal w-full flex items-center justify-center"
                  >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-serif text-black">What service are you interested in? ✨</h3>
                  <RadioGroup
                    value={formData.service}
                    onValueChange={(value) => updateFormData({ service: value })}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border-2 border-black rounded-xl p-3 hover:bg-[#0AC2A3]/10 transition-colors">
                      <RadioGroupItem value="nails" id="nails" />
                      <Label htmlFor="nails" className="flex items-center cursor-pointer text-black">
                        <span className="text-xl mr-2">💅</span> Nails
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border-2 border-black rounded-xl p-3 hover:bg-[#0AC2A3]/10 transition-colors">
                      <RadioGroupItem value="hair" id="hair" />
                      <Label htmlFor="hair" className="flex items-center cursor-pointer text-black">
                        <span className="text-xl mr-2">💇‍♀️</span> Hair
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border-2 border-black rounded-xl p-3 hover:bg-[#0AC2A3]/10 transition-colors">
                      <RadioGroupItem value="makeup" id="makeup" />
                      <Label htmlFor="makeup" className="flex items-center cursor-pointer text-black">
                        <span className="text-xl mr-2">💄</span> Makeup
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border-2 border-black rounded-xl p-3 hover:bg-[#0AC2A3]/10 transition-colors">
                      <RadioGroupItem value="spa" id="spa" />
                      <Label htmlFor="spa" className="flex items-center cursor-pointer text-black">
                        <span className="text-xl mr-2">🧖‍♀️</span> Spa
                      </Label>
                    </div>
                  </RadioGroup>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.service}
                    className="btn-gen-z btn-gen-z-teal w-full flex items-center justify-center"
                  >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-serif text-black">Last question! Wedding plans? 💍</h3>
                  <div className="flex items-center space-x-2 border-2 border-black rounded-xl p-4">
                    <Switch
                      id="wedding"
                      checked={formData.isWedding}
                      onCheckedChange={(checked) => updateFormData({ isWedding: checked })}
                    />
                    <Label htmlFor="wedding" className="cursor-pointer text-black">
                      Yes, I'm planning a wedding
                    </Label>
                  </div>
                  <button type="submit" className="btn-gen-z btn-gen-z-pink w-full">
                    Submit ✨
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-3 w-3 rounded-full ${
                    step === i ? "bg-[#FF5CAA]" : "bg-gray-200 border border-gray-300"
                  }`}
                />
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

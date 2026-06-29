"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import {
  enquirySchema,
  PREFERRED_TIME_OPTIONS,
  type EnquiryData,
  type EnquiryInput,
  type PreferredContactMethod,
} from "@/lib/enquiry/schema"
import { ENQUIRY_CATEGORIES } from "@/lib/enquiry/services"
import {
  isWeb3FormsConfigured,
  sendEnquiryViaWeb3Forms,
} from "@/lib/enquiry/web3forms-client"

import { COUNTRY_CODES } from "./country-codes"

const TIME_LABELS: Record<(typeof PREFERRED_TIME_OPTIONS)[number], string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  any: "Any time",
}

const defaultValues: EnquiryInput = {
  firstName: "",
  lastName: "",
  countryCode: "+65",
  mobile: "",
  email: "",
  preferredContactMethod: undefined,
  selectedServiceIds: [],
  otherDetails: "",
  message: "",
  preferredTime: undefined,
  contactConsent: false as unknown as true,
  marketingConsent: false,
  sourcePage: "",
}

export type EnquiryFormProps = {
  className?: string
  initialCategoryId?: string
  onSuccess?: (leadReference: string) => void
}

export function EnquiryForm({
  className,
  initialCategoryId,
  onSuccess,
}: EnquiryFormProps) {
  const router = useRouter()
  const [openCategories, setOpenCategories] = useState<string[]>(
    initialCategoryId ? [initialCategoryId] : [],
  )

  const form = useForm<EnquiryInput, unknown, EnquiryData>({
    resolver: zodResolver(enquirySchema),
    defaultValues,
    mode: "onBlur",
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = form

  useEffect(() => {
    if (typeof window === "undefined") return
    setValue("sourcePage", window.location.pathname + window.location.search)
  }, [setValue])

  const watchedMobile = watch("mobile")
  const watchedEmail = watch("email")
  const watchedServices = watch("selectedServiceIds") ?? []
  const watchedContactMethod = watch("preferredContactMethod")

  const hasMobile = Boolean(watchedMobile && watchedMobile.trim())
  const hasEmail = Boolean(watchedEmail && watchedEmail.trim())
  const otherSelected = watchedServices.includes("general-other")

  const selectedCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const category of ENQUIRY_CATEGORIES) {
      counts[category.id] = category.services.filter((s) =>
        watchedServices.includes(s.id),
      ).length
    }
    return counts
  }, [watchedServices])

  const toggleService = (serviceId: string, checked: boolean) => {
    const current = new Set(watch("selectedServiceIds") ?? [])
    if (checked) current.add(serviceId)
    else current.delete(serviceId)
    setValue("selectedServiceIds", Array.from(current), {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response
        .json()
        .catch(() => ({ ok: false, error: "Unexpected server response" }))

      if (!response.ok || !result.ok) {
        const message =
          (typeof result?.error === "string" && result.error) ||
          "We could not submit your enquiry. Please try again."
        toast.error(message)
        return
      }

      const leadReference = result.leadReference as string
      const staffEmailSentByServer = Boolean(result?.notified?.staff)

      // If the server didn't dispatch the email (Resend not configured) but
      // we have a Web3Forms key on the client, send the notification from the
      // browser. Web3Forms' free tier only accepts client-side submissions.
      let clientEmailWarning: string | null = null
      if (!staffEmailSentByServer && isWeb3FormsConfigured()) {
        const web3Result = await sendEnquiryViaWeb3Forms({
          data,
          leadReference,
          submittedAt: new Date(),
        })
        if (!web3Result.ok && !("skipped" in web3Result && web3Result.skipped)) {
          console.error("[enquiry] Web3Forms client send failed", web3Result.error)
          clientEmailWarning =
            "We saved your enquiry, but the email notification had an issue. Our team may take a little longer — please WhatsApp +65 8415 8896 if it's urgent."
        }
      } else if (!staffEmailSentByServer && !isWeb3FormsConfigured()) {
        console.warn(
          "[enquiry] No email provider configured on client or server; staff will not receive an email automatically.",
          { leadReference },
        )
      }

      if (clientEmailWarning) {
        toast.warning(clientEmailWarning, { duration: 8000 })
      } else {
        toast.success("Enquiry sent! We will be in touch shortly.")
      }

      if (onSuccess) {
        onSuccess(leadReference)
        return
      }
      router.push(`/thank-you-contact?ref=${encodeURIComponent(leadReference)}`)
    } catch (err) {
      console.error("Enquiry submit failed", err)
      toast.error(
        "Something went wrong while sending your enquiry. Please try again or WhatsApp +65 8415 8896.",
      )
      setError("root", {
        type: "submit",
        message: "Submission failed. Please retry.",
      })
    }
  })

  const contactMethodAvailable = (method: PreferredContactMethod) => {
    if (method === "whatsapp" || method === "phone") return hasMobile
    if (method === "email") return hasEmail
    return true
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={["space-y-10", className].filter(Boolean).join(" ")}
    >
      {/* Section 1: Customer Details */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Step 1"
          title="Your details"
          description="Tell us who you are and how we can reach you."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldShell
            label="First name"
            required
            error={errors.firstName?.message}
            htmlFor="firstName"
          >
            <Input
              id="firstName"
              autoComplete="given-name"
              placeholder="Aisha"
              {...register("firstName")}
            />
          </FieldShell>

          <FieldShell
            label="Last name"
            required
            error={errors.lastName?.message}
            htmlFor="lastName"
          >
            <Input
              id="lastName"
              autoComplete="family-name"
              placeholder="Tan"
              {...register("lastName")}
            />
          </FieldShell>
        </div>

        <FieldShell
          label="Mobile / WhatsApp number"
          hint="Provide either a mobile number or email (or both)."
          error={errors.mobile?.message}
          htmlFor="mobile"
        >
          <div className="flex gap-2">
            <select
              {...register("countryCode")}
              aria-label="Country code"
              className="h-10 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-w-[7rem]"
            >
              {COUNTRY_CODES.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
            <Input
              id="mobile"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="9123 4567"
              {...register("mobile")}
            />
          </div>
        </FieldShell>

        <FieldShell
          label="Email address"
          hint="We will only use this to follow up on your enquiry."
          error={errors.email?.message}
          htmlFor="email"
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
          />
        </FieldShell>

        <FieldShell
          label="Preferred contact method"
          hint="Optional. We will only show options that match what you provided above."
          error={errors.preferredContactMethod?.message}
        >
          <RadioGroup
            value={watchedContactMethod ?? ""}
            onValueChange={(value) =>
              setValue(
                "preferredContactMethod",
                (value || undefined) as PreferredContactMethod | undefined,
                { shouldValidate: true, shouldDirty: true },
              )
            }
            className="grid grid-cols-1 sm:grid-cols-4 gap-3"
          >
            {(
              [
                { value: "whatsapp", label: "WhatsApp" },
                { value: "phone", label: "Phone call" },
                { value: "email", label: "Email" },
                { value: "no-preference", label: "No preference" },
              ] as const
            ).map((opt) => {
              const disabled = !contactMethodAvailable(opt.value)
              return (
                <Label
                  key={opt.value}
                  htmlFor={`contact-method-${opt.value}`}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors ${
                    disabled
                      ? "opacity-50 cursor-not-allowed border-gray-200"
                      : "border-gold/40 hover:border-gold hover:bg-gold/5"
                  }`}
                >
                  <RadioGroupItem
                    id={`contact-method-${opt.value}`}
                    value={opt.value}
                    disabled={disabled}
                  />
                  <span>{opt.label}</span>
                </Label>
              )
            })}
          </RadioGroup>
        </FieldShell>
      </section>

      {/* Section 2: Service Interest */}
      <section className="space-y-4">
        <SectionHeader
          eyebrow="Step 2"
          title="Which services are you interested in?"
          description="Select one or more service categories, then choose the services you would like to know more about. You can pick across multiple categories."
        />

        {errors.selectedServiceIds && (
          <p className="text-xs text-red-600">
            {errors.selectedServiceIds.message as string}
          </p>
        )}

        <div className="rounded-md border border-gold/30 bg-white overflow-hidden">
          <Accordion
            type="multiple"
            value={openCategories}
            onValueChange={setOpenCategories}
            className="divide-y divide-gold/15"
          >
            {ENQUIRY_CATEGORIES.map((category) => {
              const count = selectedCountByCategory[category.id] ?? 0
              return (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border-b-0"
                >
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex flex-1 items-center justify-between gap-3 text-left">
                      <div>
                        <p className="font-serif text-base text-black">
                          {category.label}
                        </p>
                        {category.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {category.description}
                          </p>
                        )}
                      </div>
                      {count > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[1.75rem] h-7 rounded-full bg-gold text-black text-xs font-medium px-2">
                          {count}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {category.services.map((service) => {
                        const checked = watchedServices.includes(service.id)
                        return (
                          <Label
                            key={service.id}
                            htmlFor={`svc-${service.id}`}
                            className="flex items-start gap-3 py-1.5 cursor-pointer hover:text-gold transition-colors"
                          >
                            <Checkbox
                              id={`svc-${service.id}`}
                              checked={checked}
                              onCheckedChange={(value) =>
                                toggleService(service.id, value === true)
                              }
                              className="mt-0.5"
                            />
                            <span className="text-sm text-black">
                              {service.label}
                            </span>
                          </Label>
                        )
                      })}
                    </div>

                    {category.hasOther && otherSelected && (
                      <div className="mt-4">
                        <FieldShell
                          label="Tell us a bit more"
                          required
                          error={errors.otherDetails?.message}
                          htmlFor="otherDetails"
                        >
                          <Textarea
                            id="otherDetails"
                            rows={3}
                            placeholder="What would you like to ask about?"
                            {...register("otherDetails")}
                          />
                        </FieldShell>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        {watchedServices.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {watchedServices.length}{" "}
            {watchedServices.length === 1 ? "service" : "services"} selected.
          </p>
        )}
      </section>

      {/* Section 3: Additional Information */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Step 3"
          title="Additional information"
          description="Anything else we should know before reaching out?"
        />

        <FieldShell
          label="Message or special request"
          hint="Optional."
          error={errors.message?.message}
          htmlFor="message"
        >
          <Textarea
            id="message"
            rows={4}
            placeholder="Tell us what you are looking for, your preferred appointment timing, or any questions you may have."
            {...register("message")}
          />
        </FieldShell>

        <FieldShell
          label="Preferred contact time"
          hint="Optional. When is it best for us to reach you?"
          error={errors.preferredTime?.message}
        >
          <RadioGroup
            value={watch("preferredTime") ?? ""}
            onValueChange={(value) =>
              setValue(
                "preferredTime",
                (value || undefined) as EnquiryData["preferredTime"],
                { shouldValidate: true, shouldDirty: true },
              )
            }
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {PREFERRED_TIME_OPTIONS.map((option) => (
              <Label
                key={option}
                htmlFor={`time-${option}`}
                className="flex items-center gap-2 rounded-md border border-gold/40 px-3 py-2 text-sm cursor-pointer hover:border-gold hover:bg-gold/5"
              >
                <RadioGroupItem id={`time-${option}`} value={option} />
                <span>{TIME_LABELS[option]}</span>
              </Label>
            ))}
          </RadioGroup>
        </FieldShell>
      </section>

      {/* Section 4: Consent */}
      <section className="space-y-4">
        <SectionHeader eyebrow="Step 4" title="Consent" />

        <Label
          htmlFor="contactConsent"
          className="flex items-start gap-3 cursor-pointer"
        >
          <Checkbox
            id="contactConsent"
            checked={watch("contactConsent") === true}
            onCheckedChange={(value) =>
              setValue("contactConsent", value === true ? true : (false as unknown as true), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            className="mt-0.5"
          />
          <span className="text-sm leading-relaxed text-black">
            I agree that Beauty Bar Parlour may contact me regarding this enquiry
            through WhatsApp, phone, or email.{" "}
            <span className="text-red-600">*</span>
          </span>
        </Label>
        {errors.contactConsent && (
          <p className="text-xs text-red-600">
            {errors.contactConsent.message as string}
          </p>
        )}

        <Label
          htmlFor="marketingConsent"
          className="flex items-start gap-3 cursor-pointer"
        >
          <Checkbox
            id="marketingConsent"
            checked={watch("marketingConsent") === true}
            onCheckedChange={(value) =>
              setValue("marketingConsent", value === true, {
                shouldDirty: true,
              })
            }
            className="mt-0.5"
          />
          <span className="text-sm leading-relaxed text-black">
            I would like to receive Beauty Bar Parlour promotions and service
            updates.
          </span>
        </Label>
      </section>

      <input type="hidden" {...register("sourcePage")} />

      {/* Submit */}
      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-gold px-10 text-sm font-medium text-black shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:bg-gold/90 disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSubmitting ? "Sending…" : "Submit enquiry"}
        </Button>
        <p className="text-xs text-muted-foreground">
          For urgent assistance, WhatsApp{" "}
          <a
            href="https://wa.me/6584158896"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gold"
          >
            +65 8415 8896
          </a>
          .
        </p>
      </div>
    </form>
  )
}

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="space-y-1">
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold font-medium">
        {eyebrow}
      </p>
      <h2 className="font-serif text-xl text-black">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground max-w-prose">{description}</p>
      )}
    </header>
  )
}

type FieldShellProps = {
  label: string
  htmlFor?: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}

function FieldShell({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: FieldShellProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={htmlFor}
        className="text-xs uppercase tracking-widest text-black/70"
      >
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

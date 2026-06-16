import { z } from "zod"
import { ENQUIRY_SERVICE_BY_ID } from "./services"

export const PREFERRED_CONTACT_METHODS = [
  "whatsapp",
  "phone",
  "email",
  "no-preference",
] as const

export type PreferredContactMethod = (typeof PREFERRED_CONTACT_METHODS)[number]

export const PREFERRED_TIME_OPTIONS = [
  "morning",
  "afternoon",
  "evening",
  "any",
] as const

export type PreferredTimeOption = (typeof PREFERRED_TIME_OPTIONS)[number]

const validServiceIds = new Set(Object.keys(ENQUIRY_SERVICE_BY_ID))

const trimmedName = z
  .string({ required_error: "Required" })
  .trim()
  .min(1, "Required")
  .max(80, "Too long")

const optionalEmail = z
  .string()
  .trim()
  .max(160, "Too long")
  .email("Enter a valid email address")
  .optional()
  .or(z.literal("").transform(() => undefined))

const optionalMobile = z
  .string()
  .trim()
  .max(20, "Too long")
  .regex(/^[0-9 ()-]{6,20}$/, "Enter a valid mobile number")
  .optional()
  .or(z.literal("").transform(() => undefined))

export const enquirySchema = z
  .object({
    firstName: trimmedName,
    lastName: trimmedName,

    countryCode: z
      .string()
      .trim()
      .regex(/^\+\d{1,4}$/, "Invalid country code")
      .default("+65"),
    mobile: optionalMobile,
    email: optionalEmail,

    preferredContactMethod: z
      .enum(PREFERRED_CONTACT_METHODS)
      .optional(),

    selectedServiceIds: z
      .array(z.string())
      .default([])
      .refine(
        (ids) => ids.every((id) => validServiceIds.has(id)),
        "One or more services are not recognised",
      ),

    otherDetails: z
      .string()
      .trim()
      .max(500, "Please keep it under 500 characters")
      .optional()
      .or(z.literal("").transform(() => undefined)),

    message: z
      .string()
      .trim()
      .max(2000, "Please keep it under 2000 characters")
      .optional()
      .or(z.literal("").transform(() => undefined)),

    preferredTime: z.enum(PREFERRED_TIME_OPTIONS).optional(),

    contactConsent: z.literal(true, {
      errorMap: () => ({
        message: "We need your consent to contact you about this enquiry.",
      }),
    }),
    marketingConsent: z.boolean().optional().default(false),

    sourcePage: z.string().max(200).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.mobile && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mobile"],
        message:
          "Please provide either a mobile/WhatsApp number or an email address so our team can contact you.",
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message:
          "Please provide either a mobile/WhatsApp number or an email address so our team can contact you.",
      })
    }

    if (data.selectedServiceIds.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["selectedServiceIds"],
        message: "Please pick at least one service or general enquiry option.",
      })
    }

    const otherSelected = data.selectedServiceIds.includes("general-other")
    if (otherSelected && (!data.otherDetails || data.otherDetails.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherDetails"],
        message: "Please tell us a bit more about your enquiry.",
      })
    }

    if (data.preferredContactMethod === "whatsapp" && !data.mobile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["preferredContactMethod"],
        message: "Add a mobile number to choose WhatsApp as your preferred contact method.",
      })
    }
    if (data.preferredContactMethod === "phone" && !data.mobile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["preferredContactMethod"],
        message: "Add a mobile number to choose phone as your preferred contact method.",
      })
    }
    if (data.preferredContactMethod === "email" && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["preferredContactMethod"],
        message: "Add an email address to choose email as your preferred contact method.",
      })
    }
  })

export type EnquiryInput = z.input<typeof enquirySchema>
export type EnquiryData = z.output<typeof enquirySchema>
